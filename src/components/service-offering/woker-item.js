import React from "react";
import { View, StyleSheet,TouchableOpacity } from "react-native";
import { SelectedCard, UnSelectedCard } from "../../assets/common-icons";
import { CarOwner, User } from "../../assets/images";
import Medium from "../../presentation/typography/medium-text";
import Regular from "../../presentation/typography/regular-text";
import colors from "../../services/colors";
import { mvs } from "../../services/metrices";
import ImagePlaceholder from "../atoms/Placeholder";
import Row from "../atoms/row";

const WorkerItem = ({ item ,style,showSelect=false,selected,onSelected}) => {
  return (
    <View style={{...styles.conntainer,...style}}>
      <Row style={{ alignItems: "center" }}>
        <ImagePlaceholder
          uri={CarOwner}
          containerStyle={styles.profileImage}
        />
        <View style={{ flex: 1, marginLeft: mvs(9) }}>
         {item?.title && ( <Medium label={item?.title} size={16} color={colors.black}/>)}
         {item?.name && ( <Medium label={item?.name} size={16} color={colors.black}/>)}
          {item?.phone &&(<Regular label={item?.phone} size={13} color={colors.lightgrey1}/>)}
          {item?.mobile &&(<Regular label={item?.mobile} size={13} color={colors.lightgrey1}/>)}
        </View>
       {showSelect &&
       (<TouchableOpacity onPress={onSelected}>
          {selected ? <SelectedCard /> : <UnSelectedCard />}
        </TouchableOpacity>)}
      </Row>
    </View>
  );
};
export default WorkerItem;

const styles = StyleSheet.create({
  conntainer: {
    backgroundColor: colors.white,
    justifyContent: "center",
    borderRadius: mvs(8),
    paddingVertical: mvs(8)
  },
  profileImage: {
    alignSelf: "center",
    borderRadius: 10000,
    height: mvs(50),
    width: mvs(50),
  },
});
