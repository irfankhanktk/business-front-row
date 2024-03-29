import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import { Image, SafeAreaView, ScrollView, View } from "react-native";
import PhoneInput from "react-native-phone-number-input";
import Toast from "react-native-toast-message";
import { BaseURL } from "../../ApiServices";
import { Warning } from "../../assets/images";
import { INPUT_FIELD } from "../../components/atoms";
import Buttons from "../../components/atoms/Button";
import Row from "../../components/atoms/row";
import { CustomHeader } from "../../components/molecules/header/header-1x";
import { getData } from "../../localStorage";
import Medium from "../../presentation/typography/medium-text";
import Regular from "../../presentation/typography/regular-text";
import colors from "../../services/colors";
import { mvs } from "../../services/metrices";
import { Styles as styles } from "./new-customer-styles";
const NewCustomer = (props) => {
  const { route } = props;
  const { countryCode, phoneNumber } = route?.params;
  const [error, setError] = useState("null");
  const phoneInput = useRef(null);
  const navigation = useNavigation();
  const [loading, setloading] = useState(false);
  const [userInfo, setuserInfo] = useState({
    name: "",
    mobile: phoneNumber || "",
    email: "",
  });
  const delayApi = (customerID) => {
    navigation.navigate("CustomerVehicle", {
      customerID,
    });
  };
  function isValidUAEMobileNumber(number) {
    console.log("number ::::", number);
    // Define the regex pattern
    const pattern = /^(?:\+971)[56789]\d{8}$/;

    // Use the test method to check if the pattern matches the string
    return pattern.test(number);
  }
  const addNewCustomer = async () => {
    if (userInfo.name === "") {
      showToast("error", "Name is required");
      return;
    } else if (userInfo.mobile.length == 0) {
      showToast("error", "Mobile is required");
      return;
    } else if (!isValidUAEMobileNumber(userInfo.mobile)) {
      showToast("error", "Mobile number is invalid");
      return;
    } else if (
      !!userInfo?.email &&
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userInfo.email)
    ) {
      showToast("error", "Email is invalid");
      return;
    } else {
      setloading(true);

      var raw = JSON.stringify({
        name: userInfo.name,
        mobile: `${userInfo.mobile}`,
        email: userInfo.email,
      });

      var requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: raw,
        redirect: "follow",
      };
      var bId = await getData("BusinessId");
      await fetch(`${BaseURL}b/om/businesses/${bId}/customers`, requestOptions)
        .then((response) => {
          if (response?.ok) return response.json();
          else if (response?.status == 400) {
            console.log(response);
            // throw new Error("Same mobile already exists");
            throw response;
          }
          throw response;
        })
        .then((result) => {
          if (result != null) {
            setloading(false);
            showToast("success", "User created Successfully");
            delayApi(result);
            //  console.log(result);
          }
        })
        .catch((error) => {
          setloading(false);
          // showToast("error", `${error}`);
          console.log("error::>>>", error);
        });
    }
  };
  const showToast = (type, text1, text2) => {
    Toast.show({
      type: type,
      text1: text1,
      text2: text2,
      position: "top",
      visibilityTime: 3000,
      autoHide: true,
    });
  };
  return (
    <SafeAreaView
      style={{ ...styles.conntainer, backgroundColor: colors.background }}
    >
      <CustomHeader
        title="Add New Customer"
        titleStyle={{ fontSize: 15 }}
        spacebetween
        allowBackBtn
      />
      <View style={styles.body}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <Medium label={"Customer Information"} size={21} />
          <Regular
            label={"Enter Customer Information below to register"}
            style={{ marginTop: mvs(15) }}
            numberOfLines={2}
          />
          <View style={{ marginHorizontal: mvs(1), marginTop: mvs(25) }}>
            <INPUT_FIELD.InputSecondary
              leftIcon="User"
              rightIcon=""
              onChangeText={(t) => {
                //  console.log("user name", t);
                setuserInfo({ ...userInfo, name: t });
              }}
              value={userInfo?.name}
              label="FULL NAME"
              placeholder="john"
            />

            <Medium
              label={"PHONE NUMBER"}
              size={12}
              style={{ marginTop: mvs(20) }}
            />
            <View style={{ ...styles.phoneNumberView, marginTop: mvs(5) }}>
              <PhoneInput
                ref={phoneInput}
                defaultValue={phoneNumber}
                defaultCode={"AE"}
                layout="first"
                flagButtonStyle={{ width: mvs(60), height: mvs(40) }}
                codeTextStyle={{ marginBottom: 1, fontSize: 13 }}
                containerStyle={styles.phoneContainer}
                textContainerStyle={styles.textInput}
                textInputStyle={{ fontSize: 13 }}
                onChangeFormattedText={(text) => {
                  setuserInfo({ ...userInfo, mobile: text });
                }}
                onChangeText={(text) => {}}
              />
              {/* <Tick style={{}} /> */}
            </View>
            <INPUT_FIELD.InputSecondary
              leftIcon="Email"
              rightIcon=""
              labelStyle={{ marginTop: mvs(25) }}
              onChangeText={(t) => {
                userInfo.email = t?.toLowerCase();
                setuserInfo({
                  ...userInfo,
                });
              }}
              value={userInfo?.email}
              label="EMAIL"
              placeholder="lehieuds@gmail.com"
            />
          </View>
          {error != "null" ? (
            <View style={{ marginTop: 90 }}>
              <Row
                style={{ alignItems: "center", justifyContent: "flex-start" }}
              >
                <Image
                  source={Warning}
                  style={{ height: mvs(20), width: mvs(20) }}
                />
                <Regular
                  color={colors.primary}
                  style={{ ...styles.warningText }}
                  numberOfLines={2}
                  size={16}
                  label={error}
                />
              </Row>
              <Buttons.ButtonPrimary
                textStyle={styles.buttonBlackText}
                title="Continue"
                style={{ ...styles.whiteButton, marginTop: mvs(6) }}
              />
            </View>
          ) : (
            <Buttons.ButtonPrimary
              onClick={addNewCustomer}
              //onClick={() => navigation.navigate("CustomerVehicle")}
              textStyle={styles.buttonWhiteText}
              title="Continue"
              loading={loading}
              style={{ ...styles.button, marginTop: 120 }}
            />
          )}
        </ScrollView>
      </View>
      <Toast />
    </SafeAreaView>
  );
};

export default NewCustomer;
