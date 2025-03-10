const mongoose = require('mongoose');

const emissionsSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true,
    unique: true
  },
  excavationEmissions: {
    type: Number, 
    required: true
  },
  transportationEmissions: {
    type: Number, 
    required: true
  },
  equipmentEmissions: {
    type: Number, 
    required: true
  },
  totalEmissions: {
    type: Number, 
    required: true
  }
});

const Emission = mongoose.model('Emission', emissionsSchema);

module.exports = Emission;
