import { useNavigation, useTheme } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { ScrollView, SafeAreaView, View } from "react-native";
import { CustomHeader } from "../../components/molecules/header/header-1x";
import Buttons from "../../components/atoms/Button";
import allColors from "../../services/colors";
import { mvs } from "../../services/metrices";
import DIVIY_API from "../../store/api-calls";
import { INPUT_FIELD } from "../../components/atoms";
import { Vehicle_Styles as styles } from "./customer-vehicle-styles";
import Bold from "../../presentation/typography/bold-text";
import Regular from "../../presentation/typography/regular-text";
import Row from "../../components/atoms/row";
import { BaseURL } from "../../ApiServices";
import Toast from "react-native-toast-message";
import { getData, storeData } from "../../localStorage";
import Medium from "../../presentation/typography/medium-text";
const CustomerVehicle = ({ route, props }) => {
  const navigation = useNavigation();
  const { customerID } = route.params;
  const [loading, setLoading] = React.useState(false);
  const [fetchApi, setfetchApi] = useState(true);
  const [VehicleName, setVehicleName] = React.useState([{ id: 1, name: "Sedan" }, { id: 2, name: "Suzuki" }]);
  const [VehicleType, setVehicleType] = React.useState([{ id: 1, name: "Toyota" }, { id: 2, name: "Nissan" }, { id: 3, name: "Toyota" }]);
  const [VehicleModel, setVehicleModel] = React.useState([{ id: 1, name: "Corolla" }, { id: 2, name: "Micra" }, { id: 3, name: "Altima" }, { id: 4, name: "Corolla" }]);
  const [payload, setPayload] = React.useState({
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
    setTimeout(() => {
      navigation.navigate("Congratulation");
    }, 4000);
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

  const getVehicleDetails = async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    await fetch(BaseURL + "auth/vehicle_types", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result != null) {
          setVehicleName(result);
          // console.log("setVehicleName======", result);
        }
      })
      .catch((error) => {
        // console.log("error", error);
      });
    await fetch(BaseURL + "auth/vehicle_model", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result != null) {
          setVehicleModel(result);
          // console.log(" setVehicleModel========", result);
        }
      })
      .catch((error) => {
        // console.log("error", error);
      });
    await fetch(BaseURL + "auth/vehicle_make", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result != null) {
          setVehicleType(result);
          setfetchApi(false);
          // console.log(" setvehicle_make=====", result);
        }
      })
      .catch((error) => {
        setfetchApi(false);
        // console.log("error", error);
      });
  };
  useEffect(() => {
    // getVehicleDetails();
  }, [fetchApi]);
  const addNewVehicle = async () => {
    if (payload.type === "") {
      showToast("error", "Select vehicle type ");
      return;
    } else if (payload.registration == "") {
      showToast("error", "Enter registration Number");
      return;
    } else if (payload.make === "") {
      showToast("error", "Making year is required");
      return;
    } else if (payload.modal == "") {
      showToast("error", "Vehicle modal is required");
      return;
    } else if (payload.year === "") {
      showToast("error", "Select making year");
      return;
    } else if (payload.color == "") {
      showToast("error", "Choose color of vehicle ");
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
    <SafeAreaView
      style={{ ...styles.container, backgroundColor: colors.background }}
    >
      <CustomHeader colors={colors} title="Customer Vehicle" allowBackBtn />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, }}
      >
        <View style={styles.body}>
          <Medium label={"Customer Vehicle"} size={21} />
          <Regular
            label={"Add Customer vehicle to use our services"}
          />
          <View style={styles.input_container}>
            <INPUT_FIELD.CustomDropDown
              value={payload.type}
              onChangeText={(t) => setPayload({ ...payload, type: t })}
              label="TYPE"
              items={VehicleName?.map((item) => item?.name)}
              placeholder="Select Type"
            />
            <INPUT_FIELD.InputView
              value={payload.registration}
              onChangeText={(t) => setPayload({ ...payload, registration: t })}
              label="REGISTRATION NUMBER"
              placeholder="Enter you Registration"
            />

            <INPUT_FIELD.CustomDropDown
              value={payload.make}
              onChangeText={(t) => setPayload({ ...payload, make: t })}
              label="Make"
              items={VehicleType?.map((item) => item.name)}
              placeholder="Select Type"
            />

            <INPUT_FIELD.CustomDropDown
              value={payload.modal}
              onChangeText={(t) => setPayload({ ...payload, modal: t })}
              label="VEHICLE MODEL"
              items={VehicleModel?.map((item) => item.name)}
              placeholder="Select Model"
            />
            <Row style={{ justifyContent: "space-between" }}>
              <INPUT_FIELD.CustomDropDown
                value={payload.year}
                style={{ width: "46%" }}
                onChangeText={(t) => setPayload({ ...payload, year: t })}
                label="YEAR"
                items={[
                  "2010",
                  "2011",
                  "2012",
                  "2013",
                  "2014",
                  "2015",
                  "2016",
                  "2017",
                  "2018",
                  "2019",
                  "2020",
                  "2021",
                  "2022",
                ]}
                placeholder="Select"
              />

              <INPUT_FIELD.CustomDropDown
                value={payload.color}
                style={{ width: "46%" }}
                onChangeText={(t) => setPayload({ ...payload, color: t })}
                label="COLOR"
                items={[
                  "Silver Alloy",
                  "White",
                  "Gray",
                  "Black",
                  "Red",
                  "Orange",
                  "Yellow",
                  "Green",
                  "Blue",
                  "Milky",
                  "Gray",
                  "Silver",
                  "Golden",
                  "Brown",
                ]}
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
      <Toast />
    </SafeAreaView>
  );
};

export default CustomerVehicle;
