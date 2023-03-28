import Configs from "../../configs/Config";
import { sendPostData, sendGetRequest } from "../../utils/RequestHelper";

export const personalDetails = async (requestObj) => {
  let url = Configs.BASE_URL + "/user/adduserpersonaldetails";
  return sendPostData(url, requestObj);
};
export const EditpersonalDetails = async (requestObj) => {
  let url = Configs.BASE_URL + "/user/edituserpersonaldetails";
  return sendPostData(url, requestObj);
};
export const getPersonalDetails = async (requestObj) => {
  let url = Configs.BASE_URL + "user/getuserpersonaldetails";
  return sendGetRequest(url,requestObj);
};

export const addStaff = async (requestObj) => {
  let url = Configs.BASE_URL + "/user/add-stuff";
  return sendPostData(url, requestObj);
};
export const getStaffList = async () => {
  let url = Configs.BASE_URL + "user/get-staff";
  return sendGetRequest(url);
};
export const getStaffDetails = async (id) => {
  let url = Configs.BASE_URL + "user/get-staff-details";
  return sendGetRequest(url,id);
};