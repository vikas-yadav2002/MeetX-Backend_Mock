import express from 'express';
import {
  createBooking,
  getUserBookings,
  getBooking,
  updateBookingStatus,
  deleteBooking
} from '../controllers/bookings.controller';
import { validateBody } from '../middleware/validation.middleware';
import { createBookingSchema, updateBookingSchema } from '../validations/booking.validation';
import { protect } from '../middleware/auth.middleware';

const router = express.Router();

// All routes require authentication
router.use(protect);

// @route   POST /api/bookings
router.post('/', validateBody(createBookingSchema), createBooking);

// @route   GET /api/bookings/me
router.get('/me', getUserBookings);

// @route   GET /api/bookings/:id
router.get('/:id', getBooking);

// @route   PATCH /api/bookings/:id
router.patch('/:id', validateBody(updateBookingSchema), updateBookingStatus);

// @route   DELETE /api/bookings/:id
router.delete('/:id', deleteBooking);

export default router;