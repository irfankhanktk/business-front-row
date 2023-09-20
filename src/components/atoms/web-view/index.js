import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";

const CustomWebView = ({ url = "https://reactnative.dev/" }) => {
  return <WebView source={{ uri: url }} style={{ flex: 1 }} />;
};
export default CustomWebView;
