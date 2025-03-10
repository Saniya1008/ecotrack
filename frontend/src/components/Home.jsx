import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import 'tailwindcss/tailwind.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const CarbonCreditsLineGraph = () => {
  const years = [2018, 2019, 2020, 2021, 2022, 2023, 2024];
  const carbonCredits = [1500, 1600, 1700, 1800, 1900, 2000, 2100]; // Hypothetical values in million metric tons

  const data = {
    labels: years,
    datasets: [
      {
        label: 'Carbon Credits (Million Metric Tons)',
        data: carbonCredits,
        fill: false,
        borderColor: 'green',
        backgroundColor: 'green',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Projected Carbon Credits in Indian Coal Mines (2018-2024)',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Carbon Credits (Million Metric Tons)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Year',
        },
      },
    },
  };

  return (
    <div className="w-full h-80 md:h-96">
      <Line data={data} options={options} />
    </div>
  );
};

const CarbonEmissionsLineGraph = () => {
  const years = [2020, 2030, 2040, 2050, 2060, 2070, 2080];
  const carbonEmissions = [2500, 2300, 2000, 1700, 1400, 1000, 500];

  const data = {
    labels: years,
    datasets: [
      {
        label: 'Carbon Emissions (Million Metric Tons)',
        data: carbonEmissions,
        fill: false,
        borderColor: 'blue',
        backgroundColor: 'blue',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Projected Carbon Emissions Reduction in India (2020-2070)',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Carbon Emissions (Million Metric Tons)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Year',
        },
      },
    },
  };

  return (
    <div className="w-full h-80 md:h-96">
      <Line data={data} options={options} />
    </div>
  );
};

const CarbonNeutralityCounter = ({ value, duration }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value);
    if (start === end) return;

    let incrementTime = (duration / end) * 1000;

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <span>{count}</span>;
};

// Main EcoCoal Component
const EcoCoal = () => {
  return (
    <div className="bg-gray-900 text-white">
      {/* Video Section */}
      <section className="flex items-center justify-center h-[70vh] md:h-screen p-4 md:p-8">
        <video
          src="https://github.com/user-attachments/assets/82a386a7-7b7c-4c7b-82fe-d75297999ef6"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover rounded-lg shadow-lg"
        />
      </section>

      {/* Carbon Neutrality Measures Section */}
      <section className="py-16 px-4 md:px-8 bg-gray-900 text-center">
        <div className="py-10 px-5 rounded-lg shadow-lg bg-orange-500 text-white">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Carbon Neutrality Measures
          </h2>
          <p className="mb-8 text-sm md:text-base lg:text-lg">
            Significant steps are being taken towards reducing carbon emissions
            across various sectors.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center bg-orange-600 p-4 rounded-md shadow-md">
              <span className="text-3xl md:text-4xl lg:text-5xl font-extrabold">
                <CarbonNeutralityCounter value="55" duration={2} />%
              </span>
              <span className="text-sm md:text-base lg:text-lg">
                Reduction in carbon emissions
              </span>
            </div>
            <div className="flex flex-col items-center bg-orange-600 p-4 rounded-md shadow-md">
              <span className="text-3xl md:text-4xl lg:text-5xl font-extrabold">
                <CarbonNeutralityCounter value="2.7" duration={2} />MT
              </span>
              <span className="text-sm md:text-base lg:text-lg">
                Carbon saved
              </span>
            </div>
            <div className="flex flex-col items-center bg-orange-600 p-4 rounded-md shadow-md">
              <span className="text-3xl md:text-4xl lg:text-5xl font-extrabold">
                <CarbonNeutralityCounter value="500" duration={2} />GW
              </span>
              <span className="text-sm md:text-base lg:text-lg">
                Green energy generated
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Data Visualization Section */}
      <section className="py-16 px-4 md:px-8 bg-black text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
          Data Visualization
        </h2>
        <p className="mb-10 text-sm md:text-base lg:text-lg">
          Carbon measures in form of charts to show varying efficiencies.
        </p>
        <div className="flex flex-col md:flex-row flex-wrap justify-center gap-8">
          <div className="w-full md:w-1/2 lg:w-1/3">
            <CarbonCreditsLineGraph />
          </div>
          <div className="w-full md:w-1/2 lg:w-1/3">
            <CarbonEmissionsLineGraph />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 md:px-8 bg-gray-900 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
          Features
        </h2>
        <div className="flex flex-col md:flex-row flex-wrap justify-center gap-6">
          <button className="bg-orange-500 text-white py-3 px-6 rounded-lg hover:bg-orange-600 transition duration-200 shadow-md">
            Visualize your carbon emissions
          </button>
          <button className="bg-orange-500 text-white py-3 px-6 rounded-lg hover:bg-orange-600 transition duration-200 shadow-md">
            Analyze your carbon data
          </button>
          <button className="bg-orange-500 text-white py-3 px-6 rounded-lg hover:bg-orange-600 transition duration-200 shadow-md">
            Get insights
          </button>
        </div>
        <div className="mt-8">
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 shadow-lg transition duration-200">
            Read More
          </button>
        </div>
      </section>
    </div>
  );
};

export default EcoCoal;
