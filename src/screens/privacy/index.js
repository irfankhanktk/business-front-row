import React from "react";
import { View, Text } from "react-native";
import { styles } from "./style";
import { CustomHeader } from "../../components/molecules/header/header-1x";
import colors from "../../services/colors";
import CustomWebView from "../../components/atoms/web-view";
import { URLS } from "../../store/api-urls";
const Privacy = () => {
  return (
    <View style={styles.container}>
      <CustomHeader
        allowBackBtn
        title="Privacy Policy"
        style={{ backgroundColor: colors.primary }}
      />
      <View style={styles.body}>
        <CustomWebView url={URLS.policy} />
      </View>
    </View>
  );
};
export default Privacy;
