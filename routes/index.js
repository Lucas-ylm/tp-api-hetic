const PDFDocument = require('pdfkit');
const express = require('express');

const router = express.Router();
router.post('/pdf', (req, res) => {
    const { title, address, zipcode, city, content, signature } = req.body;
    console.log('Received Title:', title);
    console.log('Received Address:', address);
    console.log('Received Address:', zipcode);
    console.log('Received Address:', city);
    console.log('Received Invoice Content:', content);
    console.log('Received Signature:', signature);

    const doc = new PDFDocument;

    doc.pipe(res);

    doc.fontSize(22).text(title, { align: 'center' });
    doc.moveDown();

    doc.fontSize(16).text(address);
    doc.fontSize(16).text(zipcode + " " + city);

    doc.moveDown();

    doc.fontSize(14).text("Madame, Monsieur,");
    doc.moveDown();
    doc.text(content);
    doc.moveDown();

    doc.fontSize(14).text("Signature :", { underline: true, align: 'right' });
    doc.moveDown();
    doc.text(signature, { align: 'right' });
    
    doc.end();
});

module.exports = router;