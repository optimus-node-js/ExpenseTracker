import mongoose, { Schema, Document } from 'mongoose';

export interface ISip extends Document {
  userId: mongoose.Types.ObjectId;
  localId: number;
  investmentId?: mongoose.Types.ObjectId;
  name: string;
  amount: number;
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  startDate: Date;
  endDate?: Date;
  expectedReturn?: number;
  totalInvested: number;
  currentValue?: number;
  notes?: string;
  createdAt: Date;
}

const SipSchema: Schema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  localId: {
    type: Number,
    required: true,
    unique: true
  },
  investmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Investment'
  },
  name: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  frequency: {
    type: String,
    required: true,
    enum: ['daily', 'weekly', 'monthly', 'quarterly'],
    default: 'monthly'
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date
  },
  expectedReturn: {
    type: Number
  },
  totalInvested: {
    type: Number,
    default: 0
  },
  currentValue: {
    type: Number
  },
  notes: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model<ISip>('Sip', SipSchema); 