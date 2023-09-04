import SERVICES from "../services/common-services";

const postData = async (url, data) => {
  console.log("Url is ", url);
  console.log("data:", data);
  const response = await client.post(url, data);
  return response;
};
const putData = async (url, data) => {
  const response = await client.put(url, data);
  return response;
};
const putDataWithoutBody = async (url) => {
  const response = await client.put(url);
  return response;
};
const deleteData = async (url) => {
  console.log("Url is ", url);
  const response = await client.delete(url);
  return response;
};
const deleteDataWithBody = async (url, payload) => {
  const response = await client.delete(url, { data: payload });
  return response;
};
const postFormData = async (url, data) => {
  data = SERVICES.getFormData(data);
  // console.log('data', data);
  const response = await client.post(url, data);
  return response;
};
const getData = async (url) => {
  console.log("url is ==>", url);
  const response = await client.get(url);
  return response;
};
const API_REQUESTS = {
  postData,
  postFormData,
  getData,
  putData,
  deleteData,
  deleteDataWithBody,
  putDataWithoutBody,
};

export default API_REQUESTS;
