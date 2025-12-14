// TabLayout.tsx
import React from 'react';
import { BottomNavigation, useTheme } from 'react-native-paper';

type Props = {
  index: number;
  setIndex: (i: number) => void;
  routes: { key: string; title: string; focusedIcon?: string; unfocusedIcon?: string }[];
  renderSceneMap: Record<string, React.ComponentType<any>>;
};

export default function TabLayout({ index, setIndex, routes, renderSceneMap }: Props) {

  const theme = useTheme();
  const renderScene = BottomNavigation.SceneMap(renderSceneMap);

  return (
    <BottomNavigation
      theme={theme}
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      shifting={false}
      labeled
      activeColor={theme.colors.primary}
      inactiveColor={theme.colors.onSurfaceVariant}
      barStyle={{
        backgroundColor: theme.colors.surface,
        borderTopWidth: 1,
        borderTopColor: theme.colors.outlineVariant,
      }}
    />
  );
}
