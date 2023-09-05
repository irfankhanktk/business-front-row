import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StatusBar, View, Text } from "react-native";
import { connect } from "react-redux";
import { Booking } from "../../../assets/common-icons";
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
import styles from "./booking-styles";
import { useIsFocused } from "@react-navigation/native";
// createa component
const Morning = (props) => {
  const {
    get_service_bookings,
    checkin,
    assign_worker,
    get_workers,
    no_show,
    start,
  } = props;
  //const bussinessId=3333;
  const [bookingId, setBookingId] = useState();
  const [btnLoading, setbtnLoading] = useState(true);
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(true);
  const [isRefresh, setRefresh] = useState(false);
  const [workerVisible, setWorkerVisible] = useState(false);
  const [workers, setWorkers] = useState();
  const [worker, setWorker] = useState(null);
  const [bussinessId, setBussinessId] = useState();
  const [data, setData] = useState();
  const [loaders, setLoaders] = React.useState({
    checkin: false,
    assign: false,
    start: false,
    noshow: false,
    checkout: false,
  });
  const getOngoingBooking = async () => {
    // setLoading(true);
    var bId = await getData("BusinessId");
    setBussinessId(bId);
    // console.log("Booking Id Is ", bId);
    const res = await get_service_bookings(bId, 1);
    // console.log("Bookings Response ===> ", res?.data);
    if (res?.data) {
      setData(res?.data);
    }
    setLoading(false);
  };
  useEffect(() => {
    if (isFocused) {
      getOngoingBooking();
    }
  }, [isRefresh, isFocused]);
  const getWorkers = async (id) => {
    try {
      setbtnLoading(true);
      setLoaders({ ...loaders, assign: id });
      const workersReponse = await get_workers(bussinessId, id);
      if (workersReponse?.data) {
        setWorkers(workersReponse?.data);
        setWorkerVisible(true);
      }
    } catch (error) {
      console.log("error:::", error);
    } finally {
      setbtnLoading(false);
      setLoaders({ ...loaders, assign: false });
    }
  };
  const checkin_booking = async (id) => {
    try {
      setLoaders({ ...loaders, checkin: id });
      const res = await alertService.confirm(
        "Are you sure you want to check in?",
        "Yes",
        "No"
      );
      if (res) {
        await checkin(bussinessId, id);
        await getOngoingBooking();
        // setRefresh(!isRefresh);
      }
    } catch (error) {
    } finally {
      setLoaders({ ...loaders, checkin: false });
    }
  };

  const start_booking = async (id) => {
    try {
      setLoaders({ ...loaders, start: id });
      const res = await alertService.confirm(
        "Are you sure you want to Start?",
        "Yes",
        "No"
      );
      if (res) {
        await start(bussinessId, id);
        await getOngoingBooking();
      }
    } catch (error) {
    } finally {
      setLoaders({ ...loaders, start: false });
    }
  };
  const no_show_booking = async (id) => {
    try {
      setLoaders({ ...loaders, noshow: id });
      const res = await alertService.confirm(
        "Are you sure you want to no show?",
        "Yes",
        "No"
      );
      if (res) {
        await no_show(bussinessId, id);
        // setRefresh(!isRefresh);
        await getOngoingBooking();
      }
    } catch (error) {
    } finally {
      setLoaders({ ...loaders, noshow: false });
    }
  };
  const assign_booking_worker = async (id) => {
    try {
      setLoaders({ ...loaders, assign: id });
      await assign_worker(bussinessId, bookingId, id);
      await getOngoingBooking();
      setWorkerVisible(false);
    } catch (error) {
    } finally {
      setLoaders({ ...loaders, assign: false });
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <PageLoader />
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: allColors.tabBackground,
            paddingHorizontal: mvs(10),
            paddingBottom: mvs(20),
          }}
        >
          {/* {data?.Morning?.bookings?.length > 0 ? ( */}
          {!loading & (data?.Morning?.bookings?.length > 0) ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={data?.Morning?.bookings}
              renderItem={({ item, index }) => (
                <BookingCard
                  checkinLoading={loaders.checkin === item?.id}
                  checkoutLoading={loaders.checkout === item?.id}
                  startLoading={loaders.start === item?.id}
                  assignLoading={loaders.assign === item?.id}
                  noshowLoading={loaders.noshow === item?.id}
                  btnLaoding={false}
                  key={index}
                  // loading={!loading}
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
              <Booking />
              <Bold label={"No Bookings"} style={styles.welcomeText} />
              <Regular
                label={
                  "Wait for the booking. Your all bookings will show here."
                }
                numberOfLines={2}
                style={styles.welcomeSubText}
              />
            </View>
          )}
        </View>
      )}
      <WorkerModal
        loading={loaders.assign}
        items={workers}
        value={worker}
        setValue={(value) => {
          setWorker(value);
          assign_booking_worker(value?.id);
        }}
        visible={workerVisible}
        onBackdropPress={() => setWorkerVisible(false)}
      />
    </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(Morning);
