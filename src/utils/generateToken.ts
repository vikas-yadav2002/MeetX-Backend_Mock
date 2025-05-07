import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_change_in_production';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '3600'; // Default 1 hour

export const generateToken = (userId: string | Types.ObjectId): string => {
  return jwt.sign(
    { id: userId },
    JWT_SECRET,
    { expiresIn: parseInt(JWT_EXPIRES_IN) }
  );
};

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};