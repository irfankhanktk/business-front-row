import moment from "moment";
import { Alert, PermissionsAndroid, Platform, Share, } from "react-native";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

import { IP, URLS } from "../store/api-urls";
const createShareLink = refId => {
  let shareLink = '';
  try {
    shareLink = `${IP}/${refId}`;
  } catch (err) { }
  return shareLink;
};
// import Geocoder from "react-native-geocoding";
// import Geolocation from "react-native-geolocation-service";
// import GetLocation from "react-native-get-location";
// import SERVICES from "../api/SERVICES";

// const hasPermissionIOS = async () => {
//   const status = await Geolocation.requestAuthorization("whenInUse");

//   if (status === "granted") {
//     return true;
//   }

//   if (status === "denied") {
//     Alert.alert("Permission denied");
//   }

//   if (status === "disabled") {
//     Alert.alert("Permission disabled");
//   }

//   return false;
// };
const SERVICES = {
  getFormData: (object) => {
    const formData = new FormData();
    Object.keys(object).forEach((key) => formData.append(key, object[key]));
    return formData;
  },
  _returnError: error => {
    if (error?.response?.request) {
      let { _response } = error?.response?.request;
      console.log(_response);
      return JSON.parse(_response)?.message
        ? JSON.parse(_response)?.message.toString()
        : error.message?.toString();
    } else {
      if (error === 'Hi Dude') {
        return 'Dismiss';
      } else if (error?.message) {
        if (error?.message === 'Network Error') {
          return 'Network Error';
        } else {
          return error?.message?.toString();
        }
      } else {
        return error?.toString();
      }
    }
  },
  _capitalizeFirst: (str) => (str.charAt(0).toUpperCase() + str.slice(1)),
  _returnStringify: (data) => JSON.stringify(data),

  _share: async (description = '', url) => {
    try {
      console.log('url::', url);
      const result = await Share.share({
        // message:description?description:url,
        // url: url,
        message: description, // + ' ' + createText(description),
        url: url,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      // console.log(error.message);
    }
  },
  // _get_current_location: async () => {
  //   try {
  //     const location = await GetLocation.getCurrentPosition({
  //       enableHighAccuracy: true,
  //       timeout: 3000,
  //     });
  //     return {
  //       latitude: location?.latitude,
  //       latitudeDelta: 0.015,
  //       longitude: location?.longitude,
  //       longitudeDelta: 0.0121,
  //     };
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // },

  // _returnAddress: (addressObject) => {
  //   let returnAddress = {
  //     street_number: null,
  //     street_address: null,
  //     fulladdress: addressObject.results[0].formatted_address,
  //     geoCode: {
  //       ...addressObject.results[0]?.geometry?.location,
  //     },
  //     place_id: addressObject.results[0]?.place_id,
  //   };
  //   addressObject.results?.forEach((element) => {
  //     element?.address_components?.forEach((item) => {
  //       if (item.types.some((el) => el === "administrative_area_level_1")) {
  //         returnAddress = { ...returnAddress, province: item.long_name };
  //       } else if (item.types.some((el) => el === "administrative_area_level_2")) {
  //         returnAddress = { ...returnAddress, district: item.long_name };
  //       } else if (item.types.some((el) => el === "administrative_area_level_3")) {
  //         returnAddress = { ...returnAddress, tehsil: item.long_name };
  //       } else if (item.types.some((el) => el === "locality")) {
  //         returnAddress = { ...returnAddress, city: item.long_name };
  //       } else if (item.types.some((el) => el === "sublocality")) {
  //         returnAddress = { ...returnAddress, area: item.long_name };
  //       } else if (item.types.some((el) => el === "street_address")) {
  //         returnAddress = {
  //           ...returnAddress,
  //           street_address: item.long_name || null,
  //         };
  //       } else if (item.types.some((el) => el === "street_number")) {
  //         returnAddress = {
  //           ...returnAddress,
  //           street_number: item.long_name || null,
  //         };
  //       } else if (item.types.some((el) => el === "country")) {
  //         returnAddress = { ...returnAddress, country: item.long_name || null, country_short_name: item?.short_name };
  //       }
  //     });
  //   });
  //   return returnAddress;
  // },
  // _requestLocationPermission: async () => {
  //   try {
  //     if (Platform.OS === "ios") {
  //       const hasPermission = await hasPermissionIOS();
  //       return hasPermission;
  //     }
  //     if (Platform.OS === "android" && Platform.Version < 23) {
  //       return true;
  //     }

  //     const hasPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);

  //     if (hasPermission) {
  //       return true;
  //     }

  //     const status = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);

  //     if (status === PermissionsAndroid.RESULTS.GRANTED) {
  //       return true;
  //     }

  //     if (status === PermissionsAndroid.RESULTS.DENIED) {
  //       ToastAndroid.show("Permission denied", ToastAndroid.LONG);
  //     } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
  //       ToastAndroid.show("Permission disabled", ToastAndroid.LONG);
  //     }
  //     return false;
  //   } catch (err) {
  //     console.warn(err);
  //     return false;
  //   }
  // },
  serialize: (obj) => {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    return str.join("&");
  },
  _removeEmptyKeys: (payload) => {
    const obj = payload;
    Object.keys(obj).forEach((key) => {
      if (obj[key] === "") {
        delete obj[key];
      }
    });
    return obj;
  },
  _returnFile: (uri) => `${URLS.image_url}${uri}`,
  _returnImageCamera: async () => {
    try {
      const res = await launchCamera({ mediaType: 'photo', includeBase64: false });
      if (res?.didCancel) {
        throw 'user canceled the action';
      }
      else if (res?.assets) {
        return {
          uri: Platform.OS === "android" ? res.assets[0].uri : res.assets[0].uri.replace("file://", ""),
          name: res.assets[0].fileName,
          type: res.assets[0].type,
        }
      } else {
        throw 'unknown error';
      }
    } catch (error) {
      throw new Error(error);
    }

  },
  _returnImageGallery: async () => {
    try {
      const res = await launchImageLibrary({ mediaType: 'photo', includeBase64: false });
      if (res?.didCancel) {
        // throw 'user canceled the action';
        console.log('user canceled the action');
      }
      else if (res?.assets) {
        return {
          uri: Platform.OS === "android" ? res?.assets[0].uri : res?.assets[0].uri.replace("file://", ""),
          name: res?.assets[0].fileName,
          type: res?.assets[0].type,
        }
      } else {
        throw 'unknown error';
      }
    } catch (error) {
      throw new Error(error);
    }
  },
  findOnlineUser: (users = {}, user_id) => {
    console.log('usersssss:::', users);
    return Object.keys(users)?.find((key, index) =>
      users[key]?.user_id === user_id
    );
  }
};

export default SERVICES;
