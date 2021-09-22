import { createContext, useState, ReactNode, useEffect, useContext } from "react";
import { api } from "../../services/api";

interface Transaction {
  id: number;
  title: string,
  amount: string;
  type: string;
  category: string;
  createdAt: string;
};

interface TransactionProviderProps {
  children: ReactNode;
}

interface TransactionContextData {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
  setTransactions: (transactions: Transaction[]) => void;
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

export const TransactionsContext = createContext<TransactionContextData>(
  {} as TransactionContextData
);

export function TransactionsProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api.get('transactions')
      .then((response) => setTransactions(response.data.transactions))
  }, []);

  async function createTransaction(transactionInput: TransactionInput) {
   const response = await api.post('/transactions', {
     ...transactionInput,
     createdAt: new Date(),
   });
   const { transaction } = response.data;

    setTransactions([...transactions, transaction]);
  }

  return(
    <TransactionsContext.Provider value={{ transactions, createTransaction, setTransactions }}>
      {children}
    </TransactionsContext.Provider>
  )
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}
