import moment from "moment";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ReactNativeModal from "react-native-modal";
import {
  LeftBlackArrow,
  RightBlackArrow,
  SelectedCard,
  UnSelectedCard,
} from "../../../assets/common-icons";
import Regular from "../../../presentation/typography/regular-text";
import { mvs, width } from "../../../services/metrices";
import PageLoader from "../../atoms/page-loader";
import ModalLoader from "../modal-loader";
import Bold from "./../../../presentation/typography/bold-text";
import colors from "./../../../services/colors";
import Row from "./../../atoms/row";

const ScheduleModal = ({
  setDate = (arg) => {},
  setValue = () => {},
  visible,
  slotItem,
  onBackdropPress,
  slotLoading,
}) => {
  //console.log(date);
  const todayDate = moment(new Date()).format("YYYY-MM-DD");
  const [topDate, setTopDate] = useState(slotItem?.date);
  function onDateChange(date) {
    //setTopDate(date);
    setDate(date);
  }
  return (
    <ReactNativeModal
      isVisible={visible}
      onBackdropPress={onBackdropPress}
      style={{ margin: 0 }}
    >
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            width: width,
            paddingHorizontal: mvs(12),
          }}
          showsVerticalScrollIndicator={false}
        >
          <Row style={{ width: "100%" }} alignItems={"center"}>
            <TouchableOpacity
              activeOpacity={
                todayDate == moment(slotItem?.date).format("YYYY-MM-DD") ? 1 : 0
              }
              style={{ padding: 20 }}
              onPress={() => {
                if (todayDate != moment(slotItem?.date).format("YYYY-MM-DD")) {
                  onDateChange(moment(slotItem?.date).subtract(1, "d"));
                }
              }}
            >
              <LeftBlackArrow />
            </TouchableOpacity>
            <Bold
              size={mvs(16)}
              label={moment(slotItem?.date)?.format("DD MMMM YYYY")}
              color={colors.black}
            />
            <TouchableOpacity
              style={{ padding: 20 }}
              onPress={() => onDateChange(moment(slotItem?.date).add(1, "d"))}
            >
              <RightBlackArrow />
            </TouchableOpacity>
          </Row>
          {slotItem?.closedMessage ? (
            <Regular
              label={slotItem?.closedMessage}
              style={{ alignSelf: "center", marginVertical: mvs(10) }}
            />
          ) : (
            <>
              <Row
                style={{ width: "100%", justifyContent: "center" }}
                alignItems={"center"}
              >
                <Bold
                  label={"Morning"}
                  size={15}
                  color={
                    slotItem?.Morning?.emptyMessage
                      ? colors.black
                      : colors.lightBlue
                  }
                />
                <Regular
                  label={" " + slotItem?.Morning?.timing}
                  size={10}
                  color={colors.lightgrey1}
                  style={{ alignSelf: "flex-end" }}
                />
              </Row>
              {slotItem?.Morning?.emptyMessage && (
                <Regular
                  label={slotItem?.Morning?.emptyMessage}
                  style={{ alignSelf: "center", marginVertical: mvs(10) }}
                />
              )}
              {slotItem?.Morning?.slots?.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  activeOpacity={item?.view?.selected ? 1 : 0}
                  style={{ width: "100%" }}
                  onPress={() => {
                    if (!item?.view?.selected) {
                      setValue(item);
                    }
                  }}
                >
                  <Row style={{ ...styles.PAYMENTDROPDOWN }}>
                    <Bold
                      size={15}
                      style={{ flex: 1, marginHorizontal: mvs(8) }}
                      label={`${item?.view?.title}`}
                      // label={`${item?.start[0]} : ${item?.start[1]} AM - ${item?.end[0]} : ${item?.end[1]} AM`}
                    />
                    <View>
                      {item?.view?.selected ? (
                        <SelectedCard />
                      ) : (
                        <UnSelectedCard />
                      )}
                    </View>
                  </Row>
                </TouchableOpacity>
              ))}

              <Row
                style={{
                  width: "100%",
                  justifyContent: "center",
                  marginTop: mvs(5),
                }}
                alignItems={"center"}
              >
                <Bold
                  label={"Afternoon"}
                  size={15}
                  color={
                    slotItem?.Afternoon?.emptyMessage
                      ? colors.black
                      : colors.lightBlue
                  }
                />
                <Regular
                  label={" " + slotItem?.Afternoon?.timing}
                  size={10}
                  color={colors.lightgrey1}
                  style={{ alignSelf: "flex-end" }}
                />
              </Row>
              {slotItem?.Afternoon?.emptyMessage && (
                <Regular
                  label={slotItem?.Afternoon?.emptyMessage}
                  style={{ alignSelf: "center", marginVertical: mvs(10) }}
                />
              )}
              {slotItem?.Afternoon?.slots?.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  activeOpacity={item?.view?.selected ? 1 : 0}
                  style={{ width: "100%" }}
                  onPress={() => {
                    if (!item?.view?.selected) {
                      setValue(item);
                    }
                  }}
                >
                  <Row style={{ ...styles.PAYMENTDROPDOWN }}>
                    <Bold
                      size={15}
                      style={{ flex: 1, marginHorizontal: mvs(8) }}
                      label={`${item?.view?.title}`}
                      // label={`${item?.start[0]} : ${item?.start[1]} AM - ${item?.end[0]} : ${item?.end[1]} PM`}
                    />
                    <View>
                      {item?.view?.selected ? (
                        <SelectedCard />
                      ) : (
                        <UnSelectedCard />
                      )}
                    </View>
                  </Row>
                </TouchableOpacity>
              ))}
              <Row
                style={{
                  width: "100%",
                  justifyContent: "center",
                  marginTop: mvs(5),
                }}
                alignItems={"center"}
              >
                <Bold
                  label={"Evening"}
                  size={15}
                  color={
                    slotItem?.Evening?.emptyMessage
                      ? colors.black
                      : colors.lightBlue
                  }
                />
                <Regular
                  label={" " + slotItem?.Evening?.timing}
                  size={10}
                  color={colors.lightgrey1}
                  style={{ alignSelf: "flex-end" }}
                />
              </Row>
              {slotItem?.Evening?.emptyMessage && (
                <Regular
                  label={slotItem?.Evening?.emptyMessage}
                  style={{ alignSelf: "center", marginVertical: mvs(10) }}
                />
              )}
              {slotItem?.Evening?.slots?.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  activeOpacity={item?.view?.selected ? 1 : 0}
                  style={{ width: "100%" }}
                  onPress={() => {
                    if (!item?.view?.selected) {
                      setValue(item);
                    }
                  }}
                >
                  <Row style={{ ...styles.PAYMENTDROPDOWN }}>
                    <Bold
                      size={15}
                      style={{ flex: 1, marginHorizontal: mvs(8) }}
                      label={`${item?.view?.title}`}
                      // label={`${item?.start[0]} : ${item?.start[1]} AM - ${item?.end[0]} : ${item?.end[1]} PM`}
                    />
                    <View>
                      {item?.view?.selected ? (
                        <SelectedCard />
                      ) : (
                        <UnSelectedCard />
                      )}
                    </View>
                  </Row>
                </TouchableOpacity>
              ))}
            </>
          )}
        </ScrollView>
        {slotLoading && <ModalLoader />}
      </View>
    </ReactNativeModal>
  );
};

export default ScheduleModal;
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: width,
    backgroundColor: colors.white,
    borderTopLeftRadius: mvs(15),
    borderTopRightRadius: mvs(15),
    height: mvs(450),
  },
  PAYMENTDROPDOWN: {
    justifyContent: "space-between",
    height: mvs(50),
    alignItems: "center",
    borderRadius: 10,
    top: mvs(2),
    borderBottomWidth: 0.7,
    borderColor: colors.gray,
    paddingHorizontal: mvs(11),
  },
  Rows: {
    paddingHorizontal: 10,
    flexDirection: "row",
    marginVertical: mvs(10),
    alignSelf: "flex-start",
    alignItems: "center",
  },
  text: {
    fontSize: mvs(18),
    fontWeight: "bold",
  },
  button: {
    backgroundColor: colors.lightgrey1,
  },
});
