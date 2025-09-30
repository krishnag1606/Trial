import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useFrameworkReady();

  // --- ADDITIONS START ---
  const [fontsLoaded, fontError] = useFonts({
    // The key is the name you'll use in your styles (e.g., fontFamily: 'Helvetica')
    // The path is relative to this file. Since _layout.tsx is in the 'app' folder,
    // we go up one level ('../') to the root to find the 'assets' folder.
    'Helvetica': require('../assets/fonts/Helvetica.ttf'),
    'Helvetica-Bold': require('../assets/fonts/Helvetica-Bold.ttf'),
    // You can add more font weights here if you have the files
  });

  useEffect(() => {
    // Hide the splash screen once the fonts are loaded or if there's an error
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // If the fonts are not loaded yet, and there is no error,
  // return null to wait for them to load.
  if (!fontsLoaded && !fontError) {
    return null;
  }
  // --- ADDITIONS END ---

  // Render the rest of the app once fonts are loaded
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}