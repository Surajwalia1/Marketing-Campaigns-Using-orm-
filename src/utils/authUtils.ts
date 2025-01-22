import jwt from 'jsonwebtoken';

interface TokenPayload {
  userId: string;
  // Include other payload fields if needed
}


/**
 * Generates an access token for the given user ID.
 * @function generateAccessToken
 * @param {string} userId - The user's unique identifier.
 * @returns {string} The generated access token.
 */

export const generateAccessToken = (userId: string): string => {
  return jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET as string, {
    expiresIn: process.env.JWT_ACCESS_EXPIRATION || '1h', // Default fallback
  });
};


/**
 * Generates a refresh token for the given user ID.
 * @function generateRefreshToken
 * @param {string} userId - The user's unique identifier.
 * @returns {string} The generated refresh token.
 */

export const generateRefreshToken = (userId: string): string => {
  return jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET as string, {
    expiresIn: process.env.JWT_REFRESH_EXPIRATION || '7d', // Default fallback
  });
};


/**
 * Verifies the validity of an access token and returns the payload if valid.
 * @function verifyAccessToken
 * @param {string} token - The JWT access token to verify.
 * @throws {Error} Throws an error if the token is invalid or expired.
 * @returns {TokenPayload} The payload decoded from the valid token.
 */

export const verifyAccessToken = (token: string): TokenPayload => {
  try {
    return jwt.verify(token, process.env.JWT_ACCESS_SECRET as string) as TokenPayload;
  } catch (error) {
    throw new Error('Invalid or expired access token');
  }
};

/**
 * Verifies the validity of a refresh token and returns the payload if valid.
 * @function verifyRefreshToken
 * @param {string} token - The JWT refresh token to verify.
 * @throws {Error} Throws an error if the token is invalid or expired.
 * @returns {TokenPayload} The payload decoded from the valid token.
 */

export const verifyRefreshToken = (token: string): TokenPayload => {
  try {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET as string) as TokenPayload;
  } catch (error) {
    throw new Error('Invalid or expired refresh token');
  }
};
