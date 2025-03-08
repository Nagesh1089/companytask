// backend/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Carbon Footprint Calculation (Mock Logic)
app.post("/api/calculate", (req, res) => {
  const { distance, transportMode } = req.body;
  const emissionFactor = { car: 0.2, bus: 0.1, train: 0.05 };
  const carbonFootprint = (
    distance * (emissionFactor[transportMode] || 0.15)
  ).toFixed(2);
  res.json({ carbonFootprint });
});

// AI Recommendation using OpenAI
app.post("/api/recommend", async (req, res) => {
  try {
    const { carbonFootprint } = req.body;
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Suggest ways to offset ${carbonFootprint} kg of CO2 emissions.`,
          },
        ],
        max_tokens: 100,
      },
      {
        headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
      }
    );
    res.json({ recommendation: response.data.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: "AI service failed" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
