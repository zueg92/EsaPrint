import { router } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { saveProfile } from "../lib/session";

export default function PrinterRegistration() {
  const [business, setBusiness] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [technology, setTechnology] = useState("FDM");
  const [saving, setSaving] = useState(false);

  async function continueToApp() {
    if (!business.trim() || !email.trim() || !city.trim()) {
      Alert.alert("Dati mancanti", "Inserisci attività o nome, e-mail e città.");
      return;
    }

    try {
      setSaving(true);
      await saveProfile({
        role: "printer",
        displayName: business.trim(),
        email: email.trim().toLowerCase(),
        city: city.trim(),
      });
      router.replace("/home-printer");
    } catch {
      Alert.alert("Errore", "Non è stato possibile salvare il profilo.");
      setSaving(false);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.page} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Completa il profilo Printer</Text>
      <Text style={styles.subtitle}>Il profilo resterà memorizzato su questo dispositivo.</Text>
      <View style={styles.card}>
        <Field label="Nome o attività *" value={business} onChangeText={setBusiness} placeholder="Nome attività" />
        <Field label="E-mail *" value={email} onChangeText={setEmail} placeholder="printer@email.it" keyboardType="email-address" />
        <Field label="Città *" value={city} onChangeText={setCity} placeholder="Città" />
        <Text style={styles.label}>Tecnologia principale</Text>
        <View style={styles.options}>
          {["FDM", "SLA", "SLS"].map((item) => (
            <TouchableOpacity key={item} style={[styles.choice, technology === item && styles.choiceSelected]} onPress={() => setTechnology(item)}>
              <Text style={[styles.choiceText, technology === item && styles.choiceTextSelected]}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.note}>La verifica professionale del Printer sarà aggiunta con il backend.</Text>
        <TouchableOpacity style={[styles.button, saving && styles.buttonDisabled]} onPress={continueToApp} disabled={saving}>
          <Text style={styles.buttonText}>{saving ? "Salvataggio..." : "Crea profilo Printer"}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function Field(props: any) {
  return <View><Text style={styles.label}>{props.label}</Text><TextInput {...props} autoCapitalize={props.keyboardType === "email-address" ? "none" : "sentences"} placeholderTextColor="#8792A2" style={styles.input} /></View>;
}

const styles = StyleSheet.create({
  page: { flexGrow: 1, backgroundColor: "#F4F7FB", padding: 20, paddingBottom: 45 },
  title: { color: "#10213A", fontSize: 28, fontWeight: "900", marginTop: 10 },
  subtitle: { color: "#607089", fontSize: 15, lineHeight: 22, marginTop: 8, marginBottom: 18 },
  card: { backgroundColor: "#FFFFFF", borderRadius: 22, padding: 20 },
  label: { color: "#253650", fontSize: 14, fontWeight: "800", marginTop: 13, marginBottom: 7 },
  input: { minHeight: 52, backgroundColor: "#F4F7FB", borderColor: "#D7DFEA", borderWidth: 1, borderRadius: 13, paddingHorizontal: 14, color: "#10213A", fontSize: 16 },
  options: { flexDirection: "row", gap: 8 },
  choice: { borderColor: "#CCD6E5", borderWidth: 1, borderRadius: 12, paddingHorizontal: 17, paddingVertical: 11 },
  choiceSelected: { backgroundColor: "#1258DC", borderColor: "#1258DC" },
  choiceText: { color: "#34465F", fontWeight: "700" },
  choiceTextSelected: { color: "#FFFFFF" },
  note: { color: "#718096", fontSize: 13, lineHeight: 19, marginTop: 17 },
  button: { backgroundColor: "#1258DC", borderRadius: 14, alignItems: "center", paddingVertical: 16, marginTop: 20 },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "800" },
});
