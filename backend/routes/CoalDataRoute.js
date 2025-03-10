const express = require('express');
const router = express.Router();
const CoalData = require('../models/CoalData'); // Model import

// Update or create emissions data
router.put('/update', async (req, res) => {
    const {
        year,
        yearlyProduction,
        yearlyExclusionFactor,
        coalTypeConversionFactor,
        effectiveCO2EmissionsFactor,
        numberOfDumpers,
        distanceTraveled,
        fuelConsumptionTransport,
        emissionFactorTransport,
        fuelConsumptionEquipment,
        emissionFactorEquipment
    } = req.body;

    try {
        const updatedEmissions = await CoalData.findOneAndUpdate(
            { year },
            {
                yearlyProduction,
                yearlyExclusionFactor,
                coalTypeConversionFactor,
                effectiveCO2EmissionsFactor,
                numberOfDumpers,
                distanceTraveled,
                fuelConsumptionTransport,
                emissionFactorTransport,
                fuelConsumptionEquipment,
                emissionFactorEquipment
            },
            { new: true, upsert: true } // `upsert: true` creates the document if it doesn't exist
        );

        res.status(200).json(updatedEmissions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
