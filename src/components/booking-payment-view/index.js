import React from "react";
import Row from "../../components/atoms/row";
import Medium from "../../presentation/typography/medium-text";
import Bold from "../../presentation/typography/bold-text";
import colors from "../../services/colors";
import { mvs } from "../../services/metrices";
import { View, StyleSheet } from "react-native";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import LinearGradient from "react-native-linear-gradient";
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
const BookingPaymentView = ({
  loading,
  item,
  subTotal = "45.00",
  Vat = "2.00",
  total = "47.00",
}) => {
  return (
    <View style={styles.conntainer}>
      <Row style={{ ...styles.priceView, marginTop: mvs(16.3) }}>
        <Medium label={"Sub Total"} size={14} />
        <ShimmerPlaceholder width={50} visible={loading}>
          <Medium
            label={"AED" + item?.payment?.amount ? item?.payment?.amount : ""}
            size={14}
          />
        </ShimmerPlaceholder>
      </Row>
      <Row style={{ ...styles.priceView }}>
        <Medium
          label={item?.invoice?.taxTitle}
          size={14}
          color={colors.lightgrey1}
        />
        <ShimmerPlaceholder width={50} visible={loading}>
          <Medium
            label={"AED " + item?.invoice?.tax}
            size={14}
            color={colors.lightgrey1}
          />
        </ShimmerPlaceholder>
      </Row>
      <Row style={styles.bottomBorder}>
        <Bold label={"Grand Total"} size={14} />
        <ShimmerPlaceholder width={50} visible={loading}>
          <Bold
            label={"AED" + item?.payment?.amount ? item?.payment?.amount : ""}
            size={14}
          />
        </ShimmerPlaceholder>
      </Row>
    </View>
  );
};
export default BookingPaymentView;

const styles = StyleSheet.create({
  conntainer: {},
  priceView: {
    justifyContent: "space-between",
    marginTop: mvs(14),
  },
  bottomBorder: {
    paddingVertical: mvs(14.5),
    borderBottomColor: colors.gray,
    borderBottomWidth: 1,
  },
});
