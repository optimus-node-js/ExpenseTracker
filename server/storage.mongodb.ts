import { IStorage } from './storage';
import { User as UserModel, Transaction as TransactionModel, Budget as BudgetModel, BankStatement as BankStatementModel } from './models';
import { User, InsertUser, Transaction, InsertTransaction, Budget, InsertBudget, BankStatement, InsertBankStatement } from "@shared/schema";
import mongoose from 'mongoose';

export class MongoDBStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    try {
      const user = await UserModel.findOne({ id });
      if (!user) return undefined;
      
      return {
        id,
        username: user.username,
        password: user.password,
        email: user.email,
        fullName: user.fullName,
        createdAt: user.createdAt
      };
    } catch (error) {
      console.error('Error getting user:', error);
      return undefined;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      const user = await UserModel.findOne({ username });
      if (!user) return undefined;
      
      // MongoDB uses _id, but our interface expects id
      return {
        id: parseInt(user._id.toString().slice(-6), 16) % 10000, // Generate a numeric ID from MongoDB _id
        username: user.username,
        password: user.password,
        email: user.email,
        fullName: user.fullName,
        createdAt: user.createdAt
      };
    } catch (error) {
      console.error('Error getting user by username:', error);
      return undefined;
    }
  }

  async createUser(user: InsertUser): Promise<User> {
    try {
      const newUser = new UserModel({
        username: user.username,
        password: user.password,
        email: user.email,
        fullName: user.fullName
      });
      
      const savedUser = await newUser.save();
      
      // MongoDB uses _id, but our interface expects id
      return {
        id: parseInt(savedUser._id.toString().slice(-6), 16) % 10000, // Generate a numeric ID from MongoDB _id
        username: savedUser.username,
        password: savedUser.password,
        email: savedUser.email,
        fullName: savedUser.fullName,
        createdAt: savedUser.createdAt
      };
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }
  
  // Transaction methods
  async getTransaction(id: number): Promise<Transaction | undefined> {
    try {
      const transaction = await TransactionModel.findOne({ localId: id });
      if (!transaction) return undefined;
      
      return {
        id,
        userId: parseInt(transaction.userId.toString().slice(-6), 16) % 10000,
        description: transaction.description,
        amount: transaction.amount,
        date: transaction.date.toISOString(),
        category: transaction.category,
        type: transaction.type,
        paymentMode: transaction.paymentMode,
        notes: transaction.notes,
        tags: transaction.tags || [],
        source: transaction.source,
        reference: transaction.reference,
        createdAt: transaction.createdAt
      };
    } catch (error) {
      console.error('Error getting transaction:', error);
      return undefined;
    }
  }
  
  async getAllTransactions(userId: number): Promise<Transaction[]> {
    try {
      // Find the MongoDB user first
      const user = await UserModel.findOne().sort({ createdAt: 1 }).limit(1);
      if (!user) return [];
      
      const transactions = await TransactionModel.find({ userId: user._id });
      
      return transactions.map(t => ({
        id: parseInt(t._id.toString().slice(-6), 16) % 10000,
        userId,
        description: t.description,
        amount: t.amount,
        date: t.date.toISOString(),
        category: t.category,
        type: t.type,
        paymentMode: t.paymentMode,
        notes: t.notes,
        tags: t.tags || [],
        source: t.source,
        reference: t.reference,
        createdAt: t.createdAt
      }));
    } catch (error) {
      console.error('Error getting all transactions:', error);
      return [];
    }
  }
  
  async createTransaction(transaction: InsertTransaction): Promise<Transaction> {
    try {
      // Find the user to get their MongoDB _id
      const user = await UserModel.findOne().sort({ createdAt: 1 }).limit(1);
      if (!user) {
        throw new Error('User not found');
      }

      const localId = Math.floor(Math.random() * 1000000); // Generate a local ID for compatibility
      
      const newTransaction = new TransactionModel({
        userId: user._id,
        localId,
        description: transaction.description,
        amount: transaction.amount,
        date: transaction.date,
        category: transaction.category,
        type: transaction.type,
        paymentMode: transaction.paymentMode,
        notes: transaction.notes,
        tags: transaction.tags || [],
        source: transaction.source,
        reference: transaction.reference
      });
      
      const savedTransaction = await newTransaction.save();
      
      return {
        id: localId,
        userId: transaction.userId,
        description: savedTransaction.description,
        amount: savedTransaction.amount,
        date: savedTransaction.date.toISOString(),
        category: savedTransaction.category,
        type: savedTransaction.type,
        paymentMode: savedTransaction.paymentMode,
        notes: savedTransaction.notes,
        tags: savedTransaction.tags || [],
        source: savedTransaction.source,
        reference: savedTransaction.reference,
        createdAt: savedTransaction.createdAt
      };
    } catch (error) {
      console.error('Error creating transaction:', error);
      throw error;
    }
  }
  
  async updateTransaction(id: number, transaction: InsertTransaction): Promise<Transaction | undefined> {
    try {
      const existingTransaction = await TransactionModel.findOne({ localId: id });
      
      if (!existingTransaction) {
        return undefined;
      }
      
      // Update fields
      existingTransaction.description = transaction.description;
      existingTransaction.amount = transaction.amount;
      existingTransaction.date = new Date(transaction.date);
      existingTransaction.category = transaction.category;
      existingTransaction.type = transaction.type;
      existingTransaction.paymentMode = transaction.paymentMode;
      existingTransaction.notes = transaction.notes;
      existingTransaction.tags = transaction.tags || [];
      existingTransaction.source = transaction.source;
      existingTransaction.reference = transaction.reference;
      
      const updatedTransaction = await existingTransaction.save();
      
      return {
        id,
        userId: transaction.userId,
        description: updatedTransaction.description,
        amount: updatedTransaction.amount,
        date: updatedTransaction.date.toISOString(),
        category: updatedTransaction.category,
        type: updatedTransaction.type,
        paymentMode: updatedTransaction.paymentMode,
        notes: updatedTransaction.notes,
        tags: updatedTransaction.tags || [],
        source: updatedTransaction.source,
        reference: updatedTransaction.reference,
        createdAt: updatedTransaction.createdAt
      };
    } catch (error) {
      console.error('Error updating transaction:', error);
      return undefined;
    }
  }
  
  async deleteTransaction(id: number): Promise<boolean> {
    try {
      const result = await TransactionModel.deleteOne({ localId: id });
      return result.deletedCount > 0;
    } catch (error) {
      console.error('Error deleting transaction:', error);
      return false;
    }
  }
  
  // Budget methods
  async getBudget(id: number): Promise<Budget | undefined> {
    try {
      const budget = await BudgetModel.findOne({ localId: id });
      if (!budget) return undefined;
      
      return {
        id,
        userId: parseInt(budget.userId.toString().slice(-6), 16) % 10000,
        category: budget.category,
        amount: budget.amount,
        period: budget.period,
        startDate: budget.startDate.toISOString(),
        endDate: budget.endDate?.toISOString(),
        createdAt: budget.createdAt
      };
    } catch (error) {
      console.error('Error getting budget:', error);
      return undefined;
    }
  }
  
  async getAllBudgets(userId: number): Promise<Budget[]> {
    try {
      // Find the MongoDB user first
      const user = await UserModel.findOne().sort({ createdAt: 1 }).limit(1);
      if (!user) return [];
      
      const budgets = await BudgetModel.find({ userId: user._id });
      
      return budgets.map(b => ({
        id: parseInt(b._id.toString().slice(-6), 16) % 10000,
        userId,
        category: b.category,
        amount: b.amount,
        period: b.period,
        startDate: b.startDate.toISOString(),
        endDate: b.endDate?.toISOString(),
        createdAt: b.createdAt
      }));
    } catch (error) {
      console.error('Error getting all budgets:', error);
      return [];
    }
  }
  
  async createBudget(budget: InsertBudget): Promise<Budget> {
    try {
      // Find the user to get their MongoDB _id
      const user = await UserModel.findOne().sort({ createdAt: 1 }).limit(1);
      if (!user) {
        throw new Error('User not found');
      }

      const localId = Math.floor(Math.random() * 1000000); // Generate a local ID for compatibility
      
      const newBudget = new BudgetModel({
        userId: user._id,
        localId,
        category: budget.category,
        amount: budget.amount,
        period: budget.period,
        startDate: budget.startDate,
        endDate: budget.endDate
      });
      
      const savedBudget = await newBudget.save();
      
      return {
        id: localId,
        userId: budget.userId,
        category: savedBudget.category,
        amount: savedBudget.amount,
        period: savedBudget.period,
        startDate: savedBudget.startDate.toISOString(),
        endDate: savedBudget.endDate?.toISOString(),
        createdAt: savedBudget.createdAt
      };
    } catch (error) {
      console.error('Error creating budget:', error);
      throw error;
    }
  }
  
  async updateBudget(id: number, budget: InsertBudget): Promise<Budget | undefined> {
    try {
      const existingBudget = await BudgetModel.findOne({ localId: id });
      
      if (!existingBudget) {
        return undefined;
      }
      
      // Update fields
      existingBudget.category = budget.category;
      existingBudget.amount = budget.amount;
      existingBudget.period = budget.period;
      existingBudget.startDate = new Date(budget.startDate);
      if (budget.endDate) existingBudget.endDate = new Date(budget.endDate);
      
      const updatedBudget = await existingBudget.save();
      
      return {
        id,
        userId: budget.userId,
        category: updatedBudget.category,
        amount: updatedBudget.amount,
        period: updatedBudget.period,
        startDate: updatedBudget.startDate.toISOString(),
        endDate: updatedBudget.endDate?.toISOString(),
        createdAt: updatedBudget.createdAt
      };
    } catch (error) {
      console.error('Error updating budget:', error);
      return undefined;
    }
  }
  
  async deleteBudget(id: number): Promise<boolean> {
    try {
      const result = await BudgetModel.deleteOne({ localId: id });
      return result.deletedCount > 0;
    } catch (error) {
      console.error('Error deleting budget:', error);
      return false;
    }
  }
  
  // Bank statement methods
  async getBankStatement(id: number): Promise<BankStatement | undefined> {
    try {
      const statement = await BankStatementModel.findOne({ localId: id });
      if (!statement) return undefined;
      
      return {
        id,
        userId: parseInt(statement.userId.toString().slice(-6), 16) % 10000,
        filename: statement.filename,
        fileType: statement.fileType,
        bankName: statement.bankName,
        accountNumber: statement.accountNumber,
        statementPeriod: statement.statementPeriod,
        processedAt: statement.processedAt,
        totalTransactions: statement.totalTransactions,
        importedTransactions: statement.importedTransactions,
        skippedDuplicates: statement.skippedDuplicates
      };
    } catch (error) {
      console.error('Error getting bank statement:', error);
      return undefined;
    }
  }
  
  async getAllBankStatements(userId: number): Promise<BankStatement[]> {
    try {
      // Find the MongoDB user first
      const user = await UserModel.findOne().sort({ createdAt: 1 }).limit(1);
      if (!user) return [];
      
      const statements = await BankStatementModel.find({ userId: user._id });
      
      return statements.map(s => ({
        id: parseInt(s._id.toString().slice(-6), 16) % 10000,
        userId,
        filename: s.filename,
        fileType: s.fileType,
        bankName: s.bankName,
        accountNumber: s.accountNumber,
        statementPeriod: s.statementPeriod,
        processedAt: s.processedAt,
        totalTransactions: s.totalTransactions,
        importedTransactions: s.importedTransactions,
        skippedDuplicates: s.skippedDuplicates
      }));
    } catch (error) {
      console.error('Error getting all bank statements:', error);
      return [];
    }
  }
  
  async createBankStatement(statement: InsertBankStatement): Promise<BankStatement> {
    try {
      // Find the user to get their MongoDB _id
      const user = await UserModel.findOne().sort({ createdAt: 1 }).limit(1);
      if (!user) {
        throw new Error('User not found');
      }

      const localId = Math.floor(Math.random() * 1000000); // Generate a local ID for compatibility
      
      const newStatement = new BankStatementModel({
        userId: user._id,
        localId,
        filename: statement.filename,
        fileType: statement.fileType,
        bankName: statement.bankName,
        accountNumber: statement.accountNumber,
        statementPeriod: statement.statementPeriod,
        totalTransactions: statement.totalTransactions,
        importedTransactions: statement.importedTransactions,
        skippedDuplicates: statement.skippedDuplicates
      });
      
      const savedStatement = await newStatement.save();
      
      return {
        id: localId,
        userId: statement.userId,
        filename: savedStatement.filename,
        fileType: savedStatement.fileType,
        bankName: savedStatement.bankName,
        accountNumber: savedStatement.accountNumber,
        statementPeriod: savedStatement.statementPeriod,
        processedAt: savedStatement.processedAt,
        totalTransactions: savedStatement.totalTransactions,
        importedTransactions: savedStatement.importedTransactions,
        skippedDuplicates: savedStatement.skippedDuplicates
      };
    } catch (error) {
      console.error('Error creating bank statement:', error);
      throw error;
    }
  }
  
  // Find duplicate transaction based on date, amount, and description
  async findDuplicateTransaction(transaction: InsertTransaction): Promise<Transaction | undefined> {
    try {
      const transactionDate = new Date(transaction.date);
      
      // Find the user to get their MongoDB _id
      const user = await UserModel.findOne().sort({ createdAt: 1 }).limit(1);
      if (!user) return undefined;
      
      // Query for potential duplicates
      const potentialDuplicate = await TransactionModel.findOne({
        userId: user._id,
        amount: transaction.amount,
        description: transaction.description,
        date: {
          $gte: new Date(transactionDate.setHours(0, 0, 0, 0)),
          $lt: new Date(transactionDate.setHours(23, 59, 59, 999))
        }
      });
      
      if (!potentialDuplicate) return undefined;
      
      return {
        id: parseInt(potentialDuplicate._id.toString().slice(-6), 16) % 10000,
        userId: transaction.userId,
        description: potentialDuplicate.description,
        amount: potentialDuplicate.amount,
        date: potentialDuplicate.date.toISOString(),
        category: potentialDuplicate.category,
        type: potentialDuplicate.type,
        paymentMode: potentialDuplicate.paymentMode,
        notes: potentialDuplicate.notes,
        tags: potentialDuplicate.tags || [],
        source: potentialDuplicate.source,
        reference: potentialDuplicate.reference,
        createdAt: potentialDuplicate.createdAt
      };
    } catch (error) {
      console.error('Error finding duplicate transaction:', error);
      return undefined;
    }
  }
}