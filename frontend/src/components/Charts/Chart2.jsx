import React, { useEffect, useState } from 'react';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  ArcElement,
  BarElement,
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
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Chart = () => {
  const [chartData, setChartData] = useState({
    years: [],
    excavationData: [],
    transportationData: [],
    equipmentData: [],
    totalData: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://ecotrack-backend.vercel.app/api/emissions/getData');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // Transform data for charts
        const years = data.map(item => item.year);
        const excavationData = data.map(item => item.excavationEmissions);
        const transportationData = data.map(item => item.transportationEmissions);
        const equipmentData = data.map(item => item.equipmentEmissions);
        const totalData = data.map(item => item.totalEmissions);

        setChartData({
          years,
          excavationData,
          transportationData,
          equipmentData,
          totalData,
        });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const {
    years,
    excavationData,
    transportationData,
    equipmentData,
    totalData,
  } = chartData;

  const excavationChartData = {
    labels: years,
    datasets: [
      {
        label: 'Excavation CO2 Emissions (tons)',
        data: excavationData,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
      },
    ],
  };

  const transportationChartData = {
    labels: years,
    datasets: [
      {
        label: 'Transportation CO2 Emissions (tons)',
        data: transportationData,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
      },
    ],
  };

  const equipmentChartData = {
    labels: years,
    datasets: [
      {
        label: 'Equipment CO2 Emissions (tons)',
        data: equipmentData,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  };

  const summaryData = {
    labels: ['Excavation', 'Transportation', 'Equipment'],
    datasets: [
      {
        label: 'Total CO2 Emissions (tons)',
        data: [
          excavationData.reduce((acc, val) => acc + val, 0),
          transportationData.reduce((acc, val) => acc + val, 0),
          equipmentData.reduce((acc, val) => acc + val, 0),
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(75, 192, 192, 0.7)',
        ],
        hoverBackgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
        ],
      },
    ],
  };

  const totalEmissionsChartData = {
    labels: years,
    datasets: [
      {
        label: 'Total CO2 Emissions (tons)',
        data: totalData,
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        fill: true,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#ffffff',
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.dataset.label}: ${tooltipItem.raw.toFixed(2)} tons`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => value.toFixed(2),
        },
      },
    },
  };

  const doughnutOptions = {
    plugins: {
      legend: {
        display: true,
        position: 'right',
        labels: {
          color: '#ffffff',
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const label = tooltipItem.label || '';
            const value = tooltipItem.raw || 0;
            const total = summaryData.datasets[0].data.reduce((acc, val) => acc + val, 0);
            const percentage = ((value / total) * 100).toFixed(2);
            return `${label}: ${percentage}% (${value.toFixed(2)} tons)`;
          },
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-center text-[#d42611] mb-12">
        Carbon Emission Overview
      </h1>

      <div className="max-w-4xl w-full p-6 bg-gray-900 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-4 rounded-lg">
            <h3 className="text-center text-2xl mb-4 text-[#d42611]">
              Excavation CO2 Emissions
            </h3>
            <div className="relative h-72 md:h-96">
              <Line data={excavationChartData} options={lineOptions} />
            </div>
          </div>

          <div className="p-4 rounded-lg">
            <h3 className="text-center text-2xl mb-4 text-[#d42611]">
              Transportation CO2 Emissions
            </h3>
            <div className="relative h-72 md:h-96">
              <Line data={transportationChartData} options={lineOptions} />
            </div>
          </div>

          <div className="p-4 rounded-lg">
            <h3 className="text-center text-2xl mb-4 text-[#d42611]">
              Equipment CO2 Emissions
            </h3>
            <div className="relative h-72 md:h-96">
              <Line data={equipmentChartData} options={lineOptions} />
            </div>
          </div>

          <div className="p-4 rounded-lg">
            <h3 className="text-center text-2xl mb-4 text-[#d42611]">
              Total CO2 Emissions Breakdown
            </h3>
            <div className="relative h-72 md:h-96">
              <Doughnut data={summaryData} options={doughnutOptions} />
            </div>
          </div>

          <div className="p-4 rounded-lg">
            <h3 className="text-center text-2xl mb-4 text-[#d42611]">
              Total CO2 Emissions Over Time
            </h3>
            <div className="relative h-72 md:h-96">
              <Bar data={totalEmissionsChartData} options={lineOptions} />
            </div>
          </div>
        </div>

        <div className="mt-8 p-4 bg-gray-800 rounded-lg text-center">
          <h3 className="text-3xl font-semibold mb-6 text-[#d42611]">
            Contribution Breakdown
          </h3>
          <div className="flex justify-around items-center">
            <div className="flex items-center">
              <div
                className="w-4 h-4 mr-2"
                style={{ backgroundColor: 'rgba(255, 99, 132, 0.7)' }}
              ></div>
              <span>Excavation: {(excavationData.reduce((acc, val) => acc + val, 0) / totalData.reduce((acc, val) => acc + val, 0) * 100).toFixed(2)}%</span>
            </div>
            <div className="flex items-center">
              <div
                className="w-4 h-4 mr-2"
                style={{ backgroundColor: 'rgba(54, 162, 235, 0.7)' }}
              ></div>
              <span>Transportation: {(transportationData.reduce((acc, val) => acc + val, 0) / totalData.reduce((acc, val) => acc + val, 0) * 100).toFixed(2)}%</span>
            </div>
            <div className="flex items-center">
              <div
                className="w-4 h-4 mr-2"
                style={{ backgroundColor: 'rgba(75, 192, 192, 0.7)' }}
              ></div>
              <span>Equipment: {(equipmentData.reduce((acc, val) => acc + val, 0) / totalData.reduce((acc, val) => acc + val, 0) * 100).toFixed(2)}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chart;
