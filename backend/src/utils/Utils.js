import jwt from 'jsonwebtoken';

export const decodedUser = (token) => {
  if (!token) throw new Error('Token is required');
  return jwt.decode(token);
};