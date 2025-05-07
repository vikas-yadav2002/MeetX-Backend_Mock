import { z } from 'zod';
import mongoose from 'mongoose';

// Validate MongoDB ObjectId
const objectIdSchema = z.string().refine(
  (val) => mongoose.Types.ObjectId.isValid(val),
  { message: 'Invalid ID format' }
);

// Booking creation schema
export const createBookingSchema = z.object({
  activityId: objectIdSchema
});

// Booking update schema (for changing status, etc.)
export const updateBookingSchema = z.object({
  status: z.enum(['confirmed', 'cancelled', 'pending'])
});

export type CreateBookingInput = z.infer<typeof createBookingSchema>;
export type UpdateBookingInput = z.infer<typeof updateBookingSchema>;
// import { z } from 'zod';

// // Booking creation schema
// export const createBookingSchema = z.object({
//   activityId: z.string().min(1, { message: "Activity ID must not be empty" })
// });

// // Booking update schema (for changing status, etc.)
// export const updateBookingSchema = z.object({
//   status: z.enum(['confirmed', 'cancelled', 'pending'])
// });

// export type CreateBookingInput = z.infer<typeof createBookingSchema>;
// export type UpdateBookingInput = z.infer<typeof updateBookingSchema>;
