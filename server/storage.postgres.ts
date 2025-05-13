import { and, eq } from 'drizzle-orm';
import { 
  users, 
  transactions, 
  budgets, 
  bankStatements, 
  subscriptions,
  loans,
  incomeSources,
  investments,
  sips,
  type User, 
  type InsertUser, 
  type Transaction, 
  type InsertTransaction, 
  type Budget, 
  type InsertBudget, 
  type BankStatement, 
  type InsertBankStatement, 
  type Subscription, 
  type InsertSubscription,
  type Loan,
  type InsertLoan,
  type IncomeSource,
  type InsertIncomeSource,
  type Investment,
  type InsertInvestment,
  type Sip,
  type InsertSip
} from "@shared/schema";
import { db } from "./db";
import { IStorage } from "./storage";

// DatabaseStorage implementation using PostgreSQL with Drizzle ORM
export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }
  
  // Transaction methods
  async getTransaction(id: number): Promise<Transaction | undefined> {
    const [transaction] = await db.select().from(transactions).where(eq(transactions.id, id));
    return transaction || undefined;
  }
  
  async getAllTransactions(userId: number): Promise<Transaction[]> {
    return db.select().from(transactions).where(eq(transactions.userId, userId));
  }
  
  async createTransaction(transaction: InsertTransaction): Promise<Transaction> {
    const [newTransaction] = await db
      .insert(transactions)
      .values(transaction)
      .returning();
    return newTransaction;
  }
  
  async updateTransaction(id: number, transaction: InsertTransaction): Promise<Transaction | undefined> {
    const [updatedTransaction] = await db
      .update(transactions)
      .set(transaction)
      .where(eq(transactions.id, id))
      .returning();
    return updatedTransaction || undefined;
  }
  
  async deleteTransaction(id: number): Promise<boolean> {
    const result = await db
      .delete(transactions)
      .where(eq(transactions.id, id))
      .returning();
    return result.length > 0;
  }
  
  // Budget methods
  async getBudget(id: number): Promise<Budget | undefined> {
    const [budget] = await db.select().from(budgets).where(eq(budgets.id, id));
    return budget || undefined;
  }
  
  async getAllBudgets(userId: number): Promise<Budget[]> {
    return db.select().from(budgets).where(eq(budgets.userId, userId));
  }
  
  async createBudget(budget: InsertBudget): Promise<Budget> {
    const [newBudget] = await db
      .insert(budgets)
      .values(budget)
      .returning();
    return newBudget;
  }
  
  async updateBudget(id: number, budget: InsertBudget): Promise<Budget | undefined> {
    const [updatedBudget] = await db
      .update(budgets)
      .set(budget)
      .where(eq(budgets.id, id))
      .returning();
    return updatedBudget || undefined;
  }
  
  async deleteBudget(id: number): Promise<boolean> {
    const result = await db
      .delete(budgets)
      .where(eq(budgets.id, id))
      .returning();
    return result.length > 0;
  }
  
  // Bank statement methods
  async getBankStatement(id: number): Promise<BankStatement | undefined> {
    const [statement] = await db.select().from(bankStatements).where(eq(bankStatements.id, id));
    return statement || undefined;
  }
  
  async getAllBankStatements(userId: number): Promise<BankStatement[]> {
    return db.select().from(bankStatements).where(eq(bankStatements.userId, userId));
  }
  
  async createBankStatement(statement: InsertBankStatement): Promise<BankStatement> {
    const [newStatement] = await db
      .insert(bankStatements)
      .values(statement)
      .returning();
    return newStatement;
  }
  
  // Subscription methods
  async getSubscription(id: number): Promise<Subscription | undefined> {
    const [subscription] = await db.select().from(subscriptions).where(eq(subscriptions.id, id));
    return subscription || undefined;
  }
  
  async getAllSubscriptions(userId: number): Promise<Subscription[]> {
    return db.select().from(subscriptions).where(eq(subscriptions.userId, userId));
  }
  
  async createSubscription(subscription: InsertSubscription): Promise<Subscription> {
    const [newSubscription] = await db
      .insert(subscriptions)
      .values(subscription)
      .returning();
    return newSubscription;
  }
  
  async updateSubscription(id: number, subscription: InsertSubscription): Promise<Subscription | undefined> {
    const [updatedSubscription] = await db
      .update(subscriptions)
      .set(subscription)
      .where(eq(subscriptions.id, id))
      .returning();
    return updatedSubscription || undefined;
  }
  
  async deleteSubscription(id: number): Promise<boolean> {
    const result = await db
      .delete(subscriptions)
      .where(eq(subscriptions.id, id))
      .returning();
    return result.length > 0;
  }
  
  // Check for duplicate transactions based on date, amount, and description
  async findDuplicateTransaction(transaction: InsertTransaction): Promise<Transaction | undefined> {
    const transactionDate = new Date(transaction.date);
    const startOfDay = new Date(transactionDate);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(transactionDate);
    endOfDay.setHours(23, 59, 59, 999);
    
    const [duplicate] = await db
      .select()
      .from(transactions)
      .where(
        and(
          eq(transactions.userId, transaction.userId),
          eq(transactions.amount, transaction.amount),
          eq(transactions.description, transaction.description)
        )
      );
    
    return duplicate || undefined;
  }
}