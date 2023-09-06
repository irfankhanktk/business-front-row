import React from "react";
import { StyleSheet, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import * as Progress from "react-native-progress";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import ImagePlaceholder from "../../components/atoms/Placeholder";
import Row from "../../components/atoms/row";
import Medium from "../../presentation/typography/medium-text";
import Regular from "../../presentation/typography/regular-text";
import SemiBold from "../../presentation/typography/semibold-text";
import colors from "../../services/colors";
import SERVICES from "../../services/common-services";
import { mvs } from "../../services/metrices";
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
const BookingDetailsHeader = ({ loading, data, progress = 50 }) => {
  return (
    <View style={styles.conntainer}>
      <Row style={{ ...styles.UPPERROW, ...styles.TIMETOPVIEW }}>
        <Medium label={"Queue 1"} size={16} />
        <ShimmerPlaceholder height={20} visible={loading}>
          <Medium
            label={`${data?.slot?.from[0]}:${data?.slot?.from[1]} AM - ${data?.slot?.to[0]}:${data?.slot?.to[1]} AM`}
            size={16}
          />
        </ShimmerPlaceholder>
      </Row>
      <Row style={{ ...styles.UPPERROW, ...styles.TIMETOPVIEW }}>
        <ShimmerPlaceholder shimmerStyle={styles.IMAGE} visible={loading}>
          <ImagePlaceholder
            containerStyle={styles.IMAGE}
            uri={
              data?.customer?.image
                ? { uri: SERVICES._returnFile(data?.customer?.image) }
                : require("../../assets/images/car-owner.png")
            }
          />
        </ShimmerPlaceholder>
        <View style={{ marginHorizontal: mvs(10), flex: 1 }}>
          <ShimmerPlaceholder height={40} width={150} visible={loading}>
            <Medium label={data?.customer?.name} size={16} />
            <Regular label={data?.customer?.mobile} size={13} />
            <SemiBold
              label={`AED ${data?.offering?.price}`}
              style={{ fontSize: 12, color: colors.primary }}
            />
          </ShimmerPlaceholder>
        </View>
        <View style={{ alignItems: "center" }}>
          <ShimmerPlaceholder
            shimmerStyle={{
              width: mvs(50),
              height: mvs(50),
              borderRadius: mvs(25),
            }}
            visible={loading}
          >
            <Progress.Circle
              size={36}
              color={colors.primary}
              borderColor={colors.gray}
              progress={progress / 100}
              formatText={(p) => `${Math.round(progress)}%`}
              showsText
              textStyle={styles.PROGRESSTEXT}
            />
          </ShimmerPlaceholder>
          <Regular
            label={"15 mins left"}
            size={12}
            style={{ marginTop: mvs(4) }}
          />
        </View>
      </Row>
      <Row style={{ ...styles.UPPERROW, ...styles.TIMETOPVIEW }}>
        <ShimmerPlaceholder shimmerStyle={styles.BOTTOMIMG} visible={loading}>
          <ImagePlaceholder
            containerStyle={styles.BOTTOMIMG}
            uri={
              data?.customer?.image
                ? { uri: SERVICES._returnFile(data?.customer?.image) }
                : require("../../assets/images/carwash.png")
            }
            borderRadius={10}
          />
        </ShimmerPlaceholder>
        <View style={{ paddingHorizontal: mvs(7), flex: 1 }}>
          <ShimmerPlaceholder height={40} width={150} visible={loading}>
            <Medium label={data?.offering?.title} size={14} />
            <Regular
              label={data?.offering?.subTitle}
              size={12}
              numberOfLines={2}
            />
          </ShimmerPlaceholder>
        </View>
      </Row>
      <Row style={{ ...styles.TIMETOPVIEW }}>
        <ShimmerPlaceholder shimmerStyle={styles.BOTTOMIMG} visible={loading}>
          {data?.customer?.image ? (
            <ImagePlaceholder
              containerStyle={styles.BOTTOMIMG}
              uri={
                data?.customer?.image
                  ? { uri: SERVICES._returnFile(data?.customer?.image) }
                  : require("../../assets/images/carwash.png")
              }
              borderRadius={10}
            />
          ) : (
            <View />
            // <Vehicle height={mvs(30)} width={mvs(44)} />
          )}
        </ShimmerPlaceholder>
        <View style={{ marginHorizontal: mvs(5), flex: 1 }}>
          <ShimmerPlaceholder height={40} width={150} visible={loading}>
            <Medium
              label={
                data?.vehicle?.make
                  ? data?.vehicle?.make
                  : " " + " " + data?.vehicle?.model
                  ? data?.vehicle?.model
                  : ""
              }
              size={14}
            />
            <Regular
              label={data?.vehicle?.registration}
              size={12}
              numberOfLines={1}
            />
          </ShimmerPlaceholder>
        </View>
      </Row>
    </View>
  );
};
export default BookingDetailsHeader;

const styles = StyleSheet.create({
  conntainer: {},
  TIMETOPVIEW: {
    paddingVertical: mvs(14.5),
    borderBottomColor: colors.gray,
    borderBottomWidth: 1,
  },
  PROGRESSTEXT: {
    color: colors.black,
    fontWeight: "bold",
    fontSize: 10,
  },
  UPPERROW: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  IMAGE: {
    height: mvs(60),
    width: mvs(60),
    borderRadius: mvs(1000),
  },
  BOTTOMIMG: {
    height: mvs(49),
    width: mvs(52),
    borderRadius: mvs(10),
  },
});
