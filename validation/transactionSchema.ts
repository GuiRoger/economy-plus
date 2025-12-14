import { z } from "zod";
import { brlToCents } from "../utils/money";

export const transactionFormSchema = z.object({
  amountText: z
    .string()
    .min(1, "Informe o valor")
    .refine((v) => !Number.isNaN(brlToCents(v)), "Valor inválido")
    .refine((v) => brlToCents(v) > 0, "O valor precisa ser maior que zero"),

  description: z
    .string()
    .trim()
    .min(2, "Descrição muito curta")
    .max(120, "Máximo de 120 caracteres"),

  category: z
    .string()
    .trim()
    .min(1, "Selecione uma categoria"),
});

export type TransactionForm = z.infer<typeof transactionFormSchema>;
