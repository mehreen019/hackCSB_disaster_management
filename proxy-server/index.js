const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());

app.get('/api/find_places', async (req, res) => {
    try {
        const { text, language } = req.query;
        const apiKey = 'iz83xv5xz7b5gjrl1wdwb50clt43i1ng27dgabn2'; // replace with your actual API key

        const url = `https://www.meteosource.com/api/v1/free/find_places?text=${encodeURIComponent(text)}&language=${language}&key=${apiKey}`;
        console.log('Fetching URL:', url); // Log the constructed URL

        const response = await axios.get(url);
        console.log('Place ID Fetch Response:', response.data); // Log the response data
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching place ID', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/point', async (req, res) => {
    try {
        const { place_id, sections, language, units } = req.query;
        const apiKey = 'iz83xv5xz7b5gjrl1wdwb50clt43i1ng27dgabn2'; // replace with your actual API key

        const url = `https://www.meteosource.com/api/v1/free/point?place_id=${encodeURIComponent(place_id)}&sections=${sections}&language=${language}&units=${units}&key=${apiKey}`;
        console.log('Fetching URL:', url); // Log the constructed URL

        const response = await axios.get(url);
        console.log('Weather Data Fetch Response:', response.data); // Log the response data
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching weather data', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
