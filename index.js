/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import Booking from "./src/screens/new-booking-details/new-booking-details";
AppRegistry.registerComponent(appName, () => App);
console.disableYellowBox = true;
