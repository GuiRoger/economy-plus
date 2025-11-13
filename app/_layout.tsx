// RootLayout.tsx
import React from 'react';
import { Appbar, Provider as PaperProvider } from 'react-native-paper';
import TabLayout from './(tabs)/_layout';
import AddScreen from './(tabs)/add';
import BudgetScreen from './(tabs)/budget';
import DashboardScreen from './(tabs)/dashboard';
import DebitsScreen from './(tabs)/debits';
import HistoryScreen from './(tabs)/history';


export default function RootLayout() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'dashboard', title: 'Overview', focusedIcon: 'home', unfocusedIcon: 'home-outline' },
    { key: 'add', title: 'Add', focusedIcon: 'plus' },
    { key: 'history', title: 'History', focusedIcon: 'history' },
    { key: 'budget', title: 'Budget', focusedIcon: 'currency-usd', unfocusedIcon: 'currency-usd' },
    { key: 'debits', title: 'Debits', focusedIcon: 'file', unfocusedIcon: 'file-outline' },
  ]);

  // (opcional) você pode criar o renderScene aqui e também passar adiante
  const renderScene = {
    dashboard: DashboardScreen,
    add: AddScreen,
    history: HistoryScreen,
    budget: BudgetScreen,
    debits: DebitsScreen,
  };

  const currentTitle = routes[index]?.title ?? 'Title';

  return (
    <PaperProvider>
      <Appbar.Header mode="center-aligned">
        {(currentTitle !== 'Overview' &&
          <Appbar.BackAction onPress={() => { }} />)}
        <Appbar.Content title={currentTitle} />
      </Appbar.Header>

      <TabLayout
        index={index}
        setIndex={setIndex}
        routes={routes}
        renderSceneMap={renderScene}
      />
    </PaperProvider>
  );
}
