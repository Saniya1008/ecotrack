const mongoose = require('mongoose');

const emissionsSchema = new mongoose.Schema({
  year: {
    type: String,
    required: true,
    unique: true
  },
  yearlyProduction: { type: Number, required: true },
  yearlyExclusionFactor: { type: Number, required: true },
  coalTypeConversionFactor: { type: Number, required: true },
  effectiveCO2EmissionsFactor: { type: Number, required: true },
  numberOfDumpers: { type: Number, required: true },
  distanceTraveled: { type: Number, required: true },
  fuelConsumptionTransport: { type: Number, required: true },
  emissionFactorTransport: { type: Number, required: true },
  fuelConsumptionEquipment: { type: Number, required: true },
  emissionFactorEquipment: { type: Number, required: true },
});

const Emissions = mongoose.model('Emissions', emissionsSchema);

module.exports = Emissions;
