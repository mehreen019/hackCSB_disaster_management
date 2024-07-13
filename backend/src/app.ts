import express from "express";
import {config} from "dotenv";
import morgan from 'morgan';
import appRouter from "./routes/index.js";
import cors from "cors";
import axios from "axios";

const app =express();
const PORT = 5000;

config();
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/v1",appRouter);

app.use(cors());

interface FindPlacesQuery {
    text: string;
    language: string;
  }
  
  interface PointQuery {
    place_id: string;
    sections: string;
    language: string;
    units: string;
  }

app.get('/api/find_places', async (req, res) => {
    try {
        const { text, language } = req.query;
        const apiKey = 'iz83xv5xz7b5gjrl1wdwb50clt43i1ng27dgabn2'; 

        const url = `https://www.meteosource.com/api/v1/free/find_places?text=${encodeURIComponent(text)}&language=${language}&key=${apiKey}`;
        console.log('Fetching URL:', url); 
        const response = await axios.get(url);
        console.log('Place ID Fetch Response:', response.data); 
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching place ID', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/point', async (req, res) => {
    try {
        const { place_id, sections, language, units } = req.query;
        const apiKey = 'iz83xv5xz7b5gjrl1wdwb50clt43i1ng27dgabn2'; 

        const url = `https://www.meteosource.com/api/v1/free/point?place_id=${encodeURIComponent(place_id)}&sections=${sections}&language=${language}&units=${units}&key=${apiKey}`;
        console.log('Fetching URL:', url);

        const response = await axios.get(url);
        console.log('Weather Data Fetch Response:', response.data);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching weather data', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default app;