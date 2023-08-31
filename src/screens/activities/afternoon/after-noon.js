//import liraries
import { useIsFocused, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { connect } from "react-redux";
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
import styles from "./afternoon-styles";
// create a component

const AfterNoon = (props) => {
  const {
    get_service_bookings,
    checkin,
    assign_worker,
    get_workers,
    no_show,
    start,
  } = props;
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  //const bussinessId = 3333;
  const [bookingId, setBookingId] = useState();
  const [btnLoading, setbtnLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isRefresh, setRefresh] = useState(false);
  const [workerVisible, setWorkerVisible] = useState(false);
  const [workers, setWorkers] = useState();
  const [bussinessId, setBussinessId] = useState();
  const [worker, setWorker] = useState(null);
  const [data, setData] = useState();
  const [loaders, setLoaders] = React.useState({
    checkin: false,
    assign: false,
    start: false,
    noshow: false,
    checkout: false,
  });
  const getOngoingBooking = async () => {
    var bId = await getData("BusinessId");
    setBussinessId(bId);
    // console.log("Booking Id Is ", bId);
    const res = await get_service_bookings(bId, 1);
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
    setbtnLoading(true);
    const workersReponse = await get_workers(bussinessId, id);
    if (workersReponse?.data) {
      setWorkers(workersReponse?.data);
      setWorkerVisible(true);
    }
    setbtnLoading(false);
  };
  // const checkin_booking = async (id) => {
  //   setbtnLoading(true)
  //   const res = await alertService.confirm(
  //     "Are you sure you want to check in?",
  //     "Yes",
  //     "No"
  //   );
  //   if (res) {
  //     await checkin(bussinessId, id);
  //     setRefresh(!isRefresh);
  //   }
  //   setbtnLoading(false)
  // };
  // const start_booking = async (id) => {
  //   setbtnLoading(true)
  //   const res = await alertService.confirm(
  //     "Are you sure you want to Start?",
  //     "Yes",
  //     "No"
  //   );
  //   if (res) {
  //     await start(bussinessId, id);
  //     setRefresh(!isRefresh);
  //   }
  //   setbtnLoading(false)
  // };
  // const no_show_booking = async (id) => {
  //   setbtnLoading(true)
  //   const res = await alertService.confirm(
  //     "Are you sure you want to no show?",
  //     "Yes",
  //     "No"
  //   );
  //   if (res) {
  //     await no_show(bussinessId, id);
  //     setRefresh(!isRefresh);
  //   }
  //   setbtnLoading(false)
  // };
  // const assign_booking_worker = async (id) => {
  //   await assign_worker(bussinessId, bookingId, id);
  //   setWorkerVisible(false);
  //   setRefresh(!isRefresh);
  // };
  useEffect(() => {
    console.log("LOADER=====> ", loaders);
  }, [loaders]);
  const checkin_booking = async (id) => {
    try {
      const res = await alertService.confirm(
        "Are you sure you want to check in?",
        "Yes",
        "No"
      );
      if (res) {
        setLoaders({ ...loaders, checkin: id });
        // setLoaders({ ...loaders, checkin: "asdf" });
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
      const res = await alertService.confirm(
        "Are you sure you want to Start?",
        "Yes",
        "No"
      );
      if (res) {
        setLoaders({ ...loaders, start: id });
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
      const res = await alertService.confirm(
        "Are you sure you want to no show?",
        "Yes",
        "No"
      );
      if (res) {
        setLoaders({ ...loaders, noshow: id });
        await no_show(bussinessId, id);
        await getOngoingBooking();
        // setRefresh(!isRefresh);
      }
    } catch (error) {
    } finally {
      setLoaders({ ...loaders, noshow: false });
    }
  };
  const assign_booking_worker = async (id) => {
    try {
      setLoaders({ ...loaders, assign: true });
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
          {!loading && data?.Afternoon?.bookings?.length > 0 ? (
            <FlatList
              data={data?.Afternoon?.bookings}
              renderItem={({ item, index }) => (
                <BookingCard
                  checkinLoading={loaders.checkin === item?.id}
                  checkoutLoading={loaders.checkout === item?.id}
                  startLoading={loaders.start === item?.id}
                  assignLoading={loaders.assign}
                  noshowLoading={loaders.noshow === item?.id}
                  btnLoading={btnLoading}
                  key={index}
                  loading={true}
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
      )}
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
export default connect(mapStateToProps, mapDispatchToProps)(AfterNoon);
