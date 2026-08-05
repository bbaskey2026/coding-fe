export class UserRepository {
  /**
   * @param {object} db - PostgreSQL pool or client instance
   */
  constructor(db) {
    this.db = db;
  }

  /**
   * Helper to map database snake_case row to camelCase user object matching frontend expectations
   */
  _mapUser(row) {
    if (!row) return null;
    return {
      id: row.id,
      email: row.email,
      username: row.username,
      passwordHash: row.password_hash,
      avatar: row.avatar,
      bio: row.bio,
      role: row.role,
      isVerified: row.is_verified,
      verificationToken: row.verification_token,
      verificationTokenExpiresAt: row.verification_token_expires_at,
      passwordResetToken: row.password_reset_token,
      passwordResetExpiresAt: row.password_reset_expires_at,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }

  /**
   * Create a new user
   */
  async create({ email, passwordHash, username, role = 'user', isVerified = false, verificationToken = null, verificationTokenExpiresAt = null }) {
    const query = `
      INSERT INTO users (email, password_hash, username, role, is_verified, verification_token, verification_token_expires_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
    const values = [
      email.toLowerCase(), 
      passwordHash, 
      username.toLowerCase(), 
      role,
      isVerified, 
      verificationToken, 
      verificationTokenExpiresAt
    ];
    const { rows } = await this.db.query(query, values);
    return this._mapUser(rows[0]);
  }

  /**
   * Find user by email
   */
  async findByEmail(email) {
    const query = `SELECT * FROM users WHERE LOWER(email) = LOWER($1)`;
    const { rows } = await this.db.query(query, [email]);
    return this._mapUser(rows[0]);
  }

  /**
   * Find user by ID
   */
  async findById(id) {
    const query = `SELECT * FROM users WHERE id = $1`;
    const { rows } = await this.db.query(query, [id]);
    return this._mapUser(rows[0]);
  }

  /**
   * Find user by email and verification OTP (highly secure for short numeric codes)
   */
  async findByVerificationOtp(email, otp) {
    const query = `SELECT * FROM users WHERE LOWER(email) = LOWER($1) AND verification_token = $2`;
    const { rows } = await this.db.query(query, [email, otp]);
    return this._mapUser(rows[0]);
  }

  /**
   * Find user by email and password reset OTP
   */
  async findByResetOtp(email, otp) {
    const query = `SELECT * FROM users WHERE LOWER(email) = LOWER($1) AND password_reset_token = $2`;
    const { rows } = await this.db.query(query, [email, otp]);
    return this._mapUser(rows[0]);
  }

  /**
   * Update dynamic user fields
   */
  async update(id, updates) {
    const fieldsMap = {
      email: 'email',
      passwordHash: 'password_hash',
      username: 'username',
      avatar: 'avatar',
      bio: 'bio',
      role: 'role',
      isVerified: 'is_verified',
      verificationToken: 'verification_token',
      verificationTokenExpiresAt: 'verification_token_expires_at',
      passwordResetToken: 'password_reset_token',
      passwordResetExpiresAt: 'password_reset_expires_at'
    };

    const keys = Object.keys(updates).filter(key => fieldsMap[key] !== undefined);
    if (keys.length === 0) return null;

    const setClauses = [];
    const values = [id];

    keys.forEach((key, index) => {
      const dbColumn = fieldsMap[key];
      let val = updates[key];
      if ((key === 'email' || key === 'username') && val) {
        val = val.toLowerCase();
      }
      setClauses.push(`${dbColumn} = $${index + 2}`);
      values.push(val);
    });

    const query = `
      UPDATE users 
      SET ${setClauses.join(', ')} 
      WHERE id = $1 
      RETURNING *
    `;

    const { rows } = await this.db.query(query, values);
    return this._mapUser(rows[0]);
  }

  /**
   * Delete a user
   */
  async delete(id) {
    const query = `DELETE FROM users WHERE id = $1 RETURNING id`;
    const { rows } = await this.db.query(query, [id]);
    return rows.length > 0;
  }
}
