import Configs from "../configs/Config";
import { sendGetRequest } from "../utils/RequestHelper";

export const mannerOfDeath = async (requestObj) => {
  let url = Configs.BASE_URL + "masters/mannerofDeath";
  return sendGetRequest(url, requestObj);
};

export const carcassCondition = async (requestObj) => {
  let url = Configs.BASE_URL + "masters/carcassCondition";
  return sendGetRequest(url, requestObj);
};


export const carcassDisposition = async (requestObj) => {
  let url = Configs.BASE_URL + "masters/carcassDisposition";
  return sendGetRequest(url, requestObj);
};