import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import LogoutButton from "../components/LogoutButton";
import { getProfile, SavedProfile } from "../lib/session";

export default function ClientHome() {
  const [profile, setProfile] = useState<SavedProfile | null>(null);

  useEffect(() => {
    getProfile().then(setProfile);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.page}>
        <View style={styles.top}>
          <View style={styles.headingArea}>
            <Text style={styles.welcome}>Ciao{profile?.displayName ? `, ${profile.displayName}` : ""}</Text>
            <Text style={styles.sub}>Dashboard Cliente</Text>
          </View>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {(profile?.displayName?.charAt(0) || "C").toUpperCase()}
            </Text>
          </View>
        </View>

        <View style={styles.hero}>
          <Text style={styles.heroTitle}>Hai un nuovo progetto?</Text>
          <Text style={styles.heroText}>
            Configura una stampa e ricevi un preventivo dimostrativo.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/nuovo-ordine")}
          >
            <Text style={styles.buttonText}>Nuovo ordine</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.section}>Le tue attività</Text>
        <Menu title="I miei ordini" description="Controlla stato e avanzamento" />
        <Menu title="Preventivi" description="Consulta le stime ricevute" />
        <Menu title="Messaggi" description="Comunica con assistenza e printer" />

        {profile?.email ? (
          <View style={styles.profileBox}>
            <Text style={styles.profileTitle}>Profilo attivo</Text>
            <Text style={styles.profileText}>{profile.email}</Text>
            {profile.city ? <Text style={styles.profileText}>{profile.city}</Text> : null}
          </View>
        ) : null}

        <LogoutButton />
      </ScrollView>
    </SafeAreaView>
  );
}

function Menu({ title, description }: { title: string; description: string }) {
  return (
    <TouchableOpacity style={styles.menu}>
      <View>
        <Text style={styles.menuTitle}>{title}</Text>
        <Text style={styles.menuDescription}>{description}</Text>
      </View>
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F4F7FB" },
  page: { padding: 22, paddingTop: 48, paddingBottom: 45 },
  top: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  headingArea: { flex: 1, paddingRight: 14 },
  welcome: { color: "#10213A", fontSize: 27, fontWeight: "900" },
  sub: { color: "#66768B", marginTop: 4 },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: "#1258DC", alignItems: "center", justifyContent: "center" },
  avatarText: { color: "#FFFFFF", fontWeight: "900", fontSize: 18 },
  hero: { backgroundColor: "#10213A", borderRadius: 22, padding: 22, marginTop: 24 },
  heroTitle: { color: "#FFFFFF", fontSize: 23, fontWeight: "900" },
  heroText: { color: "#CBD5E3", fontSize: 15, lineHeight: 22, marginTop: 8 },
  button: { backgroundColor: "#1258DC", borderRadius: 13, alignItems: "center", paddingVertical: 14, marginTop: 18 },
  buttonText: { color: "#FFFFFF", fontWeight: "800" },
  section: { color: "#10213A", fontSize: 20, fontWeight: "900", marginTop: 26, marginBottom: 12 },
  menu: { backgroundColor: "#FFFFFF", borderRadius: 16, padding: 17, marginBottom: 11, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  menuTitle: { color: "#182A44", fontSize: 16, fontWeight: "800" },
  menuDescription: { color: "#68778C", fontSize: 13, marginTop: 4 },
  arrow: { color: "#1258DC", fontSize: 30 },
  profileBox: { backgroundColor: "#EAF1FF", borderRadius: 16, padding: 16, marginTop: 12 },
  profileTitle: { color: "#1258DC", fontWeight: "900", marginBottom: 5 },
  profileText: { color: "#52647D", fontSize: 14, marginTop: 2 },
});
