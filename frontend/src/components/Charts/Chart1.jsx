import React, { useEffect } from 'react';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  ArcElement,
  BarElement,
} from 'chart.js';
import 'tailwindcss/tailwind.css';

const Chart1 = () => {
  // Generate random data for demonstration
  const generateRandomData = (count) =>
    Array.from({ length: count }, () =>
      parseFloat((Math.random() * 10).toFixed(2))
    );

  // Hardcoded values
  const excavationDataValues = generateRandomData(5);
  const transportationDataValues = generateRandomData(5);
  const equipmentDataValues = generateRandomData(5);

  // Calculate totals and percentages
  const totalExcavation = excavationDataValues.reduce(
    (acc, val) => acc + val,
    0
  );
  const totalTransportation = transportationDataValues.reduce(
    (acc, val) => acc + val,
    0
  );
  const totalEquipment = equipmentDataValues.reduce((acc, val) => acc + val, 0);

  const totalEmissions = totalExcavation + totalTransportation + totalEquipment;

  const excavationPercentage = (
    (totalExcavation / totalEmissions) *
    100
  ).toFixed(2);
  const transportationPercentage = (
    (totalTransportation / totalEmissions) *
    100
  ).toFixed(2);
  const equipmentPercentage = ((totalEquipment / totalEmissions) * 100).toFixed(
    2
  );

  // Data for total emissions per period
  const totalEmissionsPeriod = excavationDataValues.map(
    (val, idx) => val + transportationDataValues[idx] + equipmentDataValues[idx]
  );

  // Register required chart.js components
  useEffect(() => {
    ChartJS.register(
      CategoryScale,
      LinearScale,
      LineElement,
      PointElement,
      ArcElement,
      BarElement
    );
  }, []);

  const excavationChartData = {
    labels: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5'],
    datasets: [
      {
        label: 'Excavation CO2 Emissions (M tons)',
        data: excavationDataValues,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
      },
    ],
  };

  const transportationChartData = {
    labels: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5'],
    datasets: [
      {
        label: 'Transportation CO2 Emissions (M tons)',
        data: transportationDataValues,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
      },
    ],
  };

  const equipmentChartData = {
    labels: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5'],
    datasets: [
      {
        label: 'Equipment CO2 Emissions (M tons)',
        data: equipmentDataValues,
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
        label: 'Total CO2 Emissions (M tons)',
        data: [totalExcavation, totalTransportation, totalEquipment],
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
    labels: ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5'],
    datasets: [
      {
        label: 'Total CO2 Emissions (M tons)',
        data: totalEmissionsPeriod,
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
          label: (tooltipItem) =>
            `${tooltipItem.dataset.label}: ${tooltipItem.raw.toFixed(
              2
            )} M tons`,
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
            const total = totalEmissions || 1; // Prevent division by zero
            const percentage = ((value / total) * 100).toFixed(2);
            return `${label}: ${percentage}% (${value.toFixed(2)} M tons)`;
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
        {/* Chart Sections */}
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

        {/* Contribution Summary */}
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
              <span>Excavation: {excavationPercentage}%</span>
            </div>
            <div className="flex items-center">
              <div
                className="w-4 h-4 mr-2"
                style={{ backgroundColor: 'rgba(54, 162, 235, 0.7)' }}
              ></div>
              <span>Transportation: {transportationPercentage}%</span>
            </div>
            <div className="flex items-center">
              <div
                className="w-4 h-4 mr-2"
                style={{ backgroundColor: 'rgba(75, 192, 192, 0.7)' }}
              ></div>
              <span>Equipment: {equipmentPercentage}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chart1;
