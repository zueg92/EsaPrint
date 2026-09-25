import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#10213A" },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: { fontWeight: "700" },
        contentStyle: { backgroundColor: "#F4F7FB" },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="scelta-ruolo" options={{ title: "Scegli il ruolo" }} />
      <Stack.Screen name="registrazione-cliente" options={{ title: "Profilo Cliente" }} />
      <Stack.Screen name="registrazione-printer" options={{ title: "Profilo Printer" }} />
      <Stack.Screen name="home-cliente" options={{ headerShown: false }} />
      <Stack.Screen name="home-printer" options={{ headerShown: false }} />
      <Stack.Screen name="nuovo-ordine" options={{ title: "Nuovo ordine" }} />
    </Stack>
  );
}
