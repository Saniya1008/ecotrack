import React, { useState } from 'react';

const Excavation = ({ onCalculate }) => {
  const [energyConsumption, setEnergyConsumption] = useState('');
  const [emissionFactorExcavation, setEmissionFactorExcavation] = useState('');

  const handleCalculate = () => {
    const excavationEmissions = energyConsumption * emissionFactorExcavation;
    onCalculate('excavation', excavationEmissions);
  };

  return (
    <div className="max-w-4xl w-full p-6 bg-gray-900 rounded-lg shadow-lg mb-8 transition-transform transform hover:scale-105">
      <h2 className="text-3xl font-semibold mb-6 text-[#d46211] animate-pulse">
        Excavation
      </h2>
      <label className="block text-lg font-medium mb-2">
        Total Energy Consumption (kWh):
        <input
          type="number"
          className="w-full p-3 mt-2 border border-gray-600 rounded-md focus:outline-none focus:border-[#d46211] bg-gray-800 text-white transition-transform transform hover:scale-105"
          value={energyConsumption}
          onChange={(e) => setEnergyConsumption(e.target.value)}
        />
      </label>
      <label className="block text-lg font-medium mb-2 mt-4">
        Emission Factor (kg CO2/kWh):
        <input
          type="number"
          className="w-full p-3 mt-2 border border-gray-600 rounded-md focus:outline-none focus:border-[#d46211] bg-gray-800 text-white transition-transform transform hover:scale-105"
          value={emissionFactorExcavation}
          onChange={(e) => setEmissionFactorExcavation(e.target.value)}
        />
      </label>
      <button
        className="w-full mt-6 bg-[#d46211] text-white py-3 rounded-lg hover:bg-[#b8500e] transition-transform transform hover:scale-105"
        onClick={handleCalculate}
      >
        Calculate Excavation Emissions
      </button>
    </div>
  );
};

export default Excavation;
