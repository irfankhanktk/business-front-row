import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import ReactNativeModal from "react-native-modal";
import { Cam } from "../../../assets/common-icons";
import Bold from "../../../presentation/typography/bold-text";
import Regular from "../../../presentation/typography/regular-text";
import colors from "../../../services/colors";
import { mvs, width } from "../../../services/metrices";
import SERVICES from "./../../../services/common-services";
import ImagePlaceholder from "./../../atoms/Placeholder";
import Row from "./../../atoms/row";
import RatingStar from "./../rating-star/index";
const ReviewModal = ({
  setValue = (arg) => { },
  visible,
  setVisible = (bool) => { },
  items = [],
  setItems = (items) => { },
}) => {
  const [rate, setRate] = React.useState(4);
  const onGallery = async () => {
    try {
      const res = await SERVICES._returnImageGallery();
      // console.log('res::',res);
      if (!res) {
        return;
      }
      const copy = [...items];
      copy.push(res);
      setItems(copy);
    } catch (error) { }
  };
  // console.log('items:',items);
  return (
    <ReactNativeModal
      propagateSwipe
      isVisible={visible}
      onBackdropPress={() => setVisible(false)}
      onSwipeComplete={() => setVisible(false)}
      swipeDirection="up"
      style={{ margin: 0 }}
    >
      <View style={styles.container}>
        <Row style={{ marginBottom: mvs(30) }}>
          <TouchableOpacity onPress={setVisible}>
            <Regular label={"Cancel"} />
          </TouchableOpacity>
          <Bold label={"Write your review"} />
          <TouchableOpacity onPress={setVisible}>
            <Bold style={{ color: colors.primary }} label={"Done"} />
          </TouchableOpacity>
        </Row>
        <View style={{ alignItems: "center", marginBottom: mvs(22) }}>
          <RatingStar
            disabled={false}
            onPress={setRate}
            width={mvs(192)}
            size={mvs(30)}
            rate={rate}
          />
        </View>
        {items?.length > 0 ? (
          <Row justifyContent={"flex-start"}>
            {items?.map((item, index) => (
              <>
                <View style={{ marginRight: mvs(10) }}>
                  <ImagePlaceholder
                    containerStyle={{
                      height: mvs(48),
                      width: mvs(48),
                      borderRadius: mvs(10),
                    }}
                    uri={SERVICES._returnFile(item?.uri)}
                  />
                </View>
                {index === items?.length - 1 && (
                  <TouchableOpacity
                    onPress={onGallery}
                    style={{
                      borderWidth: 1,
                      borderStyle: "dashed",
                      borderRadius: mvs(10),
                      height: mvs(48),
                      width: mvs(48),
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Cam />
                  </TouchableOpacity>
                )}
              </>
            ))}
          </Row>
        ) : (
          <TouchableOpacity
            onPress={onGallery}
            style={{
              borderWidth: 1,
              borderStyle: "dashed",
              borderRadius: mvs(10),
              height: mvs(48),
              backgroundColor: colors.F9F9F9,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Row>
              <Cam />
              <Regular
                color={colors.B3B3B3B}
                size={mvs(16)}
                label={" Upload Photo"}
              />
            </Row>
          </TouchableOpacity>
        )}
        <TextInput
          multiline
          style={{
            height: mvs(231),
            backgroundColor: colors.F9F9F9,
            textAlignVertical: "top",
            borderRadius: mvs(15),
            padding: mvs(10),
            marginTop: mvs(5),
          }}
          placeholder={`Don't be shy, tell us more !`}
        />
      </View>
    </ReactNativeModal>
  );
};
export default ReviewModal;
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: width,
    backgroundColor: colors.white,
    borderTopLeftRadius: mvs(15),
    borderTopRightRadius: mvs(15),
    padding: mvs(17),
    alignSelf: "center",
  },
  PAYMENTDROPDOWN: {
    justifyContent: "space-between",
    height: mvs(50),
    alignItems: "center",
    borderRadius: 10,
    top: mvs(8),
    borderBottomWidth: 0.7,
    borderColor: colors.gray,
    paddingHorizontal: mvs(11),
  },
});
