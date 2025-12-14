import React, { memo, useCallback, useMemo, useState } from "react";
import { FlatList, View } from "react-native";
import { ActivityIndicator, Text, useTheme } from "react-native-paper";

import FilterBarComponent from "@/components/FilterBar/FilterBarComponent";
import TransactionRowComponent from "@/components/TransactionRow/TransactionRowComponent";
import { stylesTransactions } from "@/constants/style.transaction-history";
import { Filters, useTransactionsHistory } from "@/hooks/useTransactionHistory";


const FilterBar = memo(FilterBarComponent);

const TransactionRow = memo(TransactionRowComponent);

export default function TransactionsScreen() {
    const theme = useTheme();
    const now = useMemo(() => new Date(), []);

    const [filters, setFilters] = useState<Filters>({
        year: now.getFullYear(),
        month: null,
        category: null,
        type: null,
    });

    const { items, categories, loading, loadingMore, error, loadMore } = useTransactionsHistory(filters);

    const onChangeFilters = useCallback((patch: Partial<Filters>) => {
        setFilters((prev) => ({ ...prev, ...patch }));
    }, []);

    const empty = useMemo(() => {
        if (loading) return null;
        return (
            <View style={stylesTransactions.empty}>
                <Text style={{ color: theme.colors.onSurfaceVariant }}>No transactions found.</Text>
            </View>
        );
    }, [loading, theme.colors.onSurfaceVariant]);

    return (
        <View style={[stylesTransactions.container, { backgroundColor: theme.colors.background }]}>
            <View style={stylesTransactions.topArea}>
                <FilterBar categories={categories} filters={filters} onChange={onChangeFilters} />
                {error ? <Text style={{ color: theme.colors.error, marginTop: 8 }}>{error}</Text> : null}
            </View>

            {loading ? (
                <View style={stylesTransactions.loading}>
                    <ActivityIndicator />
                </View>
            ) : (
                <FlatList
                    data={items}
                    keyExtractor={(x) => x.id}
                    renderItem={({ item }) => <TransactionRow item={item} />}
                    ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
                    contentContainerStyle={stylesTransactions.listContent}
                    onEndReachedThreshold={0.6}
                    onEndReached={loadMore}
                    ListEmptyComponent={empty}
                />
            )}

            {loadingMore ? (
                <View style={stylesTransactions.footer}>
                    <ActivityIndicator />
                </View>
            ) : null}
        </View>
    );
}

