import AsyncStorage from '@react-native-async-storage/async-storage';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import React, {useState} from 'react';
import DropdownAlert from 'react-native-dropdownalert';
import {Provider} from 'react-redux';
import {MainNavigator} from './src/navigation';
import './src/services/axios-interceptors';
import SERVICES from './src/services/common-services';
import palette from './src/services/palette';
import store from './src/store';
import ThemeContext from './src/context/theme-context';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// const defaultMode = Appearance.getColorScheme() || 'light';
const App = () => {
  // const [themeState, setThemeState] = useState(defaultMode);
  const [themeApplied, setThemeApplied] = useState('black');
  const [toggle, setToggle] = React.useState(false);
  const alertRef = React.useRef();
  const getData = async () => {
    try {
      const custTheme = await AsyncStorage.getItem('@custTheme');
      if (custTheme != null) {
        setThemeApplied(custTheme);
      } else {
        await AsyncStorage.setItem('@custTheme', 'light');
      }
    } catch (e) {
      // error reading value
    }
  };
  const themeContext = React.useMemo(
    () => ({
      toggleTheme: color => {
        setThemeApplied(color);
        (async () => {
          await AsyncStorage.setItem('@custTheme', color);
        })();
      },
      showAlert: (type, error) => {
        alertRef.current.alertWithType(
          type || 'error',
          SERVICES._capitalizeFirst(type) || 'Error',
          SERVICES._returnError(error),
        );
      },
    }),
    [],
  );
  React.useEffect(() => {
    (async () => {
      // setToggle(true)
      await getData();
    })();
  }, []);

  const theme =
    themeApplied === 'dark'
      ? {...DefaultTheme.colors, ...palette.darkTheme}
      : {...DefaultTheme.colors, ...palette.lightTheme};
  return (
    <SafeAreaProvider>
    <Provider store={store}>
      <ThemeContext.Provider value={themeContext}>
        <NavigationContainer theme={theme}>
          <MainNavigator />
        </NavigationContainer>
        <DropdownAlert ref={alertRef} />
      </ThemeContext.Provider>
    </Provider>
    </SafeAreaProvider>

  );
};
export default App;
