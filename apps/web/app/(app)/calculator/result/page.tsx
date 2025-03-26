import CalculatorLayout from "@/components/calculator-layout";
import { ResultInfo } from "@/components/calculator/result-info";
import { API_ROUTES } from "@/const/api";
import { apiInstance } from "@/lib/ky";
import { CalculatorResult } from "@/types/calculator";
import { Button } from "@repo/ui/components/button";
import { redirect } from "next/navigation";

async function fetchResult(searchParams: {
  amount: string;
  date: string;
  method: string;
  symbol: string;
  percent: string;
}) {
  const res = await apiInstance.get(API_ROUTES.CALCULATOR.GET.url, {
    searchParams,
  });

  if (!res.ok) return undefined;

  return (await res.json<{ success: true; data: CalculatorResult }>()).data;
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    amount: string;
    date: string;
    method: string;
    symbol: string;
    percent: string;
  }>;
}) {
  const _searchParams = await searchParams;

  const result = await fetchResult(_searchParams);
  if (!result) {
    redirect("/");
  }

  return (
    <CalculatorLayout title="수익률 계산 결과">
      <div className="flex justify-center">
        <div className="flex flex-col gap-6">
          <ResultInfo className="w-4xl" result={result} />
          <div className="flex justify-center gap-6">
            <Button size="lg">다시 계산하기</Button>
            <Button size="lg" variant="outline">
              결과 저장하기
            </Button>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
}
