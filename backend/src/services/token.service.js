export class TokenService {
  /**
   * @param {object} jwtUtil - Instance of JwtUtil
   * @param {object} userRepository - Instance of UserRepository
   */
  constructor(jwtUtil, userRepository) {
    this.jwtUtil = jwtUtil;
    this.userRepository = userRepository;
  }

  /**
   * Generate access and refresh tokens for a user (flat layout)
   * @param {object} user 
   * @returns {Promise<object>}
   */
  async generateAuthTokens(user) {
    const payload = { sub: user.id, email: user.email };
    const accessToken = this.jwtUtil.signAccessToken(payload);
    const refreshToken = this.jwtUtil.signRefreshToken(payload);
    
    return {
      accessToken,
      refreshToken
    };
  }

  /**
   * Verify access token validity
   * @param {string} token 
   * @returns {object}
   */
  verifyAccessToken(token) {
    return this.jwtUtil.verifyToken(token);
  }

  /**
   * Refresh authorization tokens using a valid refresh token
   * @param {string} refreshToken 
   * @returns {Promise<object>}
   */
  async refreshAuth(refreshToken) {
    try {
      const payload = this.jwtUtil.verifyToken(refreshToken);
      const user = await this.userRepository.findById(payload.sub);
      if (!user) {
        throw new Error('User not found');
      }
      return this.generateAuthTokens(user);
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }
}
