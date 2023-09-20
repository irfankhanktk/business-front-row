// In App.js in a new project

import { createStackNavigator } from "@react-navigation/stack";
import React, { useState, useEffect } from "react";
import { StatusBar, SafeAreaView } from "react-native";
import HomeScreen from "../../screens/home-screen";
import Otp from "../../screens/otp-screen/otp";
import messaging from "@react-native-firebase/messaging";
import Splash from "../../screens/splash-screen/splash";
import Onboarding from "./../../screens/onboarding-screen/onboarding";
import Signin from "./../../screens/signin-screen/signin";
import colors from "./../../services/colors";
import BookingDetails from "../../screens/booking-details/booking-details";
import ServiceOfferingDetails from "./../../screens/service-offering-details-screen/index";
import CouponDetails from "./../../screens/coupon-details-screen/index";
import About from "../../screens/about/about";
import CustomerVehicle from "../../screens/customer-vehicle/customer-vehicle";
import Congratulation from "../../screens/congratulation/congratulation";
import PersonalDetails from "../../screens/personal-details/personal-details";
import Profile from "../../screens/profile/profile";
import TabNavigator from "../tab-navigator/tab-navigator";
import MoreDetails from "./../../screens/more-details-screen/index";
import ServiceDetails from "./../../screens/service-details-screen/index";
import NewBooking from "../../screens/new-booking/new-booking";
import NewCustomer from "../../screens/new-customer/new-customer";
import NewBookingDetails from "../../screens/new-booking-details/new-booking-details";
import StartJob from "../../screens/start-job/start-job";
import ReviewSchedule from "../../screens/review-schedule/review-schedule";
import Notifications from "../../screens/notifications";
import { useNavigation } from "@react-navigation/native";
import Signup from "../../screens/signup-screen";
import Privacy from "../../screens/privacy";
import Terms from "../../screens/terms";
const Stack = createStackNavigator();
const horizontalAnimation = {
  headerShown: false,
  gestureDirection: "horizontal",
  cardStyleInterpolator: ({ current, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};
export const MainNavigator = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState("Splash");

  useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open

    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log(
        "Notification caused app to open from background state:",
        remoteMessage.notification
      );
      navigation.navigate(remoteMessage.data.type);
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log(
            "Notification caused app to open from quit state:",
            remoteMessage.notification
          );
          setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
        }
        setLoading(false);
      });
  }, []);

  if (loading) {
    return null;
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle={"dark-content"} backgroundColor={colors.white} />
      <Stack.Navigator
        initialRouteName={initialRoute || "Splash"}
        screenOptions={horizontalAnimation}
      >
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="BookingDetails" component={BookingDetails} />
        <Stack.Screen name="NewBookingDetails" component={NewBookingDetails} />
        <Stack.Screen name="StartJob" component={StartJob} />
        <Stack.Screen name="Otp" component={Otp} />
        <Stack.Screen name="Signin" component={Signin} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="ReviewSchedule" component={ReviewSchedule} />
        <Stack.Screen name="MoreDetails" component={MoreDetails} />
        <Stack.Screen name="ServiceDetails" component={ServiceDetails} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="Privacy" component={Privacy} />
        <Stack.Screen name="Terms" component={Terms} />

        <Stack.Screen
          name="ServiceOfferingDetails"
          component={ServiceOfferingDetails}
        />
        <Stack.Screen name="CouponDetails" component={CouponDetails} />
        <Stack.Screen name="About" component={About} />
        <Stack.Screen name="CustomerVehicle" component={CustomerVehicle} />
        <Stack.Screen name="Congratulation" component={Congratulation} />
        <Stack.Screen name="PersonalDetails" component={PersonalDetails} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="NewBooking" component={NewBooking} />
        <Stack.Screen name="NewCustomer" component={NewCustomer} />
      </Stack.Navigator>
    </SafeAreaView>
  );
};
