import mongoose, { Schema, Document } from 'mongoose';

export interface ILoan extends Document {
  userId: mongoose.Types.ObjectId;
  localId: number;
  personName: string;
  amount: number;
  type: 'lent' | 'borrowed';
  date: Date;
  dueDate?: Date;
  status: 'pending' | 'partially_paid' | 'paid';
  paidAmount: number;
  notes?: string;
  createdAt: Date;
}

const LoanSchema: Schema = new Schema({
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
  personName: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['lent', 'borrowed']
  },
  date: {
    type: Date,
    required: true
  },
  dueDate: {
    type: Date
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'partially_paid', 'paid'],
    default: 'pending'
  },
  paidAmount: {
    type: Number,
    default: 0
  },
  notes: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model<ILoan>('Loan', LoanSchema); 