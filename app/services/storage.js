import AsyncStorage from "@react-native-async-storage/async-storage";

export default class StorageService {
  static async setUser(value) {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("user-data", jsonValue);
    } catch (e) {
      console.log("set error", error);
    }
  }
  static async setToken(value) {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("user-token", jsonValue);
    } catch (e) {
      console.log("set error", error);
    }
  }
  static async getUser() {
    try {
      const res = await AsyncStorage.getItem("user-data");
      return res;
    } catch (error) {
      console.log("get error", error);
    }
  }
  static async getToken() {
    try {
      const res = await AsyncStorage.getItem("get-token");
      return res;
    } catch (error) {
      console.log("get error", error);
    }
  }
}
