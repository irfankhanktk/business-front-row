import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
const Row = ({
  style,
  alignItems = "flex-start",
  justifyContent = "space-between",

  children,
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          alignItems: alignItems,
          justifyContent: justifyContent,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};
export default Row;
const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
});
