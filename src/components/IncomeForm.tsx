
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const IncomeForm = ({
  onSubmit,
}: {
  onSubmit: (income: { amount: number; date: string }) => void;
}) => {
  const [amount, setAmount] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) {
      toast({
        title: "エラー",
        description: "金額を入力してください。",
        variant: "destructive",
      });
      return;
    }

    onSubmit({
      amount: Number(amount),
      date: new Date().toISOString(),
    });
    setAmount("");
    toast({
      title: "収入を追加しました",
      description: `${amount}円を収入として記録しました。`,
    });
  };

  return (
    <Card className="p-6 animate-fade-up">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="income">収入額</Label>
          <Input
            id="income"
            type="number"
            placeholder="収入額を入力"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="transition-all duration-200 focus:ring-2 focus:ring-primary"
          />
        </div>
        <Button type="submit" className="w-full">
          <DollarSign className="mr-2 h-4 w-4" />
          収入を追加
        </Button>
      </form>
    </Card>
  );
};
