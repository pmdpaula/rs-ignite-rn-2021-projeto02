import React from 'react';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';
import AppLoading from 'expo-app-loading';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

import { AuthProvider, useAuth } from './src/hooks/auth';

import { Routes } from './src/routes/index';

import theme from './src/global/styles/theme';

export default function App() {
  const { userStorageLoading } = useAuth();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded || userStorageLoading) {
    return <AppLoading />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider theme={theme}>
        <StatusBar barStyle="light-content" backgroundColor={theme.colors.primary} translucent />
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
