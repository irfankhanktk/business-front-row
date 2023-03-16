import React from "react";
import { StyleSheet } from "react-native";
import Medium from "../../presentation/typography/medium-text";
import colors from "../../services/colors";
import { mvs } from "../../services/metrices";
import Row from "../atoms/row";
const LifeCycleItem = ({
  item,
}) => {
  return (
    <Row alignItems="center" style={styles.CONTAINER}>
      <Medium label={item?.label} color={colors.lightgrey1} size={14} />
      {item?.action ?
        <Medium label={"To be"} size={14} /> :
        <Medium label={item?.at} size={14} />
      }
    </Row>
  );
};
export default LifeCycleItem;
const styles = StyleSheet.create({
  CONTAINER: {
    paddingVertical: mvs(8),

  },
});
