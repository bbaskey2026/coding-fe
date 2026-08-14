export class AuthService {
  /**
   * @param {object} userRepository - Instance of UserRepository
   * @param {object} tokenService - Instance of TokenService
   * @param {object} emailService - Instance of EmailService
   * @param {object} hashUtil - HashUtil class
   * @param {object} tokenUtil - TokenUtil class
   */
  constructor(userRepository, tokenService, emailService, hashUtil, tokenUtil) {
    this.userRepository = userRepository;
    this.tokenService = tokenService;
    this.emailService = emailService;
    this.hashUtil = hashUtil;
    this.tokenUtil = tokenUtil;
  }

  /**
   * Register a new user
   */
  async register(email, password, username) {
    const existingEmail = await this.userRepository.findByEmail(email);
    if (existingEmail) {
      throw new Error('Email is already registered');
    }

    // Check username uniqueness
    const query = `SELECT * FROM users WHERE LOWER(username) = LOWER($1)`;
    const existingUsername = await this.userRepository.db.query(query, [username]);
    if (existingUsername.rows.length > 0) {
      throw new Error('Username is already taken');
    }

    const passwordHash = await this.hashUtil.hash(password);
    const verificationOtp = this.tokenUtil.generateOtp(4); // 4-digit code
    const verificationTokenExpiresAt = this.tokenUtil.generateExpiryDate(15); // 15 mins

    const user = await this.userRepository.create({
      email,
      passwordHash,
      username,
      role: 'user',
      isVerified: false,
      verificationToken: verificationOtp,
      verificationTokenExpiresAt
    });

    // Send verification email
    await this.emailService.sendVerificationEmail(user.email, user.username, verificationOtp);

    const { passwordHash: _, ...profile } = user;
    return profile;
  }

  /**
   * Authenticate a user and issue flat tokens format
   */
  async login(email, password) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isMatch = await this.hashUtil.compare(password, user.passwordHash);
    if (!isMatch) {
      throw new Error('Invalid email or password');
    }

    if (!user.isVerified) {
      throw new Error('Please verify your email address to log in');
    }

    const tokens = await this.tokenService.generateAuthTokens(user);
    
    // Format profile specifically to match the frontend expectations
    const profile = {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
      avatar: user.avatar,
      bio: user.bio
    };

    return { 
      user: profile, 
      ...tokens 
    };
  }

  /**
   * Verify verification OTP or reset password OTP
   */
  async verifyOtp(email, otp, flow) {
    if (flow === 'register') {
      const user = await this.userRepository.findByVerificationOtp(email, otp);
      if (!user) {
        throw new Error('Invalid OTP code');
      }

      if (this.tokenUtil.isExpired(user.verificationTokenExpiresAt)) {
        throw new Error('OTP code has expired. Please request a new one.');
      }

      await this.userRepository.update(user.id, {
        isVerified: true,
        verificationToken: null,
        verificationTokenExpiresAt: null
      });

      return { message: 'Email verified successfully' };
    } 
    
    if (flow === 'forgot') {
      const user = await this.userRepository.findByResetOtp(email, otp);
      if (!user) {
        throw new Error('Invalid OTP code');
      }

      if (this.tokenUtil.isExpired(user.passwordResetExpiresAt)) {
        throw new Error('OTP code has expired. Please request a new one.');
      }

      // Do not clear the OTP yet, it will be cleared when they submit the new password
      return { message: 'OTP verified successfully' };
    }

    throw new Error('Invalid verification flow');
  }

  /**
   * Send password reset OTP request
   */
  async forgotPassword(email) {
    const user = await this.userRepository.findByEmail(email);
    
    if (user) {
      const resetOtp = this.tokenUtil.generateOtp(4); // 4-digit code
      const resetTokenExpiresAt = this.tokenUtil.generateExpiryDate(15); // 15 mins

      await this.userRepository.update(user.id, {
        passwordResetToken: resetOtp,
        passwordResetExpiresAt: resetTokenExpiresAt
      });

      await this.emailService.sendPasswordResetEmail(user.email, user.username, resetOtp);
    }

    // Generic response to prevent user enumeration
    return { message: 'If the email is registered, a password reset OTP has been sent' };
  }

  /**
   * Reset user password using OTP verification
   */
  async resetPassword(email, otp, newPassword) {
    const user = await this.userRepository.findByResetOtp(email, otp);
    if (!user) {
      throw new Error('Invalid or expired OTP');
    }

    if (this.tokenUtil.isExpired(user.passwordResetExpiresAt)) {
      throw new Error('OTP has expired');
    }

    const newPasswordHash = await this.hashUtil.hash(newPassword);
    
    await this.userRepository.update(user.id, {
      passwordHash: newPasswordHash,
      passwordResetToken: null,
      passwordResetExpiresAt: null
    });

    return { message: 'Password has been reset successfully' };
  }
}
