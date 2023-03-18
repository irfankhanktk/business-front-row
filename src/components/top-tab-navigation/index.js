import React from "react";
import {
  Animated,
  View,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import Medium from "../../presentation/typography/medium-text";
import { mvs } from "../../services/metrices";
import colors from "./../../services/colors";
import fonts from "./../../services/fonts";

function MyTabBar({ state, descriptors, navigation, position }) {
  return (
    <View style={{ flexDirection: "row" }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;
        const title = options.title;
        const isFocused = state.index === index;
        //  console.log('label::',label);
        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        const inputRange = state.routes.map((_, i) => i);
        const opacity = position.interpolate({
          inputRange,
          outputRange: inputRange.map((i) => (i === index ? 1 : 0)),
        });

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              paddingVertical: mvs(10),
              alignItems: "center",
              borderBottomWidth: isFocused ? 2 : 0,
              borderColor: colors.primary,
            }}
          >
            <Medium
              label={label}
            />
            <Animated.Text
              style={{
                color: colors.G777373,
                fontFamily: fonts.regular,
                fontSize: mvs(10),
              }}
            >
              {title}
            </Animated.Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default MyTabBar;
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
