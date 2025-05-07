import mongoose, { Document, Schema } from 'mongoose';

export interface IActivity extends Document {
  title: string;
  description: string;
  location: string;
  date: Date;
  time: string;
  capacity: number;
  createdBy?: mongoose.Types.ObjectId;
}

const ActivitySchema = new Schema<IActivity>(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    capacity: {
      type: Number,
      default: 10
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IActivity>('Activity', ActivitySchema);