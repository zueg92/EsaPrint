import { router } from "expo-router";
import { Alert, StyleSheet, Text, TouchableOpacity } from "react-native";
import { clearProfile } from "../lib/session";

export default function LogoutButton() {
  function askLogout() {
    Alert.alert("Esci dall'account", "Vuoi tornare alla schermata iniziale?", [
      { text: "Annulla", style: "cancel" },
      {
        text: "Esci",
        style: "destructive",
        onPress: async () => {
          await clearProfile();
          router.replace("/");
        },
      },
    ]);
  }

  return (
    <TouchableOpacity style={styles.button} onPress={askLogout}>
      <Text style={styles.text}>Esci dall'account</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignSelf: "center",
    borderColor: "#E3A5A0",
    borderWidth: 1,
    borderRadius: 13,
    marginTop: 22,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  text: { color: "#B2342A", fontSize: 14, fontWeight: "800" },
});
