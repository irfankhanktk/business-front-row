import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import PhoneInput from "react-native-phone-number-input";
import Toast from "react-native-toast-message";
import { connect } from "react-redux";
import { BaseURL } from "../../ApiServices";
import {
  SearchTwo,
  SelectedRadioButton,
  UnSelectedRadioButton,
} from "../../assets/common-icons";
import { INPUT_FIELD } from "../../components/atoms";
import Buttons from "../../components/atoms/Button";
import PageLoader from "../../components/atoms/page-loader";
import Row from "../../components/atoms/row";
import { CustomHeader } from "../../components/molecules/header/header-1x";
import WorkerItem from "../../components/service-offering/woker-item";
import { getData } from "../../localStorage";
import Medium from "../../presentation/typography/medium-text";
import Regular from "../../presentation/typography/regular-text";
import SemiBold from "../../presentation/typography/semibold-text";
import colors from "../../services/colors";
import { mvs } from "../../services/metrices";
import { ACTIONS } from "../../store/actions";
import DIVIY_API from "../../store/api-calls";
import { Styles as styles } from "./new-booking-styles";
const NewBooking = (props) => {
  const { services } = props;
  const ser = services?.find((x) => x?.selected);
  const navigation = useNavigation();
  const [phoneSelected, setPhoneSelected] = useState(true);
  const phoneInput = useRef(null);
  const [service, setService] = useState({});
  const [loading, setloading] = useState(true);
  const [bookingCreated, setbookingCreated] = useState(false);
  const [selected, setSelected] = useState(0);
  const [searchcustomer, setsearchcustomer] = useState(false);
  const [mobile, setmobile] = useState("");
  const [showButton, setshowButton] = useState(false);
  const [customerData, setcustomerData] = useState([]);
  const [serviceOffering, setserviceOffering] = useState([]);
  const getServiceOffering = async () => {
    var bId = await getData("BusinessId");
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    await fetch(
      `${BaseURL}b/om/businesses/${bId}/services/${ser?.id}/offerings`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result != null) {
          setserviceOffering(result);
          setloading(false);
        }
      })
      .catch((error) => {
        setloading(false);
      });
  };
  useEffect(() => {
    getServiceOffering();
  }, [loading, 1]);
  const searchCustomer = async () => {
    console.log("Mobile number is ==>", mobile);
    var bId = await getData("BusinessId");
    if (mobile.length == 0) {
      showToast("error", "Enter mobile for search customer");
      return;
    } else {
      setsearchcustomer(true);
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      await fetch(
        `${BaseURL}b/om/businesses/${bId}/customers/find?mobile=${mobile}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          if (!result.length > 0) {
            setshowButton(true);
            setsearchcustomer(false);
            setcustomerData([]);
          } else {
            setcustomerData(result);
            console.log("customer Data=======", result);
          }
        })
        .catch((error) => {
          console.log("error customer Data=======", error);
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
  const delayApi = (bookingID) => {
    navigation.navigate("ReviewSchedule", {
      bookingID,
      selected,
    });
  };
  const createBooking = async () => {
    var raw = JSON.stringify({
      customerId: selected,
      offeringId: service.id,
      byCustomer: 0,
    });

    var requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: raw,
      redirect: "follow",
    };
    setbookingCreated(true);
    await fetch(`${BaseURL}p/public/bookings`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result != null) {
          setbookingCreated(false);
          if (result?.code == "vehicle required") {
            showToast("error", result?.message);
          } else {
            showToast("success", "Booking created successfully");
            delayApi(result);
          }
        }
      })
      .catch((error) => {
        setbookingCreated(false);
        showToast("error", "Something went wrong!");
        console.log("error", error);
      });
  };
  function NewCus() {
    var cCode = phoneInput?.current?.getCountryCode();
    console.log("Country code is ", cCode);
    navigation.navigate("NewCustomer", {
      countryCode: cCode,
      phoneNumber: mobile,
    });
  }
  return (
    <SafeAreaView
      style={{ ...styles.conntainer, backgroundColor: colors.background }}
    >
      <CustomHeader
        title="New Walk In Booking"
        // titleStyle={{
        //   fontSize: 15,
        //   fontWeight: "bold",
        //   // color: colors.black,
        // }}
        spacebetween
        allowBackBtn
      />
      <View style={styles.body}>
        {loading ? (
          <PageLoader />
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}
          >
            <Medium label={"Select service offering"} size={13} />
            <Medium label={"SERVICE OFFERING"} />
            <INPUT_FIELD.ServiceDropDown
              items={serviceOffering?.map((item) => item)}
              value={service.title}
              title="Service"
              onChangeText={(val) => setService(val)}
              style={{ marginTop: mvs(10), height: mvs(60) }}
              placeholder="Select service offering"
            />
            <Medium
              label={
                "Enter phone number or registration number to search customer for booking."
              }
              size={13}
              numberOfLines={2}
              style={{ marginVertical: mvs(10) }}
            />
            <Row style={{ justifyContent: "flex-start", alignItems: "center" }}>
              <Row style={{ alignItems: "center" }}>
                <TouchableOpacity onPress={() => setPhoneSelected(true)}>
                  {phoneSelected ? (
                    <SelectedRadioButton />
                  ) : (
                    <UnSelectedRadioButton />
                  )}
                </TouchableOpacity>
                <Medium
                  label={"Phone Number"}
                  size={12}
                  style={{ marginLeft: mvs(10) }}
                />
              </Row>
              <Row style={{ marginLeft: mvs(8), alignItems: "center" }}>
                <TouchableOpacity onPress={() => setPhoneSelected(false)}>
                  {!phoneSelected ? (
                    <SelectedRadioButton />
                  ) : (
                    <UnSelectedRadioButton />
                  )}
                </TouchableOpacity>
                <Medium
                  label={"Registration Number"}
                  size={12}
                  style={{ marginLeft: mvs(10) }}
                />
              </Row>
            </Row>
            <SemiBold
              label={"PHONE NUMBER"}
              size={12}
              style={{ marginTop: mvs(5) }}
            />
            <View style={{ ...styles.phoneNumberView, marginTop: mvs(5) }}>
              <PhoneInput
                ref={phoneInput}
                defaultValue=""
                defaultCode="AE"
                layout="first"
                placeholder="Phone Number"
                flagButtonStyle={{ width: mvs(60), height: mvs(40) }}
                codeTextStyle={{ marginBottom: 1, fontSize: 13 }}
                containerStyle={styles.phoneContainer}
                textContainerStyle={styles.textInput}
                textInputStyle={{ fontSize: 13 }}
                onChangeFormattedText={(text) => {}}
                onChangeText={(text) => {
                  setmobile(text);
                }}
              />
              <TouchableOpacity onPress={searchCustomer}>
                <SearchTwo style={{}} />
              </TouchableOpacity>
            </View>
            {customerData.length > 0 ? (
              <>
                <Regular
                  size={18}
                  label={"Customer found...."}
                  style={{ marginTop: mvs(5) }}
                />
                <FlatList
                  data={customerData}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{}}
                  renderItem={({ item, index }) => (
                    <WorkerItem
                      key={index}
                      showSelect={true}
                      item={item}
                      selected={selected === item?.id}
                      onSelected={() => {
                        setSelected(item.id);
                        // console.log("selected === item?.id", selected);
                      }}
                    />
                  )}
                />

                {!selected.length > 0 && (
                  <Row style={{ alignItems: "center" }}>
                    <Regular
                      color={colors.primary}
                      style={{ ...styles.warningText }}
                      numberOfLines={2}
                      size={16}
                      label={
                        !service?.id > 0 && selected > 0
                          ? "select service offering and customer to continue"
                          : null
                      }
                    />
                  </Row>
                )}
                <Buttons.ButtonPrimary
                  textStyle={
                    !selected == 0 && service?.id > 0
                      ? styles.buttonWhiteText
                      : styles.buttonBlackText
                  }
                  disabled={service?.id > 0 && selected > 0 ? false : true}
                  title="Continue"
                  loading={bookingCreated}
                  onClick={createBooking}
                  //onClick={() => navigation.navigate("NewBookingDetails")}
                  style={
                    selected > 0 && service?.id > 0
                      ? styles.button
                      : styles.whiteButton
                  }
                />
              </>
            ) : searchcustomer ? (
              <View
                style={{
                  marginVertical: mvs(10),
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ActivityIndicator size={"small"} color={colors.primary} />
              </View>
            ) : (
              <View>
                <Regular
                  size={16}
                  label={
                    showButton
                      ? "We’ve not found any results please add new."
                      : " "
                  }
                  style={{ marginTop: mvs(15) }}
                />
                {showButton ? (
                  <Buttons.ButtonPrimary
                    textStyle={styles.buttonPrimaryText}
                    onClick={() => NewCus()}
                    title="+ Add New"
                    style={styles.whiteButton}
                  />
                ) : null}
              </View>
            )}
          </ScrollView>
        )}
      </View>
      <Toast />
    </SafeAreaView>
  );
};

const mapStateToProps = (store) => ({
  services: store?.state?.services,
});

const mapDispatchToProps = {
  get_services: (bussinessId) => DIVIY_API.get_services(bussinessId),
  setServices: (services) => ACTIONS.setServices(services),
};
export default connect(mapStateToProps, mapDispatchToProps)(NewBooking);
