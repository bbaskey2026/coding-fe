import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class EmailService {
  /**
   * @param {object} smtpConfig - SMTP settings (host, port, user, pass, from)
   * @param {object} logger - Logger instance
   */
  constructor(smtpConfig, logger) {
    this.smtpConfig = smtpConfig;
    this.logger = logger;
    
    if (smtpConfig.host && smtpConfig.port && smtpConfig.user) {
      this.transporter = nodemailer.createTransport({
        host: smtpConfig.host,
        port: parseInt(smtpConfig.port, 10),
        auth: {
          user: smtpConfig.user,
          pass: smtpConfig.pass
        }
      });
      this.isConfigured = true;
    } else {
      this.logger.warn('SMTP configuration is missing or incomplete. EmailService will log emails to console instead.');
      this.isConfigured = false;
    }
  }

  /**
   * Load HTML email template and inject replacements
   * @private
   */
  async _loadTemplate(templateName, replacements) {
    try {
      const templatePath = path.join(__dirname, '..', 'templates', `${templateName}.html`);
      let htmlContent = await fs.readFile(templatePath, 'utf-8');
      
      for (const [key, value] of Object.entries(replacements)) {
        htmlContent = htmlContent.replace(new RegExp(`{{${key}}}`, 'g'), value);
      }
      
      return htmlContent;
    } catch (err) {
      this.logger.error(`Failed to load template ${templateName}`, err);
      throw new Error(`Email template error: ${err.message}`);
    }
  }

  /**
   * Send registration verification OTP email
   */
  async sendVerificationEmail(to, name, otp) {
    if (!this.isConfigured) {
      this.logger.info(`[MOCK EMAIL] Verification OTP for ${name} (${to}): ${otp}`);
      return;
    }

    const html = await this._loadTemplate('verification', { name, otp });
    const mailOptions = {
      from: this.smtpConfig.from || 'noreply@example.com',
      to,
      subject: 'Verify Your Email OTP',
      html
    };

    try {
      await this.transporter.sendMail(mailOptions);
      this.logger.info(`Verification email successfully sent to ${to}`);
    } catch (err) {
      this.logger.error(`Failed to send verification email to ${to}:`, err);
      this.logger.info(`[FALLBACK LOG] Verification OTP: ${otp}`);
    }
  }

  /**
   * Send password reset request OTP email
   */
  async sendPasswordResetEmail(to, name, otp) {
    if (!this.isConfigured) {
      this.logger.info(`[MOCK EMAIL] Password Reset OTP for ${name} (${to}): ${otp}`);
      return;
    }

    const html = await this._loadTemplate('reset-password', { name, otp });
    const mailOptions = {
      from: this.smtpConfig.from || 'noreply@example.com',
      to,
      subject: 'Reset Your Password OTP',
      html
    };

    try {
      await this.transporter.sendMail(mailOptions);
      this.logger.info(`Password reset email successfully sent to ${to}`);
    } catch (err) {
      this.logger.error(`Failed to send password reset email to ${to}:`, err);
      this.logger.info(`[FALLBACK LOG] Password Reset OTP: ${otp}`);
    }
  }
}
