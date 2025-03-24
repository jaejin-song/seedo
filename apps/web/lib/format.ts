export function formatKoreanCurrency(value: number) {
  if (value === 0) return "0원";

  const JO = 1_0000_0000_0000; // 조
  const EOK = 1_0000_0000; // 억
  const MAN = 1_0000; // 만

  const jo = Math.floor(value / JO);
  const eok = Math.floor((value % JO) / EOK);
  const man = Math.floor((value % EOK) / MAN);
  const won = value % MAN;

  const parts = [];

  if (jo > 0) parts.push(`${jo.toLocaleString()}조`);
  if (eok > 0) parts.push(`${eok.toLocaleString()}억`);
  if (man > 0) parts.push(`${man.toLocaleString()}만`);

  if (won > 0) {
    parts.push(`${won.toLocaleString()}`);
  }

  return `${parts.join("")}원`;
}
