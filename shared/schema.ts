import { pgTable, text, serial, integer, numeric, timestamp, boolean, primaryKey } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  fullName: text("full_name").notNull(),
  cashReserve: numeric("cash_reserve", { precision: 10, scale: 2 }).default("0").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Categories table
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  icon: text("icon"),
  color: text("color"),
});

// Transactions table
export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  description: text("description").notNull(),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  date: timestamp("date").notNull(),
  category: text("category").notNull(),
  type: text("type").notNull(), // 'income' or 'expense'
  paymentMode: text("payment_mode").notNull(),
  notes: text("notes"),
  tags: text("tags").array(),
  source: text("source"), // e.g., 'manual', 'import', 'recurring'
  reference: text("reference"), // For bank statement reference number
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Budgets table
export const budgets = pgTable("budgets", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  category: text("category").notNull(),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  period: text("period").notNull(), // 'weekly' or 'monthly'
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// BankStatements table
export const bankStatements = pgTable("bank_statements", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  filename: text("filename").notNull(),
  fileType: text("file_type").notNull(), // 'pdf' or 'excel'
  fileUrl: text("file_url"), // Cloudinary URL for the file
  publicId: text("public_id"), // Cloudinary public ID for reference
  bankName: text("bank_name"),
  accountNumber: text("account_number"),
  statementPeriod: text("statement_period"),
  processedAt: timestamp("processed_at").defaultNow().notNull(),
  totalTransactions: integer("total_transactions"),
  importedTransactions: integer("imported_transactions"),
  skippedDuplicates: integer("skipped_duplicates"),
});

// Subscriptions table
export const subscriptions = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  name: text("name").notNull(),
  description: text("description"),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  billingCycle: text("billing_cycle").notNull(), // 'weekly', 'monthly', 'quarterly', 'yearly'
  startDate: timestamp("start_date").notNull(),
  nextBillingDate: timestamp("next_billing_date").notNull(),
  category: text("category").notNull(),
  paymentMethod: text("payment_method").notNull(),
  autoRenew: boolean("auto_renew").default(true),
  active: boolean("active").default(true),
  reminderDays: integer("reminder_days").default(3),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Loans table (for lending/borrowing)
export const loans = pgTable("loans", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  personName: text("person_name").notNull(),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  type: text("type").notNull(), // 'lent' or 'borrowed'
  date: timestamp("date").notNull(),
  dueDate: timestamp("due_date"),
  status: text("status").notNull().default("pending"), // 'pending', 'partially_paid', 'paid'
  paidAmount: numeric("paid_amount", { precision: 10, scale: 2 }).default("0"),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Income Sources table
export const incomeSources = pgTable("income_sources", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  name: text("name").notNull(),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(), // Monthly amount
  frequency: text("frequency").notNull().default("monthly"), // 'daily', 'weekly', 'monthly', 'yearly'
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date"), // Null if ongoing
  category: text("category").notNull(), // 'job', 'freelance', 'business', etc.
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Investments table
export const investments = pgTable("investments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  name: text("name").notNull(),
  type: text("type").notNull(), // 'sip', 'stock', 'gold', 'mutual_fund', 'fd', etc.
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(), // Total invested amount
  currentValue: numeric("current_value", { precision: 10, scale: 2 }), // Current market value
  units: numeric("units", { precision: 10, scale: 4 }), // Number of units/shares
  purchasePrice: numeric("purchase_price", { precision: 10, scale: 2 }), // Per unit purchase price
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date"), // For time-bound investments like FDs
  expectedReturn: numeric("expected_return", { precision: 5, scale: 2 }), // Annual expected return percentage
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// SIP (Systematic Investment Plan) table
export const sips = pgTable("sips", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  investmentId: integer("investment_id").references(() => investments.id),
  name: text("name").notNull(),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(), // Monthly SIP amount
  frequency: text("frequency").notNull().default("monthly"), // 'daily', 'weekly', 'monthly', 'quarterly'
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date"), // Null if ongoing
  expectedReturn: numeric("expected_return", { precision: 5, scale: 2 }), // Annual expected return percentage
  totalInvested: numeric("total_invested", { precision: 10, scale: 2 }).default("0"),
  currentValue: numeric("current_value", { precision: 10, scale: 2 }),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Schema validation for user insertion
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

// Schema validation for transaction insertion
export const insertTransactionSchema = createInsertSchema(transactions).omit({
  id: true,
  createdAt: true,
});

// Schema validation for budget insertion
export const insertBudgetSchema = createInsertSchema(budgets).omit({
  id: true,
  createdAt: true,
});

// Schema validation for bank statement insertion
export const insertBankStatementSchema = createInsertSchema(bankStatements).omit({
  id: true,
  processedAt: true,
});

// Schema validation for subscription insertion
export const insertSubscriptionSchema = createInsertSchema(subscriptions).omit({
  id: true,
  createdAt: true,
});

// Schema validation for loan insertion
export const insertLoanSchema = createInsertSchema(loans).omit({
  id: true,
  createdAt: true,
});

// Schema validation for income source insertion
export const insertIncomeSourceSchema = createInsertSchema(incomeSources).omit({
  id: true,
  createdAt: true,
});

// Schema validation for investment insertion
export const insertInvestmentSchema = createInsertSchema(investments).omit({
  id: true,
  createdAt: true,
});

// Schema validation for SIP insertion
export const insertSipSchema = createInsertSchema(sips).omit({
  id: true,
  createdAt: true,
});

// Type definitions
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Transaction = typeof transactions.$inferSelect;
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;

export type Budget = typeof budgets.$inferSelect;
export type InsertBudget = z.infer<typeof insertBudgetSchema>;

export type BankStatement = typeof bankStatements.$inferSelect;
export type InsertBankStatement = z.infer<typeof insertBankStatementSchema>;

export type Subscription = typeof subscriptions.$inferSelect;
export type InsertSubscription = z.infer<typeof insertSubscriptionSchema>;

export type Loan = typeof loans.$inferSelect;
export type InsertLoan = z.infer<typeof insertLoanSchema>;

export type IncomeSource = typeof incomeSources.$inferSelect;
export type InsertIncomeSource = z.infer<typeof insertIncomeSourceSchema>;

export type Investment = typeof investments.$inferSelect;
export type InsertInvestment = z.infer<typeof insertInvestmentSchema>;

export type Sip = typeof sips.$inferSelect;
export type InsertSip = z.infer<typeof insertSipSchema>;
