import { useCalculatorStore } from "@/store/useCalculatorStore";
import { Card } from "@repo/ui/components/card";

export function ProductCard() {
  const form = useCalculatorStore((state) => state.form);

  return <Card className="w-3xl">stock</Card>;
}
