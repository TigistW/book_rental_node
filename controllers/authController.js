// controllers/authController.js
import User from '../models/user.js';
import { generateToken } from '../services/auth.js';

export const register = async (req, res) => {
  const { email, password, location, phoneNumber, roleName } = req.body;

  try {
    const user = await User.create({ email, password, location, phoneNumber, roleName });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByEmail(email);

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isValid = await User.comparePassword(password, user.password);

    if (!isValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
