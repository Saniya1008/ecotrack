import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';

const CarbonCreditCalculatorPage = () => {
  const [inputs, setInputs] = useState({
    annualProduction: '',
    emissionFactor: '1.1', // Default value for Indian coal
    actualEmissions: '',
    marketPrice: '',
  });

  const [results, setResults] = useState({
    baselineEmissions: null,
    totalEmissionsReduction: null,
    carbonCredits: null,
    revenue: null,
  });

  const [showMarketPriceInput, setShowMarketPriceInput] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const calculateResults = () => {
    const annualProduction = parseFloat(inputs.annualProduction); // In million tonnes
    const emissionFactor = parseFloat(inputs.emissionFactor);
    const actualEmissions = parseFloat(inputs.actualEmissions); // In million tonnes

    if (
      !isNaN(annualProduction) &&
      !isNaN(emissionFactor) &&
      !isNaN(actualEmissions)
    ) {
      const baselineEmissions = annualProduction * emissionFactor;
      const totalEmissionsReduction = baselineEmissions - actualEmissions;
      const carbonCredits = Math.max(0, totalEmissionsReduction);

      setResults({
        baselineEmissions,
        totalEmissionsReduction,
        carbonCredits,
        revenue: null,
      });

      setShowMarketPriceInput(carbonCredits > 0);
    }
  };

  const calculateRevenue = () => {
    const marketPrice = parseFloat(inputs.marketPrice);
    if (!isNaN(marketPrice) && results.carbonCredits > 0) {
      const revenue = results.carbonCredits * marketPrice * 1e6; // Convert million tonnes to tonnes
      setResults((prevResults) => ({
        ...prevResults,
        revenue,
      }));
    }
  };

  const clearForm = () => {
    setInputs({
      annualProduction: '',
      emissionFactor: '1.1',
      actualEmissions: '',
      marketPrice: '',
    });
    setResults({
      baselineEmissions: null,
      totalEmissionsReduction: null,
      carbonCredits: null,
      revenue: null,
    });
    setShowMarketPriceInput(false);
  };

  return (
    <div className="bg-gray-800 text-white min-h-screen p-6">
      <h1 className="text-4xl font-bold text-center text-[#d42611] mb-12">
        Carbon Credit Calculator
      </h1>

      <div className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
        <section className="mb-8">
          <h2 className="text-3xl font-semibold text-[#d42611] mb-4">
            About Carbon Credits
          </h2>
          <p className="mb-4">
            Carbon credits represent a reduction of one metric ton of CO2
            emissions, which can be traded or sold. In the context of coal
            mining, calculating carbon credits involves determining the baseline
            emissions, actual emissions after implementing cleaner technologies,
            and the total reduction achieved.
          </p>
          <h3 className="text-2xl font-semibold text-[#d42611] mb-2">
            1. Baseline Emissions
          </h3>
          <p className="mb-4">
            Baseline emissions are calculated as:
            <br />
            <code>
              Baseline Emissions = Annual Production × Emission Factor
            </code>
            <br />
            Where the emission factor for Indian coal is typically 1.1
            tCO2/tonne.
          </p>
          <h3 className="text-2xl font-semibold text-[#d42611] mb-2">
            2. Total Emissions Reduction
          </h3>
          <p className="mb-4">
            Total emissions reduction is the difference between baseline
            emissions and actual emissions after adopting cleaner technologies:
            <br />
            <code>
              Total Emissions Reduction = Baseline Emissions − Actual Emissions
            </code>
          </p>
          <h3 className="text-2xl font-semibold text-[#d42611] mb-2">
            3. Carbon Credits
          </h3>
          <p className="mb-4">
            Carbon credits are calculated as:
            <br />
            <code>Carbon Credits = max(0, Total Emissions Reduction)</code>
          </p>
          <h3 className="text-2xl font-semibold text-[#d42611] mb-2">
            4. Monetizing Carbon Credits
          </h3>
          <p className="mb-4">
            Revenue from carbon credits is calculated by multiplying the number
            of credits by the market price:
            <br />
            <code>Revenue = Carbon Credits × Market Price</code>
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-semibold text-[#d42611] mb-4">
            Calculator
          </h2>

          <label className="block text-sm font-medium mb-2">
            Annual Production (Million tonnes):
          </label>
          <input
            type="number"
            name="annualProduction"
            placeholder="e.g., 2"
            className="w-full p-2 mb-4 rounded-md bg-gray-700"
            onChange={handleInputChange}
            value={inputs.annualProduction}
            onKeyDown={(e) => e.key === 'e' && e.preventDefault()}
          />

          <label className="block text-sm font-medium mb-2">
            Emission Factor (tCO2/tonne):
          </label>
          <input
            type="number"
            name="emissionFactor"
            placeholder="e.g., 1.1"
            className="w-full p-2 mb-4 rounded-md bg-gray-700 opacity-50 cursor-not-allowed"
            onChange={handleInputChange}
            value={inputs.emissionFactor}
            disabled
          />

          <label className="block text-sm font-medium mb-2">
            Actual Emissions (Million tonnes):
          </label>
          <input
            type="number"
            name="actualEmissions"
            placeholder="e.g., 0.9"
            className="w-full p-2 mb-4 rounded-md bg-gray-700"
            onChange={handleInputChange}
            value={inputs.actualEmissions}
            onKeyDown={(e) => e.key === 'e' && e.preventDefault()}
          />

          <button
            onClick={calculateResults}
            className="w-full p-3 bg-green-600 rounded-md text-white font-semibold mb-4"
          >
            Calculate Carbon Credits
          </button>

          {results.baselineEmissions !== null && (
            <div className="bg-gray-700 p-4 rounded-md">
              <h3 className="text-xl font-semibold mb-4 text-green-400">
                Results
              </h3>
              <p className="mb-2">
                Baseline Emissions: {results.baselineEmissions.toFixed(2)}{' '}
                million tCO2
              </p>
              <p className="mb-2">
                Total Emissions Reduction:{' '}
                {results.totalEmissionsReduction.toFixed(2)} million tCO2
              </p>
              <p className="mb-2">
                Carbon Credits: {results.carbonCredits.toFixed(2)} million
                credits
              </p>
              {results.carbonCredits > 0 && (
                <>
                  <label className="block text-sm font-medium mb-2 mt-4">
                    Market Price ($/tCO2):
                  </label>
                  <input
                    type="number"
                    name="marketPrice"
                    placeholder="e.g., 5"
                    className="w-full p-2 mb-4 rounded-md bg-gray-500"
                    onChange={handleInputChange}
                    value={inputs.marketPrice}
                    onKeyDown={(e) => e.key === 'e' && e.preventDefault()}
                  />
                  <button
                    onClick={calculateRevenue}
                    className="w-full p-3 bg-blue-600 rounded-md text-white font-semibold mb-4"
                  >
                    Calculate Revenue
                  </button>
                  {results.revenue !== null && (
                    <p className="font-semibold text-lg">
                      Revenue: ${results.revenue.toFixed(2)}
                    </p>
                  )}
                </>
              )}
              {results.carbonCredits === 0 && (
                <p className="text-red-500 font-semibold">
                  No credits are generated.
                </p>
              )}
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

export default CarbonCreditCalculatorPage;
