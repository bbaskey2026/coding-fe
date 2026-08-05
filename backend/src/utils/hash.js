import bcrypt from 'bcryptjs';

export class HashUtil {
  /**
   * Hash a plaintext password
   * @param {string} password 
   * @param {number} saltRounds 
   * @returns {Promise<string>}
   */
  static async hash(password, saltRounds = 10) {
    return bcrypt.hash(password, saltRounds);
  }

  /**
   * Compare a plaintext password with its hashed version
   * @param {string} password 
   * @param {string} hash 
   * @returns {Promise<boolean>}
   */
  static async compare(password, hash) {
    return bcrypt.compare(password, hash);
  }
}
