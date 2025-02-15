
import { Card } from "@/components/ui/card";
import { ChartBar } from "lucide-react";

export const Summary = ({
  income,
  expenses,
}: {
  income: number;
  expenses: number;
}) => {
  const balance = income - expenses;
  const isPositive = balance >= 0;

  return (
    <Card className="p-6 animate-fade-down">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center">
          <ChartBar className="mr-2 h-5 w-5" />
          収支サマリー
        </h2>
      </div>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-sm text-gray-500 mb-1">収入</p>
          <p className="text-lg font-semibold text-primary">
            {income.toLocaleString()}円
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-1">支出</p>
          <p className="text-lg font-semibold text-secondary">
            {expenses.toLocaleString()}円
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-1">残高</p>
          <p
            className={`text-lg font-semibold ${
              isPositive ? "text-green-500" : "text-red-500"
            }`}
          >
            {balance.toLocaleString()}円
          </p>
        </div>
      </div>
    </Card>
  );
};
