import { z } from 'zod';

export const createPostSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Title is required' })
      .min(3, 'Title must be at least 3 characters long')
      .max(150, 'Title cannot exceed 150 characters'),
    summary: z.string({ required_error: 'Summary is required' })
      .min(5, 'Summary must be at least 5 characters long')
      .max(400, 'Summary cannot exceed 400 characters'),
    content: z.string({ required_error: 'Content is required' })
      .min(10, 'Content must be at least 10 characters long'),
    coverImage: z.string().optional().default(''),
    status: z.enum(['draft', 'published']).optional().default('published'),
    tags: z.array(z.string()).optional().default([]),
  })
});

export const updatePostSchema = z.object({
  body: z.object({
    title: z.string().min(3, 'Title must be at least 3 characters long').max(150).optional(),
    summary: z.string().min(5, 'Summary must be at least 5 characters long').max(400).optional(),
    content: z.string().min(10, 'Content must be at least 10 characters long').optional(),
    coverImage: z.string().optional(),
    status: z.enum(['draft', 'published']).optional(),
    tags: z.array(z.string()).optional(),
  })
});

export const createCommentSchema = z.object({
  body: z.object({
    content: z.string({ required_error: 'Comment content is required' })
      .min(1, 'Comment cannot be empty')
      .max(1000, 'Comment cannot exceed 1000 characters'),
  })
});
