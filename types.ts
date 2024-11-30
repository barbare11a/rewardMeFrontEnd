export interface ExpenseType {
  id: string;
  name: string;
  amount: string;
  percentage: string;
}

export interface IncomeType {
  link: string | undefined;
  id: string;
  name: string;
  amount: string;
}

export interface SpendingType {
  id: string;
  name: string;
  amount: string;
  date: string;
}