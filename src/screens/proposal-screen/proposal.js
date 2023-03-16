import { useTheme } from "@react-navigation/native";
import moment from "moment";
import React from "react";
import { ScrollView, SafeAreaView, View } from "react-native";
import { connect } from "react-redux";
import Buttons from "../../components/atoms/Button";
import { INPUT_FIELD } from "../../components/atoms/Input";
import { CustomHeader } from "../../components/molecules/header/header-1x";
import { mvs } from "../../services/metrices";
import { Proposal_Styles as styles } from "./proposal-styles";
const types = [
  {
    label: "Amazon Pay",
    value: "Amazon Pay",
  },
  {
    label: "Square",
    value: "Square",
  },
  {
    label: "Stripe",
    value: "Stripe",
  },
];
const Proposal = (props) => {
  const { colors } = useTheme();
  const { route, navigation, postRequest } = props;
  const { item } = route?.params || {};
  const [payload, setPayload] = React.useState({
    time: moment().format("lll"),
    payment: "Amazon Pay",
  });
  // console.log('item::', item);
  const onSubmit = async () => {
    try {
      navigation.navigate("Request");
      await postRequest(payload);
    } catch (error) {}
  };
  return (
    <SafeAreaView style={styles.conntainer}>
      <CustomHeader allowBackBtn title={"Proposal"} colors={colors} />
      <View style={styles.body}>
        <ScrollView contentContainerStyle={{ paddingHorizontal: mvs(22) }}>
          <INPUT_FIELD.DatePicker
            onChangeText={(value) => setPayload({ ...payload, time: value })}
            value={payload.time}
          />
          <INPUT_FIELD.ReviewInput
            // containerStyle={{marginTop:mvs(20)}}
            value={payload.payment}
            onChangeText={(t) => setPayload({ ...payload, payment: t })}
            label="Select Payment Method"
            placeholder="Payment method"
          >
            <View style={{ marginTop: mvs(10) }}>
              {/* <CustomPicker
                types={types}
                value={payload.payment}
                onChange={t => setPayload({...payload, payment: t})}
              /> */}
            </View>
          </INPUT_FIELD.ReviewInput>
          <Buttons.ButtonPrimary
            onClick={() => onSubmit()}
            style={{ marginTop: mvs(20) }}
            title={"Submit Request"}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (store) => ({
  home_categories: store.state.home_categories,
  user_info: store.state.user_info,
});

const mapDispatchToProps = {
  postRequest: (user_id, page) => DIVIY_API.postRequest(user_id, page),
};
export default connect(mapStateToProps, mapDispatchToProps)(Proposal);
