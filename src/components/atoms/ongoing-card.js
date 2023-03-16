import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Regular from "../../presentation/typography/regular-text";
import SemiBold from "../../presentation/typography/semibold-text";
import colors from "../../services/colors";
import { mvs } from "../../services/metrices";
import Row from "./row";
import Bold from "../../presentation/typography/bold-text";
import ImagePlaceholder from "./Placeholder";
import Medium from "../../presentation/typography/medium-text";
import Buttons from "./Button";
import moment from "moment";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import LinearGradient from "react-native-linear-gradient";
import { VehicleTwo } from "../../assets/common-icons";
import SERVICES from "../../services/common-services";
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
const OngoingCard = ({
  loading,
  onPress,
  item,
  image = require("../../assets/images/car-owner.png"),
}) => {
  const [progress, setProgress] = useState(0.01);
  const [leftTime, setLeftTime] = useState(0.0);
  useEffect(() => {
    if (item?.isInprogress) {
      calculateProgress();
      setInterval(() => {
        calculateProgress();
      }, 1000 * 60)
    }
  }, [progress])
  function calculateProgress() {
    const startdate = item?.view?.start;
    const minuts = item?.view?.minutes;
    var t = moment(startdate).twix(new Date());
    var completed = t.count('minutes') - 1;
    var percentage = (completed / minuts);
    var remTime = minuts - completed;
    if (percentage >= 1) {
      percentage = 1.0
    }
    if (remTime < 0) {
      remTime = 0;
    }
    setLeftTime(remTime)
    setProgress(percentage)
  }
  return (
    <View style={styles.CONTAINER}>
      <Row style={{ ...styles.UPPERROW, ...styles.TIMETOPVIEW }}>
        <Medium label={item?.queue?.title} size={16} />
        <ShimmerPlaceholder visible={loading}>
          <Medium
            label={`${item?.slot?.view?.time}`}
            size={14}
          />
        </ShimmerPlaceholder>
      </Row>
      <Row style={{ ...styles.UPPERROW, ...styles.TIMETOPVIEW }}>
        <ShimmerPlaceholder style={styles.IMAGE} visible={loading}>
          <ImagePlaceholder containerStyle={styles.IMAGE} uri={SERVICES._returnFile(image)} />
        </ShimmerPlaceholder>
        <View style={{ marginHorizontal: mvs(10), flex: 1 }}>
          <ShimmerPlaceholder height={40} width={150} visible={loading}>
            <Medium label={item?.customer?.name} size={16} />
            <Regular label={item?.customer?.mobile} size={13} />
            <SemiBold
              label={
                item?.payment?.amount ? `AED  ${item?.payment?.amount}` : ""
              }
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
            <View style={styles.progressView}>
              <Bold label={(progress * 100)?.toFixed(0) + '%'} size={8} color={colors.black} />
            </View>
          </ShimmerPlaceholder>
          <Regular
            label={leftTime + " mins left"}
            size={12}
            style={{ marginTop: mvs(4) }}
          />
        </View>
      </Row>
      <Row style={{ ...styles.UPPERROW, ...styles.TIMETOPVIEW }}>
        <ShimmerPlaceholder style={styles.BOTTOMIMG} visible={loading}>
          <ImagePlaceholder
            containerStyle={styles.BOTTOMIMG}
            uri={SERVICES._returnFile(item?.offering?.cover)}
            borderRadius={10}
          />
        </ShimmerPlaceholder>
        <View
          style={{
            paddingHorizontal: mvs(7),
            width: mvs(120),
            borderRightColor: colors.gray,
            borderRightWidth: 1,
          }}
        >
          <ShimmerPlaceholder width={100} height={40} visible={loading}>
            <Medium
              label={item?.offering?.title ? item?.offering?.title : ""}
              size={13}
            />
            <Regular
              label={item?.offering?.subTitle ? item?.offering?.subTitle : ""}
              size={11}
              numberOfLines={2}
            />
          </ShimmerPlaceholder>
        </View>
        <Row style={{ paddingHorizontal: mvs(10), flex: 1, alignItems: "center" }}>
          <ShimmerPlaceholder shimmerStyle={styles.BOTTOMIMG} visible={loading}>
            {item?.vehicle?.cover ? (
              <ImagePlaceholder
                containerStyle={styles.BOTTOMIMG}
                uri={SERVICES._returnFile(item?.offering?.cover)}
                borderRadius={10}
              />
            ) : (
              <VehicleTwo />
            )}
          </ShimmerPlaceholder>
          <View style={{ marginHorizontal: mvs(0) }}>
            <ShimmerPlaceholder width={100} height={40} visible={loading}>
              <Medium
                label={
                  item?.vehicle?.make
                    ? item?.vehicle?.make
                    : "" + " " + item?.vehicle?.model
                      ? item?.vehicle?.model
                      : ""
                }
                size={14}
              />
              <Regular
                label={
                  item?.vehicle?.registration ? item?.vehicle?.registration : ""
                }
                size={12}
                numberOfLines={1}
              />
            </ShimmerPlaceholder>
          </View>
        </Row>
      </Row>
      <Buttons.ButtonPrimary
        style={styles.BUTTON}
        textStyle={styles.BUTTONTEXT}
        onClick={onPress}
        title={"Checkout"}
      />
    </View>
  );
};
export default OngoingCard;
const styles = StyleSheet.create({
  CONTAINER: {
    backgroundColor: colors.white,
    borderRadius: 15,
    shadowColor: colors.shadow,
    padding: mvs(8),
    borderWidth: 0.7,
    borderColor: colors.gray,
    marginTop: mvs(9.1),
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
  UPPERROW: {
    justifyContent: "space-between",
    alignItems: "center",
  },

  SUBIMAGE: {
    height: mvs(41),
    width: mvs(41),
    borderRadius: 1000,
  },
  BUTTON: {
    backgroundColor: colors.lightGreen,
    marginVertical: mvs(12),
  },
  BUTTONTEXT: {
    color: colors.green,
  },
  TIMETOPVIEW: {
    paddingVertical: mvs(14.5),
    paddingHorizontal: mvs(16),
    borderBottomColor: colors.gray,
    borderBottomWidth: 1,
  },
  PROGRESSTEXT: {
    color: colors.black,
    fontWeight: "bold",
    fontSize: 10,
  },
  progressView: {
    borderRadius: 1000,
    height: mvs(40),
    width: mvs(40),
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: mvs(3),
    borderColor: colors.primary,
  },
});
