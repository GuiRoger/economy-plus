import { Transaction } from "@/backend/domain/types";
import { stylesTransactions } from "@/constants/style.transaction-history";
import { formatBRLFromCents } from "@/utils/currency-formatter";
import { Pressable, View } from "react-native";
import { Text, useTheme, } from "react-native-paper";

export default function TransactionRowComponent({ item }: { item: Transaction }) {
    const theme = useTheme();
    const isExpense = item.type === "expense";
    const amount = formatBRLFromCents(Math.abs(item.amount_cents));

    return (
        <Pressable
            style={({ pressed }) => [stylesTransactions.row, { opacity: pressed ? 0.7 : 1 }]}
            android_ripple={{ color: theme.colors.surfaceVariant }}
            onPress={() => {
                // TODO: abrir detalhes/editar
            }}
        >
            <View style={stylesTransactions.rowContent}>
                <View style={stylesTransactions.rowLeft}>
                    <Text variant="titleMedium" style={stylesTransactions.rowTitle} numberOfLines={1}>
                        {item.description}
                    </Text>
                    <Text
                        variant="bodySmall"
                        style={[stylesTransactions.rowSub, { color: theme.colors.onSurfaceVariant }]}
                        numberOfLines={1}
                    >
                        {item.category}
                    </Text>
                </View>

                <Text variant="titleMedium" style={stylesTransactions.rowAmount}>
                    {isExpense ? "-" : "+"}{amount}
                </Text>
            </View>
        </Pressable>
    );
}



