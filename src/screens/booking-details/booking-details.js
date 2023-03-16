import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  ScrollView,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Text,
} from "react-native";
import * as Progress from "react-native-progress";
import { connect } from "react-redux";
import { Edit, Vehicle, WhitePercentage } from "../../assets/common-icons";
import { Bg } from "../../assets/images";
import Buttons from "../../components/atoms/Button";
import ImagePlaceholder from "../../components/atoms/Placeholder";
import Row from "../../components/atoms/row";
import { CustomHeader } from "../../components/molecules/header/header-1x";
import AssignModal from "../../components/molecules/modals/assign-modal";
import Bold from "../../presentation/typography/bold-text";
import Medium from "../../presentation/typography/medium-text";
import Regular from "../../presentation/typography/regular-text";
import SemiBold from "../../presentation/typography/semibold-text";
import alertService from "../../services/alert.service";
import colors from "../../services/colors";
import { mvs } from "../../services/metrices";
import DIVIY_API from "../../store/api-calls";
import { Styles as styles } from "./booking-details-styles";
import { Warning } from "../../assets/images";
import BookingPaymentView from "../../components/booking-payment-view";
import BookingCoupon from "../../components/coupon-promo/booking-coupon";
import BookingDetailsHeader from "../../components/booking-details-header";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import LinearGradient from "react-native-linear-gradient";
import { BaseURL } from "../../ApiServices";
import moment from "moment";
import Toast from "react-native-toast-message";
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
const BookingsDetails = ({ route, props }) => {
  const navigation = useNavigation();
  const { id, checkOut, paymentMethod } = route.params;

  const [modals, setModals] = React.useState({
    assign: true,
  });
  const [payload, setPayload] = React.useState({
    assign: "",
  });
  const [payMethod, setPayMethod] = useState(paymentMethod);
  const [payReference, setPayReference] = useState("null");
  const [isEdit, setEdit] = useState(false);
  const [isRefSet, setPayRef] = useState(true);
  const [laoding, setlaoding] = useState(true);
  const [stateData, setstateData] = useState([]);

  const getBookingDetail = async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    await fetch(`${BaseURL}b/om/businesses/1/bookings/${id}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result != null) {
          setstateData(result);
          setlaoding(true);
          //console.log("booking Details======", result);
        }
      })
      .catch((error) => {
        setlaoding(true);
        //   console.log("error booking Details======", error);
      });
  };
  useEffect(() => {
    getBookingDetail();
  }, [laoding]);
  const checkOutJob = async () => {
    var requestOptions = {
      method: "PUT",
      redirect: "follow",
    };

    await fetch(
      `${BaseURL}b/om/businesses/1/bookings/${id}/completeJob`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        if (result != null) {
          showToast("success", "Job is completed");
          setlaoding(false);
          //  console.log(result);
        }
      })
      .catch((error) => {
        // console.log("error", error);
      });
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
      style={{ ...styles.container, backgroundColor: colors.background }}
    >
      <CustomHeader
        colors={colors}
        title="Booking Detail"
        titleStyle={{ color: colors.black }}
        allowBackBtn
        spacebetween
      />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: mvs(16) }}
      >
        <View style={styles.body}>
          <BookingDetailsHeader data={stateData} loading={laoding} />

          <View style={{ ...styles.TIMETOPVIEW, paddingHorizontal: 0 }}>
            <Bold label={"Date & time"} size={15} />
            <ShimmerPlaceholder
              shimmerStyle={{ marginTop: mvs(5) }}
              visible={laoding}
            >
              <Regular
                label={moment(stateData?.date).format("DD MMM YYYY - HH:mm A")}
                size={16}
              />
            </ShimmerPlaceholder>
          </View>

          <Row style={{ ...styles.bottomBorder }}>
            <View>
              <Bold label={"Coupon"} style={{ fontSize: mvs(14) }} />
              {stateData?.coupon == null ? null : (
                <BookingCoupon item={stateData} loading={laoding} />
              )}
            </View>
          </Row>

          <Row
            style={{
              ...styles.TIMETOPVIEW,
              paddingHorizontal: 0,
              borderBottomWidth: 0,
              paddingBottom: 5,
            }}
          >
            <View>
              <Bold label={"Payment Method"} size={15} />
              <ShimmerPlaceholder
                width={100}
                shimmerStyle={{ marginTop: mvs(5) }}
                visible={laoding}
              >
                <Regular
                  label={
                    payMethod == "Cash" ? "Cash on Delivery" : "Online payment"
                  }
                  size={16}
                  numberOfLines={1}
                />
              </ShimmerPlaceholder>
            </View>
            <View
              style={{
                flexDirection: "column",
                justifyContent: "flex-end",
                height: mvs(40),
              }}
            >
              <ShimmerPlaceholder width={50} visible={laoding}>
                <Bold
                  label={"AED 47.00"}
                  size={16}
                  color={colors.primary}
                  style={{ alignSelf: "flex-end" }}
                />
              </ShimmerPlaceholder>
            </View>
          </Row>
          {payMethod == "Cash" && (
            <Row style={styles.paymentReferenceView}>
              <Bold label={"Payment Reference"} size={13} />
              {!isEdit ? (
                <TouchableOpacity onPress={() => setEdit(true)}>
                  <Edit height={mvs(20)} width={mvs(20)} />
                </TouchableOpacity>
              ) : isRefSet ? (
                <TextInput
                  placeholder=""
                  onChangeText={(val) => setPayReference(val)}
                  onBlur={() => setPayRef(false)}
                  style={styles.refernceTextBox}
                />
              ) : (
                <Bold label={payReference} color={colors.green} size={13} />
              )}
            </Row>
          )}
          <View style={styles.paymentView}>
            <BookingPaymentView item={stateData} loading={laoding} />
            {isRefSet && payMethod == "Cash" ? (
              <Row style={{ alignItems: "center" }}>
                <Image
                  source={Warning}
                  style={{ height: mvs(20), width: mvs(20) }}
                />
                <Regular
                  color={colors.primary}
                  style={{ ...styles.bottomBorder, ...styles.warningText }}
                  numberOfLines={2}
                  label={
                    "please update the payment reference then click checkout"
                  }
                />
              </Row>
            ) : null}
            {stateData?.status == "Completed" ? (
              <Text style={styles.BookingText}>Booking is completed</Text>
            ) : (
              <Buttons.ButtonPrimary
                textStyle={
                  !isRefSet || payMethod != "Cash"
                    ? styles.buttonWhiteText
                    : styles.buttonBlackText
                }
                title="Checkout"
                onClick={checkOutJob}
                style={
                  !isRefSet || payMethod != "Cash"
                    ? styles.button
                    : styles.whiteButton
                }
              />
            )}
          </View>
        </View>
      </ScrollView>
      <AssignModal
        title={"Assign Worker"}
        setVisible={() => setPayload({ ...payload, assign: false })}
        visible={false}
        items={[1, 2, 3, 4]}
        value={payload.assign}
        setValue={(v) => setPayload({ ...payload, assign: v })}
      />
      <Toast />
    </SafeAreaView>
  );
};

export default BookingsDetails;
