import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView, StyleSheet, Text, TouchableOpacity
} from "react-native";
import { BaseURL } from "../../ApiServices";
import { BookingActive, Floating } from "../../assets/common-icons";
import Medium from "../../presentation/typography/medium-text";
import SemiBold from "../../presentation/typography/semibold-text";
import AfterNoon from "../../screens/activities/afternoon/after-noon";
import Evening from "../../screens/activities/evening/evening";
import Morning from "../../screens/activities/morning/morning";
import { default as allColors, default as colors } from "../../services/colors";
import { mvs } from "../../services/metrices";
import Row from "./../../components/atoms/row";
import MyTabBar from "./../../components/top-tab-navigation/index";

const Tab = createMaterialTopTabNavigator();

const TopTabNavigator = () => {
  const navigation = useNavigation();
  const [value, setValue] = React.useState(0);
  const [laoding, setlaoding] = useState(false);
  const [stateData, setstateData] = useState([]);

  const getOngoingBooking = async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    await fetch(
      `${BaseURL}b/om/businesses/1/services/1/bookings`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result != null) {
          setstateData(result);
          setlaoding(true);
          //  console.log("onGoing Booking======", stateData);
        }
      })
      .catch((error) => {
        setlaoding(true);
        // console.log("error onGoing Booking======", error);
      });
  };
  useEffect(() => {
    getOngoingBooking();
  }, [laoding]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={() => navigation.navigate("NewBooking")}
        style={{ position: "absolute", bottom: 0, zIndex: 100, right: 5 }}
      >
        <Text>
          <Floating />
        </Text>
      </TouchableOpacity>
      <Row
        style={{
          paddingHorizontal: mvs(20),
          paddingVertical: mvs(15),
          borderBottomWidth: 0.5,
          borderColor: colors.GD8D8D8,
        }}
      >
        <Row>
          <BookingActive />
          <Medium
            size={mvs(16)}
            label={"  My Bookings"}
          />
        </Row>
      </Row>
      <Tab.Navigator
        tabBar={(props) => <MyTabBar {...props} />}
        screenOptions={{
          tabBarActiveTintColor: allColors.black,
          // tabBarStyle: { backgroundColor: "white", marginTop: mvs(14), fontSize: mvs(10) },
          tabBarIndicatorStyle: {
            backgroundColor: allColors.primary,
          },
        }}
      >
        <Tab.Screen
          name="Morning"
          component={Morning}
          options={{
            title: stateData?.Morning?.timing,
            tabBarLabel: "Morning",
          }}
        />
        <Tab.Screen
          name="Afternoon"
          component={AfterNoon}
          options={{
            title: stateData?.Afternoon?.timing,
            tabBarLabel: "Afternoon",
          }}
        />
        <Tab.Screen
          name="Evening"
          component={Evening}
          options={{
            title: stateData?.Evening?.timing,
            tabBarLabel: "Evening",
            tabBarStyle: { backgroundColor: "powderblue" },
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  tabOption: {
    width: mvs(110),
    height: mvs(50),
  },
  lableStyle: {
    color: colors.black,
    fontSize: 17,
  },
});
export default TopTabNavigator;
