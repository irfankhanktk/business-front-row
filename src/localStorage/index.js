import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    //console.log('error in storing Data====', e);
  }
};

export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    // console.log('error in geting Data====', e);
  }
};
export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    // console.log('error in removing Data====', e);
  }
};
export const clearData = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    // console.log('error in removing Data====', e);
  }
};
