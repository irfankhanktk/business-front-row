import { SET_SERVICES } from "./action-types";
import API_REQUESTS from "./api-requests";
import { URLS } from "./api-urls";

const get_booking = (bookingId, businessId) => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.getData(
        `${URLS.booking.get_booking}${businessId}/bookings/${bookingId}/byBusiness`
      );
      return response;
    } catch (error) {
      console.log(error?.response?.data);
    }
  };
};
const get_available_slots = (bookingId, date) => {
  const payLoad = { date: date }
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.postData(
        `${URLS.booking.get_available_slots}${bookingId}/slots`,
        payLoad
      );
      return response;
    } catch (error) {
      console.log(error?.response?.data);
    }
  };
};
const update_slot = (bookingId, slotId) => {
  var slotData = { "slotId": slotId }
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.putData(
        `${URLS.booking.update_slot}${bookingId}/slot`,
        slotData
      );
      return response;
    } catch (error) {
      console.log(error?.response?.data);
    }
  };
};
const remove_slot = (bookingId) => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.deleteData(
        `${URLS.booking.remove_slot}${bookingId}/slot`);
      return response;
    } catch (error) {
      console.log(error?.response?.data);
    }
  };
};
const get_booking_coupons = (bookingId, customerId) => {

  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.getData(
        `${URLS.booking.get_available_coupons}${customerId}/bookings/${bookingId}/coupons`);
      return response;
    } catch (error) {
      console.log(error?.response?.data);
    }
  };
};
const get_booking_discounts = (bookingId, businessId) => {

  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.getData(
        `${URLS.booking.get_discounts}${businessId}/bookings/${bookingId}/discounts`);
      return response;
    } catch (error) {
      console.log(error?.response?.data);
    }
  };
};
const apply_coupon = (bookingId, couponId, customerId) => {

  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.putDataWithoutBody(
        `${URLS.booking.apply_coupon}${customerId}/bookings/${bookingId}/coupon/${couponId}`);
      return response;
    } catch (error) {
      console.log(error?.response?.data);
    }
  };
};
const remove_discount = (bookingId, businessId) => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.deleteData(
        `${URLS.booking.remove_discount}${businessId}/bookings/${bookingId}/discount`);
      return response;
    } catch (error) {
      console.log(error?.response?.data);
    }
  };
};
const update_booking_payment = (bookingId, paymentMethod, reference) => {
  var paymentData = {
    "method": paymentMethod,
    "reference": reference
  }
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.putData(
        `${URLS.booking.update_payment}${bookingId}/payment`,
        paymentData
      );
      return response;
    } catch (error) {
      console.log(error?.response?.data);
    }
  };
};
const no_show = (businessId, bookingId) => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.putDataWithoutBody(
        `${URLS.lifecycle.no_show}${businessId}/bookings/${bookingId}/noshow`);
      return response;
    } catch (error) {
      console.log(error?.response?.data);
    }
  };
};
const get_workers = (businessId, bookingId) => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.getData(
        `${URLS.lifecycle.get_workers}${businessId}/bookings/${bookingId}/workers`);
      return response;
    } catch (error) {
      console.log(error?.response?.data);
    }
  };
};
const assign_worker = (businessId, bookingId, workerId) => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.putDataWithoutBody(
        `${URLS.lifecycle.assign_worker}${businessId}/bookings/${bookingId}/worker/${workerId}`);
      return response;
    } catch (error) {
      console.log(error?.response?.data);
    }
  };
};
const checkin = (businessId, bookingId) => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.putDataWithoutBody(
        `${URLS.lifecycle.checkin}${businessId}/bookings/${bookingId}/checkin`);
      return response;
    } catch (error) {
      console.log(error?.response?.data);
    }
  };
};
const start = (businessId, bookingId) => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.putDataWithoutBody(
        `${URLS.lifecycle.start}${businessId}/bookings/${bookingId}/start`);
      return response;
    } catch (error) {
      console.log(error?.response?.data);
    }
  };
};
const complete_job = (businessId, bookingId) => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.putDataWithoutBody(
        `${URLS.lifecycle.complete_job}${businessId}/bookings/${bookingId}/completeJob`);
      console.log('response=>>', response);
      return response;
    } catch (error) {
      console.log(error?.response?.data);
    }
  };
};
const complete_booking = (bookingId) => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.putDataWithoutBody(
        `${URLS.booking.complete_booking}${bookingId}/complete`);
      return response;
    } catch (error) {
      console.log(error?.response?.data);
    }
  };
};
const create_booking = () => {
  const payLoad = JSON.stringify({
    "customerId": 3333,
    "offeringId": 3334
  })
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.postData(
        `${URLS.booking.create_booking}`,
        payLoad
      );
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  };
};
const get_service_bookings = (businessId, serviceId) => {

  return async (dispatch, getState) => {
    try {
      const find = getState()?.state?.services?.find(x => x?.selected);
      if (!find) {
        throw "seervice id not found"
      }
      console.log('find', find);
      const response = await API_REQUESTS.getData(
        `${URLS.booking.get_service_bookings}${businessId}/services/${find?.id}/bookings`);
      return response;
    } catch (error) {
      console.log(error?.response?.data);
    }
  };
};
const get_services = (businessId = 1) => {

  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.getData(
        `${URLS.business}${businessId}/services`);
      console.log('business services =>', response?.data);
      if (response?.data?.length) {
        dispatch({
          type: SET_SERVICES,
          payload: response?.data?.map((x, index) => ({ ...x, selected: index === 0 }))
        })
      }
    } catch (error) {
      console.log(error?.response?.data);
    }
  };
};
const get_service_jobs = (businessId, serviceId) => {

  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.getData(
        `${URLS.booking.get_service_jobs}${businessId}/services/${serviceId}/jobs`);
      return response;
    } catch (error) {
      console.log(error?.response?.data);
    }
  };
};
const DIVIY_API = {
  get_booking,
  get_available_slots,
  update_slot,
  remove_slot,
  get_booking_coupons,
  apply_coupon,
  remove_discount,
  update_booking_payment,
  no_show,
  get_workers,
  assign_worker,
  checkin,
  start,
  complete_job,
  create_booking,
  get_service_bookings,
  get_services,
  get_service_jobs,
  complete_booking,
  get_booking_discounts
};

export default DIVIY_API;
