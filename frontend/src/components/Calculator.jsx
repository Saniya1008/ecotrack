import React, { useState } from 'react';

const Dashboard = () => {
  // States to store inputs
  const [inputs, setInputs] = useState({
    miningType: '',
    year: '', // Initial value is an empty string
    yearlyProduction: '',
    yearlyExclusionFactor: '',
    coalTypeConversionFactor: '',
    effectiveCO2EmissionsFactor: '',
    powerConsumption: '',
    operatingHoursMining: '',
    emissionFactorMining: '',
    numberOfDumpers: '',
    distanceTraveled: '',
    fuelConsumptionTransport: '',
    emissionFactorTransport: '',
    operatingHours: '',
    equipmentPowerRating: '',
    emissionFactorEquipment: '',
  });

  // State to store results
  const [results, setResults] = useState({
    year: null,
    excavationEmissions: null,
    transportationEmissions: null,
    equipmentEmissions: null,
    totalEmissions: null,
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  // Function to calculate emissions
  const calculateEmissions = async () => {
    const year = parseFloat(inputs.year);
    const yearlyProductionFloat = parseFloat(inputs.yearlyProduction);
    const yearlyExclusionFactorFloat = parseFloat(inputs.yearlyExclusionFactor);
    const coalTypeConversionFactorFloat = parseFloat(
      inputs.coalTypeConversionFactor
    );
    const effectiveCO2EmissionsFactorFloat = parseFloat(
      inputs.effectiveCO2EmissionsFactor
    );
    const powerConsumptionFloat = parseFloat(inputs.powerConsumption);
    const operatingHoursMiningFloat = parseFloat(inputs.operatingHoursMining);
    const emissionFactorMiningFloat = parseFloat(inputs.emissionFactorMining);
    const numberOfDumpersFloat = parseFloat(inputs.numberOfDumpers);
    const distanceTraveledFloat = parseFloat(inputs.distanceTraveled);
    const fuelConsumptionTransportFloat = parseFloat(
      inputs.fuelConsumptionTransport
    );
    const emissionFactorTransportFloat = parseFloat(
      inputs.emissionFactorTransport
    );
    const equipmentPowerRatingFloat = parseFloat(inputs.equipmentPowerRating);
    const emissionFactorEquipmentFloat = parseFloat(
      inputs.emissionFactorEquipment
    );
    const operatingHoursFloat = parseFloat(inputs.operatingHours);

    let excavationEmissionsMillionTons;

    // Excavation CO2 Emissions calculation based on mining type
    if (inputs.miningType === 'open-pit') {
      excavationEmissionsMillionTons =
        (yearlyProductionFloat *
          (1 - yearlyExclusionFactorFloat) *
          coalTypeConversionFactorFloat *
          effectiveCO2EmissionsFactorFloat) /
        Math.pow(10, 6); // Convert to Million tons directly
    } else if (inputs.miningType === 'underground') {
      excavationEmissionsMillionTons =
        (powerConsumptionFloat *
          operatingHoursMiningFloat *
          emissionFactorMiningFloat) /
        Math.pow(10, 6); // Convert to Million tons directly
    } else {
      excavationEmissionsMillionTons = 0; // If no mining type selected
    }

    const excavationEmissionsFormatted =
      excavationEmissionsMillionTons.toFixed(6);

    // Transportation CO2 Emissions using the provided formula
    const totalFuelConsumedTransport =
      numberOfDumpersFloat *
      distanceTraveledFloat *
      fuelConsumptionTransportFloat;

    const transportationEmissions =
      totalFuelConsumedTransport * emissionFactorTransportFloat; // in kg

    const transportationEmissionsMillionTons =
      transportationEmissions / Math.pow(10, 6); // Convert to Million tons

    const transportationEmissionsFormatted =
      transportationEmissionsMillionTons.toFixed(6);

    // Equipment CO2 Emissions using the provided formula
    const equipmentEmissionsKgCO2 =
      equipmentPowerRatingFloat *
      operatingHoursFloat *
      emissionFactorEquipmentFloat *
      (44 / 12); // Convert to kg CO2

    const equipmentEmissionsMillionTons =
      equipmentEmissionsKgCO2 / Math.pow(10, 6); // Convert to Million tons

    const equipmentEmissionsFormatted =
      equipmentEmissionsMillionTons.toFixed(6);

    // Total CO2 Emissions in Million Tons
    const totalEmissionsMillionTons = (
      excavationEmissionsMillionTons +
      transportationEmissionsMillionTons +
      equipmentEmissionsMillionTons
    ).toFixed(6);

    // Set results
    setResults({
      year: parseFloat(year),
      excavationEmissions: parseFloat(excavationEmissionsFormatted),
      transportationEmissions: parseFloat(transportationEmissionsFormatted),
      equipmentEmissions: parseFloat(equipmentEmissionsFormatted),
      totalEmissions: parseFloat(totalEmissionsMillionTons),
    });

    // Clear input fields after calculation
    setInputs({
      miningType: '',
      year: '', // Reset to empty string
      yearlyProduction: '',
      yearlyExclusionFactor: '',
      coalTypeConversionFactor: '',
      effectiveCO2EmissionsFactor: '',
      powerConsumption: '',
      operatingHoursMining: '',
      emissionFactorMining: '',
      numberOfDumpers: '',
      distanceTraveled: '',
      fuelConsumptionTransport: '',
      emissionFactorTransport: '',
      operatingHours: '',
      equipmentPowerRating: '',
      emissionFactorEquipment: '',
    });

    // Prepare the emission data to send to the server
    const emissionData = {
      year: year,
      excavationEmissions: excavationEmissionsFormatted,
      transportationEmissions: transportationEmissionsFormatted,
      equipmentEmissions: equipmentEmissionsFormatted,
      totalEmissions: totalEmissionsMillionTons,
    };

    try {
      const response = await fetch('http://ecotrack-backend.vercel.app/api/emissions/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emissionData),
      });

      if (response.ok) {
        console.log('Emission data added');
      } else {
        console.error('Failed to add emission data');
      }
    } catch (err) {
      console.log('Error sending data to DB', err);
    }
  };

  // Check if all fields are filled and valid
  const isButtonDisabled = () => {
    if (inputs.miningType === 'open-pit') {
      return !(
        inputs.year &&
        inputs.yearlyProduction &&
        inputs.yearlyExclusionFactor &&
        inputs.coalTypeConversionFactor &&
        inputs.effectiveCO2EmissionsFactor &&
        inputs.numberOfDumpers &&
        inputs.distanceTraveled &&
        inputs.fuelConsumptionTransport &&
        inputs.emissionFactorTransport &&
        inputs.operatingHours &&
        inputs.equipmentPowerRating &&
        inputs.emissionFactorEquipment
      );
    } else if (inputs.miningType === 'underground') {
      return !(
        inputs.year &&
        inputs.powerConsumption &&
        inputs.operatingHoursMining &&
        inputs.emissionFactorMining &&
        inputs.numberOfDumpers &&
        inputs.distanceTraveled &&
        inputs.fuelConsumptionTransport &&
        inputs.emissionFactorTransport &&
        inputs.operatingHours &&
        inputs.equipmentPowerRating &&
        inputs.emissionFactorEquipment
      );
    }
    return !inputs.year; // If year is not selected
  };

  return (
    <div className="bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-200">
        Carbon Emission Calculator
      </h1>

      <div className="bg-gray-800 max-w-xl mx-auto p-6 shadow-md rounded-lg">
        {/* Year Dropdown */}
        <h2 className="text-2xl font-semibold mb-4">Select the Year</h2>
        <select
          name="year"
          value={inputs.year}
          className="w-full p-2 mb-4 rounded-md bg-gray-700"
          onChange={handleInputChange}
        >
          <option value="">Select Year</option>
          <option value="2020">2020</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
        </select>

        {/* Mining Type Selection */}
        <h2 className="text-2xl font-semibold mb-4">Select Mining Type</h2>
        <select
          name="miningType"
          value={inputs.miningType}
          className="w-full p-2 mb-4 rounded-md bg-gray-700"
          onChange={handleInputChange}
        >
          <option value="">Select Mining Type</option>
          <option value="open-pit">Open-Pit Mining</option>
          <option value="underground">Underground Mining</option>
        </select>

        {/* Excavation Inputs - Open-Pit Mining */}
        {inputs.miningType === 'open-pit' && (
          <>
            <h2 className="text-2xl font-semibold mb-4">
              Open-Pit Mining Inputs
            </h2>
            <label className="block text-sm font-medium mb-2">
              Yearly Production (Million tonnes):
            </label>
            <input
              name="yearlyProduction"
              placeholder="e.g., 5"
              className="w-full p-2 mb-4 rounded-md bg-gray-700"
              onChange={handleInputChange}
            />
            <label className="block text-sm font-medium mb-2">
              Yearly Exclusion Factor:
            </label>
            <input
              name="yearlyExclusionFactor"
              placeholder="e.g., 0.1"
              className="w-full p-2 mb-4 rounded-md bg-gray-700"
              onChange={handleInputChange}
            />
            <label className="block text-sm font-medium mb-2">
              Coal Type Conversion Factor (TJ/kt):
            </label>
            <input
              name="coalTypeConversionFactor"
              placeholder="e.g., 24.5"
              className="w-full p-2 mb-4 rounded-md bg-gray-700"
              onChange={handleInputChange}
            />
            <label className="block text-sm font-medium mb-2">
              Effective CO2 Emissions Factor (CO2/TJ):
            </label>
            <input
              name="effectiveCO2EmissionsFactor"
              placeholder="e.g., 100"
              className="w-full p-2 mb-4 rounded-md bg-gray-700"
              onChange={handleInputChange}
            />
          </>
        )}

        {/* Excavation Inputs - Underground Mining */}
        {inputs.miningType === 'underground' && (
          <>
            <h2 className="text-2xl font-semibold mb-4">
              Underground Mining Inputs
            </h2>
            <label className="block text-sm font-medium mb-2">
              Power Consumption (kWh):
            </label>
            <input
              name="powerConsumption"
              placeholder="e.g., 1000"
              className="w-full p-2 mb-4 rounded-md bg-gray-700"
              onChange={handleInputChange}
            />
            <label className="block text-sm font-medium mb-2">
              Operating Hours:
            </label>
            <input
              name="operatingHoursMining"
              placeholder="e.g., 2000"
              className="w-full p-2 mb-4 rounded-md bg-gray-700"
              onChange={handleInputChange}
            />
            <label className="block text-sm font-medium mb-2">
              Emission Factor Mining (kg CO2/kWh):
            </label>
            <input
              name="emissionFactorMining"
              placeholder="e.g., 0.5"
              className="w-full p-2 mb-4 rounded-md bg-gray-700"
              onChange={handleInputChange}
            />
          </>
        )}

        {/* Common Inputs */}

        <h2 className="text-2xl font-semibold mb-4">Transportation</h2>
        <label className="block text-sm font-medium mb-2">
          Number of Dumpers:
        </label>
        <input
          name="numberOfDumpers"
          placeholder="e.g., 10"
          className="w-full p-2 mb-4 rounded-md bg-gray-700"
          onChange={handleInputChange}
        />
        <label className="block text-sm font-medium mb-2">
          Distance Traveled (km):
        </label>
        <input
          name="distanceTraveled"
          placeholder="e.g., 50"
          className="w-full p-2 mb-4 rounded-md bg-gray-700"
          onChange={handleInputChange}
        />
        <label className="block text-sm font-medium mb-2">
          Fuel Consumption (L/km):
        </label>
        <input
          name="fuelConsumptionTransport"
          placeholder="e.g., 10"
          className="w-full p-2 mb-4 rounded-md bg-gray-700"
          onChange={handleInputChange}
        />
        <label className="block text-sm font-medium mb-2">
          Emission Factor Transport (kg CO2/L):
        </label>
        <input
          name="emissionFactorTransport"
          placeholder="e.g., 2.5"
          className="w-full p-2 mb-4 rounded-md bg-gray-700"
          onChange={handleInputChange}
        />

        {/* Equipment */}

        <h2 className="text-2xl font-semibold mb-4">Equipment</h2>
        <label className="block text-sm font-medium mb-2">
          Operating Hours (h):
        </label>
        <input
          name="operatingHours"
          placeholder="e.g., 500"
          className="w-full p-2 mb-4 rounded-md bg-gray-700"
          onChange={handleInputChange}
        />
        <label className="block text-sm font-medium mb-2">
          Equipment Power Rating (kW):
        </label>
        <input
          name="equipmentPowerRating"
          placeholder="e.g., 2000"
          className="w-full p-2 mb-4 rounded-md bg-gray-700"
          onChange={handleInputChange}
        />
        <label className="block text-sm font-medium mb-2">
          Emission Factor Equipment (kg CO2/kWh):
        </label>
        <input
          name="emissionFactorEquipment"
          placeholder="e.g., 0.1"
          className="w-full p-2 mb-4 rounded-md bg-gray-700"
          onChange={handleInputChange}
        />

        {/* Calculate Button */}
        <button
          className={`w-full p-2 mt-6 rounded-md font-semibold text-white ${
            isButtonDisabled()
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-green-600'
          }`}
          onClick={calculateEmissions}
          disabled={isButtonDisabled()}
        >
          Calculate Emissions
        </button>

        {/* Results */}
        <div className="mt-6">
          {results.totalEmissions !== null && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Results</h2>
              <p>
                Excavation Emissions: {results.excavationEmissions} Million
                tonnes
              </p>
              <p>
                Transportation Emissions: {results.transportationEmissions}{' '}
                Million tonnes
              </p>
              <p>
                Equipment Emissions: {results.equipmentEmissions} Million tonnes
              </p>
              <p>Total Emissions: {results.totalEmissions} Million tonnes</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;