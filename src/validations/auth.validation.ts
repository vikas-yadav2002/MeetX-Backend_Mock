import { z } from 'zod';

// User registration schema
export const registerSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters').max(50, 'Name cannot exceed 50 characters'),
  email: z.string().email('Please provide a valid email'),
  phone: z.string().regex(/^\d{7,15}$/, 'Phone must be 7-15 digits'),
  password: z.string().min(8, 'Password must be at least 8 characters').regex(
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    'Password must include at least one letter and one number'
  )
});

// User login schema
export const loginSchema = z.object({
  email: z.string().email('Please provide a valid email'),
  password: z.string().min(1, 'Password is required')
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;