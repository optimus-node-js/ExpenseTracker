import { Transaction } from "@/types";
import { formatCurrency, formatDate, getCategoryColor, getCategoryIcon, getPaymentModeIcon } from "@/lib/utils";

interface TransactionItemProps {
  transaction: Transaction;
}

export function TransactionItem({ transaction }: TransactionItemProps) {
  const { 
    description, 
    amount, 
    date, 
    type, 
    category, 
    paymentMode, 
    source 
  } = transaction;
  
  return (
    <tr className="hover:bg-muted cursor-pointer transition-colors duration-150">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className={`flex-shrink-0 h-8 w-8 rounded-full ${
            type === "expense" 
              ? "bg-red-100 dark:bg-red-900/30 text-destructive" 
              : "bg-green-100 dark:bg-green-900/30 text-secondary"
          } flex items-center justify-center`}>
            <i className={getCategoryIcon(category)}></i>
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-foreground">{description}</div>
            <div className="text-xs text-muted-foreground">{source || "Manual Entry"}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getCategoryColor(category)}`}>
          {category}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-muted-foreground">{formatDate(date)}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center text-sm text-muted-foreground">
          <i className={`${getPaymentModeIcon(paymentMode)} mr-1`}></i>
          {paymentMode}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <span className={type === "income" ? "text-success" : "text-destructive"}>
          {type === "income" ? "+" : "-"}{formatCurrency(amount)}
        </span>
      </td>
    </tr>
  );
}
