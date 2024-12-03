import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";


SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const [isOnboarded, setIsOnboarded] = useState<boolean | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAppState = async () => {
      const onboardingStatus = await AsyncStorage.getItem("isOnboarded");
      setIsOnboarded(onboardingStatus === "true");

      
      setIsLoggedIn(false); 
    };

    if (loaded) {
      SplashScreen.hideAsync();
      checkAppState();
    }
  }, [loaded]);

  if (!loaded || isOnboarded === null || isLoggedIn === null) {
    return null; 
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      {isOnboarded === false ? (
        <Stack.Screen name="(auth)/onboarding" />
      ) : isLoggedIn === false ? (
        <Stack.Screen name="(auth)/login" />
      ) : (
        <Stack.Screen name="(tabs)" />
      )}
    </Stack>
  );
}
