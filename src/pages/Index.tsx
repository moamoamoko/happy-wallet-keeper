import { useState } from "react";
import { ExpenseForm, Expense } from "@/components/ExpenseForm";
import { IncomeForm } from "@/components/IncomeForm";
import { Summary } from "@/components/Summary";
import { format, addMonths, startOfMonth, endOfMonth } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { categories } from "@/lib/constants";

type Transaction = {
  id: string;
  amount: number;
  category?: string;
  date: string;
  isRecurring?: boolean;
  monthsToRepeat?: number;
};

const generateId = () => Math.random().toString(36).substr(2, 9);

const Index = () => {
  const [selectedMonth, setSelectedMonth] = useState(() => 
    format(new Date(), "yyyy-MM")
  );
  const [income, setIncome] = useState<Transaction[]>([]);
  const [expenses, setExpenses] = useState<Transaction[]>([]);

  const handleIncomeSubmit = (newIncome: Omit<Transaction, "id">) => {
    setIncome([...income, { ...newIncome, id: generateId() }]);
  };

  const handleExpenseSubmit = (newExpense: Omit<Expense, "id">) => {
    const expensesToAdd: Omit<Transaction, "id">[] = [];
    
    if (newExpense.isRecurring && newExpense.monthsToRepeat) {
      for (let i = 0; i < newExpense.monthsToRepeat; i++) {
        expensesToAdd.push({
          ...newExpense,
          date: addMonths(new Date(newExpense.date), i).toISOString(),
        });
      }
    } else {
      expensesToAdd.push(newExpense);
    }
    
    const newExpenses = expensesToAdd.map(expense => ({
      ...expense,
      id: generateId(),
    }));
    
    setExpenses([...expenses, ...newExpenses]);
  };

  const handleDeleteIncome = (id: string) => {
    setIncome(income.filter((item) => item.id !== id));
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter((item) => item.id !== id));
  };

  const filteredIncome = income.filter((item) => {
    const itemDate = new Date(item.date);
    const monthStart = startOfMonth(new Date(selectedMonth));
    const monthEnd = endOfMonth(new Date(selectedMonth));
    return itemDate >= monthStart && itemDate <= monthEnd;
  });

  const filteredExpenses = expenses.filter((item) => {
    const itemDate = new Date(item.date);
    const monthStart = startOfMonth(new Date(selectedMonth));
    const monthEnd = endOfMonth(new Date(selectedMonth));
    return itemDate >= monthStart && itemDate <= monthEnd;
  });

  const totalIncome = filteredIncome.reduce((sum, i) => sum + i.amount, 0);
  const totalExpenses = filteredExpenses.reduce((sum, e) => sum + e.amount, 0);

  // 過去12ヶ月から未来3ヶ月までの選択肢を生成
  const monthOptions = Array.from({ length: 16 }, (_, i) => {
    const date = addMonths(new Date(), -12 + i);
    return {
      value: format(date, "yyyy-MM"),
      label: format(date, "yyyy年M月"),
    };
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-8 space-y-8">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          家計簿アプリ
        </h1>
        
        <div className="w-full max-w-xs mx-auto">
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger>
              <SelectValue placeholder="月を選択" />
            </SelectTrigger>
            <SelectContent>
              {monthOptions.map((month) => (
                <SelectItem key={month.value} value={month.value}>
                  {month.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Summary income={totalIncome} expenses={totalExpenses} />
        
        <div className="grid md:grid-cols-2 gap-8">
          <IncomeForm onSubmit={handleIncomeSubmit} />
          <ExpenseForm onSubmit={handleExpenseSubmit} />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">収入履歴</h3>
            <div className="space-y-2">
              {filteredIncome.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-2 bg-white rounded shadow-sm">
                  <div>
                    <span className="font-medium">{item.amount.toLocaleString()}円</span>
                    <span className="text-sm text-gray-500 ml-2">
                      {format(new Date(item.date), "M/d")}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteIncome(item.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">支出履歴</h3>
            <div className="space-y-2">
              {filteredExpenses.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-2 bg-white rounded shadow-sm">
                  <div>
                    <span className="font-medium">{item.amount.toLocaleString()}円</span>
                    <span className="text-sm text-gray-500 ml-2">
                      {categories.find(c => c.id === item.category)?.name}
                    </span>
                    <span className="text-sm text-gray-500 ml-2">
                      {format(new Date(item.date), "M/d")}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteExpense(item.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
