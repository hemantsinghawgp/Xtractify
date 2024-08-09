const express = require('express');
const multer = require('multer');
const fs = require('fs');
const pdf = require('pdf-parse');
const { giveDetails } = require('./index.js'); // Import the giveDetails function
require('dotenv').config();

const app = express();
const port = 3010;

// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Serve static files (for front end)
app.use(express.static('public'));

// Endpoint to handle PDF upload and processing
app.post('/upload', upload.single('invoice'), (req, res) => {
    const filePath = req.file.path;

    fs.readFile(filePath, (err, data) => {
        if (err) {
            return res.status(500).send('Error reading file.');
        }

        pdf(data).then(async (pdfData) => {
            const promptText = pdfData.text;

            try {
                const result = await giveDetails(promptText);
                res.send(result);
            } catch (error) {
                res.status(500).send('Error processing PDF.');
            }
        }).catch(error => {
            res.status(500).send('Error parsing PDF.');
        });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
