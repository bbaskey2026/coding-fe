import jwt from 'jsonwebtoken';

export class JwtUtil {
  /**
   * @param {string} secret 
   * @param {string} accessExpiration 
   * @param {string} refreshExpiration 
   */
  constructor(secret, accessExpiration, refreshExpiration) {
    this.secret = secret;
    this.accessExpiration = accessExpiration || '15m';
    this.refreshExpiration = refreshExpiration || '7d';
  }

  /**
   * Sign an access token
   * @param {object} payload 
   * @returns {string}
   */
  signAccessToken(payload) {
    return jwt.sign(payload, this.secret, { expiresIn: this.accessExpiration });
  }

  /**
   * Sign a refresh token
   * @param {object} payload 
   * @returns {string}
   */
  signRefreshToken(payload) {
    return jwt.sign(payload, this.secret, { expiresIn: this.refreshExpiration });
  }

  /**
   * Verify token authenticity and expiration
   * @param {string} token 
   * @returns {object} Decoded token payload
   */
  verifyToken(token) {
    return jwt.verify(token, this.secret);
  }
}
