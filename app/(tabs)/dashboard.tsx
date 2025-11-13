import CardEcon from "@/components/Card/Card";
import MiniMonthlyBarChart from "@/components/MiniMonthlyBarChart/MiniMonthlyBarChart";
import { ScrollView, View } from "react-native";
import { Text } from "react-native-paper";


export default function DashboardScreen() {
  const months = [
    { label: 'Jul', value: 32 },
    { label: 'Aug', value: 27 },
    { label: 'Sep', value: 46 },
  ];

  const income = 5000;
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          padding: 16,
          paddingBottom: 96, // espaço extra para não “bater” na barra de tabs
          gap: 16,
        }}
        showsVerticalScrollIndicator={false}
        // útil se tiver inputs
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 10, height: '25%' }}>
          <CardEcon title="Iconome" value={income} percentWidth={'50%'}></CardEcon>
          <CardEcon title="Expenses" value={income} percentWidth={'50%'}></CardEcon>
        </View>

        <CardEcon title="Balance" value={income} percentWidth={'100%'}></CardEcon>
        <Text variant="titleLarge" style={{ fontWeight: 'bold' }}>Forecast</Text>
        <Text variant="titleMedium">Next 3 months</Text>
        <MiniMonthlyBarChart
          items={months}
          // (opcional) cores
          accent="#2e3f36"
          background=""
          onBarPress={(m) => console.log('clicou', m)}
        />
      </ScrollView>

    </View>
  );
}
