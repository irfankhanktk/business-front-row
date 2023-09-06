import { CommonActions } from "@react-navigation/native";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, ScrollView, View } from "react-native";
import { connect } from "react-redux";
import Buttons from "../../components/atoms/Button";
import PageLoader from "../../components/atoms/page-loader";
import Row from "../../components/atoms/row";
import { CustomAppHeader } from "../../components/molecules/header/custom-header";
import CouponModal from "../../components/molecules/modals/coupon-modal";
import ScheduleModal from "../../components/molecules/modals/schedule-modal";
import WorkerModal from "../../components/molecules/modals/worker-modal";
import ReviewsRaing from "../../components/molecules/reviews-rating";
import ActionButton from "../../components/review-schedule-items/action-button";
import AlertMessage from "../../components/review-schedule-items/alert-message";
import BillView from "../../components/review-schedule-items/bill-view";
import BussinessCustomer from "../../components/review-schedule-items/bussiness-customer";
import LifeCycleItem from "../../components/review-schedule-items/lifecycle-item";
import NewCouponItem from "../../components/review-schedule-items/new-coupon-item";
import PaymentCard from "../../components/review-schedule-items/payment-card";
import SlotItem from "../../components/review-schedule-items/slot-item";
import WorkerItem from "../../components/service-offering/woker-item";
import { getData } from "../../localStorage";
import Medium from "../../presentation/typography/medium-text";
import Regular from "../../presentation/typography/regular-text";
import colors from "../../services/colors";
import { mvs } from "../../services/metrices";
import DIVIY_API from "../../store/api-calls";
import { Styles as styles } from "./style";
const ReviewSchedule = (props) => {
  const {
    get_booking,
    get_available_slots,
    get_booking_coupons,
    checkin,
    no_show,
    complete_job,
    start,
    assign_worker,
    get_workers,
    update_booking_payment,
    update_slot,
    remove_discount,
    remove_slot,
    apply_coupon,
    apply_discount,
    complete_my_booking,
    get_booking_discounts,
    route,
    navigation,
  } = props;
  const { bookingID, selected } = route.params;
  //const bussinessId=3333;
  const bookingId = bookingID;
  const customerId = selected;
  console.log("Customer id ", customerId);
  const date = moment(new Date()).format("YYYY-MM-DD");
  const [couponPickerVisible, setCouponPickerVisible] = useState(false);
  const [slotVisible, setSlotVisible] = useState(false);
  const [workerVisible, setWorkerVisible] = useState(false);
  const [coupon, setCoupon] = useState(null);
  const [workers, setWorkers] = useState();
  const [coupons, setCoupons] = useState();
  const [slotItem, setSlotItem] = useState();
  const [booking, setBooking] = useState({});
  const [bussinessId, setBussinessId] = useState();
  const [selectedSlot, setSelectedSlot] = useState();
  const [worker, setWorker] = useState(null);
  const [title, setTitle] = useState("Select Coupon");
  const [loaders, setLoaders] = React.useState({
    accept: false,
    change: false,
    find: false,
    remove: false,
    confirm: false,
    removeDiscount: false,
    modalLoading: false,
    discount: false,
    coupon: false,
    changeCoupon: false,
    //life cycle buttons
    complete: false,
    checkin: false,
    started: false,
    noShow: false,
    assignWorker: false,
    getWorker: false,
  });
  const [isRefresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);
  useEffect(() => {
    inIt();
  }, [isRefresh]);
  const inIt = async () => {
    var bId = await getData("BusinessId");
    setBussinessId(bId);
    console.log("Booking id is====> ", bookingId);
    const bookingResponse = await get_booking(bId, bookingId);
    if (bookingResponse?.data) {
      setBooking(bookingResponse?.data);
      setSelectedSlot(bookingResponse?.data?.slot);
      if (bookingResponse?.data?.discount) {
        var c = bookingResponse?.data?.discount;
        c.id = bookingResponse?.data?.discountId;
        setCoupon(c);
      }
      if (bookingResponse?.data?.worker) {
        var w = bookingResponse?.data?.worker;
        w.id = bookingResponse?.data?.workerId;
        setWorker(w);
      }
    }
    setLoading(false);
  };
  const getWorkers = async (bool) => {
    try {
      setLoaders({ ...loaders, assignWorker: true, getWorker: bool });

      const workersReponse = await get_workers(bussinessId, bookingId);
      console.log("Workers information===>", workersReponse?.data);
      if (workersReponse?.data) {
        setWorkers(workersReponse?.data);
        setWorkerVisible(true);
      }
    } catch (error) {
      console.log("error=>", error);
    } finally {
      setLoaders({ ...loaders, assignWorker: false });
    }
  };
  const getSlots = async (date) => {
    try {
      setLoaders({ ...loaders, change: true, find: true, slotChange: true });
      const slotReponse = await get_available_slots(bookingId, date);
      console.log("slotReponse=>", slotReponse);
      if (slotReponse?.data) {
        setSlotItem(slotReponse?.data);
        setSlotVisible(true);
      }
    } catch (error) {
      console.log("error=>", error);
    } finally {
      setLoaders({ ...loaders, change: false, find: false, slotChange: false });
    }
  };
  const getCoupons = async (t, isChange) => {
    try {
      setTitle(t);
      if (t == "Select Coupon") {
        setLoaders({ ...loaders, coupon: !isChange, changeCoupon: isChange });
        const couponReponse = await get_booking_coupons(bookingId, customerId);
        console.log("coupons information===>", couponReponse?.data);
        if (couponReponse?.data) {
          setCoupons(couponReponse?.data);
          setCouponPickerVisible(true);
        }
      } else {
        setLoaders({ ...loaders, discount: !isChange, changeCoupon: isChange });
        const couponReponse = await get_booking_discounts(
          bookingId,
          bussinessId
        );
        console.log("discounts information===>", couponReponse?.data);
        if (couponReponse?.data) {
          setCoupons(couponReponse?.data);
          setCouponPickerVisible(true);
        }
      }
    } catch (error) {
    } finally {
      setLoaders({
        ...loaders,
        coupon: false,
        discount: false,
        changeCoupon: false,
      });
    }
  };
  const checkin_booking = async () => {
    try {
      setLoaders({ ...loaders, checkin: true });
      await checkin(bussinessId, bookingId);
      await inIt();
    } catch (error) {
      console.log("error=>", error);
    } finally {
      setLoaders({ ...loaders, checkin: false });
    }
  };
  const complete_the_booking = async () => {
    try {
      setLoaders({ ...loaders, confirm: true });
      await complete_my_booking(bookingId);
      await inIt();
      props?.navigation?.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            {
              name: "Main",
              params: { initialRouteName: "Booking" },
            },
            { name: "ReviewSchedule", params: { bookingID, selected } },
          ],
        })
      );
      // props?.navigation?.pop(3);
    } catch (error) {
      console.log("error=>", error);
    } finally {
      setLoaders({ ...loaders, confirm: false });
    }
  };
  const complete_booking = async () => {
    try {
      setLoaders({ ...loaders, complete: true });
      await complete_job(bussinessId, bookingId);
      await inIt();
    } catch (error) {
      console.log("error=>", error);
    } finally {
      setLoaders({ ...loaders, complete: false });
    }
  };
  const start_booking = async () => {
    try {
      setLoaders({ ...loaders, started: true });
      await start(bussinessId, bookingId);
      await inIt();
    } catch (error) {
      console.log("error=>", error);
    } finally {
      setLoaders({ ...loaders, started: false });
    }
  };
  const no_show_booking = async () => {
    try {
      setLoaders({ ...loaders, noShow: true });
      await no_show(bussinessId, bookingId);
      await inIt();
    } catch (error) {
      console.log("error=>", error);
    } finally {
      setLoaders({ ...loaders, noShow: false });
    }
  };
  const assign_booking_worker = async (id) => {
    try {
      setLoaders({ ...loaders, modalLoading: true });
      await assign_worker(bussinessId, bookingId, id);
      await inIt();
      setWorkerVisible(false);
    } catch (error) {
      console.log("error=>", error);
    } finally {
      setLoaders({ ...loaders, modalLoading: false });
    }
  };

  const update_payment = async (id) => {
    try {
      setPaymentLoading(id);
      console.log("Update payment id is ", id);
      const payRes = await update_booking_payment(bookingId, id, "reference");
      console.log(payRes?.data);
      await inIt();
      setPaymentLoading(false);
    } catch (error) {
      console.log("error=>", error);
      setPaymentLoading(false);
    }
  };
  const update_booking_slot = async (id) => {
    try {
      setLoaders({
        ...loaders,
        slotChange: true,
        accept: true,
        modalLoading: true,
      });
      await update_slot(bookingId, id);
      await inIt();
      setSlotVisible(false);
    } catch (error) {
    } finally {
      setLoaders({
        ...loaders,
        slotChange: false,
        accept: false,
        modalLoading: false,
      });
    }
  };
  const remove_booking_slot = async () => {
    await remove_slot(bookingId);
    await inIt();
  };
  const remove_booking_discount = async () => {
    try {
      setLoaders({ ...loaders, removeDiscount: true });

      await remove_discount(bookingId, bussinessId);
      console.log("Discount is Removed");
      await inIt();
    } catch (error) {
      console.log("error=>", error);
    } finally {
      setLoaders({ ...loaders, removeDiscount: false });
    }
  };
  const apply_booking_discount = async (value, id) => {
    try {
      setLoaders({ ...loaders, modalLoading: true });
      if (title === "Select Coupon") {
        await apply_coupon(bookingId, id, customerId);
      } else {
        await apply_discount(bookingId, id, customerId);
      }
      await inIt();
      setCouponPickerVisible(false);
    } catch (error) {
      console.log("error=>", error);
    } finally {
      setLoaders({ ...loaders, modalLoading: false });
    }
  };
  const moveTo = async () => {
    if (booking?.view?.message?.completed) {
      navigation?.navigate("Main");
    } else {
      navigation?.goBack();
    }
  };
  return (
    <SafeAreaView style={styles.conntainer}>
      <CustomAppHeader
        title={"Review & Schedule"}
        onBackClick={() => moveTo()}
      />
      <View style={styles.body}>
        {loading ? (
          <PageLoader />
        ) : (
          <>
            <ScrollView
              contentContainerStyle={{
                paddingHorizontal: mvs(20),
                paddingBottom: mvs(20),
              }}
            >
              <BussinessCustomer loading={!loading} item={booking} />
              <SlotItem
                loading={!loading}
                showAccept={selectedSlot?.view?.accept}
                showChange={selectedSlot?.view?.change}
                showFind={selectedSlot?.view?.find}
                noSlot={selectedSlot?.view?.find}
                showRemove={selectedSlot?.view?.remove}
                noMore={selectedSlot?.view?.remove}
                slotText={selectedSlot?.view?.title}
                details={selectedSlot?.view?.message}
                onChangeClick={() => getSlots(selectedSlot?.date)}
                onAcceptClick={() => update_booking_slot(selectedSlot?.id)}
                onFindClick={() => getSlots(date)}
                onRemoveClick={() => remove_booking_slot()}
                loaders={loaders}
              />
              <Row alignItems="center">
                <Medium
                  label={coupon?.view?.caption}
                  color={colors.black}
                  size={16}
                  style={{}}
                />

                {coupon?.view?.applyCoupon || coupon?.view?.applyDiscount ? (
                  <Row alignItems="center">
                    <Regular label={"Apply  "} color={colors.black} size={12} />
                    {coupon?.view?.applyCoupon && (
                      <ActionButton
                        loading={loaders?.coupon}
                        title="Coupon"
                        bgColor={colors.lightGreen1}
                        borderColor={colors.green}
                        titleColor={colors.green}
                        style={{ marginTop: 0, width: mvs(60) }}
                        onClick={() => getCoupons("Select Coupon")}
                      />
                    )}

                    {coupon?.view?.applyDiscount && (
                      <ActionButton
                        loading={loaders?.discount}
                        title="Discount"
                        bgColor={colors.lightGreen1}
                        borderColor={colors.green}
                        titleColor={colors.green}
                        style={{
                          marginTop: 0,
                          marginLeft: mvs(10),
                          width: mvs(60),
                        }}
                        onClick={() => getCoupons("Select Discount")}
                      />
                    )}
                  </Row>
                ) : null}
              </Row>
              <Row style={styles.coupon_row}>
                <NewCouponItem
                  removeLoading={loaders?.removeDiscount}
                  isRemove={coupon?.view?.remove}
                  cover={coupon?.id ? coupon?.cover : null}
                  title={coupon?.title}
                  subTitle={coupon?.subTitle}
                  highlightedText={coupon?.highlight}
                  // statusLine={coupon?.view?.message}
                  statusLine={null}
                  isExpiring={coupon?.view?.remove}
                  showHighLighted={coupon?.view?.change}
                />

                {coupon?.view?.changeCoupon || coupon?.view?.changeDiscount ? (
                  <ActionButton
                    loading={loaders?.changeCoupon}
                    title="Change"
                    bgColor={colors.lightYellow}
                    borderColor={colors.primary}
                    titleColor={colors.primary}
                    onClick={() => getCoupons(title, true)}
                    style={{ marginTop: mvs(0) }}
                  />
                ) : null}
              </Row>
              <Row
                style={{
                  flex: 1,
                  marginTop: mvs(10),
                  alignItems: "center",
                  borderBottomColor: colors.gray,
                  borderBottomWidth: 0.2,
                  paddingBottom: mvs(15),
                }}
              >
                <Regular
                  style={{ flex: 1 }}
                  color={
                    !coupon?.view?.remove
                      ? colors.lightgrey1
                      : coupon?.view?.remove
                      ? colors.red
                      : colors.primary
                  }
                  size={mvs(13)}
                  label={coupon?.view?.message}
                  numberOfLines={2}
                />
                {coupon?.view?.remove ? (
                  <ActionButton
                    loading={loaders?.removeDiscount}
                    title="Remove"
                    bgColor={colors.lightPink1}
                    borderColor={colors.red}
                    titleColor={colors.red}
                    style={{ marginTop: mvs(0), marginLeft: mvs(5) }}
                    onClick={() => remove_booking_discount()}
                  />
                ) : null}
              </Row>
              <Medium
                label={"Payment Method"}
                color={colors.black}
                size={16}
                style={{ marginTop: mvs(15) }}
              />
              <View style={{ alignItems: "center" }}>
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  contentContainerStyle={{ paddingVertical: mvs(12) }}
                  data={booking?.paymentOptions}
                  renderItem={({ item, index }) => (
                    <PaymentCard
                      item={item}
                      loading={paymentLoading}
                      key={index}
                      title={item?.title}
                      icon={item?.icon}
                      borderColor={item?.color}
                      selected={item?.selected}
                      selectable={item?.selectable}
                      onClick={() => {
                        if (item?.selectable) {
                          update_payment(item?.id);
                        }
                      }}
                    />
                  )}
                />
              </View>
              <Regular
                label={booking?.payment?.view?.message}
                color={
                  booking?.payment?.view?.error ? colors.red : colors.lightgrey1
                }
                size={14}
              />

              <BillView
                loading={!loading}
                invoice={booking?.invoice}
                bWidth={worker != null ? 0.3 : 0}
              />
              <View style={styles.div} />
              {booking?.lifecycle?.booked && (
                <>
                  <Medium
                    label={"Booking Lifecycle"}
                    color={colors.black}
                    size={16}
                    style={{ marginTop: mvs(15) }}
                  />
                  {booking?.lifecycle?.booked && (
                    <LifeCycleItem
                      buttonText={"Book"}
                      item={booking?.lifecycle?.booked}
                      onClick={() => console.log("Booked")}
                    />
                  )}
                  {booking?.lifecycle?.cancelled && (
                    <LifeCycleItem
                      buttonText={"Cancel"}
                      item={booking?.lifecycle?.cancelled}
                      onClick={() => console.log("cancelled")}
                    />
                  )}
                  {booking?.lifecycle?.noshow && (
                    <LifeCycleItem
                      loading={loaders?.noShow}
                      buttonText={"No show"}
                      item={booking?.lifecycle?.noshow}
                      onClick={() => no_show_booking()}
                    />
                  )}
                  {booking?.lifecycle?.checkin && (
                    <LifeCycleItem
                      loading={loaders?.checkin}
                      buttonText={"Check in"}
                      item={booking?.lifecycle?.checkin}
                      onClick={() => checkin_booking()}
                    />
                  )}
                  {booking?.lifecycle?.started && (
                    <LifeCycleItem
                      assignWorkerloading={loaders?.assignWorker}
                      loading={loaders?.started}
                      buttonText={"Start"}
                      item={booking?.lifecycle?.started}
                      onClick={() => start_booking()}
                      assignWorker={booking?.lifecycle?.started?.assignWorker}
                      onAssignWorker={() => getWorkers()}
                    />
                  )}
                  {booking?.lifecycle?.completed && (
                    <LifeCycleItem
                      loading={loaders?.complete}
                      buttonText={"Complete"}
                      item={booking?.lifecycle?.completed}
                      onClick={() => complete_booking()}
                    />
                  )}
                </>
              )}
              <View style={styles.div} />
              {worker != null && (
                <Medium
                  label={"Worker"}
                  size={16}
                  style={{ marginVertical: mvs(15) }}
                />
              )}
              {worker != null && (
                <Row alignItems="center">
                  <WorkerItem item={worker} style={{ flex: 1 }} />
                  {booking?.isCheckin ? (
                    <ActionButton
                      title={"Change"}
                      loading={loaders?.getWorker}
                      bgColor={colors.lightGreen1}
                      borderColor={colors.green}
                      titleColor={colors.green}
                      onClick={() => getWorkers(true)}
                      style={{ width: mvs(80) }}
                    />
                  ) : null}
                </Row>
              )}
              {booking?.review && (
                <>
                  <View style={{ ...styles.div, marginTop: mvs(15) }} />
                  <Medium
                    label={"Feedback"}
                    size={16}
                    style={{ marginVertical: mvs(15) }}
                  />
                </>
              )}
              {booking?.review ? (
                <ReviewsRaing
                  picsArray={[{}]}
                  ele={booking?.review}
                  // loading={loading}
                />
              ) : null}
            </ScrollView>

            <View style={styles.bottomView}>
              {booking?.view?.continue ? (
                <Buttons.ButtonPrimary
                  loading={loaders?.confirm}
                  title="Confirm"
                  onClick={() => complete_the_booking()}
                />
              ) : (
                <AlertMessage
                  view={booking?.view}
                  color={booking?.view?.message?.color}
                  title={booking?.view?.message?.message}
                  bgColor={
                    booking?.view?.message?.color == "green"
                      ? colors.lightGreen1
                      : booking?.view?.message?.color == "red"
                      ? colors.lightPink1
                      : booking?.view?.message?.color == "blue"
                      ? colors.lightBlue
                      : booking?.view?.message?.color == "grey"
                      ? colors.lightgrey
                      : null
                  }
                  fillColor={
                    booking?.view?.message?.color == "green"
                      ? colors.green
                      : booking?.view?.message?.color == "red"
                      ? colors.red
                      : booking?.view?.message?.color == "blue"
                      ? colors.blue
                      : booking?.view?.message?.color == "grey"
                      ? colors.lightgrey1
                      : null
                  }
                />
              )}
            </View>
          </>
        )}
        <CouponModal
          modalLoading={loaders?.modalLoading}
          title={title}
          value={coupon}
          visible={couponPickerVisible}
          onBackdropPress={() => setCouponPickerVisible(false)}
          items={coupons}
          setValue={(value) => {
            apply_booking_discount(value, value?.id);
          }}
        />
        <ScheduleModal
          slotItem={slotItem}
          visible={slotVisible}
          value={selectedSlot}
          slotLoading={loaders?.modalLoading || loaders?.slotChange}
          setValue={(item) => {
            // setSelectedSlot(item);
            update_booking_slot(item?.id);
          }}
          updateSlot={() => {
            setSlotVisible(false);
          }}
          onBackdropPress={() => setSlotVisible(false)}
          setDate={(date) => {
            getSlots(moment(date).format("YYYY-MM-DD"));
          }}
        />
        <WorkerModal
          loading={loaders?.modalLoading}
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
    </SafeAreaView>
  );
};

