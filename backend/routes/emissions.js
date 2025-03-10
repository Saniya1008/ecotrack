const express = require('express');
const router = express.Router();
const Emission = require('../models/Emissiondata');

// Update or create emissions data

router.get('/getData', async (req, res) => {
  try {
    const data = await Emission.find({});
    console.log(data);
    res.status(200).json(data); // Send data as JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to retrieve data.' }); // Send error message
  }
});

router.put('/update', async (req, res) => {
  const {
    year,
    excavationEmissions,
    transportationEmissions,
    equipmentEmissions,
    totalEmissions
  } = req.body;

  try {
    const updatedEmissions = await Emission.findOneAndUpdate(
      { year }, // Filter by year
      {
        excavationEmissions,
        transportationEmissions,
        equipmentEmissions,
        totalEmissions
      },
      {
        upsert: true 
      }
    );

    res.status(200).json(updatedEmissions);
  } catch (err) {
    console.error('Failed to update emission data:', err);
    res.status(500).json({ error: 'Failed to update emission data' });
  }
});

module.exports = router;
