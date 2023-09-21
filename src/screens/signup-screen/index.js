import { useTheme } from "@react-navigation/native";
import React from "react";
import { Alert, ScrollView, View } from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import Buttons from "../../components/atoms/Button";
import { INPUT_FIELD } from "../../components/atoms/Input";
import { goBack } from "../../navigation/navigation-ref";
import Bold from "../../presentation/typography/bold-text";
import Regular from "../../presentation/typography/regular-text";
import SERVICES from "../../services/common-services";
import { mvs } from "../../services/metrices";
import { onSignup } from "../../store/api-calls";
import { Signin_Styles as styles } from "./signup-styles";

const Signup = (props) => {
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const [payload, setPayload] = React.useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    // confirmPassword: "",
    uid: "",
  });
  const { colors } = useTheme();

  const onSubmit = async () => {
    const { email, name, mobile, password } = payload;
    if (!name?.trim()) {
      return showToast("error", "Name is required");
    } else if (!email?.trim()) {
      return showToast("error", "Email is required");
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return showToast("error", "Email is invalid");
    } else if (!password?.trim()) {
      return showToast("error", "Password is required");
    } else if (!mobile?.trim()) {
      return showToast("error", "Phone number is required");
    }
    try {
      setLoading(true);
      const res = await onSignup({
        ...payload,
      });
      console.log("res::::", res);
      Alert.alert(
        "Register",
        "Your account will be reviewed by Admin, Please wait"
      );
    } catch (error) {
      console.log("error::::", error);
      return showToast("error", SERVICES?._returnError(error));
    } finally {
      setLoading(false);
    }
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
            <Bold label={"Signup"} style={styles.welcomeText} />
            <Regular
              numberOfLines={2}
              label={"Please enter required informations to register account"}
              style={styles.welcomeSubText}
            />
            <View style={styles.input_container}>
              <INPUT_FIELD.InputPrimary
                value={payload.name}
                leftIcon="User"
                rightIcon=""
                onChangeText={(t) =>
                  setPayload({ ...payload, name: t?.toLowerCase() })
                }
                label="NAME"
                placeholder="John Doe"
              />
              <INPUT_FIELD.InputSecondary
                keyboardType="email-address"
                value={payload.email}
                leftIcon="Email"
                rightIcon=""
                onChangeText={(t) =>
                  setPayload({ ...payload, email: t?.toLowerCase() })
                }
                label="EMAIL"
                placeholder="lehieuds@gmail.com"
              />
              <INPUT_FIELD.InputPrimary
                keyboardType="phone-pad"
                value={payload.phone}
                leftIcon="User"
                rightIcon=""
                onChangeText={(t) => setPayload({ ...payload, phone: t })}
                label="PHONE"
                placeholder="XXXXXXXXX"
              />
              <INPUT_FIELD.InputPrimary
                secureTextEntry
                leftIcon="User"
                rightIcon=""
                value={payload.password}
                onChangeText={(t) => setPayload({ ...payload, password: t })}
                label="PASSWORD"
                placeholder="Password"
              />
              {/* <INPUT_FIELD.InputPrimary
                secureTextEntry
                leftIcon="User"
                rightIcon=""
                value={payload.password}
                onChangeText={(t) =>
                  setPayload({ ...payload, confirmpassword: t })
                }
                label="CONFIRM PASSWORD"
                placeholder="Confirm Password"
              /> */}
            </View>
            {/* <Bold label={"Forgot Password?"} style={styles.forgotText} /> */}
            <Buttons.ButtonPrimary
              disabled={loading}
              loading={loading}
              onClick={onSubmit}
              textStyle={styles.buttonText}
              style={{ ...styles.button }}
              title={"Register"}
            />

            <Regular
              onPress={() => goBack()}
              label={`Already have an account`}
              style={styles.account}
            />
          </>
        </View>
      </ScrollView>
      <Toast />
    </View>
  );
};

export default Signup;
