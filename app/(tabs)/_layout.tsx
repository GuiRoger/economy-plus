// TabLayout.tsx
import React from 'react';
import { BottomNavigation } from 'react-native-paper';

type Props = {
  index: number;
  setIndex: (i: number) => void;
  routes: { key: string; title: string; focusedIcon?: string; unfocusedIcon?: string }[];
  renderSceneMap: Record<string, React.ComponentType<any>>;
};

export default function TabLayout({ index, setIndex, routes, renderSceneMap }: Props) {
  const renderScene = BottomNavigation.SceneMap(renderSceneMap);

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
}
