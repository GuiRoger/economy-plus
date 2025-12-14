export function brlToCents(amountText: string) {
  const normalized = amountText
    .replace(/\s/g, "")
    .replace("R$", "")
    .replace(/\./g, "")
    .replace(",", ".");

  const n = Number(normalized);
  if (!Number.isFinite(n)) return NaN;

  return Math.round(n * 100);
}
