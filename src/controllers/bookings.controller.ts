import { Request, Response } from 'express';
import Booking from '../models/Booking.model';
import Activity from '../models/Activity.model';
import { CreateBookingInput, UpdateBookingInput } from '../validations/booking.validation';

// @desc    Book an activity 
// @route   POST /api/bookings
// @access  Private
export const createBooking = async (req: Request, res: Response) => {
  try {
    const { activityId }: CreateBookingInput = req.body;
    
    // @ts-ignore - Get user ID from authenticated user
    const userId = req.user._id;

    // Check if activity exists
    const activity = await Activity.findById(activityId);
    if (!activity) {
      return res.status(404).json({
        success: false,
        message: 'Activity not found'
      });
    }

    // Check if user has already booked this activity
    const existingBooking = await Booking.findOne({ userId, activityId });
    if (existingBooking) {
      return res.status(400).json({
        success: false,
        message: 'You have already booked this activity'
      });
    }

    // Create booking
    const booking = await Booking.create({
      userId,
      activityId
    });

    res.status(201).json({
      success: true,
      data: booking
    });
  } catch (error: any) {
    console.error('Create booking error:', error);
    
    // Check if duplicate key error (already booked)
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'You have already booked this activity'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get user's bookings
// @route   GET /api/bookings/me
// @access  Private
export const getUserBookings = async (req: Request, res: Response) => {
  try {
    // @ts-ignore - Get user ID from authenticated user
    const userId = req.user._id;

    // Find all bookings for this user
    const bookings = await Booking.find({ userId })
      .populate('activityId', 'title description location date time')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error: any) {
    console.error('Get user bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Private
export const getBooking = async (req: Request, res: Response) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('activityId', 'title description location date time');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // @ts-ignore - Check if booking belongs to user
    if (booking.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this booking'
      });
    }

    res.json({
      success: true,
      data: booking
    });
  } catch (error: any) {
    console.error('Get booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Cancel booking
// @route   PATCH /api/bookings/:id
// @access  Private
export const updateBookingStatus = async (req: Request, res: Response) => {
  try {
    const { status }: UpdateBookingInput = req.body;

    let booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // @ts-ignore - Check if booking belongs to user
    if (booking.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this booking'
      });
    }

    booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).populate('activityId', 'title description location date time');

    res.json({
      success: true,
      data: booking
    });
  } catch (error: any) {
    console.error('Update booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// @desc    Delete booking
// @route   DELETE /api/bookings/:id
// @access  Private
export const deleteBooking = async (req: Request, res: Response) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // @ts-ignore - Check if booking belongs to user
    if (booking.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this booking'
      });
    }

    await booking.deleteOne();

    res.json({
      success: true,
      message: 'Booking removed'
    });
  } catch (error: any) {
    console.error('Delete booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};