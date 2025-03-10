const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
require('dotenv').config();

const router = express.Router();


router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = new User({ username, email, password });
    await user.save(); // save in db
    res.status(201).json({ message: 'User created' });
    console.log(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.post('/signin', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username }); 
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
