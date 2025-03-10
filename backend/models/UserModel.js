const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: { type: String, 
    required: true,
     unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  coalMineName: {
    type: String,
    required: true,
    enum: [
      'Jharia Coalfield', 
      'Korba Coalfield', 
      'Raniganj Coalfield', 
      'Talcher Coalfield', 
      'Singrauli Coalfield'
    ],
  },

});



 
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
