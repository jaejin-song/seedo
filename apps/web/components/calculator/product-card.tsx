"use client";

import { useTrendingList } from "@/hooks/use-trending-list";
import { useCalculatorStore } from "@/store/useCalculatorStore";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { Input } from "@repo/ui/components/input";
import { useEffect, useMemo, useState } from "react";
import { debounce } from "es-toolkit";

export function ProductCard() {
  const [search, setSearch] = useState<string>("");
  const { data, updateList } = useTrendingList();
  const form = useCalculatorStore((state) => state.form);

  // debounce를 사용하면 리렌더링 무한루프 걸리는 이슈 존재
  // const debouncedSearch = debounce(updateList, 1000);

  // useEffect(() => {
  //   debouncedSearch(search);
  // }, [search, debouncedSearch]);

  useEffect(() => {
    updateList(search);
  }, [search]);

  return (
    <Card className="w-4xl">
      <CardHeader>
        <CardTitle>상품 선택</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="my-4">
          <Input
            className="h-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="종목코드 or 종목이름을 입력하세요"
          />
        </div>
        {data &&
          data.map((product) => (
            <div
              key={product.symbol}
              className="flex h-10 items-center border-b px-4 cursor-pointer rounded-md dark:hover:bg-neutral-700"
              onClick={() =>
                form?.setValue("product", [
                  { symbol: product.symbol, name: product.name },
                ])
              }
            >
              <div className="w-20">{product.symbol}</div>
              <div className="flex-1"> {product.name} </div>
              <div className="text-sm text-muted-foreground pr-4">
                {product.assetType}
              </div>
              <div>{product.exchange}</div>
            </div>
          ))}
      </CardContent>
    </Card>
  );
}
