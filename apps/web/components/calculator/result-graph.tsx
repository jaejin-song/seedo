import { CalculatorResult } from "@/types/calculator";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { Component } from "./chart-graph";

interface ResultGraphProps {
  result: CalculatorResult;
}

export function ResultGraph({ result }: ResultGraphProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>수익률 그래프</CardTitle>
      </CardHeader>
      <CardContent>
        <Component />
      </CardContent>
    </Card>
  );
}
