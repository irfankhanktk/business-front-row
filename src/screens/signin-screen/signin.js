import auth from "@react-native-firebase/auth";
import { useTheme } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { ScrollView, View } from "react-native";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import Buttons from "../../components/atoms/Button";
import { INPUT_FIELD } from "../../components/atoms/Input";
import Bold from "../../presentation/typography/bold-text";
import Regular from "../../presentation/typography/regular-text";
import { mvs } from "../../services/metrices";
import { getBusinessDetails } from "../../store/api-calls";
import { Signin_Styles as styles } from "./signin-styles";

const Signin = (props) => {
  const [loading, setLoading] = React.useState(false);
  const phoneInput = useRef(null);
  const dispatch = useDispatch();
  const [payload, setPayload] = React.useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });
  useEffect(() => {
    console.log("CREDIENTIALS====> ", payload);
  }, [payload]);
  const { colors } = useTheme();
  // FIREBASE
  // Set an initializing state whilst Firebase connects
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
            {/* <Bold label={"Forgot Password?"} style={styles.forgotText} /> */}
            <Buttons.ButtonPrimary
              disabled={loading}
              loading={loading}
              onClick={() => signin(payload?.email, payload?.password)}
              textStyle={styles.buttonText}
              style={{ ...styles.button }}
              title={"Login"}
            />
            {/* <Regular
                label={"Continue With"}
                style={styles.continueWithText}
              />
               <TouchableOpacity onPress={() => { setSelectedTab("") }} style={styles.socialIconView}>
                <Google />
                <Regular
                  label={"Sign in with Phone"}
                  style={styles.socialIconText}
                />
              </TouchableOpacity>
              <View style={styles.socialIconView}>
                <Google />
                <Regular
                  label={"Sign in with Google"}
                  style={styles.socialIconText}
                />
              </View>
              <View style={styles.socialIconView}>
                <Facebook />
                <Regular
                  label={"Sign in with Facebook"}
                  style={styles.socialIconText}
                />
              </View>
              <View style={styles.socialIconView}>
                <Apple />
                <Regular
                  label={"Sign in with Facebook"}
                  style={styles.socialIconText}
                />
              </View> */}
          </>
          {/* ) : selectedTab == "signup" && isSignUpWithPhone == false ? (
            <>
              <Bold label={"Create Your Account"} style={styles.welcomeText} />
              <Regular
                label={"Enter your full name and email address to"}
                style={styles.welcomeSubText}
              />
              <Regular
                label={"create your account"}
                style={styles.welcomeSubText}
              />

              <View style={styles.input_container}>
                <INPUT_FIELD.InputSecondary
                  rightIcon={false}
                  leftIcon="User"
                  value={payload.name}
                  onChangeText={(t) => setPayload({ ...payload, name: t })}
                  label="FULL NAME"
                  placeholder="John Doe"
                />

                <INPUT_FIELD.InputSecondary
                  value={payload.email}
                  leftIcon="User"
                  rightIcon="Tick"
                  onChangeText={(t) => setPayload({ ...payload, email: t })}
                  label="EMAIL"
                  placeholder="lehieuds@gmail.com"
                />
                <INPUT_FIELD.InputSecondary
                  secureTextEntry
                  leftIcon="Lock"
                  value={payload.password}
                  onChangeText={(t) => setPayload({ ...payload, password: t })}
                  label="PASSWORD"
                  placeholder="Password"
                />

                <INPUT_FIELD.InputSecondary
                  secureTextEntry
                  leftIcon="User"
                  rightIcon="Lock"
                  value={payload.confirmPassword}
                  onChangeText={(t) =>
                    setPayload({ ...payload, confirmPassword: t })
                  }
                  label="CONFIRM PASSWORD"
                  placeholder="Confirm Password"
                />
              </View>
              <Buttons.ButtonPrimary
                disabled={loading}
                loading={loading}
                onClick={onSigin}
                textStyle={{ ...styles.buttonText, color: colors.white }}
                style={{ ...styles.button }}
                title={"Continue"}
              />
              <Buttons.ButtonPrimary
                disabled={loading}
                loading={loading}
                onClick={onSigUpWithPhone}
                textStyle={styles.buttonText}
                style={{
                  ...styles.button,
                  backgroundColor: colors.white,
                  borderWidth: 1.4,
                  borderColor: allColors.primary,
                }}
                title={"Sign up with Phone Number"}
              />
            </>
          ) : isSignUpWithPhone == true ? (
            <>
              <Regular label={"Front Row"} style={styles.frontRowText} />
              <Bold label={"Welcome Back!"} style={styles.welcomeText} />
              <Regular
                label={"Enter your mobile number"}
                style={styles.welcomeSubText}
              />
              <Regular label={"to continue."} style={styles.welcomeSubText} />
              <Bold label={"MOBILE"} style={{ marginTop: mvs(30) }}>
                <Regular label={" NUMBER"} />
              </Bold>
              <View style={{ ...styles.phoneNumberView, marginTop: mvs(10) }}>
                <PhoneInput
                  ref={phoneInput}
                  defaultValue="818181"
                  defaultCode="AE"
                  layout="first"
                  containerStyle={styles.phoneContainer}
                  textContainerStyle={styles.textInput}
                  onChangeFormattedText={(text) => {
                    setphoneNumber(text);
                  }}
                  onChangeText={(text) => {
                    setFormattedValue(text);
                  }}
                />
                <Tick style={{}} />
              </View>
              <Buttons.ButtonPrimary
                disabled={loading}
                loading={loading}
                onClick={getMobile}
                //onClick={() => navigation.navigate('Otp')}
                textStyle={{ ...styles.buttonText, color: colors.white }}
                style={{ ...styles.button }}
                title={"Continue"}
              />
              <TouchableOpacity onPress={() => { setSelectedTab("login") }} style={styles.socialIconView}>
                <Regular
                  label={"Sign in with Other Methods"}
                  style={styles.socialIconText}
                />
              </TouchableOpacity>
            </>
          ) : null} */}
        </View>
      </ScrollView>
      <Toast />
    </View>
  );
};

export default Signin;
