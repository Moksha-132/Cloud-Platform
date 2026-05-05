const User = require('../models/User');
const jwt = require('jsonwebtoken');

const sign = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};
exports.register = async (req, res) => {
  const { name, company, email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'exists' });
    }
    const user = await User.create({
      name,
      company,
      email,
      password
    });
    res.status(201).json({
      _id: user._id,
      name,
      email,
      token: sign(user._id)
    });
  } catch (e) {
    res.status(500).json({
      message: e.message
    });
  }
};
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    const match = user ? await user.comparePassword(password) : false;
    if (match) {
      res.json({
        _id: user._id,
        name: user.name,
        email,
        token: sign(user._id)
      });
    } else {
      res.status(401).json({ message: 'invalid' });
    }
  } catch (e) {
    res.status(500).json({
      message: e.message
    });
  }
};