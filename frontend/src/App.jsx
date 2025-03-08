// frontend/src/App.jsx
import { useState } from "react";
import axios from "axios";
import { useCarbonStore } from "./store/carbonStore";

function App() {
  const { history, addRecord } = useCarbonStore();
  const [distance, setDistance] = useState("");
  const [transportMode, setTransportMode] = useState("car");
  const [carbonFootprint, setCarbonFootprint] = useState(null);
  const [recommendation, setRecommendation] = useState("");

  const calculateFootprint = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/calculate", {
        distance,
        transportMode,
      });
      setCarbonFootprint(res.data.carbonFootprint);
      getRecommendation(res.data.carbonFootprint);
    } catch (error) {
      console.error("Calculation error", error);
    }
  };

  const getRecommendation = async (footprint) => {
    try {
      const res = await axios.post("http://localhost:5000/api/recommend", {
        carbonFootprint: footprint,
      });
      setRecommendation(res.data.recommendation);
      addRecord({
        distance,
        transportMode,
        carbonFootprint: footprint,
        recommendation: res.data.recommendation,
      });
    } catch (error) {
      console.error("AI recommendation error", error);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">CarbonTrackr</h1>
      <input
        type="number"
        placeholder="Distance (km)"
        value={distance}
        onChange={(e) => setDistance(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <select
        value={transportMode}
        onChange={(e) => setTransportMode(e.target.value)}
        className="border p-2 w-full mb-2"
      >
        <option value="car">Car</option>
        <option value="bus">Bus</option>
        <option value="train">Train</option>
      </select>
      <button
        onClick={calculateFootprint}
        className="bg-blue-500 text-white px-4 py-2 w-full"
      >
        Calculate
      </button>
      {carbonFootprint && (
        <div className="mt-4 p-4 border rounded">
          <p>Carbon Footprint: {carbonFootprint} kg CO2</p>
          <p>Recommendation: {recommendation}</p>
        </div>
      )}
      <h2 className="mt-6 font-bold">History</h2>
      <ul>
        {history.map((item, index) => (
          <li key={index} className="border p-2 mt-2">
            {item.distance} km by {item.transportMode} → {item.carbonFootprint}{" "}
            kg CO2
            <p className="text-sm">{item.recommendation}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

// frontend/src/store/carbonStore.js
