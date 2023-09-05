import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { BaseURL } from "../../ApiServices";
import { TabActivityIcon } from "../../assets/common-icons";
import { Warning } from "../../assets/images";
import Buttons from "../../components/atoms/Button";
import Row from "../../components/atoms/row";
import BookingDetailsHeader from "../../components/booking-details-header";
import BookingPaymentView from "../../components/booking-payment-view";
import BookingCoupon from "../../components/coupon-promo/booking-coupon";
import { CustomHeader } from "../../components/molecules/header/header-1x";
import CouponModal from "../../components/molecules/modals/coupon-modal";
import WorkerModal from "../../components/molecules/modals/worker-modal";
import WorkerModalItem from "../../components/service-offering/worker-modal-item";
import Bold from "../../presentation/typography/bold-text";
import Medium from "../../presentation/typography/medium-text";
import Regular from "../../presentation/typography/regular-text";
import colors from "../../services/colors";
import { mvs } from "../../services/metrices";
import { Styles as styles } from "./start-job-styles";

const UnStartMessage = ({}) => {
  return (
    <Row style={{ alignItems: "center", marginTop: mvs(5) }}>
      <Image source={Warning} style={{ height: mvs(20), width: mvs(20) }} />
      <Regular
        color={colors.primary}
        style={{ ...styles.warningText, flex: 1 }}
        numberOfLines={2}
        label={"Assign Worker Before Starting Job"}
      />
    </Row>
  );
};
const StartMessage = ({}) => {
  return (
    <Row style={{ alignItems: "center", marginTop: mvs(5) }}>
      <Image source={Warning} style={{ height: mvs(20), width: mvs(20) }} />
      <Regular
        color={colors.green}
        style={{ ...styles.warningText, flex: 1 }}
        numberOfLines={2}
        label={"Job on this booking is already started"}
      />
    </Row>
  );
};

const StartJob = ({ route, props }) => {
  const navigation = useNavigation();
  const { id } = route.params;

  const [payMethod, setPayMethod] = useState("Online");

  const [isJobStarted, setJobStart] = useState(false);

  const [isVoucherApplied, setVoucherApplied] = useState(false);
  const [selectedCoupon, setCoupon] = useState({});
  const [couponModalVisible, setCouponModalVisiable] = useState(false);

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

  const [isWorkerAssign, setWorkerAssign] = useState(false);
  const [worker, setWorker] = useState({});
  const [workerModalVisible, setWorkModalVisible] = useState(false);
  const [workers, setWorkers] = useState([]);
  const [laoding, setlaoding] = useState(false);
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

          //console.log("booking Details======", stateData);
        }
      })
      .catch((error) => {
        setlaoding(true);
        console.log("error booking Details======", error);
      });
    await fetch(
      `${BaseURL}b/om/businesses/1/services/1/workers`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result != null) {
          setWorkers(result);
          setlaoding(true);
          // console.log("job worker=====", workers);
        }
      })
      .catch((error) => {
        setlaoding(true);
        console.log("error job worker=====", error);
      });
  };
  useEffect(() => {
    getBookingDetail();
  }, [laoding]);
  const removeCoupon = (async) => {
    setVoucherApplied(false);
    setCoupon({});
  };
  const delayApi = () => {
    setTimeout(() => {
      navigation.goBack();
    }, 4000);
  };
  const startJob = async () => {
    var requestOptions = {
      method: "PUT",
      redirect: "follow",
    };

    await fetch(
      `${BaseURL}b/om/businesses/1/bookings/${id}/start`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        if (result != null) {
          showToast("success", "Job is Started");
          setJobStart(true);
          delayApi();
          console.log("start Job=====", result);
        }
      })
      .catch((error) => {
        console.log("error start Job=====", error);
      });
    // if (payMethod != "Cash" && !isWorkerAssign) return;
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
        title="Start Job"
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
            <Regular
              label={moment(stateData?.date).format(`DD MMM YYYY - HH:mm A`)}
              size={16}
            />
          </View>

          <Row style={{ ...styles.bottomBorder }}>
            <View>
              <Bold label={"Coupon"} style={{ fontSize: mvs(14) }} />
              {stateData?.coupon == null ? null : (
                <BookingCoupon
                  loading={laoding}
                  name={selectedCoupon?.name}
                  price={selectedCoupon?.price}
                />
              )}
              {/* {payMethod != "Cash" && <BookingCoupon loading={laoding} />} */}
            </View>
            {payMethod == "Cash" ? (
              !isVoucherApplied ? (
                <TouchableOpacity onPress={() => setCouponModalVisiable(true)}>
                  <Medium label={"Apply"} color={colors.green} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => removeCoupon()}>
                  <Medium label={"Remove"} color={colors.red} />
                </TouchableOpacity>
              )
            ) : null}
          </Row>
          {payMethod != "Cash" && (
            <Row style={{ ...styles.bottomBorder }}>
              <View>
                <Bold
                  label={"Worker"}
                  style={{ marginBottom: mvs(5), fontSize: mvs(14) }}
                />
                {isWorkerAssign && (
                  <WorkerModalItem
                    title={worker?.title}
                    image={worker?.image}
                  />
                )}
              </View>
              {
                <TouchableOpacity onPress={() => setWorkModalVisible(true)}>
                  <Medium
                    label={isWorkerAssign ? "Change" : "Assign"}
                    color={colors.green}
                  />
                </TouchableOpacity>
              }
            </Row>
          )}
          <Row
            style={{
              ...styles.TIMETOPVIEW,
              paddingHorizontal: 0,
              borderBottomWidth: payMethod == "Cash" ? 0 : 1,
              paddingBottom: 5,
            }}
          >
            <View>
              <Bold label={"Payment Method"} size={15} />
              <Regular
                label={
                  // stateData?.payment?.method
                  payMethod == "Cash"
                    ? stateData?.payment?.method
                    : "Online payment"
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
                label={`AED ${
                  stateData?.offering?.price ? stateData?.offering?.price : ""
                }`}
                size={16}
                color={colors.primary}
                style={{ alignSelf: "flex-end" }}
              />
            </View>
          </Row>
          <View style={styles.paymentView}>
            <BookingPaymentView loading={laoding} item={stateData} />

            {payMethod != "Cash" && !isWorkerAssign ? (
              <UnStartMessage />
            ) : isJobStarted ? (
              <StartMessage />
            ) : null}
            {!isJobStarted ? (
              <Buttons.ButtonPrimary
                textStyle={
                  payMethod == "Cash" || isWorkerAssign
                    ? styles.buttonWhiteText
                    : styles.buttonBlackText
                }
                title={
                  stateData?.status == "In Progress"
                    ? stateData?.status
                    : "Start"
                }
                disabled={
                  stateData?.status == "In Progress"
                    ? true
                    : !isWorkerAssign
                    ? true
                    : false
                }
                onClick={() => startJob()}
                style={
                  payMethod == "Cash" || isWorkerAssign
                    ? styles.button
                    : styles.whiteButton
                }
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
                <Medium
                  label={"Job is started"}
                  color={colors.primary}
                  size={16}
                />
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      <CouponModal
        value={selectedCoupon}
        items={coupons}
        visible={couponModalVisible}
        setValue={(val) => {
          setCoupon(val);
          setCouponModalVisiable(false);
          setVoucherApplied(true);
        }}
      />
      <WorkerModal
        value={worker}
        items={workers}
        visible={workerModalVisible}
        setValue={(val) => {
          setWorker(val);
          setWorkModalVisible(false);
          setWorkerAssign(true);
        }}
      />
      <Toast />
    </SafeAreaView>
  );
};

export default StartJob;
