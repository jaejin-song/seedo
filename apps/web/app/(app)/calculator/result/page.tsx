import CalculatorLayout from "@/components/calculator-layout";
import { ResultGraph } from "@/components/calculator/result-graph";
import { ResultInfo } from "@/components/calculator/result-info";
import { API_ROUTES } from "@/const/api";
import { apiInstance } from "@/lib/ky";
import { CalculatorResult } from "@/types/calculator";
import { Button } from "@repo/ui/components/button";
import Link from "next/link";
import { redirect } from "next/navigation";

async function fetchResult(searchParams: {
  amount: string;
  date: string;
  method: string;
  symbol: string;
  percent: string;
}) {
  try {
    const res = await apiInstance.get(API_ROUTES.CALCULATOR.GET.url, {
      searchParams,
    });

    if (!res.ok) return undefined;

    return (await res.json<{ success: true; data: CalculatorResult }>()).data;
  } catch (error) {
    console.error("Failed to get calculator result:>>", error);
  }
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

  // 함수를 카드 안으로?
  const result = await fetchResult(_searchParams);
  if (!result) {
    redirect("/calculator");
  }

  return (
    <CalculatorLayout title="수익률 계산 결과">
      <div className="flex justify-center">
        <div className="flex flex-col gap-6 w-4xl">
          <ResultInfo result={result} />
          <ResultGraph result={result} />
          <div className="flex justify-center gap-6">
            <Button size="lg" asChild>
              <Link href="/calculator">다시 계산하기</Link>
            </Button>
            <Button size="lg" variant="outline">
              결과 저장하기
            </Button>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
}
