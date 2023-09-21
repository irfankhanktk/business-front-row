import React from "react";
import { View, Text } from "react-native";
import { styles } from "./style";
import { CustomHeader } from "../../components/molecules/header/header-1x";
import colors from "../../services/colors";
import CustomWebView from "../../components/atoms/web-view";
import { URLS } from "../../store/api-urls";
const Terms = () => {
  return (
    <View style={styles.container}>
      <CustomHeader
        allowBackBtn
        title="Terms & Conditions"
        style={{ backgroundColor: colors.primary }}
      />
      <View style={styles.body}>
        <CustomWebView url={URLS.terms} />
      </View>
    </View>
  );
};
export default Terms;
