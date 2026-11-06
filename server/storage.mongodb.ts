import type { IStorage } from './storage.types';
import { User as UserModel, Transaction as TransactionModel, Budget as BudgetModel, BankStatement as BankStatementModel, Subscription as SubscriptionModel, Loan as LoanModel, IncomeSource as IncomeSourceModel, Investment as InvestmentModel, Sip as SipModel } from './models';
import { User, InsertUser, Transaction, InsertTransaction, Budget, InsertBudget, BankStatement, InsertBankStatement, Subscription, InsertSubscription, Loan, InsertLoan, IncomeSource, InsertIncomeSource, Investment, InsertInvestment, Sip, InsertSip } from "@shared/schema";
import mongoose, { Document, Types } from 'mongoose';
import { ITransaction } from './models/Transaction';
import { IBudget } from './models/Budget';
import { ILoan } from './models/Loan';
import { IIncomeSource } from './models/IncomeSource';
import { IInvestment } from './models/Investment';
import { ISip } from './models/Sip';

// Helper function to convert MongoDB _id to numeric ID
function mongoIdToNumericId(doc: Document): number {
  const id = doc._id as Types.ObjectId;
  return parseInt(id.toString().slice(-6), 16) % 10000;
}

// Helper function to convert number to string
function numberToString(num: number | string | undefined | null): string {
  if (typeof num === 'string') return num;
  return (num ?? 0).toString();
}

// Helper function to convert string to number
function stringToNumber(str: string | number | undefined | null): number {
  if (typeof str === 'number') return str;
  return parseFloat(str ?? '0');
}

// Helper function to convert string to required Date
function toRequiredDate(dateStr: string | Date | undefined | null): Date {
  if (!dateStr) return new Date();
  try {
    return typeof dateStr === 'string' ? new Date(dateStr) : dateStr;
  } catch (error) {
    console.error('Error converting date:', error);
    return new Date();
  }
}

// Helper function to convert MongoDB optional Date to schema optional Date
function toSchemaOptionalDate(date: Date | undefined | null): Date | null {
  return date || null;
}

// Helper function to handle optional string fields
function optionalString(str: string | undefined | null): string | null {
  return str ?? null;
}

// Helper function to handle optional string arrays
function optionalStringArray(arr: string[] | undefined | null): string[] | null {
  return arr ?? null;
}

function ensureTransactionType(type: string): "income" | "expense" {
  if (type !== "income" && type !== "expense") {
    throw new Error('Invalid transaction type');
  }
  return type;
}

function ensureBudgetPeriod(period: string): "weekly" | "monthly" {
  if (period !== "weekly" && period !== "monthly") {
    throw new Error('Invalid budget period');
  }
  return period;
}

export class MongoDBStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    try {
      console.log(`Looking for user with ID: ${id}`);
      
      // Get all users and find the one with matching ID using the helper function
      const allUsers = await UserModel.find({});
      let user = allUsers.find(u => {
        // Ensure u is a proper document before passing to mongoIdToNumericId
        if (u && u._id) {
          return mongoIdToNumericId(u as Document) === id;
        }
        return false;
      });
      
      if (!user) {
        console.log(`No user found with numeric ID ${id}, trying alternative lookup methods`);
        // If not found, try to find the most recent user as a fallback
        const recentUser = await UserModel.findOne().sort({ createdAt: -1 });
        user = recentUser || undefined;
      }
      
      if (!user) {
        console.log(`No users found in the database`);
        return undefined;
      }
      
      console.log(`Found user: ${user.username} with ID: ${mongoIdToNumericId(user as Document)}`);
      
