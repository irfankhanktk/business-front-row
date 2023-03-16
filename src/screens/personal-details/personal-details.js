import { useNavigation, useTheme } from "@react-navigation/native";
import React, { useState, useRef } from "react";
import { ScrollView, SafeAreaView, View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import { CustomHeader } from "../../components/molecules/header/header-1x";
import Buttons from "../../components/atoms/Button";
import { INPUT_FIELD } from "../../components/atoms/Input";
import Bold from "../../presentation/typography/bold-text";
import Regular from "../../presentation/typography/regular-text";
import allColors from "../../services/colors";
import { mvs } from "../../services/metrices";
import DIVIY_API from "../../store/api-calls";
import { BlackCamera } from "../../assets/common-icons";
import { Personal_Details_Styles as styles } from "./personal-details-styles";
import ImagePlaceholder from "../../components/atoms/Placeholder";
import PhoneInput from "react-native-phone-input";
import { Tick } from "../../assets/common-icons";
import Row from "../../components/atoms/row";
import colors from "../../services/colors";
import SERVICES from "./../../services/common-services";
const PersonalDetails = (props) => {
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(false);
  const [phoneNumber, setphoneNumber] = useState("12015550123");
  const phoneInput = useRef(null);
  const [payload, setPayload] = React.useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    image: "",
  });

  const onSigin = async () => { };

  return (
    <SafeAreaView
      style={{ ...styles.container, backgroundColor: colors.background }}
    >
      <CustomHeader
        colors={colors}
        title="Personal Details"
        allowBackBtn
        spacebetween
      />

      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: mvs(16) }}
      >
        <View style={styles.body}>
          <Row>
            <View style={styles.imageView}>
              <ImagePlaceholder
                uri={payload?.image?.uri ? { uri: SERVICES._returnFile(payload?.image?.uri) } : null}
                isUser={true}
                containerStyle={styles.profileImage}
              />
              <TouchableOpacity
                style={styles.cameraStyle}
                onPress={async () => {
                  try {
                    const res = await SERVICES._returnImageGallery();
                    setPayload({ ...payload, image: res });
                  } catch (error) {
                    // console.log('error:', error);
                  }
                }}
              >
                <BlackCamera />
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, paddingLeft: mvs(16) }}>
              <Bold label={"Change profile image"} style={styles.welcomeText} />
              <Regular
                label={"Please upload an image to be"}
                style={styles.welcomeSubText}
              />
              <Regular
                label={"recognizable by others"}
                style={styles.welcomeSubText}
              />
            </View>
          </Row>
          <View style={styles.input_container}>
            <INPUT_FIELD.InputSecondary
              rightIcon={false}
              leftIcon="User"
              value={payload.name}
              onChangeText={(t) => setPayload({ ...payload, name: t })}
              label="FULL NAME"
              placeholder="John Doe"
            />

            <INPUT_FIELD.InputSecondary
              value={payload.email}
              leftIcon="User"
              rightIcon="Tick"
              onChangeText={(t) => setPayload({ ...payload, email: t })}
              label="EMAIL"
              placeholder="lehieuds@gmail.com"
            />
          </View>
          <Bold label={"MOBILE"} style={{ marginTop: mvs(5) }}>
            <Regular label={" NUMBER"} />
          </Bold>
          <View style={{ ...styles.phoneNumberView, marginTop: mvs(10) }}>
            <PhoneInput
              ref={phoneInput}
              initialCountry={"us"}
              initialValue="13178675309"
              style={styles.phoneContainer}
              textStyle={styles.textInput}
              onChangePhoneNumber={(text) => {
                setphoneNumber(text);
              }}
            />
            <Tick style={{}} />
          </View>
          <Buttons.ButtonPrimary
            disabled={loading}
            loading={loading}
            onClick={onSigin}
            textStyle={{ ...styles.buttonText, color: colors.white }}
            style={{ ...styles.button }}
            title={"Save Changes"}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = (store) => ({
  // home_posts: store.state.home_posts,
});

const mapDispatchToProps = {
  signin: (payload) => DIVIY_API.signin(payload),
};
export default connect(mapStateToProps, mapDispatchToProps)(PersonalDetails);
