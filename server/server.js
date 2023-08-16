const express = require('express');
const axios = require('axios');
const app = express();
const port = 4000;

app.get('/numbers', async (req, res) => {
    const urls = req.query.url || [];
    const timeout = 1000;

    const fetchPromises = urls.map(url => {
        return axios.get(url, { timeout })
            .then(response => response.data.numbers || [])
            .catch(error => {
                console.error(`Error fetching data from ${url}:`, error.message);
                return [];
            });
    });

    try {
        const results = await Promise.allSettled(fetchPromises);

        const validResponses = results
            .filter(result => result.status === 'fulfilled')
            .map(result => result.value)
            .flat();

        const uniqueNumbers = [...new Set(validResponses)];
        const sortedNumbers = uniqueNumbers.sort((a, b) => a - b); // Sort in increasing order

        res.json({ numbers: sortedNumbers });
    } catch (error) {
        console.error('An error occurred:', error.message);
        res.status(500).json({ error: 'An error occurred while processing the requests.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});