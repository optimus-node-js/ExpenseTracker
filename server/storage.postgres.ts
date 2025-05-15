import { eq } from 'drizzle-orm';
import { db } from './db';
import { 
  users, budgets, transactions, bankStatements, subscriptions,
  loans, incomeSources, investments, sips,
  type User, type InsertUser,
  type Transaction, type InsertTransaction,
  type Budget, type InsertBudget,
  type BankStatement, type InsertBankStatement,
  type Subscription, type InsertSubscription,
  type Loan, type InsertLoan,
  type IncomeSource, type InsertIncomeSource,
  type Investment, type InsertInvestment,
  type Sip, type InsertSip
} from '@shared/schema';
import { IStorage } from './storage';

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }
  
  async getAllUsers(): Promise<User[]> {
    return db.select().from(users);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async updateUser(id: number, userData: Partial<InsertUser>): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set(userData)
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  async updateCashReserve(id: number, amount: number): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({ cashReserve: amount })
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  // Transaction methods
  async getTransaction(id: number): Promise<Transaction | undefined> {
    const [transaction] = await db.select().from(transactions).where(eq(transactions.id, id));
    return transaction;
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
    return updatedTransaction;
  }

  async deleteTransaction(id: number): Promise<boolean> {
    const result = await db
      .delete(transactions)
      .where(eq(transactions.id, id));
    return !!result;
  }

  // Budget methods
  async getBudget(id: number): Promise<Budget | undefined> {
    const [budget] = await db.select().from(budgets).where(eq(budgets.id, id));
    return budget;
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
    return updatedBudget;
  }

  async deleteBudget(id: number): Promise<boolean> {
    const result = await db
      .delete(budgets)
      .where(eq(budgets.id, id));
    return !!result;
  }

  // Bank statement methods
  async getBankStatement(id: number): Promise<BankStatement | undefined> {
    const [statement] = await db.select().from(bankStatements).where(eq(bankStatements.id, id));
    return statement;
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
    return subscription;
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
    return updatedSubscription;
  }

  async deleteSubscription(id: number): Promise<boolean> {
    const result = await db
      .delete(subscriptions)
      .where(eq(subscriptions.id, id));
    return !!result;
  }

  // Loan methods (for lending/borrowing)
  async getLoan(id: number): Promise<Loan | undefined> {
    const [loan] = await db.select().from(loans).where(eq(loans.id, id));
    return loan;
  }

  async getAllLoans(userId: number): Promise<Loan[]> {
    return db.select().from(loans).where(eq(loans.userId, userId));
  }

  async createLoan(loan: InsertLoan): Promise<Loan> {
    const [newLoan] = await db
      .insert(loans)
      .values(loan)
      .returning();
    return newLoan;
  }

  async updateLoan(id: number, loan: Partial<InsertLoan>): Promise<Loan | undefined> {
    const [updatedLoan] = await db
      .update(loans)
      .set(loan)
      .where(eq(loans.id, id))
      .returning();
    return updatedLoan;
  }

  async deleteLoan(id: number): Promise<boolean> {
    const result = await db
      .delete(loans)
      .where(eq(loans.id, id));
    return !!result;
  }

  // Income Sources methods
  async getIncomeSource(id: number): Promise<IncomeSource | undefined> {
    const [incomeSource] = await db.select().from(incomeSources).where(eq(incomeSources.id, id));
    return incomeSource;
  }

  async getAllIncomeSources(userId: number): Promise<IncomeSource[]> {
    return db.select().from(incomeSources).where(eq(incomeSources.userId, userId));
  }

  async createIncomeSource(incomeSource: InsertIncomeSource): Promise<IncomeSource> {
    const [newIncomeSource] = await db
      .insert(incomeSources)
      .values(incomeSource)
      .returning();
    return newIncomeSource;
  }

  async updateIncomeSource(id: number, incomeSource: Partial<InsertIncomeSource>): Promise<IncomeSource | undefined> {
    const [updatedSource] = await db
      .update(incomeSources)
      .set(incomeSource)
      .where(eq(incomeSources.id, id))
      .returning();
    return updatedSource;
  }

  async deleteIncomeSource(id: number): Promise<boolean> {
    const result = await db
      .delete(incomeSources)
      .where(eq(incomeSources.id, id));
    return !!result;
  }

  // Investment methods
  async getInvestment(id: number): Promise<Investment | undefined> {
    const [investment] = await db.select().from(investments).where(eq(investments.id, id));
    return investment;
  }

  async getAllInvestments(userId: number): Promise<Investment[]> {
    return db.select().from(investments).where(eq(investments.userId, userId));
  }

  async createInvestment(investment: InsertInvestment): Promise<Investment> {
    const [newInvestment] = await db
      .insert(investments)
      .values(investment)
      .returning();
    return newInvestment;
  }

  async updateInvestment(id: number, investment: Partial<InsertInvestment>): Promise<Investment | undefined> {
    const [updatedInvestment] = await db
      .update(investments)
      .set(investment)
      .where(eq(investments.id, id))
      .returning();
    return updatedInvestment;
  }

  async deleteInvestment(id: number): Promise<boolean> {
    const result = await db
      .delete(investments)
      .where(eq(investments.id, id));
    return !!result;
  }

  // SIP methods
  async getSip(id: number): Promise<Sip | undefined> {
    const [sip] = await db.select().from(sips).where(eq(sips.id, id));
    return sip;
  }

  async getAllSips(userId: number): Promise<Sip[]> {
    return db.select().from(sips).where(eq(sips.userId, userId));
  }

  async createSip(sip: InsertSip): Promise<Sip> {
    const [newSip] = await db
      .insert(sips)
      .values(sip)
      .returning();
    return newSip;
  }

  async updateSip(id: number, sip: Partial<InsertSip>): Promise<Sip | undefined> {
    const [updatedSip] = await db
      .update(sips)
      .set(sip)
      .where(eq(sips.id, id))
      .returning();
    return updatedSip;
  }

  async deleteSip(id: number): Promise<boolean> {
    const result = await db
      .delete(sips)
      .where(eq(sips.id, id));
    return !!result;
  }

  // Additional methods for transaction processing
  async findDuplicateTransaction(transaction: InsertTransaction): Promise<Transaction | undefined> {
    // Find transactions with the same date, amount, and description
    const [duplicate] = await db
      .select()
      .from(transactions)
      .where(eq(transactions.userId, transaction.userId))
      .where(eq(transactions.date, transaction.date))
      .where(eq(transactions.amount, transaction.amount))
      .where(eq(transactions.description, transaction.description));
    
    return duplicate;
  }
}