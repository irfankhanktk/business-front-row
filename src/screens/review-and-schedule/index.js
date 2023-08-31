import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, View } from "react-native";
import { connect } from "react-redux";
import Row from "../../components/atoms/row";
// import ActionButton from "../../components/review-schedule-items/action-button";
import moment from "moment";
import Buttons from "../../components/atoms/Button";
import PageLoader from "../../components/atoms/page-loader";
import { CustomHeader } from "../../components/molecules/header/header-1x";
import CouponModal from "../../components/molecules/modals/coupon-modal";
import ScheduleModal from "../../components/molecules/modals/schedule-modal";
import WorkerModal from "../../components/molecules/modals/worker-modal";
import ActionButton from "../../components/review-schedule-items/action-button";
import AlertMessage from "../../components/review-schedule-items/alert-message";
import BillView from "../../components/review-schedule-items/bill-view";
import BussinessCustomer from "../../components/review-schedule-items/bussiness-customer";
import LifeCycleItem from "../../components/review-schedule-items/lifecycle-item";
import NewCouponItem from "../../components/review-schedule-items/new-coupon-item";
import PaymentCard from "../../components/review-schedule-items/payment-card";
import SlotItem from "../../components/review-schedule-items/slot-item";
import { getData } from "../../localStorage";
import Medium from "../../presentation/typography/medium-text";
import Regular from "../../presentation/typography/regular-text";
import colors from "../../services/colors";
import { mvs } from "../../services/metrices";
import DIVIY_API from "../../store/api-calls";
import { Styles as styles } from "./style";
const ReviewAndSchedule = (props) => {
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
    route,
    complete_booking,
  } = props;
  // const { bookingId, businessId } = route.params;
  const { bookingID, selected } = route.params;
  // const customerId = 3333; //selected;
  const bookingId = bookingID;
  const customerId = selected;
  const date = moment(new Date()).format("YYYY-MM-DD");
  const [couponPickerVisible, setCouponPickerVisible] = useState(false);
  const [slotVisible, setSlotVisible] = useState(false);
  const [workerVisible, setWorkerVisible] = useState(false);
  const [coupon, setCoupon] = useState(null);
  const [workers, setWorkers] = useState();
  const [coupons, setCoupons] = useState();
  const [slotItem, setSlotItem] = useState();
  const [booking, setBooking] = useState();
  const [selectedSlot, setSelectedSlot] = useState();
  const [worker, setWorker] = useState(null);
  const [loaders, setLoaders] = React.useState({
    accept: false,
    change: false,
    find: false,
    remove: false,
    confirm: false,
    removeDiscount: false,
  });
  const [isRefresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);
  useEffect(() => {
    inIt();
    //setSelectedSlot(booking?.slot)
    //setCoupon(booking?.discount)
  }, [isRefresh]);
  const inIt = async () => {
    setLoading(true);
    var bId = await getData("BusinessId");
    setBussinessId(bId);
    console.log("Booking id is====> ", bookingId);
    const bookingResponse = await get_booking(bId, bookingId);
    if (bookingResponse?.data) {
      setBooking(bookingResponse?.data);
      // console.log("Booking information===>", bookingResponse?.data);
      setSelectedSlot(bookingResponse?.data?.slot);
      //setCoupon(bookingResponse?.data?.discount)
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
  const getWorkers = async () => {
    const workersReponse = await get_workers(bussinessId, bookingId);
    console.log("Workers information===>", workersReponse?.data);
    if (workersReponse?.data) {
      setWorkers(workersReponse?.data);
      setWorkerVisible(true);
    }
  };
  const getSlots = async (date) => {
    const slotReponse = await get_available_slots(bookingId, date);
    console.log("slots information===>", slotReponse?.data);
    if (slotReponse?.data) {
      setSlotItem(slotReponse?.data);
      setSlotVisible(true);
    }
  };
  const getCoupons = async (t) => {
    setTitle(t);
    if (t == "Select Coupon") {
      const couponReponse = await get_booking_coupons(bookingId, customerId);
      console.log("coupons information===>", couponReponse?.data);
      if (couponReponse?.data) {
        setCoupons(couponReponse?.data);
        setCouponPickerVisible(true);
      }
    } else {
      const couponReponse = await get_booking_discounts(bookingId, bussinessId);
      console.log("discounts information===>", couponReponse?.data);
      if (couponReponse?.data) {
        setCoupons(couponReponse?.data);
        setCouponPickerVisible(true);
      }
    }
  };
  const checkin_booking = async () => {
    await checkin(bussinessId, bookingId);
    setRefresh(!isRefresh);
  };
  const complete_the_booking = async () => {
    try {
      setConfirmLoading(true);
      await complete_my_booking(bookingId);
      setRefresh(!isRefresh);
    } catch (error) {
    } finally {
      setConfirmLoading(false);
    }
  };
  const on_complete_booking = async () => {
    await complete_job(bussinessId, bookingId);
    setRefresh(!isRefresh);
  };
  const start_booking = async () => {
    await start(bussinessId, bookingId);
    setRefresh(!isRefresh);
  };
  const no_show_booking = async () => {
    await no_show(bussinessId, bookingId);
    setRefresh(!isRefresh);
  };
  const assign_booking_worker = async (id) => {
    await assign_worker(bussinessId, bookingId, id);
    setWorkerVisible(false);
    setRefresh(!isRefresh);
  };
  const update_payment = async (id) => {
    console.log("Update payment id is ", id);
    const payRes = await update_booking_payment(bookingId, id, "reference");
    console.log(payRes?.data);
    setRefresh(!isRefresh);
  };
  const update_booking_slot = async (id) => {
    await update_slot(bookingId, id);
    setSlotVisible(false);
    setRefresh(!isRefresh);
  };
  const remove_booking_slot = async () => {
    await remove_slot(bookingId);
    setRefresh(!isRefresh);
  };
  const remove_booking_discount = async () => {
    await remove_discount(bookingId, bussinessId);
    console.log("Discount is Removed");
    setRefresh(!isRefresh);
  };
  const apply_booking_discount = async (couponId) => {
    await apply_coupon(bookingId, couponId, customerId);
    setRefresh(!isRefresh);
    setCouponPickerVisible(false);
  };
  const moveTo = async () => {
    if (booking?.view?.message?.completed) {
      navigation?.navigate("Main");
    } else {
      navigation?.goBack();
    }
  };
  return (
    <View style={styles.conntainer}>
      <CustomHeader
        colors={colors}
        title={"Review & Schedule"}
        titleStyle={{ color: colors.black }}
        allowBackBtn
        spacebetween
      />
      {loading ? (
        <PageLoader />
      ) : (
        <View style={styles.body}>
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
            <Row style={{ marginBottom: mvs(10), alignItems: "center" }}>
              <Medium
                label={coupon?.view?.caption}
                color={colors.black}
                size={16}
              />
              {coupon?.view?.applyCoupon && (
                <ActionButton
                  style={{ marginTop: 0 }}
                  title="Apply Coupon"
                  onClick={getCoupons}
                  bgColor={colors.lightGreen1}
                  borderColor={colors.green}
                  titleColor={colors.green}
                />
              )}
            </Row>
            <Row style={styles.coupon_row}>
              <NewCouponItem
                loading={!loading}
                cover={coupon?.id ? coupon?.cover : null}
                title={coupon?.title}
                subTitle={coupon?.subTitle}
                highlightedText={coupon?.highlight}
                statusLine={coupon?.view?.message}
                isExpiring={coupon?.view?.remove}
                showHighLighted={coupon?.view?.change}
              />
              <View
                style={{
                  alignSelf:
                    coupon?.view?.remove &&
                    !coupon?.view?.applyCoupon &&
                    !coupon?.view?.applyDiscount &&
                    !coupon?.view?.changeCoupon &&
                    !coupon?.view?.changeDiscount
                      ? "flex-end"
                      : "flex-start",

                  // flex: 1,
                }}
              >
                {coupon?.view?.change ? (
                  <ActionButton
                    loading={loading}
                    title="Change"
                    bgColor={colors.lightYellow}
                    borderColor={colors.primary}
                    titleColor={colors.primary}
                    onClick={() => getCoupons()}
                    style={{ alignSelf: "flex-end" }}
                  />
                ) : null}
                {coupon?.view?.remove ? (
                  <ActionButton
                    loading={loaders?.removeDiscount}
                    title="Remove"
                    bgColor={colors.lightPink1}
                    borderColor={colors.red}
                    titleColor={colors.red}
                    style={{ alignSelf: "flex-end" }}
                    onClick={() => remove_booking_discount()}
                  />
                ) : null}
              </View>
            </Row>

            <Medium
              label={"Payment Method"}
              size={16}
              style={{ marginTop: mvs(15) }}
            />
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
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

            <Regular
              numberOfLines={null}
              label={booking?.payment?.view?.message}
              color={
                booking?.payment?.view?.error ? colors.red : colors.lightgrey1
              }
              size={14}
              style={{ fontStyle: "italic" }}
            />

            <BillView loading={!loading} invoice={booking?.invoice} />
            {booking?.lifecycle?.booked && (
              <Medium
                label={"Booking Lifecycle"}
                color={colors.black}
                size={16}
                style={{
                  paddingTop: mvs(15),
                  borderTopWidth: 0.2,
                  borderColor: colors.lightgrey1,
                }}
              />
            )}
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
                buttonText={"No show"}
                item={booking?.lifecycle?.noshow}
              />
            )}
            {booking?.lifecycle?.checkin && (
              <LifeCycleItem
                buttonText={"Check in"}
                item={booking?.lifecycle?.checkin}
              />
            )}
            {booking?.lifecycle?.started && (
              <LifeCycleItem
                buttonText={"Start"}
                item={booking?.lifecycle?.started}
                assignWorker={false}
              />
            )}
            {booking?.lifecycle?.completed && (
              <LifeCycleItem
                buttonText={"Complete"}
                item={booking?.lifecycle?.completed}
              />
            )}
          </ScrollView>

          <View style={styles.bottomView}>
            {booking?.view?.continue ? (
              <View style={{ height: mvs(70) }}>
                <Buttons.ButtonPrimary
                  loading={loaders?.confirm}
                  title="Confirm"
                  onClick={finish_booking}
                />
              </View>
            ) : (
              <AlertMessage
                view={booking?.view}
                color={booking?.view?.message?.color}
                title={booking?.view?.message?.message}
                loading={false}
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
          <CouponModal
            title={"Select Coupon"}
            value={coupon}
            visible={couponPickerVisible}
            onBackdropPress={() => setCouponPickerVisible(false)}
            items={coupons}
            setValue={(value) => {
              setCoupon(value);
              apply_booking_discount(value?.id);
              setCouponPickerVisible(false);
            }}
          />
          <ScheduleModal
            slotItem={slotItem}
            visible={slotVisible}
            value={selectedSlot}
            setValue={(item) => {
              setSelectedSlot(item);
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
      )}
    </View>
  );
};

const mapStateToProps = (store) => ({});

const mapDispatchToProps = {
  get_booking: (businessId, bookingId) =>
    DIVIY_API.get_booking(bookingId, businessId),
  get_available_slots: (bookingId, date) =>
    DIVIY_API.get_available_slots(bookingId, date),
  get_booking_coupons: (bookingId, customerId) =>
    DIVIY_API.get_booking_coupons(bookingId, customerId),
  checkin: (businessId, bookingId) => DIVIY_API.checkin(businessId, bookingId),
  no_show: (businessId, bookingId) => DIVIY_API.no_show(businessId, bookingId),
  complete_job: (businessId, bookingId) =>
    DIVIY_API.complete_job(businessId, bookingId),
  start: (businessId, bookingId) => DIVIY_API.start(businessId, bookingId),
  get_workers: (businessId, bookingId) =>
    DIVIY_API.get_workers(businessId, bookingId),
  assign_worker: (businessId, bookingId, workerId) =>
    DIVIY_API.assign_worker(businessId, bookingId, workerId),
  update_booking_payment: (bookingId, method, reference) =>
    DIVIY_API.update_booking_payment(bookingId, method, reference),
  update_slot: (bookingId, slotId) => DIVIY_API.update_slot(bookingId, slotId),
  remove_slot: (bookingId) => DIVIY_API.remove_slot(bookingId),
  remove_discount: (bookingId, businessId) =>
    DIVIY_API.remove_discount(bookingId, businessId),
  apply_coupon: (bookingId, couponId, customerId) =>
    DIVIY_API.apply_coupon(bookingId, couponId, customerId),
  complete_booking: (bookingId) => DIVIY_API.complete_booking(bookingId),
};
export default connect(mapStateToProps, mapDispatchToProps)(ReviewAndSchedule);
