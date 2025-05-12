import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './User';

export interface IBudget extends Document {
  userId: IUser['_id'];
  category: string;
  amount: number;
  period: 'weekly' | 'monthly';
  startDate: Date;
  endDate?: Date;
  createdAt: Date;
}

const BudgetSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  period: {
    type: String,
    enum: ['weekly', 'monthly'],
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model<IBudget>('Budget', BudgetSchema);