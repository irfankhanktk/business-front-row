import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  ScrollView,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Image,
  DrawerLayoutAndroidComponent,
} from "react-native";
import { connect } from "react-redux";
import {
  Edit,
  TabActivityIcon,
  TabOngoingIcon,
  WhitePercentage,
} from "../../assets/common-icons";
import { Bg } from "../../assets/images";
import Buttons from "../../components/atoms/Button";
import ImagePlaceholder from "../../components/atoms/Placeholder";
import Row from "../../components/atoms/row";
import { CustomHeader } from "../../components/molecules/header/header-1x";
import Bold from "../../presentation/typography/bold-text";
import Medium from "../../presentation/typography/medium-text";
import Regular from "../../presentation/typography/regular-text";
import SemiBold from "../../presentation/typography/semibold-text";
import colors from "../../services/colors";
import { mvs } from "../../services/metrices";
import DIVIY_API from "../../store/api-calls";
import { Styles as styles } from "./new-booking-details-styles";
import { Warning } from "../../assets/images";
import BookingDetailsHeader from "../../components/booking-details-header";
import PickerModal from "../../components/molecules/modals/picker-model";
import BookingCoupon from "../../components/coupon-promo/booking-coupon";
import BookingPaymentView from "../../components/booking-payment-view";
import CouponModal from "../../components/molecules/modals/coupon-modal";
import ScheduleModal from "../../components/molecules/modals/schedule-modal";
import moment from "moment";
import { getData } from "../../localStorage";
import { BaseURL } from "../../ApiServices";
import alertService from "../../services/alert.service";

