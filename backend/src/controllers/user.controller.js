import { ResponseUtil } from '../utils/response.js';

export class UserController {
  /**
   * @param {object} userService - Instance of UserService
   */
  constructor(userService) {
    this.userService = userService;
  }

  /**
   * Fetch details of currently authenticated user
   */
  getMe = async (req, res, next) => {
    try {
      const userId = req.user.id;
      const profile = await this.userService.getUserProfile(userId);
      return ResponseUtil.success(res, profile);
    } catch (error) {
      return next(error);
    }
  };

  /**
   * Update fields of the user profile
   */
  updateMe = async (req, res, next) => {
    try {
      const userId = req.user.id;
      const profile = await this.userService.updateUserProfile(userId, req.body);
      return ResponseUtil.success(res, profile);
    } catch (error) {
      return next(error);
    }
  };

  /**
   * Upload user avatar picture
   */
  uploadAvatar = async (req, res, next) => {
    try {
      if (!req.file) {
        const err = new Error('Please upload an avatar image file');
        err.statusCode = 400;
        return next(err);
      }

      const userId = req.user.id;
      // Build relative avatar URL path
      const avatarUrl = `/uploads/${req.file.filename}`;
      
      const profile = await this.userService.updateUserAvatar(userId, avatarUrl);
      return ResponseUtil.success(res, profile);
    } catch (error) {
      return next(error);
    }
  };

  /**
   * Change user password
   */
  changePassword = async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { oldPassword, newPassword } = req.body;
      
      const result = await this.userService.changePassword(userId, oldPassword, newPassword);
      return ResponseUtil.success(res, null, result.message);
    } catch (error) {
      return next(error);
    }
  };
}
