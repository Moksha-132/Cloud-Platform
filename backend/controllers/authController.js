const User = require('../models/User');
const jwt = require('jsonwebtoken');

const sign = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

const transporter = require('nodemailer').createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'not found' });

    const token = require('crypto').randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

    const resetUrl = `${process.env.CLIENT_URL || 'http://localhost:5173'}/reset-password/${token}`;
    
    await transporter.sendMail({
      to: user.email,
      subject: 'Password Reset - Shnoor Cloud',
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>Reset Your Password</h2>
          <p>Click the button below to reset your password. This link expires in 1 hour.</p>
          <a href="${resetUrl}" style="background: #f59e0b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block;">Reset Password</a>
        </div>
      `,
    });

    res.json({ message: 'sent' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

exports.resetPassword = async (req, res) => {
  const { token, password } = req.body;
  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ message: 'invalid or expired' });

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: 'updated' });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
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