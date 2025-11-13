import React, { memo, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { BarChart, barDataItem } from 'react-native-gifted-charts';

type Item = { label: string; value: number };
type Props = {
  items: Item[];                // ex.: [{label:'Jul', value: 30}, ...]
  height?: number;              // altura do gráfico (px)
  accent?: string;              // cor base das barras
  background?: string;          // cor de fundo do container
  onBarPress?: (item: Item) => void;
};

const MiniMonthlyBarChart: React.FC<Props> = ({
  items,
  height = 150,
  accent = '#2d3f36',          // verde escuro (barras)
  background = '#0c130f',      // fundo quase preto
  onBarPress,
}) => {
  const data: barDataItem[] = useMemo(
    () =>
      items.map(it => ({
        value: it.value,
        label: it.label,
        frontColor: accent,
        // callback de toque
        onPress: () => onBarPress?.(it),
      })),
    [items, accent, onBarPress]
  );

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <BarChart
        data={data}
        height={height}
        barWidth={72}
        spacing={28}
        initialSpacing={20}
        xAxisThickness={0}
        yAxisThickness={0}
        rulesThickness={0}
        hideRules
        hideYAxisText
        yAxisLabelWidth={0}
        noOfSections={1}                 // sem linhas de seção
        isAnimated        // cantos superiores arredondados
        xAxisLabelTextStyle={styles.xLabel}
        // Deixa as barras “respirarem” no topo
        maxValue={Math.max(...items.map(i => i.value)) * 1.2 || 10}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  xLabel: {
    color: '#c9d1c8',
    fontSize: 12,
    marginTop: 0,
  },
});

export default memo(MiniMonthlyBarChart);
