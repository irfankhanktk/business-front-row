import React from "react";
import { ScrollView, SafeAreaView, TouchableOpacity, View } from "react-native";
import * as Progress from "react-native-progress";
import {
  Bell,
  Circle,
  HomeActive,
  TotalHeader,
} from "../../assets/common-icons";
import Buttons from "../../components/atoms/Button";
import Row from "../../components/atoms/row";
import ArrowRow from "../../components/molecules/arrow-row/index";
import HeadingTitle from "../../components/molecules/heading-title/index";
import ReviewsRaing from "../../components/molecules/reviews-rating/index";
import Bold from "../../presentation/typography/bold-text";
import Medium from "../../presentation/typography/medium-text";
import Regular from "../../presentation/typography/regular-text";
import SemiBold from "../../presentation/typography/semibold-text";
import colors from "../../services/colors";
import { mvs, width } from "../../services/metrices";
import { STYLES as styles } from "./style";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";

import LinearGradient from "react-native-linear-gradient";
import DIVIY_API from "../../store/api-calls";
import { connect } from "react-redux";
import ImagePlaceholder from "../../components/atoms/Placeholder";
import SERVICES from "../../services/common-services";
import PickerModal from "../../components/molecules/modals/picker-modal";
import ServicePickerModal from "../../components/molecules/modals/service-picker-modal";
import { ACTIONS } from "../../store/actions";
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
const BusinessProfile = (props) => {
  const { get_services, services, setServices } = props;
  const ser = services?.find((x) => x?.selected);
  const [apiData, setapiData] = React.useState(true);
  const [picker, setPicker] = React.useState(false);
  React.useEffect(() => {
    (async () => {
      try {
        await get_services();
      } catch (error) {}
    })();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Row
        style={{
          marginHorizontal: mvs(20),
          paddingVertical: mvs(15),
          borderBottomWidth: 0.5,
          borderColor: colors.GD8D8D8,
        }}
      >
        <Row>
          <HomeActive />
          <SemiBold size={mvs(16)} label={"  Home"} color={colors.B444251} />
        </Row>

        <Row
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setPicker(true);
            }}
            style={{
              width: mvs(30),
              height: mvs(30),
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: colors.FBF8F8,
              borderRadius: mvs(15),
              overflow: "hidden",
              marginHorizontal: mvs(4),
            }}
          >
            <Row>
              {/* <Regular label={ser?.title} /> */}
              <ImagePlaceholder
                resizeMode={"contain"}
                containerStyle={{
                  width: mvs(15),
                  height: mvs(15),
                  // borderRadius: mvs(30 / 2),
                }}
                uri={{ uri: SERVICES._returnFile(ser?.icon) }}
              />
            </Row>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props?.navigation?.navigate("Notifications")}
            style={{
              width: mvs(30),
              height: mvs(30),
              backgroundColor: colors.FBF8F8,
              borderRadius: mvs(15),
              marginHorizontal: mvs(4),
            }}
          >
            <View
              style={{
                backgroundColor: colors.FF0000,
                width: mvs(8),
                height: mvs(8),
                borderRadius: mvs(4),
                alignSelf: "flex-end",
                position: "absolute",
              }}
            />
            <View
              style={{
                height: "100%",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Bell />
            </View>
          </TouchableOpacity>
          <TotalHeader style={{ marginHorizontal: mvs(4) }} />
        </Row>
      </Row>
      <View style={styles.body}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}
        >
          <View style={{ paddingHorizontal: mvs(20) }}>
            <Row style={{ marginBottom: mvs(15) }}>
              <Medium
                label={"Business Statistics"}
                color={colors.black}
                size={mvs(16)}
              />
              <Circle />
            </Row>
            <Row>
              <View style={styles.PROG_CONTAINER}>
                <ShimmerPlaceholder
                  shimmerStyle={styles.circle_Shimmer}
                  visible={apiData}
                >
                  <Progress.Circle
                    formatText={(n) => n * 20}
                    size={mvs(75)}
                    color={colors.primary}
                    borderWidth={mvs(0)}
                    borderColor={colors.primary}
                    progress={1}
                    showsText
                    textStyle={styles.PROGRESSTEXT}
                  />
                </ShimmerPlaceholder>
                <Medium
                  numberOfLines={2}
                  style={styles.PROG_BOTTOM_TXT}
                  size={mvs(14)}
                  label={"Bookings in process"}
                />
              </View>
              <View style={styles.PROG_CONTAINER}>
                <ShimmerPlaceholder
                  shimmerStyle={styles.circle_Shimmer}
                  visible={apiData}
                >
                  <Progress.Circle
                    formatText={(n) => n * 20}
                    size={mvs(75)}
                    color={colors.B09D8FE}
                    borderWidth={mvs(0)}
                    borderColor={colors.B09D8FE}
                    progress={1}
                    showsText
                    textStyle={styles.PROGRESSTEXT}
                  />
                </ShimmerPlaceholder>
                <Medium
                  numberOfLines={2}
                  style={styles.PROG_BOTTOM_TXT}
                  size={mvs(14)}
                  label={"Bookings in process"}
                />
              </View>
              <View style={styles.PROG_CONTAINER}>
                <ShimmerPlaceholder
                  shimmerStyle={styles.circle_Shimmer}
                  visible={apiData}
                >
                  <Progress.Circle
                    formatText={(n) => n * 20}
                    size={mvs(75)}
                    color={colors.B2181F2}
                    borderWidth={mvs(0)}
                    borderColor={colors.B2181F2}
                    progress={1}
                    showsText
                    textStyle={styles.PROGRESSTEXT}
                  />
                </ShimmerPlaceholder>

                <Medium
                  numberOfLines={2}
                  style={styles.PROG_BOTTOM_TXT}
                  size={mvs(14)}
                  label={"Bookings in process"}
                />
              </View>
              <View style={styles.PROG_CONTAINER}>
                <ShimmerPlaceholder
                  shimmerStyle={styles.circle_Shimmer}
                  visible={apiData}
                >
                  <Progress.Circle
                    formatText={(n) => n * 20}
                    size={mvs(75)}
                    color={colors.G3CB971}
                    borderWidth={mvs(0)}
                    borderColor={colors.G3CB971}
                    progress={1}
                    showsText
                    textStyle={styles.PROGRESSTEXT}
                  />
                </ShimmerPlaceholder>
                <Medium
                  numberOfLines={2}
                  style={styles.PROG_BOTTOM_TXT}
                  size={mvs(14)}
                  label={"Bookings in process"}
                />
              </View>
            </Row>
          </View>
          <HeadingTitle title={"Overview"}>
            <Medium
              label={"Current month"}
              size={mvs(16)}
              color={`${colors.black}23`}
            />
          </HeadingTitle>
          <ShimmerPlaceholder
            shimmerStyle={{ width: "100%", height: 150 }}
            visible={apiData}
          >
            <TouchableOpacity
              onPress={() => props?.navigation?.navigate("MoreDetails")}
              style={{ paddingHorizontal: mvs(20) }}
            >
              <Row>
                <Regular
                  style={{ width: "49%" }}
                  label={"Personal balance"}
                  size={mvs(14)}
                  color={`${colors.black}34`}
                />
                <Regular
                  style={{ width: "49%" }}
                  label={"Earned in January "}
                  size={mvs(14)}
                  color={`${colors.black}34`}
                />
              </Row>
              <Row style={{ marginTop: mvs(3) }}>
                <Bold
                  style={{ width: "49%" }}
                  label={"AED 1,087"}
                  size={mvs(14)}
                  color={`${colors.primary}`}
                />
                <Bold
                  style={{ width: "49%" }}
                  label={"AED 1964"}
                  size={mvs(14)}
                  color={`${colors.black}`}
                />
              </Row>
              <Row style={{ marginTop: mvs(10) }}>
                <Regular
                  style={{ width: "49%" }}
                  label={"Active bookings"}
                  size={mvs(14)}
                  color={`${colors.black}34`}
                />
                <Regular
                  style={{ width: "49%" }}
                  label={"New bookings"}
                  size={mvs(14)}
                  color={`${colors.black}34`}
                />
              </Row>
              <Row style={{ marginTop: mvs(3) }}>
                <SemiBold
                  style={{ width: "49%" }}
                  label={"16"}
                  size={mvs(14)}
                  color={`${colors.black}`}
                >
                  <SemiBold
                    size={mvs(14)}
                    color={`${colors.black}34`}
                    label={" (AED 1,039)"}
                  />
                </SemiBold>
                <SemiBold
                  style={{ width: "49%" }}
                  label={"2"}
                  size={mvs(14)}
                  color={`${colors.black}`}
                >
                  <SemiBold
                    size={mvs(14)}
                    color={`${colors.black}34`}
                    label={" (AED 100)"}
                  />
                </SemiBold>
              </Row>
              <Row style={{ marginTop: mvs(10) }}>
                <Regular
                  style={{ width: "49%" }}
                  label={"Pending clearance"}
                  size={mvs(14)}
                  color={`${colors.black}34`}
                />
                <Regular
                  style={{ width: "49%" }}
                  label={"Cancelled bookings"}
                  size={mvs(14)}
                  color={`${colors.black}34`}
                />
              </Row>
              <Row style={{ marginTop: mvs(3) }}>
                <SemiBold
                  style={{ width: "49%" }}
                  label={"16"}
                  size={mvs(14)}
                  color={`${colors.black}`}
                >
                  <SemiBold
                    size={mvs(14)}
                    color={`${colors.black}34`}
                    label={" (AED 400)"}
                  />
                </SemiBold>
                <SemiBold
                  style={{ width: "49%" }}
                  label={"1"}
                  size={mvs(14)}
                  color={`${colors.black}`}
                >
                  <SemiBold
                    size={mvs(14)}
                    color={`${colors.black}34`}
                    label={" (AED 50)"}
                  />
                </SemiBold>
              </Row>
            </TouchableOpacity>
          </ShimmerPlaceholder>
          <HeadingTitle title={"To-Dos"} />
          <View style={{ paddingHorizontal: mvs(20) }}>
            <Buttons.ButtonButton
              title="Upcoming bookings"
              subTitle={
                "Check out upcoming booking and be ready to get things done."
              }
            />
            <Buttons.ButtonButton
              title="Delayed bookings"
              subTitle={"Check out delayed work and complete it fast."}
            />
            <Buttons.ButtonButton
              containerStyle={{ borderBottomWidth: 0 }}
              title="New bookings"
              style={{ backgroundColor: `${colors.FE0922}10` }}
              textStyle={{ color: colors.FE0922 }}
              subTitle={"Check out new booking and ready to get things done."}
            />
          </View>
          <HeadingTitle title="My services">
            <Medium
              label={"Last 7 days"}
              size={mvs(14)}
              color={`${colors.B323232}23`}
            />
          </HeadingTitle>
          <View style={{ paddingHorizontal: mvs(20) }}>
            <ShimmerPlaceholder
              shimmerStyle={styles.my_Services}
              visible={apiData}
            >
              <ArrowRow title={"Impressions"} value={"5K"} />
            </ShimmerPlaceholder>
            <ShimmerPlaceholder
              shimmerStyle={styles.my_Services}
              visible={apiData}
            >
              <ArrowRow title={"Clicks"} value={"5K"} />
            </ShimmerPlaceholder>
            <ShimmerPlaceholder
              shimmerStyle={styles.my_Services}
              visible={apiData}
            >
              <ArrowRow title={"Views"} value={"5K"} isDown />
            </ShimmerPlaceholder>
            <ShimmerPlaceholder
              shimmerStyle={{ width: "100%", height: 30 }}
              visible={apiData}
            >
              <ArrowRow
                style={{ borderBottomWidth: 0 }}
                title={"Conversion rate"}
                value={"0.2%"}
              />
            </ShimmerPlaceholder>
          </View>
          <HeadingTitle title="Recent Reviews">
            <Medium
              label={"Last 7 days"}
              size={mvs(14)}
              color={`${colors.B323232}23`}
            />
          </HeadingTitle>
          <ShimmerPlaceholder
            shimmerStyle={{ height: 170, width: "100%" }}
            visible={apiData}
          >
            <ReviewsRaing style={{ marginTop: 0 }} bg={colors.GD8D8D8} />
          </ShimmerPlaceholder>
        </ScrollView>
      </View>
      <ServicePickerModal
        onChangeService={(newServices) => {
          setServices(newServices);
          setPicker(false);
        }}
        setVisible={() => setPicker(false)}
        items={services}
        visible={picker}
      />
    </SafeAreaView>
  );
};

const mapStateToProps = (store) => ({
  services: store?.state?.services,
});

const mapDispatchToProps = {
  get_services: (bussinessId) => DIVIY_API.get_services(bussinessId),
  setServices: (services) => ACTIONS.setServices(services),
};
export default connect(mapStateToProps, mapDispatchToProps)(BusinessProfile);
