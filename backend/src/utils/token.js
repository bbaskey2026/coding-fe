import crypto from 'crypto';

export class TokenUtil {
  /**
   * Generate a random hex token
   * @param {number} bytes 
   * @returns {string}
   */
  static generateRandomToken(bytes = 32) {
    return crypto.randomBytes(bytes).toString('hex');
  }

  /**
   * Generate a numeric OTP.
   * If running in development/staging (NODE_ENV !== 'production'), it will return the configured STAGING_OTP or default to '1234'.
   * @param {number} [digits=4] 
   * @returns {string}
   */
  static generateOtp(digits = 4) {
    if (process.env.NODE_ENV !== 'production') {
      return process.env.STAGING_OTP || '1234';
    }
    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;
    return Math.floor(min + Math.random() * (max - min + 1)).toString();
  }

  /**
   * Generate an expiration date
   * @param {number} minutes - Expiration time in minutes
   * @returns {Date}
   */
  static generateExpiryDate(minutes = 15) {
    return new Date(Date.now() + minutes * 60 * 1000);
  }

  /**
   * Check if a token expiration date has passed
   * @param {Date|string} expiryDate 
   * @returns {boolean}
   */
  static isExpired(expiryDate) {
    if (!expiryDate) return true;
    return new Date() > new Date(expiryDate);
  }
}
