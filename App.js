import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';

import { navigationRef } from './app/navigation/rootNavigation';
import AppNavigator from './app/navigation/AppNavigator';
import AuthContext from './app/auth/context';
import AuthNavigator from './app/navigation/AuthNavigator';
import authStorage from './app/auth/storage';
import navigationTheme from './app/navigation/navigationTheme';
import OfflineNotice from './app/components/OfflineNotice';

export default function App() {
  const [user, setUser] = useState();
  const [isReady, setIsReady] = useState(false);

  const restoreUser = async () => {
    await SplashScreen.preventAutoHideAsync();
    const user = await authStorage.getUser();
    if (user) setUser(user);
    await SplashScreen.hideAsync();
  };

  useEffect(() => {
    restoreUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <OfflineNotice />
      <NavigationContainer ref={navigationRef} theme={navigationTheme}>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}