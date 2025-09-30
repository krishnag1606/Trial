import React from 'react';
import { AppProvider } from '../../src/contexts/AppContext';
import { RootNavigator } from '../../src/navigation/RootNavigator';
import '../../src/utils/i18n';

export default function TabsLayout() {
  return (
    <AppProvider>
      <RootNavigator />
    </AppProvider>
  );
}