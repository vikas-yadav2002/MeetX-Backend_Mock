import mongoose, { Document, Schema } from 'mongoose';

export interface IBooking extends Document {
  userId: mongoose.Types.ObjectId;
  // activityId: mongoose.Types.ObjectId;
  activityId: Schema.Types.ObjectId;
  status: 'confirmed' | 'cancelled' | 'pending';
}

const BookingSchema = new Schema<IBooking>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    activityId: {
      type: Schema.Types.ObjectId,
      ref: 'Activity',
      required: true
    },
    status: {
      type: String,
      enum: ['confirmed', 'cancelled', 'pending'],
      default: 'confirmed'
    }
  },
  {
    timestamps: true
  }
);

// Create a compound index to prevent duplicate bookings
BookingSchema.index({ userId: 1, activityId: 1 }, { unique: true });

export default mongoose.model<IBooking>('Booking', BookingSchema);