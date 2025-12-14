// RootLayout.tsx
import { initDb } from '@/backend/storage/db';
import { paperDarkTheme } from '@/theme/paperTheme';
import React from 'react';
import { Appbar, Provider as PaperProvider, Portal } from 'react-native-paper';
import TabLayout from './(tabs)/_layout';
import BudgetScreen from './(tabs)/budget';
import DashboardScreen from './(tabs)/dashboard';
import DebitsScreen from './(tabs)/debits';
import AddTransactionScreen from './(tabs)/transactions/add';
import TransactionsScreen from './(tabs)/transactions/index';


export default function RootLayout() {
  React.useEffect(() => {
    initDb();
  }, []);
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'dashboard', title: 'Overview', focusedIcon: 'home', unfocusedIcon: 'home-outline' },
    { key: 'add', title: 'Add', focusedIcon: 'plus' },
    { key: 'history', title: 'History', focusedIcon: 'history' },
    { key: 'budget', title: 'Budget', focusedIcon: 'currency-usd', unfocusedIcon: 'currency-usd' },
    { key: 'debits', title: 'Debits', focusedIcon: 'file', unfocusedIcon: 'file-outline' },
  ]);

  const renderScene = {
    dashboard: DashboardScreen,
    add: AddTransactionScreen,
    history: TransactionsScreen,
    budget: BudgetScreen,
    debits: DebitsScreen,
  };

  const currentTitle = routes[index]?.title ?? 'Title';

  return (
    <PaperProvider theme={paperDarkTheme}>
      <Portal.Host>


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
      </Portal.Host>
    </PaperProvider>
  );
}
