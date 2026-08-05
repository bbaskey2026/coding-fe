import multer from 'multer';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';

/**
 * Factory to create a customized Multer upload middleware
 * @param {object} [config]
 * @param {string} [config.uploadPath]
 * @param {number} [config.maxFileSize]
 * @param {string[]} [config.allowedFileTypes]
 */
export const createUploadMiddleware = (config = {}) => {
  const uploadDir = config.uploadPath || process.env.UPLOAD_PATH || 'uploads/';
  const maxFileSize = config.maxFileSize || parseInt(process.env.MAX_FILE_SIZE || '5242880', 10); // 5MB default
  const allowedTypes = config.allowedFileTypes || (
    process.env.ALLOWED_FILE_TYPES 
      ? process.env.ALLOWED_FILE_TYPES.split(',') 
      : ['image/jpeg', 'image/png', 'image/webp']
  );

  // Ensure upload directory exists
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      // Generate unique name: avatar-<16-random-bytes>-<timestamp>.<ext>
      const rand = crypto.randomBytes(8).toString('hex');
      const ts = Date.now();
      const ext = path.extname(file.originalname).toLowerCase();
      cb(null, `avatar-${rand}-${ts}${ext}`);
    }
  });

  const fileFilter = (req, file, cb) => {
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      const err = new Error(`Only file types of: ${allowedTypes.join(', ')} are allowed.`);
      err.statusCode = 400;
      cb(err, false);
    }
  };

  return multer({
    storage,
    limits: { fileSize: maxFileSize },
    fileFilter
  });
};
