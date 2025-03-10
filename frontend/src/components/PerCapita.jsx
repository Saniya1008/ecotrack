import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';

const PerCapitaCoal = () => {
  const [inputs, setInputs] = useState({
    totalCoalProduction: '',
    totalPopulation: '',
  });

  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const calculatePerCapitaProduction = () => {
    const totalCoalProduction = parseFloat(inputs.totalCoalProduction);
    const totalPopulation = parseFloat(inputs.totalPopulation);

    if (
      !isNaN(totalCoalProduction) &&
      !isNaN(totalPopulation) &&
      totalPopulation > 0
    ) {
      const perCapitaProduction = totalCoalProduction / totalPopulation;
      setResult(perCapitaProduction);
    }
  };

  const clearForm = () => {
    setInputs({
      totalCoalProduction: '',
      totalPopulation: '',
    });
    setResult(null);
  };

  return (
    <div className="bg-gray-800 text-white min-h-screen p-6">
      <h1 className="text-4xl font-bold text-center text-[#d42611] mb-12">
        Per Capita Coal Production Calculator
      </h1>

      <div className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
        <section className="mb-8">
          <h2 className="text-3xl font-semibold text-[#d42611] mb-4">
            About Per Capita Coal Production
          </h2>
          <p className="mb-4">
            Per capita coal production is calculated by dividing the total coal
            production by the total population of the area affected by the coal
            mine. This gives an average measure of coal production per person in
            million tonnes per million people.
          </p>
          <h3 className="text-2xl font-semibold text-[#d42611] mb-2">
            Formula
          </h3>
          <p className="mb-4">
            Per Capita Coal Production = Total Coal Production (million tonnes)
            / Total Population (million people)
          </p>
          <h3 className="text-2xl font-semibold text-[#d42611] mb-2">
            Example Calculation
          </h3>
          <p className="mb-4">
            Assume the following values:
            <br />
            Total Coal Production: 1.0 million tonnes (for a year)
            <br />
            Total Population: 0.1 million people (in the surrounding community)
            <br />
            Using the formula:
            <br />
            Per Capita Coal Production = 1.0 / 0.1 = 10 million tonnes per
            million people.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-[#d42611] mb-4">
            Calculator
          </h2>

          <label className="block text-sm font-medium mb-2">
            Total Coal Production (Million tonnes):
          </label>
          <input
            type="number"
            name="totalCoalProduction"
            placeholder="e.g., 1.0"
            className="w-full p-2 mb-4 rounded-md bg-gray-700"
            onChange={handleInputChange}
            value={inputs.totalCoalProduction}
            onKeyDown={(e) => e.key === 'e' && e.preventDefault()}
          />

          <label className="block text-sm font-medium mb-2">
            Total Population (Million people):
          </label>
          <input
            type="number"
            name="totalPopulation"
            placeholder="e.g., 0.1"
            className="w-full p-2 mb-4 rounded-md bg-gray-700"
            onChange={handleInputChange}
            value={inputs.totalPopulation}
            onKeyDown={(e) => e.key === 'e' && e.preventDefault()}
          />

          <button
            onClick={calculatePerCapitaProduction}
            className="w-full p-3 bg-green-600 rounded-md text-white font-semibold mb-4"
          >
            Calculate Per Capita Coal Production
          </button>

          {result !== null && (
            <div className="bg-gray-700 p-4 rounded-md">
              <h3 className="text-xl font-semibold mb-4 text-green-400">
                Result
              </h3>
              <p className="mb-2">
                Per Capita Coal Production: {result.toFixed(2)} million tonnes
                per million people
              </p>
            </div>
          )}

          <button
            onClick={clearForm}
            className="w-full p-3 bg-red-600 rounded-md text-white font-semibold mt-4"
          >
            Clear
          </button>
        </section>
      </div>
    </div>
  );
};

export default PerCapitaCoal;