const mapStateToProps = (store) => ({});

const mapDispatchToProps = {
  create_booking: () => DIVIY_API.create_booking(),
  get_booking: (bussinessId, bookingId) =>
    DIVIY_API.get_booking(bookingId, bussinessId),
  get_available_slots: (bookingId, date) =>
    DIVIY_API.get_available_slots(bookingId, date),
  get_booking_coupons: (bookingId, customerId) =>
    DIVIY_API.get_booking_coupons(bookingId, customerId),
  get_booking_discounts: (bookingId, bussinessId) =>
    DIVIY_API.get_booking_discounts(bookingId, bussinessId),
  checkin: (bussinessId, bookingId) =>
    DIVIY_API.checkin(bussinessId, bookingId),
  no_show: (bussinessId, bookingId) =>
    DIVIY_API.no_show(bussinessId, bookingId),
  complete_job: (bussinessId, bookingId) =>
    DIVIY_API.complete_job(bussinessId, bookingId),
  start: (bussinessId, bookingId) => DIVIY_API.start(bussinessId, bookingId),
  get_workers: (bussinessId, bookingId) =>
    DIVIY_API.get_workers(bussinessId, bookingId),
  assign_worker: (bussinessId, bookingId, workerId) =>
    DIVIY_API.assign_worker(bussinessId, bookingId, workerId),
  update_booking_payment: (bookingId, method, reference) =>
    DIVIY_API.update_booking_payment(bookingId, method, reference),
  update_slot: (bookingId, slotId) => DIVIY_API.update_slot(bookingId, slotId),
  remove_slot: (bookingId) => DIVIY_API.remove_slot(bookingId),
  complete_my_booking: (bookingId) => DIVIY_API.complete_booking(bookingId),
  remove_discount: (bookingId, bussinessId) =>
    DIVIY_API.remove_discount(bookingId, bussinessId),
  apply_coupon: (bookingId, couponId, customerId) =>
    DIVIY_API.apply_coupon(bookingId, couponId, customerId),
  apply_discount: (bookingId, discountId, customerId) =>
    DIVIY_API.apply_discount(bookingId, discountId, customerId),
};
export default connect(mapStateToProps, mapDispatchToProps)(ReviewSchedule);
