import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';  

dotenv.config();

const secretKey = process.env.JWT_SECRET;

export const generateToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role_id }, secretKey, { expiresIn: '1h' });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    console.log(error);
    throw new Error('Invalid Token');
  }
};
