export class UserService {
  /**
   * @param {object} userRepository - Instance of UserRepository
   * @param {object} hashUtil - HashUtil class
   */
  constructor(userRepository, hashUtil) {
    this.userRepository = userRepository;
    this.hashUtil = hashUtil;
  }

  /**
   * Get user profile details
   */
  async getUserProfile(userId) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    
    const { 
      passwordHash, 
      verificationToken, 
      verificationTokenExpiresAt, 
      passwordResetToken, 
      passwordResetExpiresAt, 
      ...profile 
    } = user;
    
    return profile;
  }

  /**
   * Update user details (username, avatar, bio)
   */
  async updateUserProfile(userId, updates) {
    const allowedUpdates = {};
    if (updates.username !== undefined) allowedUpdates.username = updates.username;
    if (updates.avatar !== undefined) allowedUpdates.avatar = updates.avatar;
    if (updates.bio !== undefined) allowedUpdates.bio = updates.bio;
    
    if (Object.keys(allowedUpdates).length === 0) {
      throw new Error('No valid fields provided for update');
    }

    // Check username uniqueness if updating username
    if (updates.username) {
      const query = `SELECT * FROM users WHERE LOWER(username) = LOWER($1) AND id != $2`;
      const existing = await this.userRepository.db.query(query, [updates.username, userId]);
      if (existing.rows.length > 0) {
        throw new Error('Username is already taken');
      }
    }

    const updatedUser = await this.userRepository.update(userId, allowedUpdates);
    if (!updatedUser) {
      throw new Error('User not found');
    }

    const { 
      passwordHash, 
      verificationToken, 
      verificationTokenExpiresAt, 
      passwordResetToken, 
      passwordResetExpiresAt, 
      ...profile 
    } = updatedUser;
    
    return profile;
  }

  /**
   * Update avatar image URL
   */
  async updateUserAvatar(userId, avatar) {
    const updatedUser = await this.userRepository.update(userId, { avatar });
    if (!updatedUser) {
      throw new Error('User not found');
    }
    
    const { 
      passwordHash, 
      verificationToken, 
      verificationTokenExpiresAt, 
      passwordResetToken, 
      passwordResetExpiresAt, 
      ...profile 
    } = updatedUser;
    
    return profile;
  }

  /**
   * Change user password
   */
  async changePassword(userId, oldPassword, newPassword) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const isMatch = await this.hashUtil.compare(oldPassword, user.passwordHash);
    if (!isMatch) {
      throw new Error('Invalid old password');
    }

    const newPasswordHash = await this.hashUtil.hash(newPassword);
    await this.userRepository.update(userId, {
      passwordHash: newPasswordHash
    });

    return { message: 'Password updated successfully' };
  }
}