const UnBookMessage = ({}) => {
  return (
    <Row style={{ alignItems: "center", marginTop: mvs(5) }}>
      <Image source={Warning} style={{ height: mvs(20), width: mvs(20) }} />
      <Regular
        color={colors.primary}
        style={{ ...styles.warningText, flex: 1 }}
        numberOfLines={2}
        label={"Please pick slot before Booking"}
      />
    </Row>
  );
};
const BookMessage = ({}) => {
  return (
    <Row style={{ alignItems: "center", marginTop: mvs(5) }}>
      <Image source={Warning} style={{ height: mvs(20), width: mvs(20) }} />
      <Regular
        color={colors.green}
        style={{ ...styles.warningText, flex: 1 }}
        numberOfLines={2}
        label={"This slot is booked"}
      />
    </Row>
  );
};
const NewBookingsDetails = ({ route, props }) => {
  const navigation = useNavigation();
  const { bookingID, selected } = route.params;
  console.log("bookingID======", bookingID);
  const [payMethod, setPayMethod] = useState("Cash");
  const [payReference, setPayReference] = useState("null");
  const [isEdit, setEdit] = useState(false);
  const [bookingState, setbookingState] = useState(false);
  const [isRefSet, setPayRef] = useState(true);
  const [isSlotBook, setSlotBook] = useState(false);
  const [isSlotSet, setSlotSet] = useState(false);
  const [isVoucherApplied, setVoucherApplied] = useState(false);
  const [selectedCoupon, setCoupon] = useState({});
  const [slot, setSlot] = useState("");
  const [slotModalVisible, setSlotModalVisiable] = useState(false);
  const [couponModalVisible, setCouponModalVisiable] = useState(false);
  const [getTimeSlot, setgetTimeSlot] = useState({});
  const [slots, setSlots] = useState([]);
  const [loading, setloading] = useState(false);
  const [updateTime, setupdateTime] = useState(false);
  const [selectedValue, setSelectedValue] = React.useState();
  const [firstAvailableSlot, setFirstSlotText] = useState(null);
  const [coupons, setCoupons] = useState([
    {
      id: 1,
      name: "50% OFF Car Wash",
      price: "30.00 AED",
      voucher: "CASH VOUCHER",
      image: "",
    },
    {
      id: 2,
      name: "50% OFF Car Wash",
      price: "20.00 AED",
      voucher: "CASH VOUCHER",
      image: "",
    },
  ]);
  const [date, setDate] = useState(moment());
  const [acceptFirstSlot, setacceptFirstSlot] = useState(false);
  const delayApi = () => {
    setTimeout(() => {
      navigation.navigate("Main");
    }, 4000);
  };
  const BookSlot = async () => {
    var requestOptions = {
      method: "PUT",
      redirect: "follow",
    };
    setbookingState(true);
    await fetch(
      `${BaseURL}p/public/bookings/${bookingID}/complete`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        setbookingState(false);
        if (result != null) {
          if (!isSlotSet) return;
          setSlotBook(true);
          delayApi();
          console.log(result);
        }
      })
      .catch((error) => {
        setbookingState(false);
        console.log("error", error);
      });
  };
  const [bookingDetails, setbookingDetails] = useState([]);
  const [items, setItems] = React.useState([]);
  const [payload, setpayload] = useState({
    offerings: [],
    updateTimeRes: "",
  });

  const getBookingDetails = async () => {
    const token = await getData("token");

    var requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      redirect: "follow",
    };

    await fetch(
      `${BaseURL}c/cus/customers/${selected}/bookings/${bookingID}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result != null) {
          setbookingDetails(result);
          console.log("booking detail=======", result);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });

    var myHeaders = new Headers();
    myHeaders.append();

    var raw = JSON.stringify({
      walkinOnly: 0,
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
      `${BaseURL}p/public/bookings/${bookingID}/slots`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result != null) {
          if (result?.Morning?.slots?.length) {
            setSelectedValue(result?.Morning?.slots[0]);
            setFirstSlotText("The first available slot");
          } else if (result?.Afternoon?.slots?.length) {
            setSelectedValue(result?.Afternoon?.slots[0]);
            setFirstSlotText("The first available slot");
          } else if (result?.Evening?.slots?.length) {
            setSelectedValue(result?.Evening?.slots[0]);
            setFirstSlotText("The first available slot");
          }
          setloading(true);
          setSlots(result);
          console.log("slots======>>>>>", result);
        }
      })
      .catch((error) => {
        setloading(true);
        console.log("error", error);
      });
  };

  useEffect(() => {
    getBookingDetails();
  }, [loading]);

  const updateTimeSlot = async () => {
    setacceptFirstSlot(true);
    var raw = JSON.stringify({
      slotId: selectedValue?.id,
    });

    var requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: raw,
      redirect: "follow",
    };
    setupdateTime(true);
    await fetch(`${BaseURL}p/public/bookings/${bookingID}/slot`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        if (result != null) {
          setupdateTime(false);
          setacceptFirstSlot(false);
          setpayload({ ...payload, updateTimeRes: result });
          setFirstSlotText(null);
          // alert(result);
          setSlotSet(true);
          setSlotModalVisiable(false);
        }
      })
      .catch((error) => {
        setupdateTime(false);
        setacceptFirstSlot(false);
        setSlotModalVisiable(false);
        console.log("error", error);
      });
  };

  return (
    <SafeAreaView
      style={{ ...styles.container, backgroundColor: colors.background }}
    >
      <CustomHeader
        colors={colors}
        title="Walk in Booking"
        titleStyle={{ color: colors.black }}
        allowBackBtn
        spacebetween
      />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: mvs(16) }}
      >
        <View style={styles.body}>
          <BookingDetailsHeader loading={loading} data={bookingDetails} />
          <View style={{ ...styles.TIMETOPVIEW, paddingHorizontal: 0 }}>
            <Row>
              <View>
                <Bold label={"Date & time"} size={15} />
                {selectedValue != undefined ? (
                  <Regular
                    label={`${date?.format("DD MMMM YYYY")} ${
                      selectedValue?.from[0] +
                      ":" +
                      selectedValue?.from[1] +
                      "-" +
                      selectedValue?.to[0] +
                      ":" +
                      selectedValue?.to[1]
                    }`}
                    size={16}
                  />
                ) : (
                  <Regular
                    label={`${date?.format("DD MMMM YYYY")}`}
                    size={16}
                  />
                )}

                {/* {isSlotSet && (
                  <Regular
                    label={
                      date?.format("DD MMMM YYYY") +
                      " - " +
                      `${slot?.start[0]}:${slot?.start[1]} -${slot?.end[0]}:${slot?.end[1]}`
                    }
                    size={14}
                  />
                )} */}
              </View>
              <TouchableOpacity onPress={() => setSlotModalVisiable(true)}>
                <Regular label={"Change"} size={15} color={colors.primary} />
              </TouchableOpacity>
              {/* {!isSlotBook && (
                <TouchableOpacity onPress={() => setSlotModalVisiable(true)}>
                  <Medium
                    label={isSlotSet ? "Change" : "Pick Slot"}
                    color={colors.green}
                  />
                </TouchableOpacity>
              )} */}
            </Row>
            {firstAvailableSlot && (
              <Row style={styles.firstView}>
                <Regular
                  label={`${firstAvailableSlot}`}
                  size={16}
                  color={colors.green}
                />
                <TouchableOpacity onPress={updateTimeSlot}>
                  {acceptFirstSlot ? (
                    <ActivityIndicator size="small" color={colors.primary} />
                  ) : payload.updateTimeRes.length > 0 ? null : (
                    <Regular label={`Accept`} size={16} color={colors.green} />
                  )}
                </TouchableOpacity>
              </Row>
            )}
          </View>

          <Row style={{ ...styles.bottomBorder }}>
            <View>
              <Bold
                label={"Coupon"}
                style={{ marginBottom: mvs(5), fontSize: mvs(14) }}
              />
              {isVoucherApplied && (
                <BookingCoupon
                  loading={loading}
                  name={selectedCoupon?.name}
                  price={selectedCoupon?.price}
                />
              )}
            </View>
            {!isVoucherApplied && (
              <TouchableOpacity onPress={() => setCouponModalVisiable(true)}>
                <Medium label={"Apply"} color={colors.green} />
              </TouchableOpacity>
            )}
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
              <Regular
                label={
                  payMethod == "Cash" ? "Cash on Delivery" : "Online payment"
                }
                size={16}
                numberOfLines={1}
              />
            </View>
            <View
              style={{
                flexDirection: "column",
                justifyContent: "flex-end",
                height: mvs(40),
              }}
            >
              <Bold
                label={`AED ${bookingDetails?.offering?.price}`}
                size={16}
                color={colors.primary}
                style={{ alignSelf: "flex-end" }}
              />
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
            <BookingPaymentView item={bookingDetails} loading={loading} />
            {!isSlotSet ? (
              <UnBookMessage />
            ) : isSlotBook ? (
              <BookMessage />
            ) : null}

            {!isSlotBook || bookingDetails.status === "Booked" ? (
              <Buttons.ButtonPrimary
                textStyle={
                  isSlotSet ? styles.buttonWhiteText : styles.buttonBlackText
                }
                disabled={isSlotSet ? false : true}
                title="Book"
                loading={bookingState}
                style={isSlotSet ? styles.button : styles.whiteButton}
                onClick={() => BookSlot()}
              />
            ) : (
              <View
                style={{
                  backgroundColor: colors.lightYellow,
                  borderRadius: mvs(5),
                  height: mvs(35),
                  flexDirection: "row",
                  marginTop: mvs(10),
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TabActivityIcon />
                <Medium label={"Booked"} color={colors.primary} size={16} />
              </View>
            )}
          </View>
        </View>

        <ScheduleModal
          value={selectedValue}
          items={slots}
          disabled={selectedValue ? false : true}
          loadingState={updateTime}
          setDate={setDate}
          date={date}
          updateSlot={updateTimeSlot}
          visible={slotModalVisible}
          setValue={(val) => {
            setSlot(val);
            setSelectedValue(val);
            setFirstSlotText(null);
            console.log("setSelectedValue======", selectedValue);
            setSlotSet(true);
          }}
        />
        <CouponModal
          value={selectedCoupon}
          items={coupons}
          loading={loading}
          visible={couponModalVisible}
          setValue={(val) => {
            setCoupon(val);
            setCouponModalVisiable(false);
            setVoucherApplied(true);
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewBookingsDetails;
