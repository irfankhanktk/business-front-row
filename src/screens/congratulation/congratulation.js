import { useNavigation, useTheme } from "@react-navigation/native";
import React from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { connect } from "react-redux";
import { Congrates } from "../../assets/common-icons";
import Buttons from "../../components/atoms/Button";
import Bold from "../../presentation/typography/bold-text";
import Regular from "../../presentation/typography/regular-text";
import { mvs } from "../../services/metrices";
import DIVIY_API from "../../store/api-calls";
import { Congratulation_Styles as styles } from "./congratulation-styles";

const Congratulation = (props) => {
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(false);

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
              onClick={() => navigation.pop(3)}
              textStyle={{ ...styles.buttonText, color: colors.white }}
              style={{ ...styles.button }}
              title={"Continue Booking..."}
            />
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
