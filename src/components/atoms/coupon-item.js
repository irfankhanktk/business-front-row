import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import * as Progress from "react-native-progress";
import * as SVG from "../../assets/common-icons";
import Bold from "../../presentation/typography/bold-text";
import Medium from "../../presentation/typography/medium-text";
import Regular from "../../presentation/typography/regular-text";
import colors from "../../services/colors";
import { mvs } from "../../services/metrices";
import ImagePlaceholder from "./Placeholder";
import Row from "./row";
const CouponItem = ({
  onPress,
  image = require("../../assets/images/carwash.png"),
  subImage = require("../../assets/images/carwash.png"),
  price = "0.0",
  progress = 0.5,
  bussinessName = "Total Al Safeer Car Wash…",
  address = "Sharjah Al nahada road",
  expireTime = "12 February 2021",
  discount = "50",
  AED = "30.00",
  status = "active",
}) => {
  return (
    <View style={styles.CONTAINER}>
      <Row style={styles.UPPERROW}>
        <ImagePlaceholder containerStyle={styles.IMAGE} uri={image} />
        <View style={{ marginHorizontal: mvs(10), flex: 1 }}>
          <Medium numberOfLines={2} label={discount + "% OFF Car Wash"} />
          <Regular label={AED + " AED"} style={{ fontSize: 12 }} />
          <Row style={{ justifyContent: "flex-start" }}>
            {status == "active" ? (
              <SVG.PrimaryPercentage />
            ) : (
              <SVG.GrayPercentage />
            )}
            <Regular
              label={"Cash Voucher"}
              style={{
                fontSize: 12,
                marginHorizontal: mvs(3),
                color: status == "active" ? colors.primary : colors.lightgrey1,
              }}
            />
          </Row>
          <Regular
            label={"Expires On " + expireTime}
            style={{ fontSize: 13, color: colors.lightgrey1 }}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          {status == "active" ? (
            <Progress.Circle
              size={36}
              color={colors.primary}
              borderColor={colors.gray}
              progress={progress / 100}
              formatText={(p) => `${Math.round(progress)}%`}
              showsText
              textStyle={styles.PROGRESSTEXT}
            />
          ) : null}
          <Bold label={"AED" + price} style={{ marginTop: mvs(14) }} />
        </View>
      </Row>
      <Row style={{ ...styles.UPPERROW, ...styles.BOTTOMROW }}>
        <ImagePlaceholder containerStyle={styles.SUBIMAGE} uri={subImage} />
        <View style={{ marginHorizontal: mvs(10), flex: 1 }}>
          <Medium label={bussinessName} />
          <Regular label={address} style={{ fontSize: 13 }} />
        </View>
        <View style={{ alignItems: "flex-end" }}>
          {status != "active" ? (
            <TouchableOpacity
              style={{ ...styles.BUTTON, backgroundColor: colors.gray }}
              onPress={onPress}
            >
              <Regular
                label={"Expired"}
                style={{ ...styles.BUTTONTEXT, color: colors.lightgrey1 }}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={{ ...styles.BUTTON }} onPress={onPress}>
              <Regular label={"View"} style={{ ...styles.BUTTONTEXT }} />
            </TouchableOpacity>
          )}
        </View>
      </Row>
    </View>
  );
};
export default CouponItem;
const styles = StyleSheet.create({
  CONTAINER: {
    backgroundColor: colors.white,
    borderRadius: 10,
    shadowColor: colors.shadow,
    padding: mvs(8),
    borderWidth: 0.7,
    borderColor: colors.gray,
    marginTop: mvs(9.1),
  },
  IMAGE: {
    height: mvs(71),
    width: mvs(67),
    borderRadius: 10,
  },
  UPPERROW: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  BOTTOMROW: {
    borderTopWidth: 0.4,
    borderColor: colors.gray,
    marginTop: mvs(10),
    paddingVertical: mvs(15),
    paddingHorizontal: mvs(1),
  },
  PROGRESSTEXT: {
    color: colors.black,
    fontWeight: "bold",
    fontSize: 10,
  },
  SUBIMAGE: {
    height: mvs(41),
    width: mvs(41),
    borderRadius: 1000,
  },
  BUTTON: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.lightYellow,
    width: mvs(80),
    height: mvs(29),
    borderRadius: 6,
    paddingHorizontal: mvs(7),
  },
  BUTTONTEXT: {
    color: colors.primary,
  },
  RATING: {
    borderWidth: 0.4,
    borderRadius: 10,
    shadowColor: colors.shadow,
    borderColor: colors.gray,
    backgroundColor: colors.white,
    width: mvs(62),
    height: mvs(29),
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});
