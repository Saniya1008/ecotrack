// models/CarbonNeutrality.js
const mongoose = require('mongoose');

const CarbonNeutralitySchema = new mongoose.Schema({
  energyEfficiency: {
    type: Number,
    required: true,
  },
  renewableEnergy: {
    type: Number,
    required: true,
  },
  ccus: {
    type: Number,
    required: true,
  },
  reforestation: {
    type: Number,
    required: true,
  },
  sustainableLandUse: {
    type: Number,
    required: true,
  },
}, { timestamps: true });  // Automatically creates 'createdAt' and 'updatedAt' fields

module.exports = mongoose.model('CarbonNeutrality', CarbonNeutralitySchema);
