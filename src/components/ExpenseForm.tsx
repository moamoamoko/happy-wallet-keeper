
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
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

export const ExpenseForm = ({
  onSubmit,
}: {
  onSubmit: (expense: { amount: number; category: string; date: string }) => void;
}) => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
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
    });
    setAmount("");
    setCategory("");
    toast({
      title: "支出を追加しました",
      description: `${amount}円を${
        categories.find((c) => c.id === category)?.name
      }として記録しました。`,
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
        <Button type="submit" className="w-full">
          <Plus className="mr-2 h-4 w-4" />
          支出を追加
        </Button>
      </form>
    </Card>
  );
};
