import { Transaction, TxType } from "@/backend/domain/types";
import { listDistinctCategories, listTransactionsFiltered } from "@/backend/storage/transactions.repo";
import { useFocusEffect } from "expo-router";
import { useCallback, useRef, useState } from "react";

// ---------- hook ----------
export type Filters = {
    year: number;
    month: number | null; // 1..12 ou null
    category: string | null;
    type: TxType | null;
};

export function useTransactionsHistory(filters: Filters) {
    const PAGE_SIZE = 25;

    const [items, setItems] = useState<Transaction[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasMore, setHasMore] = useState(true);

    const cursorRef = useRef<string | undefined>(undefined);

    const loadCategories = useCallback(() => {
        try {
            const rows = listDistinctCategories();
            setCategories(rows.map(r => r.category).filter(Boolean));
        } catch {
            setCategories([]);
        }
    }, []);

    const loadFirstPage = useCallback(() => {
        setLoading(true);
        setError(null);

        try {
            cursorRef.current = undefined;

            const rows = listTransactionsFiltered({
                limit: PAGE_SIZE,
                cursorDate: undefined,
                year: filters.year,
                month: filters.month,
                category: filters.category,
                type: filters.type,
            });

            setItems(rows);
            setHasMore(rows.length === PAGE_SIZE);
            cursorRef.current = rows.at(-1)?.date;
        } catch (e: any) {
            setError(e?.message ?? "Erro ao carregar transações");
            setItems([]);
            setHasMore(false);
        } finally {
            setLoading(false);
        }
    }, [filters.year, filters.month, filters.category, filters.type]);

    const loadMore = useCallback(() => {
        if (loadingMore || loading || !hasMore) return;

        setLoadingMore(true);
        try {
            const next = listTransactionsFiltered({
                limit: PAGE_SIZE,
                cursorDate: cursorRef.current,
                year: filters.year,
                month: filters.month,
                category: filters.category,
                type: filters.type,
            });

            setItems(prev => (next.length ? [...prev, ...next] : prev));
            setHasMore(next.length === PAGE_SIZE);
            cursorRef.current = next.at(-1)?.date ?? cursorRef.current;
        } catch (e: any) {
            setError(e?.message ?? "Erro ao carregar mais transações");
            setHasMore(false);
        } finally {
            setLoadingMore(false);
        }
    }, [filters.year, filters.month, filters.category, filters.type, hasMore, loading, loadingMore]);

    useFocusEffect(
        useCallback(() => {
            loadCategories();
            loadFirstPage();
        }, [loadCategories, loadFirstPage])
    );

    return { items, categories, loading, loadingMore, error, loadMore, refresh: loadFirstPage };
}