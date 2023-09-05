import moment from "moment";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import * as Progress from "react-native-progress";
import { AlertIcon, Liked, Star } from "../../assets/common-icons";
import Bold from "../../presentation/typography/bold-text";
import Regular from "../../presentation/typography/regular-text";
import colors from "../../services/colors";
import { mvs } from "../../services/metrices";
import Row from "../atoms/row";
const AlertMessage = ({
  title,
  subTitle,
  fillColor = colors.green,
  bgColor = colors.lightGreen1,
  color,
  view,
}) => {
  console.log("view?.message?.progress:::", view?.message?.progress);
  const progress = Math.fround((view?.message?.progress || 1) / 100);
  const showProgress = view?.message?.showProgress;
  console.log("progress::", progress);
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: bgColor,
        minHeight: mvs(70),
        overflow: "hidden",
      }}
    >
      <View style={{ ...styles.fillView, backgroundColor: fillColor }}></View>
      {color == "red" && (
        <View style={{ alignSelf: "center", marginLeft: mvs(10) }}>
          <AlertIcon />
        </View>
      )}
      <View style={{ ...styles.mainView, backgroundColor: bgColor }}>
        {title && (
          <Regular
            label={title}
            size={13}
            color={fillColor}
            numberOfLines={3}
          />
        )}
        {subTitle && (
          <Regular
            label={subTitle}
            size={11}
            color={fillColor}
            numberOfLines={3}
          />
        )}
      </View>
      {showProgress && (
        <View style={{ alignSelf: "center", marginHorizontal: mvs(5) }}>
          <Progress.Circle
            size={50}
            color={colors.primary}
            borderColor={colors.gray}
            progress={1}
            showsText
            // textStyle={styles.PROGRESSTEXT}
            textStyle={{
              color: colors.black,
              fontWeight: "bold",
              fontSize: mvs(7),
            }}
          />
        </View>
      )}
      {view?.message?.showRating && view?.message?.rating && (
        <Row style={styles.RATING}>
          <Star />
          <Bold label={view?.message?.rating} />
        </Row>
      )}
      {view?.message?.showRating && !view?.message?.rating && (
        <TouchableOpacity style={{ ...styles.BUTTON }} activeOpacity={1}>
          <Liked style={{ marginRight: mvs(5) }} />
          <Regular label={"Liked"} size={10} style={{ ...styles.BUTTONTEXT }} />
        </TouchableOpacity>
      )}
    </View>
  );
};
export default AlertMessage;
const styles = StyleSheet.create({
  container: {
    borderRadius: mvs(6),
    marginTop: mvs(5),
    flexDirection: "row",
  },
  fillView: {
    borderTopLeftRadius: mvs(6),
    borderBottomLeftRadius: mvs(6),
    width: mvs(8),
  },
  mainView: {
    paddingVertical: mvs(8),
    flex: 1,
    paddingLeft: mvs(8),
    paddingRight: mvs(14),
  },
  PROGRESSTEXT: {
    color: colors.black,
    fontWeight: "bold",
    fontSize: 8,
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
    alignSelf: "center",
    marginHorizontal: mvs(5),
  },
  BUTTON: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    width: mvs(60),
    height: mvs(29),
    borderRadius: 6,
    paddingHorizontal: mvs(7),
    ...colors.shadow,
    alignSelf: "center",
    marginHorizontal: mvs(5),
  },
  BUTTONTEXT: {
    color: colors.primary,
  },
});
