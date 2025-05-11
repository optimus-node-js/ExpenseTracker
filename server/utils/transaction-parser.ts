import { IStorage } from '../storage';
import { parsePdfStatement } from './pdf-parser';
import { parseExcelStatement } from './excel-parser';
import { InsertBankStatement, InsertTransaction } from '@shared/schema';

// Process bank statement file and extract transactions
export async function processStatementFile(
  file: Express.Multer.File,
  password: string | undefined,
  userId: number,
  storage: IStorage
): Promise<{
  total: number;
  added: number;
  duplicates: number;
}> {
  let transactions: InsertTransaction[] = [];
  let bankName = 'Unknown Bank';
  let accountNumber = '';
  let statementPeriod = '';
  
  // Determine file type and parse accordingly
  if (file.mimetype === 'application/pdf') {
    // Parse PDF file
    const result = await parsePdfStatement(file.buffer, password);
    transactions = result.transactions;
    bankName = result.bankName || bankName;
    accountNumber = result.accountNumber || accountNumber;
    statementPeriod = result.statementPeriod || statementPeriod;
  } else if (
    file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
    file.mimetype === 'application/vnd.ms-excel'
  ) {
    // Parse Excel file
    const result = await parseExcelStatement(file.buffer);
    transactions = result.transactions;
    bankName = result.bankName || bankName;
    accountNumber = result.accountNumber || accountNumber;
    statementPeriod = result.statementPeriod || statementPeriod;
  } else {
    throw new Error('Unsupported file format');
  }
  
  // Record the bank statement upload
  const bankStatement: InsertBankStatement = {
    userId,
    filename: file.originalname,
    fileType: file.mimetype === 'application/pdf' ? 'pdf' : 'excel',
    bankName,
    accountNumber,
    statementPeriod,
    totalTransactions: transactions.length,
    importedTransactions: 0,
    skippedDuplicates: 0,
  };
  
  // Process each transaction, checking for duplicates
  const addedTransactions = [];
  const duplicateTransactions = [];
  
  for (const transaction of transactions) {
    // Set the userId for the transaction
    transaction.userId = userId;
    
    // Check for duplicates
    const duplicate = await storage.findDuplicateTransaction(transaction);
    
    if (!duplicate) {
      // If not a duplicate, add the transaction
      await storage.createTransaction(transaction);
      addedTransactions.push(transaction);
    } else {
      duplicateTransactions.push(transaction);
    }
  }
  
  // Update bank statement record with results
  bankStatement.importedTransactions = addedTransactions.length;
  bankStatement.skippedDuplicates = duplicateTransactions.length;
  
  // Save the bank statement record
  await storage.createBankStatement(bankStatement);
  
  // Return summary results
  return {
    total: transactions.length,
    added: addedTransactions.length,
    duplicates: duplicateTransactions.length,
  };
}
