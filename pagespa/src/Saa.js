import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register necessary chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Saa() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch temperature data from JSON file
    fetch("/weather-data.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }
        return response.json();
      })
      .then((json) => {
        // Log the fetched data to verify the structure
        console.log("Fetched JSON data:", json);
        
        // Check if the data has 'locations' and it's an array
        if (json.locations && Array.isArray(json.locations)) {
          setData(json.locations);
        } else {
          console.error("Invalid data format: 'locations' is missing or not an array.");
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Log data before chart rendering for debugging
  console.log("Current data state:", data);

  const chartData = {
    labels: data.length > 0 ? data.map((location) => location.name) : [],
    datasets: [
      {
        label: "Temperature (°C)",
        data: data.length > 0 ? data.map((location) => location.temperature) : [],
        backgroundColor: data.length > 0 ? data.map((_, index) => {
          const colors = ["#3498db", "#e74c3c", "#2ecc71", "#f39c12", "#9b59b6"];
          return colors[index % colors.length];
        }) : [],
      },
    ],
  };

  // Calculate the min and max temperature dynamically
  const temperatures = data.map((location) => location.temperature);
  const minTemperature = Math.min(0, ...temperatures); // Minimum should include 0 if no negatives exist
  const maxTemperature = Math.max(...temperatures);

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        min: minTemperature,
        max: maxTemperature,
        ticks: {
          stepSize: 1, // Adjust the step size as needed
        },
      },
    },
  };

  return (
    <div style={{ width: "60%", margin: "auto", textAlign: "center" }}>
      <h1>Lämpötilat</h1>
      {data.length > 0 ? (
        <Bar data={chartData} options={chartOptions} />
      ) : (
        <p>Ladataan tietoja...</p>
      )}
    </div>
  );
}

export default Saa;
