import { NavigationContainer, useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { MainNavigator } from "./src/navigation";
import "./src/services/axios-interceptors";
import store from "./src/store";
import { navigationRef } from "./src/navigation/navigation-ref";
// const defaultMode = Appearance.getColorScheme() || 'light';
const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer ref={navigationRef}>
          <MainNavigator />
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
};
export default App;
