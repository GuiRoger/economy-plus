import type { Transaction, TxType } from "../domain/types";
import { db } from "./db";

export function addTransaction(input: {
    id: string;
    type: TxType;
    amountCents: number;
    description: string;
    category: string;
    dateISO: string; // ex: new Date().toISOString()
}) {
    db.runSync(
        `INSERT INTO transactions (id, type, amount_cents, description, category, date, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
            input.id,
            input.type,
            input.amountCents,
            input.description.trim(),
            input.category,
            input.dateISO,
            new Date().toISOString(),
        ]
    );
}

export function listTransactionsPage(params: {
    limit: number;
    cursorDate?: string;
}) {
    if (!params.cursorDate) {
        return db.getAllSync<Transaction>(
            `SELECT * FROM transactions ORDER BY date DESC LIMIT ?`,
            [params.limit]
        );
    }

    return db.getAllSync<Transaction>(
        `SELECT * FROM transactions
     WHERE date < ?
     ORDER BY date DESC
     LIMIT ?`,
        [params.cursorDate, params.limit]
    );
}

export function deleteTransaction(id: string) {
    db.runSync(`DELETE FROM transactions WHERE id = ?`, [id]);
}

export function getMonthSummary(params: { year: number; month: number }) {
    // month: 1-12
    const start = new Date(params.year, params.month - 1, 1).toISOString();
    const end = new Date(params.year, params.month, 1).toISOString();

    const row = db.getFirstSync<{
        income_cents: number | null;
        expense_cents: number | null;
    }>(
        `
    SELECT
      SUM(CASE WHEN type='income'  THEN amount_cents ELSE 0 END) AS income_cents,
      SUM(CASE WHEN type='expense' THEN amount_cents ELSE 0 END) AS expense_cents
    FROM transactions
    WHERE date >= ? AND date < ?;
    `,
        [start, end]
    );

    const income = row?.income_cents ?? 0;
    const expense = row?.expense_cents ?? 0;

    return {
        income_cents: income,
        expense_cents: expense,
        balance_cents: income - expense,
    };
}

type MonthAgg = { ym: string; income_cents: number; expense_cents: number };

function pad2(n: number) {
    return String(n).padStart(2, "0");
}

export function getMonthlyAggFrom(params: { startISO: string }) {
    // agrupa por YYYY-MM (funciona bem com ISO string)
    return db.getAllSync<MonthAgg>(
        `
    SELECT
      substr(date, 1, 7) AS ym,
      SUM(CASE WHEN type='income'  THEN amount_cents ELSE 0 END) AS income_cents,
      SUM(CASE WHEN type='expense' THEN amount_cents ELSE 0 END) AS expense_cents
    FROM transactions
    WHERE date >= ?
    GROUP BY substr(date, 1, 7)
    ORDER BY ym ASC;
    `,
        [params.startISO]
    );
}

// pega próximos N meses a partir do mês atual (inclui o atual como base de leitura)
export function getNextMonthsForecast(params: { months: number }) {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

    const rows = getMonthlyAggFrom({ startISO: start });
    const map = new Map(rows.map(r => [r.ym, r]));

    const result: { label: string; value: number }[] = [];

    for (let i = 0; i < params.months; i++) {
        const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
        const ym = `${d.getFullYear()}-${pad2(d.getMonth() + 1)}`;

        // exemplo: usar despesas como valor da barra (você pode trocar por balance)
        const agg = map.get(ym);
        const expenseCents = agg?.expense_cents ?? 0;

        const label = d.toLocaleString("en-US", { month: "short" }); // Jul, Aug...
        result.push({ label, value: Math.round(expenseCents / 100) }); // valor em “reais”
    }

    return result;
}