import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage'; // For storing onboarding status
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [isOnboarded, setIsOnboarded] = useState<boolean | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAppState = async () => {
      // Check if the user has completed onboarding
      const onboardingStatus = await AsyncStorage.getItem('isOnboarded');
      setIsOnboarded(onboardingStatus === 'true');

      // Simulate checking for user authentication (replace with actual logic)
      const userLoggedIn = false; // Replace with Firebase or real logic
      setIsLoggedIn(userLoggedIn);
    };

    if (loaded) {
      SplashScreen.hideAsync();
      checkAppState();
    }
  }, [loaded]);

  // While determining app state
  if (!loaded || isOnboarded === null || isLoggedIn === null) {
    return null; // Show nothing or a loader
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false, // Disable headers globally for all screens in this stack
      }}
    >
      {isOnboarded === false ? (
        <Stack.Screen
          name="(auth)/onboarding"
          options={{ headerShown: false }} // Ensure onboarding screen has no header
        />
      ) : isLoggedIn === false ? (
        <Stack.Screen
          name="(auth)/login"
          options={{ headerShown: false }} // Ensure login screen has no header
        />
      ) : (
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }} // Ensure main app tabs have no header
        />
      )}
    </Stack>
  );
}
