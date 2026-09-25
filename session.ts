import AsyncStorage from "@react-native-async-storage/async-storage";

export type UserRole = "cliente" | "printer";

export type SavedProfile = {
  role: UserRole;
  displayName: string;
  email: string;
  city?: string;
};

const PROFILE_KEY = "esa_print_profile";

export async function saveProfile(profile: SavedProfile) {
  await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export async function getProfile(): Promise<SavedProfile | null> {
  const value = await AsyncStorage.getItem(PROFILE_KEY);
  if (!value) return null;

  try {
    return JSON.parse(value) as SavedProfile;
  } catch {
    await AsyncStorage.removeItem(PROFILE_KEY);
    return null;
  }
}

export async function clearProfile() {
  await AsyncStorage.removeItem(PROFILE_KEY);
}
