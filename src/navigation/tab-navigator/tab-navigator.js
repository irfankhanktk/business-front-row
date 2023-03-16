import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { StyleSheet, View } from "react-native";
import {
  BookingActive,
  HomeActive,
  OngoingActive,
  TabActivityIcon,
  TabHomeIcon,
  TabOngoingIcon,
  TabProfileIcon,
} from "../../assets/common-icons";
import BottomMenu from "../../components/atoms/BottomMenu";
import Row from "../../components/atoms/row";
import Regular from "../../presentation/typography/regular-text";
import HomeScreen from "../../screens/home-screen";
import Profile from "../../screens/profile/profile";
import OngoingTab from "../../screens/tab-screens/ongoing-tab/ongoing-tab";
import colors from "../../services/colors";
import { mvs } from "../../services/metrices";
import TopTabNavigator from "../tab-navigator/top-tab-navigator";
const BottomTab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <BottomTab.Navigator
        // options={{tabBarHideOnKeyboard:true}}
        screenOptions={{ headerShown: false, tabBarHideOnKeyboard: true }}
        tabBar={(props) => <BottomMenu {...props} colors={colors} />}
      >
        <BottomTab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "Home",
            tabBarIcon: (focused) => (
              <Row
                style={{
                  ...styles.tabOption,
                  backgroundColor:
                    focused == true ? colors.lightYellow : colors.white,
                }}
              >
                {focused ? <HomeActive /> : <TabHomeIcon />}
                {focused == true ? (
                  <Regular label={"Home"} style={styles.lableStyle} />
                ) : null}
              </Row>

              // <BottomMenuIcon name="home" focused={focused} />
            ),
          }}
        />
        <BottomTab.Screen
          name="Ongoing"
          component={OngoingTab}
          options={{
            title: "Ongoing",
            unmountOnBlur: true,
            tabBarIcon: (focused) => (
              <Row
                style={{
                  ...styles.tabOption,
                  backgroundColor:
                    focused == true ? colors.lightYellow : colors.white,
                }}
              >
                {focused ? <OngoingActive /> : <TabOngoingIcon />}
                {focused == true ? (
                  <Regular label={"Ongoing"} style={styles.lableStyle} />
                ) : null}
              </Row>
            ),
          }}
        />
        <BottomTab.Screen
          name="Booking"
          component={TopTabNavigator}
          options={{
            title: "Booking",
            unmountOnBlur: true,
            tabBarIcon: (focused) => (
              <Row
                style={{
                  ...styles.tabOption,
                  backgroundColor:
                    focused == true ? colors.lightYellow : colors.white,
                }}
              >
                {focused ? <BookingActive /> : <TabActivityIcon />}
                {focused == true ? (
                  <Regular label={"Booking"} style={styles.lableStyle} />
                ) : null}
              </Row>
            ),
          }}
        />

        <BottomTab.Screen
          name="Profile"
          component={Profile}
          options={{
            title: "",
            unmountOnBlur: true,
            tabBarIcon: (focused) => (
              <Row
                style={{
                  ...styles.tabOption,
                  backgroundColor:
                    focused == true ? colors.lightYellow : colors.white,
                }}
              >
                <TabProfileIcon />
                {focused == true ? (
                  <Regular
                    label={"Profile"}
                    style={{ ...styles.lableStyle, marginRight: mvs(3) }}
                  />
                ) : null}
              </Row>
            ),
          }}
        />
      </BottomTab.Navigator>
    </View>
  );
};
const styles = StyleSheet.create({
  tabOption: {
    justifyContent: "space-between",
    alignItems: "center",
    width: mvs(92),
    borderRadius: 6,
    height: mvs(32),
    paddingHorizontal: mvs(8),
  },
  lableStyle: {
    color: colors.primary,
    fontSize: mvs(12),
  },
});
export default TabNavigator;