      return {
        id: mongoIdToNumericId(user as Document),
        username: user.username,
        password: user.password,
        email: user.email,
        fullName: user.fullName,
        cashReserve: user.cashReserve || '0',
        createdAt: user.createdAt
      };
    } catch (error) {
      console.error('Error getting user:', error);
      return undefined;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      console.log(`Looking for user with username: ${username}`);
      const user = await UserModel.findOne({ username });
      if (!user) {
        console.log(`No user found with username ${username}`);
        return undefined;
      }
      
      const userId = mongoIdToNumericId(user as Document);
      console.log(`Found user with username ${username}, ID: ${userId}`);
      
      return {
        id: userId,
        username: user.username,
        password: user.password,
        email: user.email,
        fullName: user.fullName,
        cashReserve: user.cashReserve || '0',
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
        fullName: user.fullName,
        cashReserve: user.cashReserve || '0'
      });
      
      const savedUser = await newUser.save();
      
      return {
        id: mongoIdToNumericId(savedUser as Document),
        username: savedUser.username,
        password: savedUser.password,
        email: savedUser.email,
        fullName: savedUser.fullName,
        cashReserve: savedUser.cashReserve || '0',
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
        userId: mongoIdToNumericId(transaction),
        description: transaction.description,
        amount: numberToString(transaction.amount),
        date: toRequiredDate(transaction.date),
        category: transaction.category,
        type: transaction.type,
        paymentMode: transaction.paymentMode,
        notes: optionalString(transaction.notes),
        tags: optionalStringArray(transaction.tags),
        source: optionalString(transaction.source),
        reference: optionalString(transaction.reference),
        createdAt: transaction.createdAt
      };
    } catch (error) {
      console.error('Error getting transaction:', error);
      return undefined;
    }
  }
  
  async getAllTransactions(userId: number): Promise<Transaction[]> {
    try {
      const user = await UserModel.findOne().sort({ createdAt: 1 }).limit(1);
      if (!user) return [];
      
      const transactions = await TransactionModel.find({ userId: user._id });
      
      return transactions.map((t: ITransaction) => ({
        id: mongoIdToNumericId(t),
        userId,
        description: t.description,
        amount: numberToString(t.amount),
        date: toRequiredDate(t.date),
        category: t.category,
        type: t.type,
        paymentMode: t.paymentMode,
        notes: optionalString(t.notes),
        tags: optionalStringArray(t.tags),
        source: optionalString(t.source),
        reference: optionalString(t.reference),
        createdAt: t.createdAt
      }));
    } catch (error) {
      console.error('Error getting all transactions:', error);
      return [];
    }
  }
  
  async createTransaction(transaction: InsertTransaction): Promise<Transaction> {
    try {
      // Find the user by numeric ID 
      const allUsers = await UserModel.find({});
      const user = allUsers.find(u => {
        if (u && u._id) {
          return mongoIdToNumericId(u as Document) === transaction.userId;
        }
        return false;
      });
      
      if (!user) {
        throw new Error('User not found');
      }

      const localId = Math.floor(Math.random() * 1000000);
      const amount = stringToNumber(transaction.amount);
      const type = ensureTransactionType(transaction.type);
      
      const newTransaction = new TransactionModel({
        userId: user._id,
        localId,
        description: transaction.description,
        amount,
        date: toRequiredDate(transaction.date),
        category: transaction.category,
        type,
        paymentMode: transaction.paymentMode,
        notes: transaction.notes ?? undefined,
        tags: transaction.tags ?? undefined,
        source: transaction.source ?? undefined,
        reference: transaction.reference ?? undefined
      });
      
      const savedTransaction = await newTransaction.save();
      
      return {
        id: localId,
        userId: transaction.userId,
        description: savedTransaction.description,
        amount: numberToString(savedTransaction.amount),
        date: toRequiredDate(savedTransaction.date),
        category: savedTransaction.category,
        type: savedTransaction.type as "income" | "expense",
        paymentMode: savedTransaction.paymentMode,
        notes: optionalString(savedTransaction.notes),
        tags: optionalStringArray(savedTransaction.tags),
        source: optionalString(savedTransaction.source),
        reference: optionalString(savedTransaction.reference),
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
      
      existingTransaction.description = transaction.description;
      existingTransaction.amount = stringToNumber(transaction.amount);
      existingTransaction.date = toRequiredDate(transaction.date);
      existingTransaction.category = transaction.category;
      existingTransaction.type = ensureTransactionType(transaction.type);
      existingTransaction.paymentMode = transaction.paymentMode;
      existingTransaction.notes = transaction.notes ?? undefined;
      existingTransaction.tags = transaction.tags ?? undefined;
      existingTransaction.source = transaction.source ?? undefined;
      existingTransaction.reference = transaction.reference ?? undefined;
      
      const updatedTransaction = await existingTransaction.save();
      
      return {
        id,
        userId: transaction.userId,
        description: updatedTransaction.description,
        amount: numberToString(updatedTransaction.amount),
        date: toRequiredDate(updatedTransaction.date),
        category: updatedTransaction.category,
        type: updatedTransaction.type,
        paymentMode: updatedTransaction.paymentMode,
        notes: optionalString(updatedTransaction.notes),
        tags: optionalStringArray(updatedTransaction.tags),
        source: optionalString(updatedTransaction.source),
        reference: optionalString(updatedTransaction.reference),
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
        userId: mongoIdToNumericId(budget),
        category: budget.category,
        amount: numberToString(budget.amount),
        period: ensureBudgetPeriod(budget.period),
        startDate: budget.startDate,
        endDate: budget.endDate ?? null,
        createdAt: budget.createdAt
      };
    } catch (error) {
      console.error('Error getting budget:', error);
      return undefined;
    }
  }
  
  async getAllBudgets(userId: number): Promise<Budget[]> {
    try {
      const user = await UserModel.findOne().sort({ createdAt: 1 }).limit(1);
      if (!user) return [];
      
      const budgets = await BudgetModel.find({ userId: user._id });
      
      return budgets.map((b: IBudget) => ({
        id: mongoIdToNumericId(b),
        userId,
        category: b.category,
        amount: numberToString(b.amount),
        period: b.period as "weekly" | "monthly",
        startDate: toRequiredDate(b.startDate),
        endDate: toSchemaOptionalDate(b.endDate),
        createdAt: toRequiredDate(b.createdAt)
      }));
    } catch (error) {
      console.error('Error getting all budgets:', error);
      return [];
    }
  }
  
  async createBudget(budget: InsertBudget): Promise<Budget> {
    try {
      const user = await UserModel.findOne().sort({ createdAt: 1 }).limit(1);
      if (!user) {
        throw new Error('User not found');
      }

      const amount = stringToNumber(budget.amount);
      const period = ensureBudgetPeriod(budget.period);
      
      const newBudget = new BudgetModel({
        userId: user._id,
        category: budget.category,
        amount,
        period,
        startDate: toRequiredDate(budget.startDate),
        endDate: budget.endDate ? toRequiredDate(budget.endDate) : undefined
      });
      
      const savedBudget = await newBudget.save();
      
      return {
        id: mongoIdToNumericId(savedBudget),
        userId: budget.userId,
        category: savedBudget.category,
        amount: numberToString(savedBudget.amount),
        period: savedBudget.period as "weekly" | "monthly",
        startDate: toRequiredDate(savedBudget.startDate),
        endDate: toSchemaOptionalDate(savedBudget.endDate),
        createdAt: toRequiredDate(savedBudget.createdAt)
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
      
      existingBudget.category = budget.category;
      existingBudget.amount = stringToNumber(budget.amount);
      existingBudget.period = ensureBudgetPeriod(budget.period);
      existingBudget.startDate = toRequiredDate(budget.startDate);
      existingBudget.endDate = budget.endDate ? toRequiredDate(budget.endDate) : undefined;
      
      const updatedBudget = await existingBudget.save();
      
      return {
        id,
        userId: budget.userId,
        category: updatedBudget.category,
        amount: numberToString(updatedBudget.amount),
        period: updatedBudget.period as "weekly" | "monthly",
        startDate: toRequiredDate(updatedBudget.startDate),
        endDate: toSchemaOptionalDate(updatedBudget.endDate),
        createdAt: toRequiredDate(updatedBudget.createdAt)
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
        userId: mongoIdToNumericId(statement),
        filename: statement.filename,
        fileType: statement.fileType,
        bankName: statement.bankName || null,
        accountNumber: statement.accountNumber || null,
        statementPeriod: statement.statementPeriod || null,
        processedAt: statement.processedAt,
        totalTransactions: statement.totalTransactions ?? null,
        importedTransactions: statement.importedTransactions ?? null,
        skippedDuplicates: statement.skippedDuplicates ?? null,
        fileUrl: null,
        publicId: null
      };
    } catch (error) {
      console.error('Error getting bank statement:', error);
      return undefined;
    }
  }
  
  async getAllBankStatements(userId: number): Promise<BankStatement[]> {
    try {
      const user = await UserModel.findOne().sort({ createdAt: 1 }).limit(1);
      if (!user) return [];
      
      const statements = await BankStatementModel.find({ userId: user._id });
      
      return statements.map(s => ({
        id: mongoIdToNumericId(s),
        userId,
        filename: s.filename,
        fileType: s.fileType,
        bankName: s.bankName || null,
        accountNumber: s.accountNumber || null,
        statementPeriod: s.statementPeriod || null,
        processedAt: s.processedAt,
        totalTransactions: s.totalTransactions ?? null,
        importedTransactions: s.importedTransactions ?? null,
        skippedDuplicates: s.skippedDuplicates ?? null,
        fileUrl: null,
        publicId: null
      }));
    } catch (error) {
      console.error('Error getting all bank statements:', error);
      return [];
    }
  }
  
  async createBankStatement(statement: InsertBankStatement): Promise<BankStatement> {
    try {
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
        bankName: statement.bankName || null,
        accountNumber: statement.accountNumber || null,
        statementPeriod: statement.statementPeriod || null,
        totalTransactions: statement.totalTransactions ?? null,
        importedTransactions: statement.importedTransactions ?? null,
        skippedDuplicates: statement.skippedDuplicates ?? null,
        fileUrl: null,
        publicId: null
      });
      
      const savedStatement = await newStatement.save();
      
      return {
        id: localId,
        userId: statement.userId,
        filename: savedStatement.filename,
        fileType: savedStatement.fileType,
        bankName: savedStatement.bankName || null,
        accountNumber: savedStatement.accountNumber || null,
        statementPeriod: savedStatement.statementPeriod || null,
        processedAt: savedStatement.processedAt,
        totalTransactions: savedStatement.totalTransactions ?? null,
        importedTransactions: savedStatement.importedTransactions ?? null,
        skippedDuplicates: savedStatement.skippedDuplicates ?? null,
        fileUrl: null,
        publicId: null
      };
    } catch (error) {
      console.error('Error creating bank statement:', error);
      throw error;
    }
  }
  
  // Find duplicate transaction based on date, amount, and description
  async findDuplicateTransaction(transaction: InsertTransaction): Promise<Transaction | undefined> {
    try {
      const transactionDate = toRequiredDate(transaction.date);
      
      // Find the user by numeric ID
      const user = await UserModel.findOne().sort({ createdAt: 1 }).limit(1);
      if (!user) return undefined;
      
      // Look for a transaction with the same amount, date, and description
      const existingTransaction = await TransactionModel.findOne({
        userId: user._id,
        amount: stringToNumber(transaction.amount),
        date: {
          $gte: new Date(transactionDate.getFullYear(), transactionDate.getMonth(), transactionDate.getDate()),
          $lt: new Date(transactionDate.getFullYear(), transactionDate.getMonth(), transactionDate.getDate() + 1)
        },
        description: transaction.description
      });

      if (!existingTransaction) return undefined;

      return {
        id: mongoIdToNumericId(existingTransaction),
        userId: transaction.userId,
        description: existingTransaction.description,
        amount: numberToString(existingTransaction.amount),
        date: toRequiredDate(existingTransaction.date),
        category: existingTransaction.category,
        type: existingTransaction.type,
        paymentMode: existingTransaction.paymentMode,
        notes: optionalString(existingTransaction.notes),
        tags: optionalStringArray(existingTransaction.tags),
        source: optionalString(existingTransaction.source),
        reference: optionalString(existingTransaction.reference),
        createdAt: existingTransaction.createdAt
      };
    } catch (error) {
      console.error('Error finding duplicate transaction:', error);
      return undefined;
    }
  }
  
  // Subscription methods
  async getSubscription(id: number): Promise<Subscription | undefined> {
    try {
      const subscription = await SubscriptionModel.findOne({ localId: id });
      if (!subscription) return undefined;
      
      return {
        id,
        userId: Number(subscription.userId) || 0,
        name: subscription.name,
        description: subscription.description || null,
        amount: subscription.amount.toString(),
        billingCycle: subscription.billingCycle,
        startDate: subscription.startDate,
        nextBillingDate: subscription.nextBillingDate,
        category: subscription.category,
        paymentMethod: subscription.paymentMethod,
        autoRenew: subscription.autoRenew,
        active: subscription.active,
        reminderDays: subscription.reminderDays || null,
        notes: subscription.notes || null,
        createdAt: subscription.createdAt
      };
    } catch (error) {
      console.error('Error getting subscription:', error);
      return undefined;
    }
  }
  
  async getAllSubscriptions(userId: number): Promise<Subscription[]> {
    try {
      const user = await UserModel.findOne({ id: userId });
      if (!user) return [];
      
      const subscriptions = await SubscriptionModel.find({ userId: user._id });
      
      return subscriptions.map(s => ({
        id: s.localId || 0,
        userId,
        name: s.name,
        description: s.description || null,
        amount: s.amount.toString(),
        billingCycle: s.billingCycle,
        startDate: s.startDate,
        nextBillingDate: s.nextBillingDate,
        category: s.category,
        paymentMethod: s.paymentMethod,
        autoRenew: s.autoRenew,
        active: s.active,
        reminderDays: s.reminderDays || null,
        notes: s.notes || null,
        createdAt: s.createdAt
      }));
    } catch (error) {
      console.error('Error getting all subscriptions:', error);
      return [];
    }
  }
  
  async createSubscription(subscription: InsertSubscription): Promise<Subscription> {
    try {
      const user = await UserModel.findOne({ id: subscription.userId });
      if (!user) {
        throw new Error('User not found');
      }
      
      // Find the highest existing localId and increment for new subscription
      const highestIdSubscription = await SubscriptionModel.findOne({})
        .sort({ localId: -1 })
        .limit(1);
      
      const nextId = highestIdSubscription && highestIdSubscription.localId 
        ? highestIdSubscription.localId + 1 
        : 1;
      
      const newSubscription = new SubscriptionModel({
        userId: user._id,
        localId: nextId,
        name: subscription.name,
        description: subscription.description,
        amount: subscription.amount,
        billingCycle: subscription.billingCycle,
        startDate: subscription.startDate,
        nextBillingDate: subscription.nextBillingDate,
        category: subscription.category,
        paymentMethod: subscription.paymentMethod,
        autoRenew: subscription.autoRenew !== false,
        active: subscription.active !== false,
        reminderDays: subscription.reminderDays || 3,
        notes: subscription.notes
      });
      
      const savedSubscription = await newSubscription.save();
      
      return {
        id: nextId,
        userId: subscription.userId,
        name: savedSubscription.name,
        description: savedSubscription.description || null,
        amount: savedSubscription.amount.toString(),
        billingCycle: savedSubscription.billingCycle,
        startDate: savedSubscription.startDate,
        nextBillingDate: savedSubscription.nextBillingDate,
        category: savedSubscription.category,
        paymentMethod: savedSubscription.paymentMethod,
        autoRenew: savedSubscription.autoRenew,
        active: savedSubscription.active,
        reminderDays: savedSubscription.reminderDays || null,
        notes: savedSubscription.notes || null,
        createdAt: savedSubscription.createdAt
      };
    } catch (error) {
      console.error('Error creating subscription:', error);
      throw new Error('Failed to create subscription');
    }
  }
  
  async updateSubscription(id: number, subscription: InsertSubscription): Promise<Subscription | undefined> {
    try {
      const user = await UserModel.findOne({ id: subscription.userId });
      if (!user) {
        return undefined;
      }
      
      const updatedSubscription = await SubscriptionModel.findOneAndUpdate(
        { localId: id },
        {
          name: subscription.name,
          description: subscription.description,
          amount: subscription.amount,
          billingCycle: subscription.billingCycle,
          startDate: subscription.startDate,
          nextBillingDate: subscription.nextBillingDate,
          category: subscription.category,
          paymentMethod: subscription.paymentMethod,
          autoRenew: subscription.autoRenew,
          active: subscription.active,
          reminderDays: subscription.reminderDays,
          notes: subscription.notes
        },
        { new: true }
      );
      
      if (!updatedSubscription) return undefined;
      
      return {
        id,
        userId: subscription.userId,
        name: updatedSubscription.name,
        description: updatedSubscription.description || null,
        amount: updatedSubscription.amount.toString(),
        billingCycle: updatedSubscription.billingCycle,
        startDate: updatedSubscription.startDate,
        nextBillingDate: updatedSubscription.nextBillingDate,
        category: updatedSubscription.category,
        paymentMethod: updatedSubscription.paymentMethod,
        autoRenew: updatedSubscription.autoRenew,
        active: updatedSubscription.active,
        reminderDays: updatedSubscription.reminderDays || null,
        notes: updatedSubscription.notes || null,
        createdAt: updatedSubscription.createdAt
      };
    } catch (error) {
      console.error('Error updating subscription:', error);
      return undefined;
    }
  }
  
  async deleteSubscription(id: number): Promise<boolean> {
    try {
      const result = await SubscriptionModel.deleteOne({ localId: id });
      return result.deletedCount ? result.deletedCount > 0 : false;
    } catch (error) {
      console.error('Error deleting subscription:', error);
      return false;
    }
  }

  async updateUser(id: number, userData: Partial<InsertUser>): Promise<User | undefined> {
    try {
      const user = await UserModel.findOne({ id });
      if (!user) return undefined;

      // Update fields
      if (userData.username) user.username = userData.username;
      if (userData.email) user.email = userData.email;
      if (userData.password) user.password = userData.password;
      if (userData.fullName) user.fullName = userData.fullName;
      if (userData.cashReserve) user.cashReserve = userData.cashReserve;

      const updatedUser = await user.save();
      
      return {
        id,
        username: updatedUser.username,
        password: updatedUser.password,
        email: updatedUser.email,
        fullName: updatedUser.fullName,
        cashReserve: updatedUser.cashReserve,
        createdAt: updatedUser.createdAt
      };
    } catch (error) {
      console.error('Error updating user:', error);
      return undefined;
    }
  }

  async updateCashReserve(id: number, amount: number): Promise<User | undefined> {
    try {
      const user = await UserModel.findOne({ id });
      if (!user) return undefined;

      user.cashReserve = amount.toString();
      const updatedUser = await user.save();
      
      return {
        id,
        username: updatedUser.username,
        password: updatedUser.password,
        email: updatedUser.email,
        fullName: updatedUser.fullName,
        cashReserve: updatedUser.cashReserve,
        createdAt: updatedUser.createdAt
      };
    } catch (error) {
      console.error('Error updating cash reserve:', error);
      return undefined;
    }
  }

  // Loan methods
  async getLoan(id: number): Promise<Loan | undefined> {
    try {
      const loan = await LoanModel.findOne({ localId: id });
      if (!loan) return undefined;
      
      return {
        id,
        userId: mongoIdToNumericId(loan),
        amount: numberToString(loan.amount),
        personName: loan.personName,
        type: loan.type,
        status: loan.status,
        date: toRequiredDate(loan.date),
        dueDate: toSchemaOptionalDate(loan.dueDate),
        paidAmount: numberToString(loan.paidAmount),
        notes: optionalString(loan.notes),
        createdAt: toRequiredDate(loan.createdAt)
      };
    } catch (error) {
      console.error('Error getting loan:', error);
      return undefined;
    }
  }

  async getAllLoans(userId: number): Promise<Loan[]> {
    try {
      const user = await UserModel.findOne().sort({ createdAt: 1 }).limit(1);
      if (!user) return [];
      
      const loans = await LoanModel.find({ userId: user._id });
      
      return loans.map((loan: Document & ILoan) => ({
        id: mongoIdToNumericId(loan),
        userId,
        amount: numberToString(loan.amount),
        personName: loan.personName,
        type: loan.type,
        status: loan.status,
        date: toRequiredDate(loan.date),
        dueDate: toSchemaOptionalDate(loan.dueDate),
        paidAmount: numberToString(loan.paidAmount),
        notes: optionalString(loan.notes),
        createdAt: toRequiredDate(loan.createdAt)
      }));
    } catch (error) {
      console.error('Error getting all loans:', error);
      return [];
    }
  }

  async createLoan(loan: InsertLoan): Promise<Loan> {
    try {
      const user = await UserModel.findOne().sort({ createdAt: 1 }).limit(1);
      if (!user) {
        throw new Error('User not found');
      }

      const localId = Math.floor(Math.random() * 1000000);
      
      const newLoan = new LoanModel({
        userId: user._id,
        localId,
        amount: stringToNumber(loan.amount),
        personName: loan.personName,
        type: loan.type,
        status: loan.status,
        date: toRequiredDate(loan.date),
        dueDate: loan.dueDate ? toRequiredDate(loan.dueDate) : undefined,
        paidAmount: stringToNumber(loan.paidAmount),
        notes: loan.notes
      });
      
      const savedLoan = await newLoan.save();
      
      return {
        id: localId,
        userId: loan.userId,
        amount: numberToString(savedLoan.amount),
        personName: savedLoan.personName,
        type: savedLoan.type,
        status: savedLoan.status,
        date: toRequiredDate(savedLoan.date),
        dueDate: toSchemaOptionalDate(savedLoan.dueDate),
        paidAmount: numberToString(savedLoan.paidAmount),
        notes: optionalString(savedLoan.notes),
        createdAt: toRequiredDate(savedLoan.createdAt)
      };
    } catch (error) {
      console.error('Error creating loan:', error);
      throw error;
    }
  }

  async updateLoan(id: number, loanData: Partial<InsertLoan>): Promise<Loan | undefined> {
    try {
      const loan = await LoanModel.findOne({ localId: id });
      if (!loan) return undefined;

      // Update fields
      if (loanData.amount) loan.amount = stringToNumber(loanData.amount);
      if (loanData.personName) loan.personName = loanData.personName;
      if (loanData.type) loan.type = loanData.type as "lent" | "borrowed";
      if (loanData.status) loan.status = loanData.status as "pending" | "partially_paid" | "paid";
      if (loanData.date) loan.date = toRequiredDate(loanData.date);
      if (loanData.dueDate) loan.dueDate = toRequiredDate(loanData.dueDate);
      if (loanData.paidAmount) loan.paidAmount = stringToNumber(loanData.paidAmount);
      if (loanData.notes) loan.notes = loanData.notes;

      const updatedLoan = await loan.save();
      
      return {
        id,
        userId: mongoIdToNumericId(updatedLoan),
        amount: numberToString(updatedLoan.amount),
        personName: updatedLoan.personName,
        type: updatedLoan.type as "lent" | "borrowed",
        status: updatedLoan.status as "pending" | "partially_paid" | "paid",
        date: toRequiredDate(updatedLoan.date),
        dueDate: toSchemaOptionalDate(updatedLoan.dueDate),
        paidAmount: numberToString(updatedLoan.paidAmount),
        notes: optionalString(updatedLoan.notes),
        createdAt: toRequiredDate(updatedLoan.createdAt)
      };
    } catch (error) {
      console.error('Error updating loan:', error);
      return undefined;
    }
  }

  async deleteLoan(id: number): Promise<boolean> {
    try {
      const result = await LoanModel.deleteOne({ localId: id });
      return result.deletedCount > 0;
    } catch (error) {
      console.error('Error deleting loan:', error);
      return false;
    }
  }

  // Income Source methods
  async getIncomeSource(id: number): Promise<IncomeSource | undefined> {
    try {
      const source = await IncomeSourceModel.findOne({ localId: id });
      if (!source) return undefined;
      
      return {
        id,
        userId: mongoIdToNumericId(source),
        name: source.name,
        amount: numberToString(source.amount),
        startDate: source.startDate,
        category: source.category,
        frequency: source.frequency,
        endDate: toSchemaOptionalDate(source.endDate),
        notes: optionalString(source.notes),
        createdAt: source.createdAt
      };
    } catch (error) {
      console.error('Error getting income source:', error);
      return undefined;
    }
  }

  async getAllIncomeSources(userId: number): Promise<IncomeSource[]> {
    try {
      const user = await UserModel.findOne().sort({ createdAt: 1 }).limit(1);
      if (!user) return [];
      
      const sources = await IncomeSourceModel.find({ userId: user._id });
      
      return sources.map((source: Document & IIncomeSource) => ({
        id: mongoIdToNumericId(source),
        userId,
        name: source.name,
        amount: numberToString(source.amount),
        startDate: toRequiredDate(source.startDate),
        category: source.category,
        frequency: source.frequency,
        endDate: toSchemaOptionalDate(source.endDate),
        notes: optionalString(source.notes),
        createdAt: toRequiredDate(source.createdAt)
      }));
    } catch (error) {
      console.error('Error getting all income sources:', error);
      return [];
    }
  }

  async createIncomeSource(incomeSource: InsertIncomeSource): Promise<IncomeSource> {
    try {
      const user = await UserModel.findOne().sort({ createdAt: 1 }).limit(1);
      if (!user) {
        throw new Error('User not found');
      }

      const localId = Math.floor(Math.random() * 1000000);
      
      const newSource = new IncomeSourceModel({
        userId: user._id,
        localId,
        name: incomeSource.name,
        amount: incomeSource.amount,
        startDate: incomeSource.startDate,
        category: incomeSource.category,
        frequency: incomeSource.frequency,
        endDate: incomeSource.endDate,
        notes: incomeSource.notes
      });
      
      const savedSource = await newSource.save();
      
      return {
        id: localId,
        userId: incomeSource.userId,
        name: savedSource.name,
        amount: numberToString(savedSource.amount),
        startDate: savedSource.startDate,
        category: savedSource.category,
        frequency: savedSource.frequency,
        endDate: toSchemaOptionalDate(savedSource.endDate),
        notes: optionalString(savedSource.notes),
        createdAt: savedSource.createdAt
      };
    } catch (error) {
      console.error('Error creating income source:', error);
      throw error;
    }
  }

  async updateIncomeSource(id: number, sourceData: Partial<InsertIncomeSource>): Promise<IncomeSource | undefined> {
    try {
      const source = await IncomeSourceModel.findOne({ localId: id });
      if (!source) return undefined;

      // Update fields
      if (sourceData.name) source.name = sourceData.name;
      if (sourceData.amount) source.amount = stringToNumber(sourceData.amount);
      if (sourceData.frequency) source.frequency = sourceData.frequency as "daily" | "weekly" | "monthly" | "yearly";
      if (sourceData.startDate) source.startDate = toRequiredDate(sourceData.startDate);
      if (sourceData.endDate) source.endDate = toRequiredDate(sourceData.endDate);
      if (sourceData.category) source.category = sourceData.category;
      if (sourceData.notes) source.notes = sourceData.notes;

      const updatedSource = await source.save();
      
      return {
        id,
        userId: mongoIdToNumericId(updatedSource),
        name: updatedSource.name,
        amount: numberToString(updatedSource.amount),
        startDate: toRequiredDate(updatedSource.startDate),
        category: updatedSource.category,
        frequency: updatedSource.frequency as "daily" | "weekly" | "monthly" | "yearly",
        endDate: toSchemaOptionalDate(updatedSource.endDate),
        notes: optionalString(updatedSource.notes),
        createdAt: toRequiredDate(updatedSource.createdAt)
      };
    } catch (error) {
      console.error('Error updating income source:', error);
      return undefined;
    }
  }

  async deleteIncomeSource(id: number): Promise<boolean> {
    try {
      const result = await IncomeSourceModel.deleteOne({ localId: id });
      return result.deletedCount > 0;
    } catch (error) {
      console.error('Error deleting income source:', error);
      return false;
    }
  }

  // Investment methods
  async getInvestment(id: number): Promise<Investment | undefined> {
    try {
      const investment = await InvestmentModel.findOne({ localId: id });
      if (!investment) return undefined;
      
      return {
        id,
        userId: mongoIdToNumericId(investment),
        name: investment.name,
        amount: investment.amount.toString(),
        startDate: new Date(investment.startDate),
        endDate: investment.endDate ? new Date(investment.endDate) : null,
        type: investment.type,
        currentValue: investment.currentValue?.toString() || null,
        units: investment.units?.toString() || null,
        purchasePrice: investment.purchasePrice?.toString() || null,
        expectedReturn: investment.expectedReturn?.toString() || null,
        notes: investment.notes || null,
        createdAt: investment.createdAt
      };
    } catch (error) {
      console.error('Error getting investment:', error);
      return undefined;
    }
  }

  async getAllInvestments(userId: number): Promise<Investment[]> {
    try {
      const user = await UserModel.findOne().sort({ createdAt: 1 }).limit(1);
      if (!user) return [];
      
      const investments = await InvestmentModel.find({ userId: user._id });
      
      return investments.map((investment: Document & IInvestment) => ({
        id: mongoIdToNumericId(investment),
        userId,
        name: investment.name,
        amount: numberToString(investment.amount),
        startDate: investment.startDate,
        endDate: investment.endDate ?? null,
        type: investment.type,
        currentValue: numberToString(investment.currentValue),
        units: numberToString(investment.units),
        purchasePrice: numberToString(investment.purchasePrice),
        expectedReturn: numberToString(investment.expectedReturn),
        notes: optionalString(investment.notes),
        createdAt: investment.createdAt
      }));
    } catch (error) {
      console.error('Error getting all investments:', error);
      return [];
    }
  }

  async createInvestment(investment: InsertInvestment): Promise<Investment> {
    try {
      const user = await UserModel.findOne().sort({ createdAt: 1 }).limit(1);
      if (!user) {
        throw new Error('User not found');
      }

      const localId = Math.floor(Math.random() * 1000000);
      
      const newInvestment = new InvestmentModel({
        userId: user._id,
        localId,
        name: investment.name,
        amount: stringToNumber(investment.amount),
        startDate: toSchemaOptionalDate(investment.startDate),
        endDate: investment.endDate ? toSchemaOptionalDate(investment.endDate) : null,
        type: investment.type,
        currentValue: stringToNumber(investment.currentValue),
        units: stringToNumber(investment.units),
        purchasePrice: stringToNumber(investment.purchasePrice),
        expectedReturn: stringToNumber(investment.expectedReturn),
        notes: investment.notes
      });
      
      const savedInvestment = await newInvestment.save();
      
      return {
        id: localId,
        userId: investment.userId,
        name: savedInvestment.name,
        amount: numberToString(savedInvestment.amount),
        startDate: savedInvestment.startDate,
        endDate: savedInvestment.endDate ?? null,
        type: savedInvestment.type,
        currentValue: numberToString(savedInvestment.currentValue),
        units: numberToString(savedInvestment.units),
        purchasePrice: numberToString(savedInvestment.purchasePrice),
        expectedReturn: numberToString(savedInvestment.expectedReturn),
        notes: optionalString(savedInvestment.notes),
        createdAt: savedInvestment.createdAt
      };
    } catch (error) {
      console.error('Error creating investment:', error);
      throw error;
    }
  }

  async updateInvestment(id: number, investmentData: Partial<InsertInvestment>): Promise<Investment | undefined> {
    try {
      const investment = await InvestmentModel.findOne({ localId: id });
      if (!investment) return undefined;

      // Update fields
      if (investmentData.name) investment.name = investmentData.name;
      if (investmentData.type) investment.type = investmentData.type as "sip" | "stock" | "gold" | "mutual_fund" | "fd";
      if (investmentData.amount) investment.amount = stringToNumber(investmentData.amount);
      if (investmentData.currentValue) investment.currentValue = stringToNumber(investmentData.currentValue);
      if (investmentData.units) investment.units = stringToNumber(investmentData.units);
      if (investmentData.purchasePrice) investment.purchasePrice = stringToNumber(investmentData.purchasePrice);
      if (investmentData.startDate) investment.startDate = toRequiredDate(investmentData.startDate);
      if (investmentData.endDate) investment.endDate = toRequiredDate(investmentData.endDate);
      if (investmentData.expectedReturn) investment.expectedReturn = stringToNumber(investmentData.expectedReturn);
      if (investmentData.notes) investment.notes = investmentData.notes;

      const updatedInvestment = await investment.save();
      
      return {
        id,
        userId: mongoIdToNumericId(updatedInvestment),
        name: updatedInvestment.name,
        type: updatedInvestment.type as "sip" | "stock" | "gold" | "mutual_fund" | "fd",
        amount: numberToString(updatedInvestment.amount),
        currentValue: updatedInvestment.currentValue ? numberToString(updatedInvestment.currentValue) : null,
        units: updatedInvestment.units ? numberToString(updatedInvestment.units) : null,
        purchasePrice: updatedInvestment.purchasePrice ? numberToString(updatedInvestment.purchasePrice) : null,
        startDate: toRequiredDate(updatedInvestment.startDate),
        endDate: toSchemaOptionalDate(updatedInvestment.endDate),
        expectedReturn: updatedInvestment.expectedReturn ? numberToString(updatedInvestment.expectedReturn) : null,
        notes: optionalString(updatedInvestment.notes),
        createdAt: toRequiredDate(updatedInvestment.createdAt)
      };
    } catch (error) {
      console.error('Error updating investment:', error);
      return undefined;
    }
  }

  async deleteInvestment(id: number): Promise<boolean> {
    try {
      const result = await InvestmentModel.deleteOne({ localId: id });
      return result.deletedCount > 0;
    } catch (error) {
      console.error('Error deleting investment:', error);
      return false;
    }
  }

  // SIP methods
  async getSip(id: number): Promise<Sip | undefined> {
    try {
      const sip = await SipModel.findOne({ localId: id });
      if (!sip) return undefined;
      
      return {
        id,
        userId: mongoIdToNumericId(sip),
        investmentId: sip.investmentId ? Number(sip.investmentId.toString().slice(-6)) % 10000 : null,
        name: sip.name,
        amount: numberToString(sip.amount),
        frequency: sip.frequency as "daily" | "weekly" | "monthly" | "quarterly",
        startDate: toRequiredDate(sip.startDate),
        endDate: toSchemaOptionalDate(sip.endDate),
        expectedReturn: sip.expectedReturn ? numberToString(sip.expectedReturn) : null,
        totalInvested: numberToString(sip.totalInvested),
        currentValue: sip.currentValue ? numberToString(sip.currentValue) : null,
        notes: optionalString(sip.notes),
        createdAt: toRequiredDate(sip.createdAt)
      };
    } catch (error) {
      console.error('Error getting SIP:', error);
      return undefined;
    }
  }

  async getAllSips(userId: number): Promise<Sip[]> {
    try {
      const user = await UserModel.findOne().sort({ createdAt: 1 }).limit(1);
      if (!user) return [];
      
      const sips = await SipModel.find({ userId: user._id });
      
      return sips.map((sip: Document & ISip) => ({
        id: mongoIdToNumericId(sip),
        userId,
        investmentId: sip.investmentId ? Number(sip.investmentId.toString().slice(-6)) % 10000 : null,
        name: sip.name,
        amount: numberToString(sip.amount),
        frequency: sip.frequency as "daily" | "weekly" | "monthly" | "quarterly",
        startDate: toRequiredDate(sip.startDate),
        endDate: toSchemaOptionalDate(sip.endDate),
        expectedReturn: sip.expectedReturn ? numberToString(sip.expectedReturn) : null,
        totalInvested: numberToString(sip.totalInvested),
        currentValue: sip.currentValue ? numberToString(sip.currentValue) : null,
        notes: optionalString(sip.notes),
        createdAt: toRequiredDate(sip.createdAt)
      }));
    } catch (error) {
      console.error('Error getting all SIPs:', error);
      return [];
    }
  }

  async createSip(sip: InsertSip): Promise<Sip> {
    try {
      const user = await UserModel.findOne().sort({ createdAt: 1 }).limit(1);
      if (!user) {
        throw new Error('User not found');
      }

      const localId = Math.floor(Math.random() * 1000000);
      
      const newSip = new SipModel({
        userId: user._id,
        localId,
        investmentId: sip.investmentId ? await InvestmentModel.findOne({ localId: sip.investmentId }) : undefined,
        name: sip.name,
        amount: stringToNumber(sip.amount),
        frequency: sip.frequency as "daily" | "weekly" | "monthly" | "quarterly",
        startDate: toRequiredDate(sip.startDate),
        endDate: sip.endDate ? toRequiredDate(sip.endDate) : undefined,
        expectedReturn: sip.expectedReturn ? stringToNumber(sip.expectedReturn) : undefined,
        totalInvested: stringToNumber(sip.totalInvested || '0'),
        currentValue: sip.currentValue ? stringToNumber(sip.currentValue) : undefined,
        notes: sip.notes
      });
      
      const savedSip = await newSip.save();
      
      return {
        id: localId,
        userId: sip.userId,
        investmentId: savedSip.investmentId ? Number(savedSip.investmentId.toString().slice(-6)) % 10000 : null,
        name: savedSip.name,
        amount: numberToString(savedSip.amount),
        frequency: savedSip.frequency as "daily" | "weekly" | "monthly" | "quarterly",
        startDate: toRequiredDate(savedSip.startDate),
        endDate: toSchemaOptionalDate(savedSip.endDate),
        expectedReturn: savedSip.expectedReturn ? numberToString(savedSip.expectedReturn) : null,
        totalInvested: numberToString(savedSip.totalInvested),
        currentValue: savedSip.currentValue ? numberToString(savedSip.currentValue) : null,
        notes: optionalString(savedSip.notes),
        createdAt: toRequiredDate(savedSip.createdAt)
      };
    } catch (error) {
      console.error('Error creating SIP:', error);
      throw error;
    }
  }

  async updateSip(id: number, sipData: Partial<InsertSip>): Promise<Sip | undefined> {
    try {
      const sip = await SipModel.findOne({ localId: id });
      if (!sip) return undefined;

      // Update fields
      if (sipData.name) sip.name = sipData.name;
      if (sipData.amount) sip.amount = stringToNumber(sipData.amount);
      if (sipData.frequency) sip.frequency = sipData.frequency as "daily" | "weekly" | "monthly" | "quarterly";
      if (sipData.startDate) sip.startDate = toRequiredDate(sipData.startDate);
      if (sipData.endDate) sip.endDate = toRequiredDate(sipData.endDate);
      if (sipData.expectedReturn) sip.expectedReturn = stringToNumber(sipData.expectedReturn);
      if (sipData.totalInvested) sip.totalInvested = stringToNumber(sipData.totalInvested);
      if (sipData.currentValue) sip.currentValue = stringToNumber(sipData.currentValue);
      if (sipData.notes) sip.notes = sipData.notes;
      if (sipData.investmentId) {
        const investment = await InvestmentModel.findOne({ localId: sipData.investmentId });
        sip.investmentId = investment ? investment._id as unknown as mongoose.Types.ObjectId : undefined;
      }

      const updatedSip = await sip.save();
      
      return {
        id,
        userId: mongoIdToNumericId(updatedSip),
        investmentId: updatedSip.investmentId ? Number(updatedSip.investmentId.toString().slice(-6)) % 10000 : null,
        name: updatedSip.name,
        amount: numberToString(updatedSip.amount),
        frequency: updatedSip.frequency as "daily" | "weekly" | "monthly" | "quarterly",
        startDate: toRequiredDate(updatedSip.startDate),
        endDate: toSchemaOptionalDate(updatedSip.endDate),
        expectedReturn: updatedSip.expectedReturn ? numberToString(updatedSip.expectedReturn) : null,
        totalInvested: numberToString(updatedSip.totalInvested),
        currentValue: updatedSip.currentValue ? numberToString(updatedSip.currentValue) : null,
        notes: optionalString(updatedSip.notes),
        createdAt: toRequiredDate(updatedSip.createdAt)
      };
    } catch (error) {
      console.error('Error updating SIP:', error);
      return undefined;
    }
  }

  async deleteSip(id: number): Promise<boolean> {
    try {
      const result = await SipModel.deleteOne({ localId: id });
      return result.deletedCount > 0;
    } catch (error) {
      console.error('Error deleting SIP:', error);
      return false;
    }
  }
}