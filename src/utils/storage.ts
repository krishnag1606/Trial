import AsyncStorage from '@react-native-async-storage/async-storage';

export const StorageKeys = {
  MEDICINES: 'medicines',
  RECORDS: 'records',
  APPOINTMENTS: 'appointments',
  NOTIFICATIONS: 'notifications',
  LANGUAGE: 'language',
  USER_PROFILE: 'userProfile',
  PREDICTORS: 'predictors'
};

export class StorageService {
  static async getItem<T>(key: string): Promise<T | null> {
    try {
      const item = await AsyncStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Storage getItem error:', error);
      return null;
    }
  }

  static async setItem<T>(key: string, value: T): Promise<void> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Storage setItem error:', error);
    }
  }

  static async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Storage removeItem error:', error);
    }
  }

  static async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Storage clear error:', error);
    }
  }
}