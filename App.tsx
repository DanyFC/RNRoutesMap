import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { PermissionsProvider } from './src/context/Permissions';
import Stack from './src/navigator/Stack';

import './gesture-handler';

SplashScreen.preventAutoHideAsync();

export default function App() {

  const [loaded, error] = useFonts({
    'Lato-Black': require('./assets/fonts/Lato-Black.ttf'),
    'Lato-Bold': require('./assets/fonts/Lato-Bold.ttf'),
    'Lato-Light': require('./assets/fonts/Lato-Light.ttf'),
    'Lato-Regular': require('./assets/fonts/Lato-Regular.ttf'),
  })

  useEffect(() => {
    if (loaded || error) SplashScreen.hideAsync()
  }, [loaded, error])

  if (!loaded && !error) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <PermissionsProvider>
        <NavigationContainer>
          <Stack />
          <StatusBar style='auto' />
        </NavigationContainer>
      </PermissionsProvider>
    </SafeAreaProvider>
  );
}

