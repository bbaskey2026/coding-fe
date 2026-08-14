import { ResponseUtil } from '../utils/response.js';

export class AuthController {
  /**
   * @param {object} authService - Instance of AuthService
   * @param {object} tokenService - Instance of TokenService
   */
  constructor(authService, tokenService) {
    this.authService = authService;
    this.tokenService = tokenService;
  }

  /**
   * Register a user
   */
  register = async (req, res, next) => {
    try {
      const { email, password, username } = req.body;
      const user = await this.authService.register(email, password, username);
      return ResponseUtil.success(
        res,
        user,
        'User registered successfully. Please enter the OTP sent to your email to verify your account.',
        201
      );
    } catch (error) {
      return next(error);
    }
  };

  /**
   * Log in user and return tokens
   */
  login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const data = await this.authService.login(email, password);

      // Set refresh token in HttpOnly cookie for safety
      res.cookie('refreshToken', data.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      });

      // Returns user, accessToken, refreshToken directly at root level
      return ResponseUtil.success(res, data, 'Logged in successfully');
    } catch (error) {
      error.statusCode = 401;
      return next(error);
    }
  };

  /**
   * Verify email or password-reset OTP
   */
  verifyOtp = async (req, res, next) => {
    try {
      const { email, otp, flow } = req.body;
      const result = await this.authService.verifyOtp(email, otp, flow);
      return ResponseUtil.success(res, null, result.message);
    } catch (error) {
      return next(error);
    }
  };

  /**
   * Request password reset OTP
   */
  forgotPassword = async (req, res, next) => {
    try {
      const { email } = req.body;
      const result = await this.authService.forgotPassword(email);
      return ResponseUtil.success(res, null, result.message);
    } catch (error) {
      return next(error);
    }
  };

  /**
   * Reset password with reset OTP
   */
  resetPassword = async (req, res, next) => {
    try {
      const { email, otp, newPassword } = req.body;
      const result = await this.authService.resetPassword(email, otp, newPassword);
      return ResponseUtil.success(res, null, result.message);
    } catch (error) {
      return next(error);
    }
  };

  /**
   * Refresh access and refresh tokens
   */
  refreshTokens = async (req, res, next) => {
    try {
      const refreshToken = req.body.refreshToken || req.cookies?.refreshToken;
      
      if (!refreshToken) {
        const err = new Error('Refresh token is required');
        err.statusCode = 400;
        return next(err);
      }

      const tokens = await this.tokenService.refreshAuth(refreshToken);
      
      // Update cookie
      res.cookie('refreshToken', tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
      });

      return ResponseUtil.success(res, tokens, 'Tokens refreshed successfully');
    } catch (error) {
      error.statusCode = 401;
      return next(error);
    }
  };

  /**
   * Log out user
   */
  logout = async (req, res, next) => {
    try {
      res.clearCookie('refreshToken');
      return ResponseUtil.success(res, null, 'Logged out successfully');
    } catch (error) {
      return next(error);
    }
  };
}
