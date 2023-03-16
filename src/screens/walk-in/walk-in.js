import React, { useRef } from "react";
import { SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
import Buttons from "../../components/atoms/Button";
import ImagePlaceholder from "../../components/atoms/Placeholder";
import Row from "../../components/atoms/row";
import TotalRateMap from "../../components/molecules/total-rate-map";
import Bold from "../../presentation/typography/bold-text";
import Medium from "../../presentation/typography/medium-text";
// import HomeCard from './../../../components/molecules/home-card/home-card';
import { Bg } from "../../assets/images";
import { CustomHeader } from "../../components/molecules/header/header-1x";
import Regular from "../../presentation/typography/regular-text";
import colors from "../../services/colors";
import { mvs } from "../../services/metrices";
import { Walk_In_Styles as styles } from "./walk-in-styles";

import { Vehicle, WhitePercentage } from "../../assets/common-icons";
import PaymentItem from "../../components/atoms/payment-item";
import SemiBold from "../../presentation/typography/semibold-text";

import NewPaymentSheet from "../../components/payment-method/new-pament";
import PaymentSheet from "../../components/payment-method/payments";
const WalkIn = (props) => {
  const [loading, setLoading] = React.useState(false);
  const refRBSheet = useRef(null);
  const refRBNewPaymentSheet = useRef(null);
  function newPayment() {
    refRBNewPaymentSheet.current.open();
  }
  return (
    <SafeAreaView
      style={{ ...styles.conntainer, backgroundColor: colors.background }}
    >
      <CustomHeader
        title="New Walk In Booking"
        titleStyle={{ fontSize: 15 }}
        spacebetween
        allowBackBtn
      />
      <View style={styles.body}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View />
          <Row style={{ paddingHorizontal: mvs(18) }}>
            <ImagePlaceholder
              borderRadius={mvs(8)}
              uri={Bg}
              containerStyle={{ width: mvs(110), height: mvs(110) }}
            />
            <View style={{ marginLeft: mvs(10), flex: 1 }}>
              <Bold
                numberOfLines={2}
                size={mvs(16)}
                label={"Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet"}
              />
              <Row justifyContent="flex-start" alignItems="center">
                <Regular color={colors.B606060} label={"Lead Time:"} />
                <Medium color={colors.G3CB971} label={" 45 Minutes"} />
              </Row>
              <Row
                style={{ marginTop: mvs(2) }}
                justifyContent="flex-start"
                alignItems="center"
              >
                <Regular color={colors.B606060} label={"Price:"} />
                <Medium color={colors.primary} label={" AED 45"} />
              </Row>
              <Row style={{}} alignItems="center">
                <Regular
                  size={mvs(14)}
                  color={colors.B606060}
                  label={"Tag: "}
                />
                <Buttons.ButtonPrimary
                  title="4Litters"
                  textStyle={{ fontSize: mvs(10), color: colors.G3CB971 }}
                  style={{
                    backgroundColor: `${colors.G3CB971}70`,
                    width: mvs(60),
                    height: mvs(18),
                    borderRadius: mvs(5),
                  }}
                />
                <Buttons.ButtonPrimary
                  title="4Litters"
                  textStyle={{ fontSize: mvs(10), color: colors.primary }}
                  style={{
                    backgroundColor: `${colors.primary}70`,
                    width: mvs(60),
                    height: mvs(18),
                    borderRadius: mvs(5),
                  }}
                />
                <Buttons.ButtonPrimary
                  title="4Litters"
                  textStyle={{ fontSize: mvs(10), color: colors.B2181F2 }}
                  style={{
                    backgroundColor: `${colors.B2181F2}70`,
                    width: mvs(60),
                    height: mvs(18),
                    borderRadius: mvs(5),
                  }}
                />
              </Row>
            </View>
          </Row>
          <TotalRateMap />
          <Row style={styles.rowView}>
            <View>
              <Bold label={"Date & time"} size={15} />
              <Regular label={"12 February 2021-9:30 AM-10:00 AM"} size={16} />
            </View>
            <TouchableOpacity>
              <Regular label={"Change"} size={15} color={colors.primary} />
            </TouchableOpacity>
          </Row>
          <Row style={styles.rowView}>
            <Vehicle />
            <View style={{ flex: 1, marginHorizontal: mvs(9) }}>
              <Medium label={"Toyota Corolla "} size={16} />
              <Regular label={"C19001 - Sharjah"} size={12} />
            </View>
          </Row>
          <View style={styles.couponView}>
            <Row
              style={{
                ...styles.rowView,
                borderBottomWidth: 0,
                paddingVertical: 8,
              }}
            >
              <Bold label={"Coupon"} size={15} />
              <TouchableOpacity>
                <Regular
                  label={"Find Coupon"}
                  size={15}
                  color={colors.primary}
                />
              </TouchableOpacity>
            </Row>
            <Row
              style={{ ...styles.rowView, borderBottomWidth: 0, paddingTop: 0 }}
            >
              <ImagePlaceholder
                borderRadius={mvs(8)}
                uri={Bg}
                containerStyle={{ width: mvs(69), height: mvs(69) }}
              />
              <View style={{ flex: 1, marginHorizontal: mvs(9) }}>
                <SemiBold label={"50% OFF Car Wash"} size={16} />
                <Regular label={"30.00 AED"} size={14} />
                <Row style={styles.voucherView}>
                  <WhitePercentage />
                  <Regular
                    label={"CASH VOUCHER"}
                    size={14}
                    color={colors.white}
                  />
                </Row>
              </View>
            </Row>
          </View>
          <View style={styles.paymentView}>
            <Regular label={"Payment Method"} size={16} />
            <PaymentItem onClick={() => refRBNewPaymentSheet.current.open()} />
            <Row style={{ ...styles.priceView, marginTop: mvs(16.3) }}>
              <Medium label={"Sub Total"} size={14} />
              <Medium label={"AED 45.00"} size={14} />
            </Row>
            <Row style={{ ...styles.priceView }}>
              <Medium label={"VAT (10%)"} size={14} color={colors.lightgrey1} />
              <Medium label={"AED 2.00"} size={14} color={colors.lightgrey1} />
            </Row>
            <Row style={{ ...styles.priceView }}>
              <Bold label={"Grand Total"} size={14} />
              <Bold label={"AED 47.00"} size={14} />
            </Row>
            <Buttons.ButtonPrimary loading={loading} title="Confirm" style={styles.button} />
          </View>
        </ScrollView>
        <PaymentSheet ref={refRBSheet} onAddClick={() => newPayment()} />
        <NewPaymentSheet ref={refRBNewPaymentSheet} />
      </View>
    </SafeAreaView>
  );
};

export default WalkIn;
