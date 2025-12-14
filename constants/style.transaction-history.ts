import { StyleSheet } from "react-native";

export const stylesTransactions = StyleSheet.create({
    container: { flex: 1 },
    topArea: { paddingHorizontal: 16, paddingTop: 12, paddingBottom: 8 },
    filterRow: { flexDirection: "row", gap: 10 },
    loading: { flex: 1, alignItems: "center", justifyContent: "center" },
    listContent: { paddingHorizontal: 16, paddingBottom: 24 },
    row: { paddingVertical: 14, paddingHorizontal: 6, borderRadius: 12 },
    rowContent: { flexDirection: "row", gap: 12, alignItems: "center" },
    rowLeft: { flex: 1 },
    rowTitle: { fontWeight: "600" },
    rowSub: { marginTop: 2 },
    rowAmount: { fontWeight: "600" },
    empty: { paddingVertical: 28, alignItems: "center" },
    footer: { paddingVertical: 12, alignItems: "center" },
});
