import { router } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function RoleScreen() {
  return (
    <ScrollView contentContainerStyle={styles.page}>
      <Text style={styles.title}>Come vuoi usare ESA Print?</Text>
      <Text style={styles.subtitle}>Scegli il profilo. Potrai completare i dati nella schermata successiva.</Text>

      <RoleCard
        badge="CLIENTE"
        title="Voglio richiedere una stampa"
        description="Carica modelli STL, configura materiali e colori, ricevi preventivi e controlla gli ordini."
        button="Continua come Cliente"
        onPress={() => router.push("/registrazione-cliente")}
      />

      <RoleCard
        badge="PRINTER"
        title="Voglio offrire servizi di stampa"
        description="Registra stampanti e materiali, ricevi richieste, gestisci produzione e controllo qualità."
        button="Continua come Printer"
        onPress={() => router.push("/registrazione-printer")}
      />
    </ScrollView>
  );
}

function RoleCard({ badge, title, description, button, onPress }: { badge: string; title: string; description: string; button: string; onPress: () => void }) {
  return (
    <View style={styles.card}>
      <Text style={styles.badge}>{badge}</Text>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <TouchableOpacity style={styles.button} onPress={onPress}><Text style={styles.buttonText}>{button}</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flexGrow: 1, backgroundColor: "#F4F7FB", padding: 22, paddingBottom: 45 },
  title: { color: "#10213A", fontSize: 29, fontWeight: "900", marginTop: 12 },
  subtitle: { color: "#607089", fontSize: 16, lineHeight: 23, marginTop: 8, marginBottom: 20 },
  card: { backgroundColor: "#FFFFFF", borderRadius: 22, padding: 22, marginBottom: 16 },
  badge: { alignSelf: "flex-start", color: "#1258DC", backgroundColor: "#E8F0FF", fontSize: 12, fontWeight: "900", paddingHorizontal: 10, paddingVertical: 6, borderRadius: 9, overflow: "hidden" },
  cardTitle: { color: "#162944", fontSize: 21, lineHeight: 27, fontWeight: "900", marginTop: 16 },
  description: { color: "#66768B", fontSize: 15, lineHeight: 22, marginTop: 8 },
  button: { backgroundColor: "#1258DC", borderRadius: 14, alignItems: "center", paddingVertical: 15, marginTop: 20 },
  buttonText: { color: "#FFFFFF", fontSize: 15, fontWeight: "800" },
});
