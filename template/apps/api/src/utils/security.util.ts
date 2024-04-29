import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

import config from 'config';

import { TOKEN_SECURITY_EXPIRES_IN } from 'app-constants';

/**
 * @desc Generates random string, useful for creating secure tokens
 *
 * @return {string} - random string
 */
export const generateSecureToken = async (tokenLength = 48) => {
  const buffer = crypto.randomBytes(tokenLength);

  return buffer.toString('hex');
};

/**
 * @desc Generate hash from any string. Could be used to generate a hash from password
 *
 * @param text {string} - a text to produce hash from
 * @return {Promise} - a hash from input text
 */
export const getHash = (text: string) => bcrypt.hash(text, 10);

/**
 * @desc Compares if text and hash are equal
 *
 * @param text {string} - a text to compare with hash
 * @param hash {string} - a hash to compare with text
 * @return {Promise} - are hash and text equal
 */
export const compareTextWithHash = (text: string, hash: string) => bcrypt.compare(text, hash);

/**
 * @desc Generates a JWT token with a secret
 *
 * @param payload {object} - Payload to include in the token
 * @param expiresIn {string | number} - Expiry time for the token
 * @return {string} - JWT token
 */
type PayloadType = {
  tokenType: string,
  userId: string,
  isShadow: boolean | null,
}

export const generateJwtToken = async (payload: PayloadType) => {
  const secret = config.JWT_SECRET;
  const expiresIn = TOKEN_SECURITY_EXPIRES_IN;

  return jwt.sign(payload, secret, { expiresIn });
};

/**
 * @desc Verifies a JWT token and returns the payload
 *
 * @param token {string} - JWT token to verify
 * @return {object | null} - Decoded payload or null if verification fails
 */
export const verifyJwtToken = async (token: string) => {
  try {
    const secret = config.JWT_SECRET;
    const decoded = jwt.verify(token, secret);

    return decoded;
  } catch (error) {

    return null; // Token verification failed
  }
};

export default {
  generateSecureToken,
  getHash,
  compareTextWithHash,
  generateJwtToken,
  verifyJwtToken,
};
