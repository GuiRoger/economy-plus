import { TxType } from "@/backend/domain/types";
import { MONTHS } from "@/constants/months";
import { stylesTransactions } from "@/constants/style.transaction-history";
import { Filters } from "@/hooks/useTransactionHistory";
import { useCallback, useMemo, useState } from "react";
import { View } from "react-native";
import { Chip, Divider, Menu, useTheme } from "react-native-paper";

export type FilterBarProps = {
    categories: string[];
    filters: Filters;
    onChange: (patch: Partial<Filters>) => void;
};

function labelMonth(month: number | null) {
    if (!month) return "Month";
    return MONTHS.find(x => x.m === month)?.label ?? "Mês";
}

function labelTypeFilter(v: TxType | null) {
    if (v === "expense") return "Expense";
    if (v === "income") return "Income";
    return "Type";
}

export default function FilterBarComponent({ categories, filters, onChange }: FilterBarProps) {
    const theme = useTheme();

    // ✅ BUG FIX: um estado único para o menu aberto
    const [openMenu, setOpenMenu] = useState<"month" | "category" | "type" | null>(null);

    const chipStyle = useMemo(
        () => ({
            backgroundColor: theme.colors.surfaceVariant,
            borderColor: theme.colors.outlineVariant,
        }),
        [theme.colors.surfaceVariant, theme.colors.outlineVariant]
    );

    const closeMenu = useCallback(() => setOpenMenu(null), []);

    // ✅ BUG FIX: fecha menu antes e aplica filtro no próximo frame
    const apply = useCallback(
        (patch: Partial<Filters>) => {
            closeMenu();
            requestAnimationFrame(() => onChange(patch));
        },
        [closeMenu, onChange]
    );

    return (
        <View style={stylesTransactions.filterRow}>
            {/* MONTH */}
            <Menu
                visible={openMenu === "month"}
                onDismiss={closeMenu}
                anchor={
                    <View collapsable={false}>
                        <Chip
                            mode="outlined"
                            style={chipStyle}
                            icon="chevron-down"
                            onPress={() => setOpenMenu("month")}
                        >
                            {labelMonth(filters.month)}
                        </Chip>
                    </View>
                }
            >
                <Menu.Item title="All" onPress={() => apply({ month: null })} />
                <Divider />
                {MONTHS.map(({ m, label }) => (
                    <Menu.Item key={m} title={label} onPress={() => apply({ month: m })} />
                ))}
            </Menu>

            {/* CATEGORY */}
            <Menu
                visible={openMenu === "category"}
                onDismiss={closeMenu}
                anchor={
                    <View collapsable={false}>
                        <Chip
                            mode="outlined"
                            style={chipStyle}
                            icon="chevron-down"
                            onPress={() => setOpenMenu("category")}
                        >
                            {filters.category ?? "Category"}
                        </Chip>
                    </View>
                }
            >
                <Menu.Item title="All" onPress={() => apply({ category: null })} />
                <Divider />
                {categories.map((c) => (
                    <Menu.Item key={c} title={c} onPress={() => apply({ category: c })} />
                ))}
            </Menu>

            {/* TYPE */}
            <Menu
                visible={openMenu === "type"}
                onDismiss={closeMenu}
                anchor={
                    <View collapsable={false}>
                        <Chip
                            mode="outlined"
                            style={chipStyle}
                            icon="chevron-down"
                            onPress={() => setOpenMenu("type")}
                        >
                            {labelTypeFilter(filters.type)}
                        </Chip>
                    </View>
                }
            >
                <Menu.Item title="All" onPress={() => apply({ type: null })} />
                <Menu.Item title="Expense" onPress={() => apply({ type: "expense" })} />
                <Menu.Item title="Income" onPress={() => apply({ type: "income" })} />
            </Menu>
        </View>
    );
}
