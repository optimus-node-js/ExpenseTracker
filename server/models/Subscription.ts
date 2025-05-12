import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './User';

export interface ISubscription extends Document {
  userId: IUser['_id'];
  localId?: number; // Numeric ID for backwards compatibility
  name: string;
  description?: string;
  amount: number;
  billingCycle: 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  startDate: Date;
  nextBillingDate: Date;
  category: string;
  paymentMethod: string;
  autoRenew: boolean;
  active: boolean;
  reminderDays?: number; // Days before billing to send reminder
  notes?: string;
  createdAt: Date;
}

const SubscriptionSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  localId: {
    type: Number,
    index: true
  },
  name: {
    type: String,
    required: true
  },
  description: String,
  amount: {
    type: Number,
    required: true
  },
  billingCycle: {
    type: String,
    enum: ['weekly', 'monthly', 'quarterly', 'yearly'],
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  nextBillingDate: {
    type: Date,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  paymentMethod: {
    type: String,
    required: true
  },
  autoRenew: {
    type: Boolean,
    default: true
  },
  active: {
    type: Boolean,
    default: true
  },
  reminderDays: {
    type: Number,
    default: 3
  },
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model<ISubscription>('Subscription', SubscriptionSchema);