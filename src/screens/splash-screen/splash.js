import { useTheme } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { connect, useDispatch } from "react-redux";
import { Logo } from "../../assets/common-icons";
import { getData } from "../../localStorage";
import { ACTIONS, setUserInfo } from "../../store/actions";
import { Splash_Styles as styles } from "./splash-styles";
const Splash = (props) => {
  const { navigation } = props;
  const { colors } = useTheme();
  const dispatch = useDispatch();

  React.useEffect(() => {
    (async () => {
      let user = await getData("@user");
      setTimeout(() => {
        if (user != null) {
          setUserInfo(JSON.parse(user));
          navigation.replace("Main");
        } else {
          navigation.replace("Onboarding");
        }
      }, 3000);
    })();
  }, []);

  return (
    <View style={{ ...styles.container, backgroundColor: colors.background }}>
      <Logo />
    </View>
  );
};

const mapStateToProps = (store) => ({
  home_posts: store.state.home_posts,
  user_info: store.state.user_info,
});

const mapDispatchToProps = {
  setUserInfo: (payload) => ACTIONS.setUserInfo(payload),
  setSocket: (payload) => ACTIONS.setSocket(payload),
};
export default connect(mapStateToProps, mapDispatchToProps)(Splash);
