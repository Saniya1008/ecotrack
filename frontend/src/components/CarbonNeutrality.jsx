import React, { useState } from "react";
import axios from "axios";
import { Bar, Radar } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, RadarController, RadialLinearScale, PointElement } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, RadarController, RadialLinearScale, PointElement);

const CarbonNeutrality = () => {
  const [ratings, setRatings] = useState({
    energyEfficiency: 0,
    renewableEnergy: 0,
    ccus: 0,
    reforestation: 0,
    sustainableLandUse: 0,
  });

  const handleRatingChange = (pathway, value) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [pathway]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.post('https://ecotract-backend.vercel.app/api/carbonNeutrality/ratings', ratings);
      console.log("Saved Ratings:", response.data);
      alert("Ratings saved successfully!");
    } catch (error) {
      console.error("Error saving ratings:", error);
      alert("An error occurred while saving ratings.");
    }
  };

  const data = {
    labels: [
      "Energy Efficiency Improvements",
      "Renewable Energy Sources",
      "Carbon Capture, Utilization, and Storage (CCUS)",
      "Reforestation and Afforestation",
      "Sustainable Land Use and Rehabilitation"
    ],
    datasets: [
      {
        label: "Ratings",
        data: [
          ratings.energyEfficiency,
          ratings.renewableEnergy,
          ratings.ccus,
          ratings.reforestation,
          ratings.sustainableLandUse
        ],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      }
    ],
  };

  const radarData = {
    labels: data.labels,
    datasets: [
      {
        label: "Ratings",
        data: data.datasets[0].data,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      }
    ],
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4 text-center">Carbon Neutrality Pathways</h1>

      <div className="space-y-6">
        {/* Form Elements */}
        {Object.keys(ratings).map((pathway) => (
          <div key={pathway} className="flex items-center space-x-4">
            <label className="w-1/3 text-gray-300">{pathway.replace(/([A-Z])/g, ' $1').toUpperCase()}</label>
            <input
              type="number"
              value={ratings[pathway]}
              onChange={(e) => handleRatingChange(pathway, parseInt(e.target.value, 10) || 0)}
              className="p-2 border rounded-md w-2/3 border-blue-500 bg-gray-800 text-white"
              min="0"
              max="100"
            />
          </div>
        ))}
        
        <button
          onClick={handleSave}
          className="bg-green-500 hover:bg-green-400 text-white py-2 rounded-md font-semibold w-full"
        >
          Save Ratings
        </button>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">Ratings Overview</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <h3 className="text-xl font-semibold mb-2">Bar Chart</h3>
            <Bar data={data} options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                tooltip: {
                  callbacks: {
                    label: (context) => `${context.label}: ${context.raw}%`
                  }
                }
              },
              scales: {
                x: {
                  beginAtZero: true
                },
                y: {
                  beginAtZero: true
                }
              }
            }} />
          </div>
          <div>
          <h3 className="text-xl font-semibold mb-2">Radar Chart</h3>
<Radar 
  data={radarData} 
  options={{
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.raw}%`
        }
      }
    }
  }}
  dataset={{
    borderColor: 'white', // Set the radar line color to white
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Optional: Set a background color for better visibility
  }}
/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarbonNeutrality;
