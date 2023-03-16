import { useNavigation, useTheme } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { ScrollView, View } from "react-native";
import PhoneInput from "react-native-phone-number-input";
import Toast from "react-native-toast-message";
import { Apple, Facebook, Google, Tick } from "../../assets/common-icons";
import Buttons from "../../components/atoms/Button";
import { INPUT_FIELD } from "../../components/atoms/Input";
import { storeData } from "../../localStorage";
import Bold from "../../presentation/typography/bold-text";
import Regular from "../../presentation/typography/regular-text";
import allColors from "../../services/colors";
import SERVICES from "../../services/common-services";
import { mvs } from "../../services/metrices";
import API_REQUESTS from "../../store/api-requests";
import { Signin_Styles as styles } from "./signin-styles";

const Signin = (props) => {
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(false);
  const [selectedTab, setSelectedTab] = React.useState("");
  const [isSignUpWithPhone, setPhoneSignUp] = React.useState(true);
  const [phoneNumber, setphoneNumber] = useState("818181");
  const phoneInput = useRef(null);
  const [formattedValue, setFormattedValue] = useState("818181");
  const [payload, setPayload] = React.useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });
  const { colors } = useTheme();

  const onSigin = async () => {
    setSelectedTab("login");
  };

  useEffect(() => {
    // storeData("BusinessId", "3333");
    // delayAPI();
  }, []);
  const onSigUp = async () => {
    setSelectedTab("signup");
    setPhoneSignUp(false);
  };
  const onSigUpWithPhone = async () => {
    setPhoneSignUp(true);
  };

  const delayAPI = (phone) => {
    //navigation.navigate("Otp", { phone });
    navigation.navigate("Main");
  };
  const getMobile = async () => {
    if (formattedValue.length <= 0) {
      return showToast("error", "Please Enter mobile number");
    } else {
      var phone = phoneInput?.current?.getCallingCode() + "-" + formattedValue; //"971-507285968";
      console.log("Phone Number " + phone);
      try {
        setLoading(true);
        const result = await API_REQUESTS.postData("users/login/business", {
          phone: phone,
          isBusiness: 1,
        });
        console.log('result=>', result?.data);
        if (result?.data?.message === 'Invalid user') {
          showToast("error", result?.data?.message);
        } else {
          storeData("BusinessId", result?.data?.customer_id + "");
          delayAPI(phone, result?.data);
          showToast("success", result.data);
          delayAPI(phone);
        }
      } catch (error) {
        console.log("error=>", error);
        showToast("error", SERVICES._returnError(error));
      } finally {
        setLoading(false);
      }
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
      <ScrollView>
        <View style={styles.body}>
          {selectedTab == "login" ? (
            <>
              <Bold label={"Welcome Back!"} style={styles.welcomeText} />
              <Regular
                label={"Please enter your email and password"}
                style={styles.welcomeSubText}
              />
              <Regular label={"to contiue"} style={styles.welcomeSubText} />
              <View style={styles.input_container}>
                <INPUT_FIELD.InputSecondary
                  value={payload.email}
                  leftIcon="User"
                  rightIcon=""
                  onChangeText={(t) => setPayload({ ...payload, email: t })}
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
              <Bold label={"Forgot Password?"} style={styles.forgotText} />
              <Buttons.ButtonPrimary
                disabled={loading}
                loading={loading}
                onClick={onSigin}
                textStyle={styles.buttonText}
                style={{ ...styles.button }}
                title={"Login"}
              />
              <Regular
                label={"Continue With"}
                style={styles.continueWithText}
              />
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
              </View>
            </>
          ) : selectedTab == "signup" && isSignUpWithPhone == false ? (
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
            </>
          ) : null}
        </View>
      </ScrollView>
      <Toast />
    </View>
  );
};

export default Signin;
