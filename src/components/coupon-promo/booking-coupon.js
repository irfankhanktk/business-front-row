import React from "react";
import ImagePlaceholder from "../../components/atoms/Placeholder";
import Row from "../../components/atoms/row";
import Regular from "../../presentation/typography/regular-text";
import SemiBold from "../../presentation/typography/semibold-text";
import colors from "../../services/colors";
import { mvs } from "../../services/metrices";
import { HighlightedPercent, WhitePercentage } from "../../assets/common-icons";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Coupon } from "../../assets/images";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import LinearGradient from "react-native-linear-gradient";
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
const BookingCoupon = ({
  loading,
  item,
  name = "50% OFF Car Wash",
  price = "30.00 AED",
  voucher = "CASH VOUCHER",
  imageUrl = "https://cdn3.vectorstock.com/i/1000x1000/20/17/gift-coupon-label-or-price-tag-vector-23262017.jpg",
}) => {
  const image = { uri: imageUrl }; //use this when image comes from api.

  return (
    <View style={styles.conntainer}>
      <Row style={{ paddingVertical: mvs(10) }} alignItems='center' >
        {/* <ShimmerPlaceholder
          shimmerStyle={{ width: mvs(69), height: mvs(73) }}
          visible={loading}
        > */}
        <ImagePlaceholder
          borderRadius={mvs(8)}
          uri={Coupon}
          containerStyle={{ width: mvs(69), height: mvs(73)}}
        />
        {/* </ShimmerPlaceholder> */}

        <View style={{ marginHorizontal: mvs(9) }}>
          {/* <ShimmerPlaceholder
            style={{ height: mvs(80), width: mvs(170) }}
            visible={loading}
          > */}
          <SemiBold label={name} size={16} color={colors.black} />
          <Regular label={price} size={14} />
          <Row alignItems='center' style={styles.highlighted}>
              <HighlightedPercent/>
                <Regular color={colors.black} 
                  size={mvs(13)} label={voucher} 
                   style={{marginLeft:mvs(6),flex: 1,}}
                />
           </Row>
          {/* </ShimmerPlaceholder> */}
        </View>
      </Row>
    </View>
  );
};
export default BookingCoupon;

const styles = StyleSheet.create({
  voucherView: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    justifyContent: "space-evenly",
    height: mvs(25),
    width: mvs(156),
    alignItems: "center",
    padding: mvs(1),
    top: mvs(5),
  },
  highlighted:{
    paddingHorizontal:mvs(9),
    paddingVertical:mvs(4),
    backgroundColor:colors.lightYellow,
    borderRadius:4,
    marginTop:mvs(7)
  }
});
