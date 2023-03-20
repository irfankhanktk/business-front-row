import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import {
  Bell,
  Booking,
  TabOngoingIcon,
  TotalHeader
} from "../../../assets/common-icons";
import BookingCard from "../../../components/atoms/booking-card";
import PageLoader from "../../../components/atoms/page-loader";
import { getData } from "../../../localStorage";
import Bold from "../../../presentation/typography/bold-text";
import Medium from "../../../presentation/typography/medium-text";
import Regular from "../../../presentation/typography/regular-text";
import alertService from "../../../services/alert.service";
import allColors from "../../../services/colors";
import { mvs } from "../../../services/metrices";
import DIVIY_API from "../../../store/api-calls";
import Row from "./../../../components/atoms/row";
import colors from "./../../../services/colors";
import { Home_Styles as styles } from "./ongoing-styles";
const OngoingTab = (props) => {
  const { get_service_jobs, complete_job, services } = props;
  //const businessId=3333;
  const ser = services?.find(x => x?.selected);

  const [loading, setloading] = useState(true);
  const [isRefresh, setRefresh] = useState(false);
  const [btnLaoding, setbtnLaoding] = useState(false);
  const [businessId, setBussinessId] = useState();
  const [data, setData] = useState([]);
  const [loaders, setLoaders] = React.useState({
    checkin: false,
    assign: false,
    start: false,
    noshow: false,
    checkout: false
  })
  const getOnGoingBooking = async () => {
    try {
      // setloading(true);
      var bId = await getData("BusinessId");
      setBussinessId(bId);
      const response = await get_service_jobs(bId, ser?.id);
      console.log("Jobs Information===>", response?.data);
      // if (response?.data?.length > 0) {
      setData(response?.data);
      // }
    } catch (error) {
      console.log('error=>', error);
    } finally {
      // setloading(false);
    }
  };
  useEffect(() => {
    getOnGoingBooking();
  }, [isRefresh]);
  const complete_booking = async (bookingId) => {
    try {
      setbtnLaoding(true)
      const res = await alertService.confirm(
        "Are you sure you want to check out?",
        "Yes",
        "No"
      );
      if (res) {
        setLoaders({ ...loaders, checkout: id });
        await complete_job(businessId, bookingId);
        await getOnGoingBooking()
      }
    } catch (error) {
      console.log('error=>', error);
    } finally {
      setbtnLaoding(false);
      setLoaders({ ...loaders, checkout: fasle });
    }
  };
  return (
    <SafeAreaView style={styles.conntainer}>
      <Row
        style={{
          paddingHorizontal: mvs(20),
          paddingVertical: mvs(15),
          borderBottomWidth: 0.5,
          borderColor: colors.gray,
        }}
      >
        <Row>
          <TabOngoingIcon />
          <Medium
            size={mvs(16)}
            label={"  Ongoing bookings"}
          />
        </Row>
        <Row style={{ width: mvs(65), alignItems: "center" }}>
          <TouchableOpacity
            style={{
              width: mvs(30),
              height: mvs(30),
              backgroundColor: colors.FBF8F8,
              borderRadius: mvs(15),
            }}
          >
            <View
              style={{
                backgroundColor: colors.tabBackground,
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
          <TotalHeader />
        </Row>
      </Row>
      {loading ?
        <PageLoader />
        :
        !loading && data?.length > 0 ? <FlatList
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: mvs(60),
            paddingTop: mvs(0),
            paddingHorizontal: mvs(7),
            backgroundColor: allColors.tabBackground,
          }}
          data={data}
          renderItem={({ item, index }) => (
            <BookingCard
              checkoutLoading={loaders.checkout === item?.id}
              btnLaoding={btnLaoding}
              key={index}
              loading={!loading}
              item={item}
              showCheckout={true}
              isOngoing
              onCheckout={() => complete_booking(item?.id)}
              {...props}
            />
          )}
        /> :
          <View style={styles.body1}>
            <Booking />
            <Bold label={"No Bookings"} style={styles.welcomeText} />
            <Regular
              label={"Your all ongoing bookings will show here."}
              numberOfLines={2}
              style={styles.welcomeSubText}
            />
          </View>
      }
    </SafeAreaView>
  );
};
const mapStateToProps = (store) => ({
  services: store?.state?.services,
});

const mapDispatchToProps = {
  get_service_jobs: (bussinessId, serviceId) =>
    DIVIY_API.get_service_jobs(bussinessId, serviceId),
  complete_job: (bussinessId, bookingId) =>
    DIVIY_API.complete_job(bussinessId, bookingId),
};
export default connect(mapStateToProps, mapDispatchToProps)(OngoingTab);
