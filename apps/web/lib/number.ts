export function kunit(amount: number, unit: "원" | "만" | "억" | "조"): number {
  const units = {
    원: 1,
    만: 1_0000,
    억: 1_0000_0000,
    조: 1_0000_0000_0000,
  };

  return amount * units[unit];
}
