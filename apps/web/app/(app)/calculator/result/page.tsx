import { ResultInfo } from "@/components/calculator/result-info";
import { API_ROUTES } from "@/const/api";
import { apiInstance } from "@/lib/ky";
import { CalculatorResult } from "@/types/calculator";
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
    <div className="flex justify-center">
      <div className="flex flex-col">
        <ResultInfo className="w-4xl" result={result} />
      </div>
    </div>
  );
}
