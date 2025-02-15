
import { useState } from "react";
import { ExpenseForm } from "@/components/ExpenseForm";
import { IncomeForm } from "@/components/IncomeForm";
import { Summary } from "@/components/Summary";

type Transaction = {
  amount: number;
  category?: string;
  date: string;
};

const Index = () => {
  const [income, setIncome] = useState<Transaction[]>([]);
  const [expenses, setExpenses] = useState<Transaction[]>([]);

  const handleIncomeSubmit = (newIncome: Transaction) => {
    setIncome([...income, newIncome]);
  };

  const handleExpenseSubmit = (newExpense: Transaction) => {
    setExpenses([...expenses, newExpense]);
  };

  const totalIncome = income.reduce((sum, i) => sum + i.amount, 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-8 space-y-8">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          家計簿アプリ
        </h1>
        <Summary income={totalIncome} expenses={totalExpenses} />
        <div className="grid md:grid-cols-2 gap-8">
          <IncomeForm onSubmit={handleIncomeSubmit} />
          <ExpenseForm onSubmit={handleExpenseSubmit} />
        </div>
      </div>
    </div>
  );
};

export default Index;
