// In App.js in a new project

import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { StatusBar, SafeAreaView } from "react-native";
import HomeScreen from "../../screens/home-screen";
import Otp from "../../screens/otp-screen/otp";
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
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle={"dark-content"} backgroundColor={colors.white} />
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={horizontalAnimation}
      >
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="BookingDetails" component={BookingDetails} />
        <Stack.Screen name="NewBookingDetails" component={NewBookingDetails} />
        <Stack.Screen name="StartJob" component={StartJob} />
        <Stack.Screen name="Otp" component={Otp} />
        <Stack.Screen name="Signin" component={Signin} />
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="ReviewSchedule" component={ReviewSchedule} />
        <Stack.Screen name="MoreDetails" component={MoreDetails} />
        <Stack.Screen name="ServiceDetails" component={ServiceDetails} />
        <Stack.Screen name="Notifications" component={Notifications} />

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
