import { useNavigation, useTheme } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, SafeAreaView, ScrollView, View } from "react-native";
import Toast from "react-native-toast-message";
import { BaseURL } from "../../ApiServices";
import { INPUT_FIELD } from "../../components/atoms";
import Buttons from "../../components/atoms/Button";
import Row from "../../components/atoms/row";
import { CustomHeader } from "../../components/molecules/header/header-1x";
import { storeData } from "../../localStorage";
import Medium from "../../presentation/typography/medium-text";
import Regular from "../../presentation/typography/regular-text";
import { Vehicle_Styles as styles } from "./customer-vehicle-styles";
import DIVIY_API from "../../store/api-calls";
import PageLoader from "../../components/atoms/page-loader";
const CustomerVehicle = ({ route, props }) => {
  const navigation = useNavigation();
  const { customerID } = route.params;
  const [loading, setLoading] = React.useState(false);
  const [screenLoading, setScreenLoading] = React.useState(true);
  const [data, setData] = useState({
    emirates: [],
    types: [],
    makes: {},
    years: [],
    colors: [],
  });

  const [payload, setPayload] = React.useState({
    emirate: "",
    type: "",
    registration: "",
    make: "",
    modal: "",
    year: "",
    color: "",
    vin: "",
  });
  const { colors } = useTheme();

  const delayApi = () => {
    navigation.navigate("Congratulation");
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

  const getVehicleLookup = async () => {
    try {
      setScreenLoading(true);
      const res = await DIVIY_API.get_vehicle_lookup();

      setData(res?.data);
    } catch (error) {
      console.log("error:::", error);
      Alert.alert("Error", error?.message);
    } finally {
      setScreenLoading(false);
    }
  };
  useEffect(() => {
    getVehicleLookup();
  }, []);
  const addNewVehicle = async () => {
    if (!payload.emirate) {
      showToast("error", "Enter Emirate");
      return;
    } else if (!payload.type) {
      showToast("error", "Select vehicle type ");
      return;
    } else if (!payload.registration) {
      showToast("error", "Enter registration number ");
      return;
    } else if (!!payload.make && !payload.modal) {
      showToast("error", "Vehicle modal is required");
      return;
    } else {
      setLoading(true);
      var myHeaders = new Headers();
      myHeaders.append();

      var raw = JSON.stringify({
        type: payload.type,
        registration: payload.registration,
        make: payload.make,
        model: payload.modal,
        year: payload.year,
        color: payload.color,
      });

      var requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: raw,
        redirect: "follow",
      };

      await fetch(
        `${BaseURL}b/om/businesses/3333/customers/${customerID}/vehicles`,
        requestOptions
      )
        .then((response) => response.text())
        .then((result) => {
          if (result != null) {
            showToast("success", "Vehicle added successfully");
            storeData("vehicleID", result);
            setLoading(false);
            // console.log(result);
            delayApi();
          }
        })
        .catch((error) => {
          setLoading(false);
          //  console.log("error", error);
        });
    }
  };

  return (
    <View style={{ ...styles.container, backgroundColor: colors.background }}>
      <CustomHeader colors={colors} title="Customer Vehicle" allowBackBtn />
      {screenLoading ? (
        <PageLoader />
      ) : (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.body}>
            <Medium label={"Customer Vehicle"} size={21} />
            <Regular label={"Add Customer vehicle to use our services"} />
            <View style={styles.input_container}>
              <INPUT_FIELD.CustomDropDown
                value={payload.emirate}
                onChangeText={(t) => setPayload({ ...payload, emirate: t })}
                label="Emirate"
                items={data?.emirates || []}
                placeholder="Select Emirate"
              />
              <INPUT_FIELD.CustomDropDown
                value={payload.type}
                onChangeText={(t) => setPayload({ ...payload, type: t })}
                label="TYPE"
                items={data?.types || []}
                placeholder="Select Type"
              />
              <INPUT_FIELD.InputView
                value={payload.registration}
                onChangeText={(t) =>
                  setPayload({ ...payload, registration: t })
                }
                label="REGISTRATION NUMBER"
                placeholder="Enter you Registration"
              />

              <INPUT_FIELD.CustomDropDown
                value={payload.make}
                onChangeText={(t) =>
                  setPayload({ ...payload, make: t, modal: "" })
                }
                label="Make"
                items={Object.keys(data?.makes).map((x) => x)}
                placeholder="Select Type"
              />

              <INPUT_FIELD.CustomDropDown
                editable={!!payload.make}
                value={payload.modal}
                onChangeText={(t) => setPayload({ ...payload, modal: t })}
                label="VEHICLE MODEL"
                items={data?.makes[payload?.make] || []}
                placeholder="Select Model"
              />
              <Row style={{ justifyContent: "space-between" }}>
                <INPUT_FIELD.CustomDropDown
                  value={payload.year}
                  style={{ width: "46%" }}
                  onChangeText={(t) => setPayload({ ...payload, year: t })}
                  label="YEAR"
                  items={data?.years || []}
                  placeholder="Select"
                />

                <INPUT_FIELD.CustomDropDown
                  value={payload.color}
                  style={{ width: "46%" }}
                  onChangeText={(t) => setPayload({ ...payload, color: t })}
                  label="COLOR"
                  items={data?.colors || []}
                  placeholder="Select"
                />
              </Row>
              <INPUT_FIELD.InputView
                value={payload.vin}
                onChangeText={(t) => setPayload({ ...payload, vin: t })}
                label="VIN"
                placeholder="Enter VIN number"
              />
            </View>
            <Buttons.ButtonPrimary
              disabled={loading}
              loading={loading}
              onClick={addNewVehicle}
              //onClick={() => navigation.navigate("Congratulation")}
              textStyle={{ ...styles.buttonText, color: colors.white }}
              style={{ ...styles.button }}
              title={"Proceed"}
            />
          </View>
        </ScrollView>
      )}
      <Toast />
    </View>
  );
};

export default CustomerVehicle;
