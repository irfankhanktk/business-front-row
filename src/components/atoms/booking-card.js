import moment from "moment";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import * as SVG from "../../assets/common-icons";
import Bold from "../../presentation/typography/bold-text";
import Medium from "../../presentation/typography/medium-text";
import Regular from "../../presentation/typography/regular-text";
import colors from "../../services/colors";
import SERVICES from "../../services/common-services";
import { mvs } from "../../services/metrices";
import Buttons from "./Button";
import ImagePlaceholder from "./Placeholder";
import Row from "./row";
const BookingCard = ({
  btnLaoding,
  loading,
  item,
  image = require("../../assets/images/car-owner.png"),
  subImage = require("../../assets/images/carwash.png"),
  onAssignWorker,
  onCheckin,
  onStart,
  onNoShow,
  onCheckout,
  showCheckout = false,
}) => {
  const [progress, setProgress] = useState(0.01);
  useEffect(() => {
    if (item?.isInprogress) {
      calculateProgress();
      setInterval(() => {
        calculateProgress();
      }, 1000 * 60);
    }
  }, [progress]);
  function calculateProgress() {
    const startdate = item?.view?.start;
    const minuts = item?.view?.minutes;
    var t = moment(startdate).twix(new Date());
    var completed = t.count("minutes") - 1;
    var percentage = completed / minuts;
    console.log("Value of p ", percentage);
    if (percentage >= 1) {
      percentage = 1.0;
    }
    setProgress(percentage);
  }
  return (
    <View style={styles.CONTAINER}>
      <View
        style={{
          paddingHorizontal: mvs(20),
          borderBottomColor: colors.gray,
          borderBottomWidth: item?.view?.minimize ? 0 : 0.2,
        }}
      >
        <Row
          style={{
            ...styles.UPPERROW,
            ...styles.TIMETOPVIEW,
            borderBottomWidth: item?.view?.minimize ? 0 : 0.2,
          }}
        >
          <Medium label={item?.slot?.view?.time} size={15} />
          {item?.view?.minimize && (
            <View>
              {item?.isNoshow ? (
                <Bold label={"NS"} />
              ) : item?.isCancelled ? (
                <Bold label={"CN"} />
              ) : item?.isInprogress ? (
                <View style={styles.progressView}>
                  <Bold
                    label={(progress * 100)?.toFixed(0) + "%"}
                    size={8}
                    color={colors.black}
                  />
                </View>
              ) : item?.isCompleted ? (
                <View style={styles.progressView}>
                  <Bold label={"100%"} size={8} color={colors.black} />
                  <View style={{ position: "absolute", right: -5, top: -10 }}>
                    <SVG.Tick height={20} width={20} />
                  </View>
                </View>
              ) : null}
            </View>
          )}
        </Row>
        {!item?.view?.minimize && (
          <>
            <Row style={{ ...styles.UPPERROW, ...styles.TIMETOPVIEW }}>
              <Row alignItems="center" style={{ width: "50%" }}>
                <SVG.VehicleTwo />
                <View style={{ marginHorizontal: mvs(10), flex: 1 }}>
                  <Medium
                    label={
                      item?.vehicle?.make
                        ? item?.vehicle?.make
                        : "" + " " + item?.vehicle?.model
                          ? item?.vehicle?.model
                          : ""
                    }
                    size={15}
                    color={colors.black}
                  />
                  <Regular
                    label={item?.vehicle?.registration}
                    size={14}
                    numberOfLines={1}
                  />
                </View>
              </Row>
              {item?.worker && (
                <Row
                  style={{
                    paddingLeft: mvs(15),
                    width: "50%",
                    alignItems: "center",
                  }}
                >
                  <Image
                    style={styles.BOTTOMIMG}
                    source={SERVICES._returnFile(image)}
                  />
                  <View style={{ marginHorizontal: mvs(5), flex: 1 }}>
                    <Medium label={item?.worker?.title} size={15} />
                    <Regular label={item?.queue?.title} size={14} />
                  </View>
                </Row>
              )}
            </Row>
            <Row style={{ ...styles.UPPERROW, paddingVertical: mvs(7.5) }}>
              <Row style={{ width: "50%" }} alignItems="center">

                <ImagePlaceholder
                  containerStyle={styles.BOTTOMIMG}
                  uri={SERVICES._returnFile(subImage)}
                  borderRadius={10}
                />
                <View style={styles.bussinessView}>
                  <Medium label={item?.offering?.title} size={15} />
                  <Regular
                    label={item?.offering?.subTitle}
                    size={14}
                    numberOfLines={1}
                    style={{ width: mvs(103) }}
                  />
                </View>
              </Row>

              <Row
                style={{
                  paddingLeft: mvs(15),
                  width: "50%",
                  alignItems: "center",
                }}
              >
                <Image
                  style={[styles.BOTTOMIMG, { borderRadius: mvs(25) },]}
                  source={image}
                />
                <View style={{ marginHorizontal: mvs(5), flex: 1 }}>
                  <Medium label={item?.customer?.name} size={15} />
                  <Regular label={item?.customer?.mobile} size={14} />
                </View>
              </Row>
            </Row>
          </>
        )}
      </View>
      {!item?.view?.minimize && (
        <View>
          {showCheckout ? (
            <Buttons.ButtonPrimary
              loading={btnLaoding}
              style={styles.CHKBUTTON}
              textStyle={styles.CHKBUTTONTEXT}
              onClick={onCheckout}
              title={"Checkout"}
            />
          ) : item?.view?.startAction ? (
            <Buttons.ButtonPrimary
              loading={btnLaoding}
              style={styles.BUTTON}
              textStyle={styles.BUTTONTEXT}
              onClick={onStart}
              title={"Start"}
            />
          ) : item?.view?.noshowAction ? (
            <Buttons.ButtonPrimary
              loading={btnLaoding}
              style={styles.BUTTON}
              textStyle={styles.BUTTONTEXT}
              onClick={onNoShow}
              title={"No Show"}
            />
          ) : item?.view?.checkinAction ? (
            <Buttons.ButtonPrimary
              loading={btnLaoding}
              style={styles.BUTTON}
              textStyle={styles.BUTTONTEXT}
              onClick={onCheckin}
              title={"Check In"}
            />
          ) : item?.view?.assignWorkerAction ? (
            <Buttons.ButtonPrimary
              loading={btnLaoding}
              style={styles.BUTTON}
              textStyle={styles.BUTTONTEXT}
              onClick={onAssignWorker}
              title={"Assign Worker"}
            />
          ) : null}
        </View>
      )}
    </View>
  );
};
export default BookingCard;
const styles = StyleSheet.create({
  CONTAINER: {
    backgroundColor: colors.white,
    borderRadius: 15,
    ...colors.shadow,
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
    backgroundColor: colors.lightBlue,
    marginVertical: mvs(12.5),
    width: "93%",
    alignSelf: "center",
  },
  BUTTONTEXT: {
    color: colors.blue,
  },
  TIMETOPVIEW: {
    paddingVertical: mvs(14.5),
    paddingHorizontal: mvs(3),
    borderBottomColor: colors.gray,
    borderBottomWidth: 0.2,
  },
  bussinessView: {
    paddingHorizontal: mvs(7),
    borderRightColor: colors.gray,
    borderRightWidth: 0.2,
    flex: 1,
  },
  progressView: {
    borderRadius: 1000,
    height: mvs(40),
    width: mvs(40),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: mvs(3),
    borderColor: colors.primary,
    marginLeft: 85,
  },
  CHKBUTTON: {
    backgroundColor: colors.lightGreen,
    marginVertical: mvs(12.5),
    width: "93%",
    alignSelf: "center",
  },
  CHKBUTTONTEXT: {
    color: colors.green,
  },
});
