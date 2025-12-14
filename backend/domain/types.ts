export type TxType = "income" | "expense";

export type Transaction = {
  id: string;
  type: TxType;
  amount_cents: number;
  description: string;
  category: string;
  date: string;       // ISO
  created_at: string; // ISO
};
