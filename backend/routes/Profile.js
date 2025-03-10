const express = require('express');
const router = express.Router();
const User = require('../models/UserModel');
const auth = require('./Auth');


router.get('/profile',auth,async(res,req) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if(!user) {
      return res.statusCode(404).json({ message: "User not found"});
    }
    res.json(user);
  } catch(err) {
    console.error('error fetching user profile',err);
    res.status(500).json({ message: 'server error'});
  }
});


module.exports = router;