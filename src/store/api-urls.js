export const IP = "http://52.43.78.34";

// export const IP = 'http://124.29.208.60:8080';
// export const IP='http://192.168.100.3:3000';
export const URLS = {
  //    base_url:'http://192.168.100.3:3000/api/',
  base_url: `${IP}/api/`,
  image_url: `${IP}`,
  policy: `${IP}/images/privacy_html_v1.0.html`,
  auth: {
    signup: "users/detail/business/signup",
    get_business_detail: "users/detail/business",
    get_notifications: "/notifications", //users/:id/notifications
    delete_token: "users/detail/customer/logout",
  },
  home_counter: "/apphome",
  users: "users/",
  business: "b/om/businesses/",
  lookup: "client/vehicle/lookup",
  booking: {
    create_booking: "p/public/bookings",
    get_booking: "b/om/businesses/", //attach booking id at end
    get_available_slots: "p/public/bookings/",
    update_slot: "p/public/bookings/",
    remove_slot: "p/public/bookings/",
    get_available_coupons: "c/cus/customers/",
    apply_coupon: "c/cus/customers/",
    remove_discount: "b/om/businesses/",
    apply_discount: "b/om/businesses/",
    update_payment: "p/public/bookings/",
    get_service_bookings: "b/om/businesses/",
    get_service_jobs: "b/om/businesses/",
    complete_booking: "p/public/bookings/",
    get_discounts: "b/om/businesses/",
  },
  lifecycle: {
    no_show: "b/om/businesses/",
    get_workers: "b/om/businesses/",
    assign_worker: "b/om/businesses/",
    checkin: "b/om/businesses/",
    start: "b/om/businesses/",
    complete_job: "b/om/businesses/",
  },
};
