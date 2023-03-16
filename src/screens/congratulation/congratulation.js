import { useNavigation, useTheme } from "@react-navigation/native";
import React from "react";
import { ScrollView, SafeAreaView, View } from "react-native";
import { connect } from "react-redux";
import Buttons from "../../components/atoms/Button";
import { mvs } from "../../services/metrices";
import DIVIY_API from "../../store/api-calls";
import { Congrates } from "../../assets/common-icons";
import { Congratulation_Styles as styles } from "./congratulation-styles";
import Bold from "../../presentation/typography/bold-text";
import Regular from "../../presentation/typography/regular-text";
import allColors from "../../services/colors";

const Congratulation = (props) => {
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(false);

  const [payload, setPayload] = React.useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });
  const { colors } = useTheme();

  const onSigin = async () => {};

  return (
    <SafeAreaView
      style={{ ...styles.container, backgroundColor: colors.background }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: mvs(16) }}
      >
        <View style={styles.body}>
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Congrates />
            <Bold label={"Congratulations!"} style={styles.welcomeText} />
            <Regular
              label={"You have successfully created your"}
              style={styles.welcomeSubText}
            />
            <Regular label={"account"} style={styles.welcomeSubText} />
          </View>
          <View
            style={{
              flex: 1,
              marginVertical: mvs(20),
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <Buttons.ButtonPrimary
              disabled={loading}
              loading={loading}
              onClick={() => navigation.navigate("NewBooking")}
              textStyle={{ ...styles.buttonText, color: colors.white }}
              style={{ ...styles.button }}
              title={"Continue Booking..."}
            />
            {/* <Buttons.ButtonPrimary
              disabled={loading}
              loading={loading}
              onClick={onSigin}
              textStyle={styles.buttonText}
              style={{
                ...styles.button,
                backgroundColor: colors.white,
                borderColor: allColors.primary,
                borderWidth: 2,
              }}
              title={"How it works?"}
            /> */}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = (store) => ({
  // home_posts: store.state.home_posts,
});

const mapDispatchToProps = {
  signin: (payload) => DIVIY_API.signin(payload),
};
export default connect(mapStateToProps, mapDispatchToProps)(Congratulation);
