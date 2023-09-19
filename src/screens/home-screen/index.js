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
import DIVIY_API, { getHomedData } from "../../store/api-calls";
import { connect } from "react-redux";
import ImagePlaceholder from "../../components/atoms/Placeholder";
import SERVICES from "../../services/common-services";
import PickerModal from "../../components/molecules/modals/picker-modal";
import ServicePickerModal from "../../components/molecules/modals/service-picker-modal";
import { ACTIONS } from "../../store/actions";
import { getData } from "../../localStorage";
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
const BusinessProfile = (props) => {
  const { get_services, services, setServices } = props;
  const ser = services?.find((x) => x?.selected);
  const [apiData, setapiData] = React.useState(true);
  const [picker, setPicker] = React.useState(false);
  const [data, setData] = React.useState({});
  React.useEffect(() => {
    (async () => {
      try {
        await get_services();
      } catch (error) {}
    })();
  }, []);
  React.useEffect(() => {
    (async () => {
      try {
        var bId = await getData("BusinessId");
        const res = await getHomedData(bId);
        console.log("res::data:", res?.data);
        setData(res?.data);
      } catch (error) {
        console.log("error:::", error);
      }
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
                    formatText={(p) => `${data?.header?.inprogress || 0}%`}
                    size={mvs(75)}
                    color={colors.primary}
                    borderWidth={mvs(1)}
                    borderColor={colors.gray}
                    progress={data?.header?.inprogress || 0 / 100}
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
                    size={mvs(75)}
                    color={colors.B09D8FE}
                    borderWidth={mvs(1)}
                    borderColor={colors.gray}
                    formatText={(p) => `${data?.header?.booked || 0}%`}
                    progress={data?.header?.booked || 0 / 100}
                    showsText
                    textStyle={styles.PROGRESSTEXT}
                  />
                </ShimmerPlaceholder>
                <Medium
                  numberOfLines={2}
                  style={styles.PROG_BOTTOM_TXT}
                  size={mvs(14)}
                  label={"Booked"}
                />
              </View>
              <View style={styles.PROG_CONTAINER}>
                <ShimmerPlaceholder
                  shimmerStyle={styles.circle_Shimmer}
                  visible={apiData}
                >
                  <Progress.Circle
                    size={mvs(75)}
                    color={colors.B2181F2}
                    borderWidth={mvs(1)}
                    borderColor={colors.gray}
                    formatText={(p) => `${data?.header?.completed || 0}%`}
                    progress={data?.header?.completed || 0 / 100}
                    showsText
                    textStyle={styles.PROGRESSTEXT}
                  />
                </ShimmerPlaceholder>

                <Medium
                  numberOfLines={2}
                  style={styles.PROG_BOTTOM_TXT}
                  size={mvs(14)}
                  label={"Completed"}
                />
              </View>
              <View style={styles.PROG_CONTAINER}>
                <ShimmerPlaceholder
                  shimmerStyle={styles.circle_Shimmer}
                  visible={apiData}
                >
                  <Progress.Circle
                    size={mvs(75)}
                    color={colors.G3CB971}
                    borderWidth={mvs(1)}
                    borderColor={colors.gray}
                    formatText={(p) => `${data?.header?.checkedin || 0}%`}
                    progress={data?.header?.checkedin || 0 / 100}
                    showsText
                    textStyle={styles.PROGRESSTEXT}
                  />
                </ShimmerPlaceholder>
                <Medium
                  numberOfLines={2}
                  style={styles.PROG_BOTTOM_TXT}
                  size={mvs(14)}
                  label={"checkedin"}
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
                  label={`Earned in ${data?.overview?.lastMonth} `}
                  size={mvs(14)}
                  color={`${colors.black}34`}
                />
              </Row>
              <Row style={{ marginTop: mvs(3) }}>
                <Bold
                  style={{ width: "49%" }}
                  label={`AED ${data?.overview?.balance || 0}`}
                  size={mvs(14)}
                  color={`${colors.primary}`}
                />
                <Bold
                  style={{ width: "49%" }}
                  label={`AED ${data?.overview?.lastEarning || 0}`}
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
                  label={data?.overview?.active?.count || 0}
                  size={mvs(14)}
                  color={`${colors.black}`}
                >
                  <SemiBold
                    size={mvs(14)}
                    color={`${colors.black}34`}
                    label={` (AED ${data?.overview?.active?.value || 0})`}
                  />
                </SemiBold>
                <SemiBold
                  style={{ width: "49%" }}
                  label={data?.overview?.new?.count || 0}
                  size={mvs(14)}
                  color={`${colors.black}`}
                >
                  <SemiBold
                    size={mvs(14)}
                    color={`${colors.black}34`}
                    label={` (AED ${data?.overview?.new?.value || 0})`}
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
                  label={data?.overview?.noshow?.count || 0}
                  size={mvs(14)}
                  color={`${colors.black}`}
                >
                  <SemiBold
                    size={mvs(14)}
                    color={`${colors.black}34`}
                    label={` (AED ${data?.overview?.noshow?.value || 0})`}
                  />
                </SemiBold>
                <SemiBold
                  style={{ width: "49%" }}
                  label={data?.overview?.cancelled?.count || 0}
                  size={mvs(14)}
                  color={`${colors.black}`}
                >
                  <SemiBold
                    size={mvs(14)}
                    color={`${colors.black}34`}
                    label={` (AED ${data?.overview?.cancelled?.value || 0})`}
                  />
                </SemiBold>
              </Row>
            </TouchableOpacity>
          </ShimmerPlaceholder>
          <HeadingTitle title={"To-Dos"} />
          <View style={{ paddingHorizontal: mvs(20) }}>
            <Buttons.ButtonButton
              count={data?.todo?.upcoming || "1"}
              title="Upcoming bookings"
              subTitle={
                "Check out upcoming booking and be ready to get things done."
              }
            />
            <Buttons.ButtonButton
              count={data?.todo?.delayed || "1"}
              title="Delayed bookings"
              subTitle={"Check out delayed work and complete it fast."}
            />
            <Buttons.ButtonButton
              count={data?.todo?.lateArrival || "1"}
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
              <ArrowRow
                title={"Impressions"}
                value={`${data?.myServices?.walkin || 0}K`}
              />
            </ShimmerPlaceholder>
            <ShimmerPlaceholder
              shimmerStyle={styles.my_Services}
              visible={apiData}
            >
              <ArrowRow
                title={"Clicks"}
                value={`${data?.myServices?.online || 0}K`}
              />
            </ShimmerPlaceholder>
            <ShimmerPlaceholder
              shimmerStyle={styles.my_Services}
              visible={apiData}
            >
              <ArrowRow
                title={"Views"}
                value={`${data?.myServices?.frontBot || 0}K`}
                isDown
              />
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
          <ScrollView
            contentContainerStyle={{ paddingHorizontal: mvs(15) }}
            showsHorizontalScrollIndicator={false}
            horizontal
          >
            {data?.reviews?.map((item, index) => (
              <ReviewsRaing
                key={index}
                style={{ marginTop: 0 }}
                bg={colors.GD8D8D8}
              />
            ))}
          </ScrollView>
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
