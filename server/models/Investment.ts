import mongoose, { Schema, Document } from 'mongoose';

export interface IInvestment extends Document {
  userId: mongoose.Types.ObjectId;
  localId: number;
  name: string;
  type: 'sip' | 'stock' | 'gold' | 'mutual_fund' | 'fd';
  amount: number;
  currentValue?: number;
  units?: number;
  purchasePrice?: number;
  startDate: Date;
  endDate?: Date;
  expectedReturn?: number;
  notes?: string;
  createdAt: Date;
}

const InvestmentSchema: Schema = new Schema({
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
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['sip', 'stock', 'gold', 'mutual_fund', 'fd']
  },
  amount: {
    type: Number,
    required: true
  },
  currentValue: {
    type: Number
  },
  units: {
    type: Number
  },
  purchasePrice: {
    type: Number
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
  notes: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model<IInvestment>('Investment', InvestmentSchema); 