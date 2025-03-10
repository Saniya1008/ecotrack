import React, { useState } from 'react';

const Equipment = ({ onCalculate }) => {
  const [fuelConsumptionEquipment, setFuelConsumptionEquipment] = useState('');
  const [emissionFactorEquipment, setEmissionFactorEquipment] = useState('');
  const [operatingHours, setOperatingHours] = useState('');

  const handleCalculate = () => {
    const equipmentEmissions =
      (fuelConsumptionEquipment * operatingHours * emissionFactorEquipment) /
      1000; // Convert kg to tons
    onCalculate('equipment', equipmentEmissions);
  };

  return (
    <div className="max-w-4xl w-full p-6 bg-gray-900 rounded-lg shadow-lg mb-8 transition-transform transform hover:scale-105">
      <h2 className="text-3xl font-semibold mb-6 text-[#d46211] animate-pulse">
        Equipment
      </h2>
      <label className="block text-lg font-medium mb-2">
        Fuel Consumption (liters):
        <input
          type="number"
          className="w-full p-3 mt-2 border border-gray-600 rounded-md focus:outline-none focus:border-[#d46211] bg-gray-800 text-white transition-transform transform hover:scale-105"
          value={fuelConsumptionEquipment}
          onChange={(e) => setFuelConsumptionEquipment(e.target.value)}
        />
      </label>
      <label className="block text-lg font-medium mb-2 mt-4">
        Emission Factor (kg/liter):
        <input
          type="number"
          className="w-full p-3 mt-2 border border-gray-600 rounded-md focus:outline-none focus:border-[#d46211] bg-gray-800 text-white transition-transform transform hover:scale-105"
          value={emissionFactorEquipment}
          onChange={(e) => setEmissionFactorEquipment(e.target.value)}
        />
      </label>
      <label className="block text-lg font-medium mb-2 mt-4">
        Operating Hours:
        <input
          type="number"
          className="w-full p-3 mt-2 border border-gray-600 rounded-md focus:outline-none focus:border-[#d46211] bg-gray-800 text-white transition-transform transform hover:scale-105"
          value={operatingHours}
          onChange={(e) => setOperatingHours(e.target.value)}
        />
      </label>
      <button
        className="w-full mt-6 bg-[#d46211] text-white py-3 rounded-lg hover:bg-[#b8500e] transition-transform transform hover:scale-105"
        onClick={handleCalculate}
      >
        Calculate Equipment Emissions
      </button>
    </div>
  );
};

export default Equipment;
