import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getProfile } from "../lib/session";

export default function WelcomeScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function restoreSession() {
      const profile = await getProfile();

      if (profile?.role === "cliente") {
        router.replace("/home-cliente");
        return;
      }

      if (profile?.role === "printer") {
        router.replace("/home-printer");
        return;
      }

      setLoading(false);
    }

    restoreSession();
  }, []);

  function socialLogin(provider: "Google" | "Apple") {
    Alert.alert(
      `Accesso con ${provider}`,
      "L'accesso reale sarà collegato nel modulo autenticazione. Per ora puoi provare tutto il percorso.",
      [{ text: "Continua demo", onPress: () => router.push("/scelta-ruolo") }]
    );
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingPage}>
          <View style={styles.logo}><Text style={styles.logoText}>ESA</Text></View>
          <ActivityIndicator size="large" color="#1258DC" />
          <Text style={styles.loadingText}>Caricamento profilo...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.page}>
        <View style={styles.logo}><Text style={styles.logoText}>ESA</Text></View>
        <Text style={styles.title}>Benvenuto in ESA Print</Text>
        <Text style={styles.subtitle}>
          Entra come Cliente per richiedere una stampa oppure come Printer per ricevere lavori.
        </Text>

        <View style={styles.card}>
          <TouchableOpacity style={styles.googleButton} onPress={() => socialLogin("Google")}>
            <Text style={styles.googleIcon}>G</Text>
            <Text style={styles.googleText}>Continua con Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.appleButton} onPress={() => socialLogin("Apple")}>
            <Text style={styles.appleIcon}>●</Text>
            <Text style={styles.appleText}>Continua con Apple</Text>
          </TouchableOpacity>

          <View style={styles.separator}>
            <View style={styles.line} />
            <Text style={styles.or}>oppure</Text>
            <View style={styles.line} />
          </View>

          <TouchableOpacity style={styles.emailButton} onPress={() => router.push("/scelta-ruolo")}>
            <Text style={styles.emailText}>Registrati con e-mail</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/scelta-ruolo")}>
            <Text style={styles.loginLink}>Hai già un account? <Text style={styles.loginStrong}>Accedi</Text></Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.legal}>
          Continuando accetti i Termini di servizio e confermi di aver letto l'Informativa privacy.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F4F7FB" },
  loadingPage: { flex: 1, alignItems: "center", justifyContent: "center", padding: 24 },
  loadingText: { color: "#607089", marginTop: 14, fontSize: 15 },
  page: { flexGrow: 1, alignItems: "center", justifyContent: "center", padding: 24 },
  logo: { width: 76, height: 76, borderRadius: 22, backgroundColor: "#1258DC", alignItems: "center", justifyContent: "center", marginBottom: 20 },
  logoText: { color: "#FFFFFF", fontSize: 23, fontWeight: "900" },
  title: { maxWidth: 520, color: "#10213A", fontSize: 31, fontWeight: "900", textAlign: "center" },
  subtitle: { maxWidth: 520, color: "#607089", fontSize: 16, lineHeight: 24, textAlign: "center", marginTop: 10, marginBottom: 26 },
  card: { width: "100%", maxWidth: 480, backgroundColor: "#FFFFFF", borderRadius: 24, padding: 20 },
  googleButton: { minHeight: 54, borderWidth: 1, borderColor: "#D4DBE6", borderRadius: 14, flexDirection: "row", alignItems: "center", justifyContent: "center" },
  googleIcon: { color: "#1258DC", fontSize: 20, fontWeight: "900", marginRight: 12 },
  googleText: { color: "#21344E", fontSize: 16, fontWeight: "800" },
  appleButton: { minHeight: 54, backgroundColor: "#111111", borderRadius: 14, flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 12 },
  appleIcon: { color: "#FFFFFF", fontSize: 17, marginRight: 12 },
  appleText: { color: "#FFFFFF", fontSize: 16, fontWeight: "800" },
  separator: { flexDirection: "row", alignItems: "center", marginVertical: 20 },
  line: { flex: 1, height: 1, backgroundColor: "#E0E6EE" },
  or: { color: "#7B8798", marginHorizontal: 12 },
  emailButton: { minHeight: 54, backgroundColor: "#1258DC", borderRadius: 14, alignItems: "center", justifyContent: "center" },
  emailText: { color: "#FFFFFF", fontSize: 16, fontWeight: "800" },
  loginLink: { color: "#68778C", textAlign: "center", marginTop: 20, fontSize: 15 },
  loginStrong: { color: "#1258DC", fontWeight: "900" },
  legal: { maxWidth: 460, color: "#7E8998", fontSize: 12, lineHeight: 18, textAlign: "center", marginTop: 20 },
});
