import formidable from 'formidable';
import fs from 'fs';
import pdf from 'pdf-parse';
import { giveDetails } from '../index.js';

export const config = {
    api: {
        bodyParser: false, // Disable Vercel's default body parsing
    },
};

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const form = formidable({
                multiples: false,
                uploadDir: '/tmp', // Use '/tmp' directory for file uploads
                keepExtensions: true,
            });

            form.parse(req, async (err, fields, files) => {
                if (err) {
                    console.error('Error parsing the form:', err);
                    res.status(500).json({ error: 'Error parsing the form.' });
                    return;
                }

                try {
                    const invoiceFile = files.invoice ? (Array.isArray(files.invoice) ? files.invoice[0] : files.invoice) : null;
                    if (!invoiceFile || !invoiceFile.filepath) {
                        console.error('No invoice file uploaded');
                        res.status(400).json({ error: 'No invoice file uploaded.' });
                        return;
                    }

                    const filePath = invoiceFile.filepath;

                    // Immediately read and process the uploaded PDF file
                    const fileBuffer = fs.readFileSync(filePath);
                    console.log('PDF file read successfully.');

                    const pdfData = await pdf(fileBuffer);
                    console.log('PDF content parsed successfully:', pdfData.text);

                    const extractedDetails = await giveDetails(pdfData.text);
                    console.log('Details extracted successfully:', extractedDetails);

                    // Remove the file after processing
                    fs.unlinkSync(filePath);

                    res.status(200).json({ details: extractedDetails });
                } catch (error) {
                    console.error('Error processing the PDF:', error);
                    res.status(500).json({ error: `Error processing the PDF: ${error.message}` });
                }
            });
        } catch (outerError) {
            console.error('Unexpected error:', outerError);
            res.status(500).json({ error: `Unexpected error: ${outerError.message}` });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
