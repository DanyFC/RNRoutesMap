import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

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
    <View style={styles.container}>
      <Text style={{fontSize: 20, fontFamily: 'Lato-Bold'}}>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
