import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { StyleSheet } from 'react-native';
import ProviderTabBar from '../tab-navigator/providerTabBar';
import TabNavigator from '../tab-navigator/tab-navigator';
import CustomDrawerContent from './custom-drawer';

const Drawer = createDrawerNavigator();

export const DrawerNavigator = (props) => {
  const {route}=props;

  return (
    <Drawer.Navigator

      overlayColor="transparent"
      drawerStyle={{...styles.drawerStyles,backgroundColor:'white'}}
      drawerContent={(props) => {
        return <CustomDrawerContent {...props} />;
      }}
      drawerContentOptions={{
        activeBackgroundColor: 'transparent',
        activeTintColor: 'white',
        inactiveTintColor: 'white',
      }}
      sceneContainerStyle={{ backgroundColor: 'transparent', }}
      screenOptions={{
        headerShown:false,
      }}
    >
      <Drawer.Screen
        name="Tab"
        component={route?.params?.isProvider?ProviderTabBar : TabNavigator}
        options={{ drawerLabel: 'Home' }}
      />
    </Drawer.Navigator>
  );
}


const styles = StyleSheet.create({
  drawerStyles: { flex: 1, width: '80%', position: 'absolute',borderRadius:50,overflow:'hidden' },
  drawerItem: { alignItems: 'flex-start', marginVertical: 0 },
  drawerLabel: { color: 'white', marginLeft: -16 },
});