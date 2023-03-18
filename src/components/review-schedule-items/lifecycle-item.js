import React from "react";
import { StyleSheet } from "react-native";
import Medium from "../../presentation/typography/medium-text";
import colors from "../../services/colors";
import { mvs } from "../../services/metrices";
import Row from "../atoms/row";
import ActionButton from "./action-button";
import Regular from '../../presentation/typography/regular-text';
const LifeCycleItem = ({
  item,
  buttonText,
  onClick,
  assignWorker = false,
  onAssignWorker,
  loading = false,
  assignWorkerloading = false,
}) => {
  return (
    <Row alignItems="center" style={styles.CONTAINER}>
      <Regular label={item?.label} color={colors.lightgrey1} size={14} />
      {assignWorker ?
        <ActionButton
          style={{ width: mvs(80) }}
          loading={assignWorkerloading}
          title={"Assign Worker"}
          onClick={onAssignWorker}
          bgColor={colors.lightGreen1}
          borderColor={colors.green}
          titleColor={colors.green} />
        : item?.action ?
          <ActionButton
            loading={loading}
            style={{ width: mvs(80) }}
            title={buttonText}
            onClick={onClick}
            bgColor={colors.lightGreen1}
            borderColor={colors.green}
            titleColor={colors.green} /> :
          <Medium label={item?.at} size={14} />
      }
    </Row>
  );
};
export default LifeCycleItem;
const styles = StyleSheet.create({
  CONTAINER: {
    paddingVertical: mvs(8),
    // borderBottomColor: colors.gray,
    // borderBottomWidth: mvs(0.3)
  },
});