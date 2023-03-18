//import liraries
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StatusBar, View } from "react-native";
import { connect } from "react-redux";
import { MyCoupon } from "../../../assets/common-icons";
import BookingCard from "../../../components/atoms/booking-card";
import PageLoader from "../../../components/atoms/page-loader";
import WorkerModal from "../../../components/molecules/modals/worker-modal";
import { getData } from "../../../localStorage";
import Bold from "../../../presentation/typography/bold-text";
import Regular from "../../../presentation/typography/regular-text";
import alertService from "../../../services/alert.service";
import allColors from "../../../services/colors";
import { mvs } from "../../../services/metrices";
import DIVIY_API from "../../../store/api-calls";
import styles from "./evening-styles";
// create a component

const Evening = (props) => {
  const {
    get_service_bookings,
    checkin,
    assign_worker,
    get_workers,
    no_show,
    start,
  } = props;
  const navigation = useNavigation();
  //const bussinessId=3333;
  const [bookingId, setBookingId] = useState();
  const [laoding, setlaoding] = useState(true);
  const [btnLaoding, setbtnLaoding] = useState(false);
  const [isRefresh, setRefresh] = useState(false);
  const [workerVisible, setWorkerVisible] = useState(false);
  const [workers, setWorkers] = useState();
  const [worker, setWorker] = useState(null);
  const [bussinessId, setBussinessId] = useState();
  const [data, setData] = useState();
  const getOngoingBooking = async () => {
    setlaoding(true);
    var bId = await getData("BusinessId");
    setBussinessId(bId);
    const res = await get_service_bookings(bId, 1);
    if (res?.data) {
      setData(res?.data);
    }
    setlaoding(false);
  };
  useEffect(() => {
    getOngoingBooking();
  }, [isRefresh]);
  const getWorkers = async (id) => {
    try {
      setbtnLaoding(true);
      const workersReponse = await get_workers(bussinessId, id);
      console.log("Workers information===>", workersReponse?.data);
      if (workersReponse?.data) {
        setWorkers(workersReponse?.data);
        setWorkerVisible(true);
      }
    } catch (error) {
      console.log('error in get_workers', error);
    } finally {
      setbtnLaoding(false);
    }
  };
  const checkin_booking = async (id) => {
    try {
      setbtnLaoding(true);

      const res = await alertService.confirm(
        "Are you sure you want to check in?",
        "Yes",
        "No"
      );
      if (res) {
        await checkin(bussinessId, id);
        setRefresh(!isRefresh);
      }
    } catch (error) {
      console.log('error in checkin_booking', error);
    } finally {
      setbtnLaoding(false);
    }
  };

  const start_booking = async (id) => {
    try {
      setbtnLaoding(true);

      const res = await alertService.confirm(
        "Are you sure you want to Start?",
        "Yes",
        "No"
      );
      if (res) {
        await start(bussinessId, id);
        setRefresh(!isRefresh);
      }

    } catch (error) {
      console.log('error in start_booking', error);
    } finally {
      setbtnLaoding(false);

    }
  };
  const no_show_booking = async (id) => {
    try {
      setbtnLaoding(true);
      const res = await alertService.confirm(
        "Are you sure you want to no show?",
        "Yes",
        "No"
      );
      if (res) {
        await no_show(bussinessId, id);
        setRefresh(!isRefresh);
      }

    } catch (error) {
      console.log('error in no_show_booking', error);
    } finally {
      setbtnLaoding(false);

    }
  };
  const assign_booking_worker = async (id) => {
    await assign_worker(bussinessId, bookingId, id);
    setWorkerVisible(false);
    setRefresh(!isRefresh);
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={"white"} barStyle="dark-content" />

      <View
        style={{
          flex: 1,
          backgroundColor: allColors.tabBackground,
          paddingHorizontal: mvs(10),
          paddingBottom: mvs(20),
        }}
      >
        {laoding ?
          <PageLoader />
          :
          !laoding && data?.Evening?.bookings?.length > 0 ? (
            <FlatList
              data={data?.Evening?.bookings}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item.index}
              renderItem={({ item, index }) => (
                <BookingCard
                  key={index}
                  loading={!laoding}
                  item={item}
                  onAssignWorker={() => {
                    setBookingId(item?.id);
                    setWorker(item?.worker);
                    getWorkers(item?.id);
                  }}
                  onCheckin={() => checkin_booking(item?.id)}
                  onStart={() => start_booking(item?.id)}
                  onNoShow={() => no_show_booking(item?.id)}
                  {...props}
                />
              )}
            />
          ) : (
            <View style={styles.body}>
              <MyCoupon />
              <Bold label={"No Bookings"} style={styles.welcomeText} />
              <Regular
                label={
                  "Don’t have any active bookings. Your all bookings will show here."
                }
                numberOfLines={2}
                style={styles.welcomeSubText}
              />
            </View>
          )}
      </View>
      <WorkerModal
        items={workers}
        value={worker}
        setValue={(value) => {
          setWorker(value);
          assign_booking_worker(value?.id);
        }}
        visible={workerVisible}
        onBackdropPress={() => setWorkerVisible(false)}
      />
    </SafeAreaView>
  );
};

const mapStateToProps = (store) => ({});

const mapDispatchToProps = {
  get_service_bookings: (bussinessId, serviceId) =>
    DIVIY_API.get_service_bookings(bussinessId, serviceId),
  checkin: (bussinessId, bookingId) =>
    DIVIY_API.checkin(bussinessId, bookingId),
  no_show: (bussinessId, bookingId) =>
    DIVIY_API.no_show(bussinessId, bookingId),
  start: (bussinessId, bookingId) => DIVIY_API.start(bussinessId, bookingId),
  get_workers: (bussinessId, bookingId) =>
    DIVIY_API.get_workers(bussinessId, bookingId),
  assign_worker: (bussinessId, bookingId, workerId) =>
    DIVIY_API.assign_worker(bussinessId, bookingId, workerId),
};
export default connect(mapStateToProps, mapDispatchToProps)(Evening);
