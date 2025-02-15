
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const categories = [
  { id: "transport", name: "交通費" },
  { id: "food", name: "食費" },
  { id: "entertainment", name: "交際費" },
  { id: "utilities", name: "光熱費" },
  { id: "rent", name: "家賃" },
  { id: "other", name: "その他" },
];

export type Expense = {
  id: string;
  amount: number;
  category: string;
  date: string;
  isRecurring?: boolean;
  monthsToRepeat?: number;
};

export const ExpenseForm = ({
  onSubmit,
}: {
  onSubmit: (expense: Omit<Expense, "id">) => void;
}) => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);
  const [monthsToRepeat, setMonthsToRepeat] = useState("1");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !category) {
      toast({
        title: "エラー",
        description: "金額とカテゴリーを入力してください。",
        variant: "destructive",
      });
      return;
    }

    onSubmit({
      amount: Number(amount),
      category,
      date: new Date().toISOString(),
      isRecurring,
      monthsToRepeat: isRecurring ? Number(monthsToRepeat) : undefined,
    });
    
    setAmount("");
    setCategory("");
    setIsRecurring(false);
    setMonthsToRepeat("1");
    
    toast({
      title: "支出を追加しました",
      description: `${amount}円を${
        categories.find((c) => c.id === category)?.name
      }として記録しました。${
        isRecurring ? `\n${monthsToRepeat}ヶ月間自動で計上されます。` : ""
      }`,
    });
  };

  return (
    <Card className="p-6 animate-fade-up">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="amount">金額</Label>
          <Input
            id="amount"
            type="number"
            placeholder="金額を入力"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="transition-all duration-200 focus:ring-2 focus:ring-primary"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="category">カテゴリー</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="カテゴリーを選択" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="recurring"
            checked={isRecurring}
            onCheckedChange={(checked) => setIsRecurring(checked as boolean)}
          />
          <Label htmlFor="recurring">固定費として登録</Label>
        </div>
        {isRecurring && (
          <div className="space-y-2">
            <Label htmlFor="months">繰り返す月数</Label>
            <Input
              id="months"
              type="number"
              min="1"
              max="12"
              value={monthsToRepeat}
              onChange={(e) => setMonthsToRepeat(e.target.value)}
              className="transition-all duration-200 focus:ring-2 focus:ring-primary"
            />
          </div>
        )}
        <Button type="submit" className="w-full">
          <Plus className="mr-2 h-4 w-4" />
          支出を追加
        </Button>
      </form>
    </Card>
  );
};
