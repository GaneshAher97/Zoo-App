import Configs from "../../configs/Config";
import { sendGetRequest } from "../../utils/RequestHelper";

export const getEducationType = async (requestObj) => {
  let url = Configs.BASE_URL + "/masters/educationtypes";
  return sendGetRequest(url, requestObj);
};

export const getSection = async () => {
  let url = Configs.BASE_URL + "/zoos/getsections";
  return sendGetRequest(url);
};

export const getDepartments = async () => {
  let url = Configs.BASE_URL + "/masters/departments";
  return sendGetRequest(url);
};

export const getDesignation = async () => {
  let url = Configs.BASE_URL + "/masters/designations";
  return sendGetRequest(url);
};