const express = require('express');
const router = express.Router();
const CarbonNeutrality = require('../models/CarbonNeutrality');

// POST route to save ratings
router.post('/ratings', async (req, res) => {
  try {
    const { energyEfficiency, renewableEnergy, ccus, reforestation, sustainableLandUse } = req.body;

    // Delete existing ratings
    await CarbonNeutrality.deleteMany({});

    const newRating = new CarbonNeutrality({
      energyEfficiency,
      renewableEnergy,
      ccus,
      reforestation,
      sustainableLandUse
    });

    const savedRating = await newRating.save();
    console.log(savedRating);
    res.status(201).json({ message: 'Ratings saved successfully!', data: savedRating });

  } catch (error) {
    res.status(500).json({ message: 'Failed to save ratings.', error });
  }
});

// GET route to retrieve the single rating
router.get('/ratings', async (req, res) => {
  try {
    const rating = await CarbonNeutrality.findOne().sort({ createdAt: -1 });
    if (rating) {
      res.status(200).json(rating);
    } else {
      res.status(404).json({ message: 'No ratings found.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve ratings.', error });
  }
});

module.exports = router;
