const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post('/saveReview', (req, res) => {
    const reviewData = req.body;

    fs.readFile('reviews.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to read reviews file.' });
            return;
        }

        let reviews = JSON.parse(data);
        reviews.push(reviewData);
        
        fs.writeFile('reviews.json', JSON.stringify(reviews, null, 2), 'utf8', (err) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Failed to write to reviews file.' });
                return;
            }
            res.status(200).json({ message: 'Review saved successfully.' });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});