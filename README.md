# Xtractify

Xtractify is a powerful, user-friendly SaaS application designed to extract key details from invoice PDFs. This application leverages AI technologies to extract customer details, product information, and total amounts from uploaded invoices. 

## Features

- **Invoice Parsing:** Automatically extracts customer details, products, and total amounts from PDF invoices.
- **AI-Powered:** Utilizes Google's Gemini AI and OpenAI's GPT-4 for intelligent data extraction.
- **Web Interface:** Simple and responsive web interface built with Bootstrap 5.


## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js:** Install Node.js (v14.x or higher)
- **NPM:** Install npm (Node Package Manager)
- **API Keys:** Obtain API keys for Google Gemini and OpenAI
- **Libraries:** Install required Node.js libraries

## Installation

1. **Clone the Repository:**

    ```bash
    git clone https://github.com/your-username/Xtractify.git
    cd Xtractify
    ```

2. **Install Dependencies:**

    ```bash
    npm install
    ```

3. **Create .env File:**

    Create a `.env` file in the root directory of the project with the following content:

    ```env
    GEMINI_API_KEY=your_google_gemini_api_key
    OPEN_API_KEY=your_openai_api_key
    ```

4. **Run the Application:**

    Start the server:

    ```bash
    node server.js
    ```

  

## Usage

1. **Upload an Invoice PDF:**

    - Open the web interface in your browser.
    - Click on the "Choose File" button and select a PDF file from your computer.
    - Click the "Upload" button.

2. **Display Extracted Data:**

    - After processing, the application will automatically display information with the extracted data.

## Technologies Used

- **Node.js:** Backend server
- **Express.js:** Web server framework
- **Multer:** Handling file uploads
- **pdf-parse:** Extracting text from PDFs
- **Google Gemini API:** AI-powered content generation
- **OpenAI GPT-4:** AI-powered fallback for content generation
- **Bootstrap 5:** Frontend styling

## Troubleshooting

- **Error Processing File:** Ensure that the PDF is not encrypted and is properly formatted.
- **API Quota Exceeded:** Check if the API key has hit its usage limits and try again later.
- **PDF Parsing Issues:** If the PDF cannot be parsed, consider using a simpler PDF or one with text-based content rather than images.

## Contributing

If you'd like to contribute to Xtractify, please fork the repository and use a feature branch. Pull requests are warmly welcome.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


## Demo

See Xtractify in action! Watch the demo video below:

![Demo Video](Xtractify.mp4)