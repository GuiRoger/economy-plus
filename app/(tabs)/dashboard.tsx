import CardEcon from "@/components/Card/Card";
import MiniMonthlyBarChart from "@/components/MiniMonthlyBarChart/MiniMonthlyBarChart";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { ScrollView, View } from "react-native";
import { Text } from "react-native-paper";

import { getMonthSummary, getNextMonthsForecast } from "@/backend/storage/transactions.repo";
import { formatBRLFromCents } from "@/utils/currency-formatter";

export default function DashboardScreen() {
  const [incomeCents, setIncomeCents] = useState(0);
  const [expenseCents, setExpenseCents] = useState(0);
  const [balanceCents, setBalanceCents] = useState(0);
  const [months, setMonths] = useState<{ label: string; value: number }[]>([]);

  const load = useCallback(() => {
    const now = new Date();
    const summary = getMonthSummary({ year: now.getFullYear(), month: now.getMonth() + 1 });

    setIncomeCents(summary.income_cents);
    setExpenseCents(summary.expense_cents);
    setBalanceCents(summary.balance_cents);

    const forecast = getNextMonthsForecast({ months: 3 });
    setMonths(forecast);
  }, []);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          padding: 16,
          paddingBottom: 96,
          gap: 16,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 10, height: "25%" }}>
          <CardEcon title="Income" value={formatBRLFromCents(incomeCents)} percentWidth={"50%"} />
          <CardEcon title="Expenses" value={formatBRLFromCents(expenseCents)} percentWidth={"50%"} />
        </View>

        <CardEcon title="Balance" value={formatBRLFromCents(balanceCents)} percentWidth={"100%"} />

        <Text variant="titleLarge" style={{ fontWeight: "bold" }}>Forecast</Text>
        <Text variant="titleMedium">Next 3 months</Text>

        <MiniMonthlyBarChart
          items={months}
          accent="#2e3f36"
          background=""
          onBarPress={(m) => console.log("clicou", m)}
        />
      </ScrollView>
    </View>
  );
}
