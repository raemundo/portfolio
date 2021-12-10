import AsyncStorage from '@react-native-async-storage/async-storage';

export async function presistJid(val: string) {
    await AsyncStorage.setItem("jid", val);
}

export async function getJid() {
    await AsyncStorage.getItem("jid");
}

export async function removeJid() {
    await AsyncStorage.removeItem("jid")
}