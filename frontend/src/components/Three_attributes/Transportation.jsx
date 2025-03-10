import React, { useState } from 'react';

const Transportation = ({ onCalculate }) => {
  const [distanceTraveled, setDistanceTraveled] = useState('');
  const [fuelConsumptionTransport, setFuelConsumptionTransport] = useState('');
  const [emissionFactorTransport, setEmissionFactorTransport] = useState('');

  const handleCalculate = () => {
    const transportationEmissions =
      distanceTraveled * fuelConsumptionTransport * emissionFactorTransport;
    onCalculate('transportation', transportationEmissions);
  };

  return (
    <div className="max-w-4xl w-full p-6 bg-gray-900 rounded-lg shadow-lg mb-8 transition-transform transform hover:scale-105">
      <h2 className="text-3xl font-semibold mb-6 text-[#d46211] animate-pulse">
        Transportation
      </h2>
      <label className="block text-lg font-medium mb-2">
        Distance Traveled (km):
        <input
          type="number"
          className="w-full p-3 mt-2 border border-gray-600 rounded-md focus:outline-none focus:border-[#d46211] bg-gray-800 text-white transition-transform transform hover:scale-105"
          value={distanceTraveled}
          onChange={(e) => setDistanceTraveled(e.target.value)}
        />
      </label>
      <label className="block text-lg font-medium mb-2 mt-4">
        Fuel Consumption (liters/km):
        <input
          type="number"
          className="w-full p-3 mt-2 border border-gray-600 rounded-md focus:outline-none focus:border-[#d46211] bg-gray-800 text-white transition-transform transform hover:scale-105"
          value={fuelConsumptionTransport}
          onChange={(e) => setFuelConsumptionTransport(e.target.value)}
        />
      </label>
      <label className="block text-lg font-medium mb-2 mt-4">
        Emission Factor (kg/liter):
        <input
          type="number"
          className="w-full p-3 mt-2 border border-gray-600 rounded-md focus:outline-none focus:border-[#d46211] bg-gray-800 text-white transition-transform transform hover:scale-105"
          value={emissionFactorTransport}
          onChange={(e) => setEmissionFactorTransport(e.target.value)}
        />
      </label>
      <button
        className="w-full mt-6 bg-[#d46211] text-white py-3 rounded-lg hover:bg-[#b8500e] transition-transform transform hover:scale-105"
        onClick={handleCalculate}
      >
        Calculate Transportation Emissions
      </button>
    </div>
  );
};

export default Transportation;
