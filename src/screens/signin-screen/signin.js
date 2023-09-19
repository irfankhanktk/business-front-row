import auth from "@react-native-firebase/auth";
import { useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import Buttons from "../../components/atoms/Button";
import { INPUT_FIELD } from "../../components/atoms/Input";
import { navigate } from "../../navigation/navigation-ref";
import Bold from "../../presentation/typography/bold-text";
import Regular from "../../presentation/typography/regular-text";
import { mvs } from "../../services/metrices";
import { getBusinessDetails } from "../../store/api-calls";
import { Signin_Styles as styles } from "./signin-styles";

const Signin = (props) => {
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const [payload, setPayload] = React.useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });
  const { colors } = useTheme();
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const signin = async (email, password) => {
    if (!email?.trim()) {
      return showToast("error", "Email is required");
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return showToast("error", "Email is invalid");
    } else if (!password?.trim()) {
      return showToast("error", "Password is required");
    }
    dispatch(getBusinessDetails(props, email, password, setLoading));
  };

  const showToast = (type, text1, text2) => {
    Toast.show({
      type: type,
      text1: text1,
      text2: text2,
      position: "top",
      autoHide: true,
      visibilityTime: 3000,
    });
  };
  return (
    <View style={{ ...styles.container, backgroundColor: colors.background }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: mvs(20) }}
      >
        <View style={styles.body}>
          <>
            <Bold label={"Welcome Back!"} style={styles.welcomeText} />
            <Regular
              label={"Please enter your email and password"}
              style={styles.welcomeSubText}
            />
            <Regular label={"to contiue"} style={styles.welcomeSubText} />
            <View style={styles.input_container}>
              <INPUT_FIELD.InputSecondary
                keyboardType="email-address"
                x
                value={payload.email}
                leftIcon="User"
                rightIcon=""
                onChangeText={(t) =>
                  setPayload({ ...payload, email: t?.toLowerCase() })
                }
                label="EMAIL"
                placeholder="lehieuds@gmail.com"
              />
              <INPUT_FIELD.InputSecondary
                secureTextEntry
                leftIcon="User"
                rightIcon=""
                value={payload.password}
                onChangeText={(t) => setPayload({ ...payload, password: t })}
                label="PASSWORD"
                placeholder="Password"
              />
            </View>
            <Buttons.ButtonPrimary
              disabled={loading}
              loading={loading}
              onClick={() => signin(payload?.email, payload?.password)}
              textStyle={styles.buttonText}
              style={{ ...styles.button }}
              title={"Login"}
            />

            <Regular
              onPress={() => navigate("Signup")}
              label={`Don't have an account`}
              style={styles.account}
            />
          </>
        </View>
      </ScrollView>
      <Toast />
    </View>
  );
};

export default Signin;
