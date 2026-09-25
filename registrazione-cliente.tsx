import { router } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { saveProfile } from "../lib/session";

export default function ClientRegistration() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [saving, setSaving] = useState(false);

  async function continueToApp() {
    if (!name.trim() || !surname.trim() || !email.trim()) {
      Alert.alert("Dati mancanti", "Inserisci nome, cognome ed e-mail.");
      return;
    }

    try {
      setSaving(true);
      await saveProfile({
        role: "cliente",
        displayName: `${name.trim()} ${surname.trim()}`,
        email: email.trim().toLowerCase(),
        city: city.trim(),
      });
      router.replace("/home-cliente");
    } catch {
      Alert.alert("Errore", "Non è stato possibile salvare il profilo.");
      setSaving(false);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.page} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Completa il profilo Cliente</Text>
      <Text style={styles.subtitle}>Il profilo resterà memorizzato su questo dispositivo.</Text>
      <View style={styles.card}>
        <Field label="Nome *" value={name} onChangeText={setName} placeholder="Nome" />
        <Field label="Cognome *" value={surname} onChangeText={setSurname} placeholder="Cognome" />
        <Field label="E-mail *" value={email} onChangeText={setEmail} placeholder="nome@email.it" keyboardType="email-address" />
        <Field label="Città" value={city} onChangeText={setCity} placeholder="Città" />
        <Text style={styles.note}>Non usare dati sensibili in questa versione dimostrativa.</Text>
        <TouchableOpacity style={[styles.button, saving && styles.buttonDisabled]} onPress={continueToApp} disabled={saving}>
          <Text style={styles.buttonText}>{saving ? "Salvataggio..." : "Crea profilo Cliente"}</Text>
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
  note: { color: "#718096", fontSize: 13, lineHeight: 19, marginTop: 16 },
  button: { backgroundColor: "#1258DC", borderRadius: 14, alignItems: "center", paddingVertical: 16, marginTop: 20 },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "800" },
});
