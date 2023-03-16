import React from "react";
import { StyleSheet, TouchableOpacity, View, FlatList } from "react-native";
import ReactNativeModal from "react-native-modal";
import { SelectedCard, UnSelectedCard } from "../../../assets/common-icons";
import Bold from "../../../presentation/typography/bold-text";
import colors from "../../../services/colors";
import { mvs, width } from "../../../services/metrices";
import Row from "../../atoms/row";
import BookingCoupon from "../../coupon-promo/booking-coupon";
const CouponModal = ({
  title='Select Coupon',
  value,
  setValue = (arg) => {},
  visible,
  onBackdropPress,
  items = [],
}) => {
  // console.log(items)
  return (
    <ReactNativeModal
      isVisible={visible}
      onBackdropPress={onBackdropPress}
      style={{ margin: 0 }}
    >
      <View style={styles.container}>
        <>
          <Bold label={title} />

          {items.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={{ width: "100%" }}
              onPress={() => {
                setValue(item);
              }}
            >
              <Row style={{ ...styles.PAYMENTDROPDOWN }}>
                <BookingCoupon
                  name={item?.name}
                  imageUrl={item?.image}
                  price={item?.price}
                  voucher={item?.voucher}
                />
                <View>
                  {item?.id === value?.id ? (
                    <SelectedCard />
                  ) : (
                    <UnSelectedCard />
                  )}
                </View>
              </Row>
            </TouchableOpacity>
          ))}
        </>
      </View>
    </ReactNativeModal>
  );
};
export default CouponModal;
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: width,
    backgroundColor: colors.white,
    borderTopLeftRadius: mvs(15),
    borderTopRightRadius: mvs(15),
    padding: 10,
    alignItems: "center",
    alignSelf: "center",
    paddingBottom:mvs(45)
  },
  PAYMENTDROPDOWN: {
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    top: mvs(8),
    borderBottomWidth: 0.5,
    borderColor: colors.gray,
    paddingHorizontal: mvs(11),
    paddingBottom: mvs(5),
    paddingTop:mvs(5)
  },
});
