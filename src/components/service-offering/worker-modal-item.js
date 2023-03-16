import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { SelectedCard, UnSelectedCard } from "../../assets/common-icons";
import { CarOwner, User } from "../../assets/images";
import Medium from "../../presentation/typography/medium-text";
import Regular from "../../presentation/typography/regular-text";
import SemiBold from "../../presentation/typography/semibold-text";
import alertService from "../../services/alert.service";
import colors from "../../services/colors";
import SERVICES from "../../services/common-services";
import { mvs } from "../../services/metrices";
import ImagePlaceholder from "../atoms/Placeholder";
import Row from "../atoms/row";

const WorkerModalItem = ({ title, image }) => {
  return (
    <View style={styles.conntainer}>
      <Row style={{ alignItems: "center" }}>
        <ImagePlaceholder uri={SERVICES._returnFile(image)} containerStyle={styles.profileImage} />
        <View style={{ marginLeft: mvs(9) }}>
          <Medium label={title} size={16} />
        </View>
      </Row>
    </View>
  );
};
export default WorkerModalItem;

const styles = StyleSheet.create({
  conntainer: {
    backgroundColor: colors.white,
    justifyContent: "center",
    borderRadius: mvs(8),
  },
  profileImage: {
    alignSelf: "center",
    borderRadius: 10000,
    height: mvs(50),
    width: mvs(50),
  },
});
