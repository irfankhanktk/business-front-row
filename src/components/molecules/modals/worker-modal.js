import React from "react";
import { StyleSheet, TouchableOpacity, View, FlatList } from "react-native";
import ReactNativeModal from "react-native-modal";
import { SelectedCard, UnSelectedCard } from "../../../assets/common-icons";
import Bold from "../../../presentation/typography/bold-text";
import colors from "../../../services/colors";
import { mvs, width } from "../../../services/metrices";
import Row from "../../atoms/row";
import WorkerItem from "../../service-offering/woker-item";
const WorkerModal = ({
  value,
  setValue = (arg) => {},
  visible,
  items = [],
  onBackdropPress
}) => {
  // console.log(value)
  // console.log(items);
  return (
    <ReactNativeModal
      isVisible={visible}
      onBackdropPress={onBackdropPress}
      style={{ margin: 0 }}
    >
      <View style={styles.container}>
        <>
          <Bold label={`Assign Worker`} />

          {items?.map((item, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={item?.id == value?.id?1:0}
              style={{ width: "100%" }}
              onPress={() => {
                if(item?.id != value?.id){
                  setValue(item);
                }
              }}>
               <Row style={{ ...styles.PAYMENTDROPDOWN }}>
               <WorkerItem item={item} style={{flex:1}}/>
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
export default WorkerModal;
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
  },
  PAYMENTDROPDOWN: {
    justifyContent: "space-between",
    height: mvs(90),
    alignItems: "center",
    borderRadius: 10,
    top: mvs(4),
    borderBottomWidth: 0.7,
    borderColor: colors.gray,
    paddingHorizontal: mvs(11),
    paddingVertical: mvs(3),
  },
});
