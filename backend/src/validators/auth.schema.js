import { z } from 'zod';

export const registerSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required' }).email('Invalid email format'),
    password: z.string({ required_error: 'Password is required' }).min(8, 'Password must be at least 8 characters long'),
    username: z.string({ required_error: 'Username is required' }).min(3, 'Username must be at least 3 characters long')
  })
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required' }).email('Invalid email format'),
    password: z.string({ required_error: 'Password is required' })
  })
});

export const forgotPasswordSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required' }).email('Invalid email format')
  })
});

export const resetPasswordSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required' }).email('Invalid email format'),
    otp: z.string({ required_error: 'OTP is required' }),
    newPassword: z.string({ required_error: 'New password is required' }).min(8, 'New password must be at least 8 characters long')
  })
});

export const verifyOtpSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required' }).email('Invalid email format'),
    otp: z.string({ required_error: 'OTP is required' }),
    flow: z.enum(['register', 'forgot']).optional().default('register')
  })
});
