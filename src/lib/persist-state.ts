import AsyncStorage from '@react-native-async-storage/async-storage';

export const persistState = async (storageKey: string, state: object) => {
    await AsyncStorage.setItem(storageKey, JSON.stringify(state));
}
export const getIntialState = async (storageKey: string) => {
    const savedState = await AsyncStorage.getItem(storageKey);
    try {
        if (!savedState) {
            return undefined;
        }
        return JSON.parse(savedState ?? '{}');
    } catch (e) {
        console.error('Error loading state : ' + storageKey);
        return undefined;
    }
}