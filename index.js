const fs = require('fs');
const pdf = require('pdf-parse');
const OpenAI = require('openai');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const giveDetails = async (text) => {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const prompt = `
        You are an expert in extracting information from invoices.
        Here is the invoice text:
        
        ${text}
        
        Please extract the following details:
        - Customer Details
        - Products
        - Total Amount
         just give specified data in text format
        `;
        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (error) {
        if (error.message.includes('quota')) {
            const openai = new OpenAI({ apiKey: process.env.OPEN_API_KEY });
            const completion = await openai.chat.completions.create({
                model: 'gpt-4',
                messages: [
                    { role: 'system', content: 'You are a helpful assistant.' },
                    { role: 'user', content: `Extract the following details from the text:\n1. Customer details\n2. Products\n3. Total Amount\n\nText:\n${text}` }
                ],
                temperature: 0.2,
            });
            return completion.choices[0].message.content;
        } else {
            throw new Error('Error extracting details:', error.message);
        }
    }
};

module.exports = { giveDetails };
