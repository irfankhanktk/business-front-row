//import liraries
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  Alert,
  TouchableOpacity,
  View,
} from "react-native";
import { Rating } from "react-native-elements";
import { connect } from "react-redux";
import { Arrow, Location } from "../../assets/common-icons";
import { Bg } from "../../assets/images";
import ImagePlaceholder from "../../components/atoms/Placeholder";
import ProfileAction from "../../components/atoms/profile-action";
import Row from "../../components/atoms/row";
import Bold from "../../presentation/typography/bold-text";
import Regular from "../../presentation/typography/regular-text";
import { mvs } from "../../services/metrices";
import styles from "./profile.styles";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import LinearGradient from "react-native-linear-gradient";
import { removeData } from "../../localStorage";
import { deleteToken } from "../../store/api-calls";
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
// create a component
const Profile = (props) => {
  const navigation = useNavigation();
  const [value, setValue] = React.useState(true);
  const [apiData, setapiData] = React.useState(true);
  const delayApi = () => {
    navigation.navigate("Signin");
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={"white"} barStyle="dark-content" />
      <ImageBackground
        source={Bg}
        style={{
          width: "100%",
          height: mvs(152),
        }}
      >
        <Row style={styles.info_view}>
          <ShimmerPlaceholder shimmerStyle={styles.imageView} visible={apiData}>
            <View style={styles.imageView}>
              <ImagePlaceholder uri={Bg} containerStyle={styles.profileImage} />
            </View>
          </ShimmerPlaceholder>

          <View
            style={{
              flex: 1,
              paddingLeft: mvs(15),
              justifyContent: "center",
            }}
          >
            <ShimmerPlaceholder visible={apiData}>
              <Bold label={"Total Al Safeer Car Wash"} size={16} />
            </ShimmerPlaceholder>
            <ShimmerPlaceholder visible={apiData}>
              <Row
                style={{ justifyContent: "flex-start", alignItems: "center" }}
              >
                <Location />

                <Regular
                  label={"Sharjah Al nahada road"}
                  size={16}
                  style={{ marginLeft: 5 }}
                />
              </Row>
            </ShimmerPlaceholder>
            <ShimmerPlaceholder visible={apiData}>
              <Rating
                readonly
                defaultRating={5}
                imageSize={16}
                startingValue={4}
                onFinishRating={(rating) => {
                  // console.log(rating);
                }}
                style={{ marginTop: mvs(6), alignItems: "flex-start" }}
              />
            </ShimmerPlaceholder>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("PersonalDetails")}
          >
            <Text>
              <Arrow />
            </Text>
          </TouchableOpacity>
        </Row>
      </ImageBackground>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.input_container}>
          <ProfileAction
            // value={value}
            // onChange={setValue}
            label={"My Bussines Profile"}
            leftIcon={"Notification"}
            rightIcon={"Arrow"}
            subLabel={"See My Profile"}
            selected={false}
            style={{ borderBottomLeftRadius: 2, borderBottomRightRadius: 2 }}
          />
          <ProfileAction
            value={value}
            onChange={setValue}
            onPress={() => props?.navigation?.navigate("Notifications")}
            label={"Push Notifications"}
            leftIcon={"PushNotify"}
            //rightIcon={'Arrow'}
            subLabel={"Manage All notifications"}
            selected={false}
            style={{
              marginTop: mvs(0),
              borderTopLeftRadius: 1,
              borderTopRightRadius: 1,
              borderWidth: 0.3,
            }}
          />

          <ProfileAction
            label={"Tutorial"}
            leftIcon={"Personal"}
            rightIcon={"Arrow"}
            subLabel={"See tutorial how shehnshah works"}
            selected={false}
            style={{
              borderBottomLeftRadius: 2,
              borderBottomRightRadius: 2,
              borderBottomWidth: 0.3,
            }}
          />
          <ProfileAction
            label={"Security & Privacy"}
            leftIcon={"Security"}
            rightIcon={"Arrow"}
            subLabel={"Passwords & other security settings"}
            selected={false}
            style={{ borderRadius: 2, marginTop: mvs(0), borderWidth: 0.3 }}
          />
          <ProfileAction
            label={"Terms & Conditions"}
            leftIcon={"Tcondition"}
            rightIcon={"Arrow"}
            subLabel={"Read all our terms and conditions"}
            selected={false}
            style={{ borderRadius: 2, marginTop: mvs(0), borderWidth: 0.3 }}
          />
          <ProfileAction
            label={"Support"}
            leftIcon={"PSupport"}
            rightIcon={"Arrow"}
            subLabel={"We will be happy to help"}
            selected={false}
            style={{
              marginTop: mvs(0),
              borderTopLeftRadius: 2,
              borderTopRightRadius: 2,
              borderTopWidth: 0.3,
            }}
          />
          <ProfileAction
            label={"Logout"}
            leftIcon={"Logout"}
            rightIcon={""}
            subLabel={""}
            onPress={() =>
              Alert.alert("Warning", "Are you sure you want to Logout?", [
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel",
                },
                {
                  text: "Logout",
                  onPress: async () => {
                    try {
                      // await deleteToken();
                      removeData("token");
                      delayApi();
                    } catch (error) {
                      console.log("error logout", error);
                    }
                  },
                },
              ])
            }
            labelStyle={{ marginTop: mvs(15) }}
            selected={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
