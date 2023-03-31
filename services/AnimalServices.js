
import Configs from "../configs/Config";
import { sendGetRequest, sendPostData } from "../utils/RequestHelper";

// import { sendPostData, sendGetRequest } from "../utils/RequestHelper";

// export const idproof = async (requestObj) => {
//   let url = Configs.BASE_URL + "masters/clientidproof";
//   return sendPostData(url, requestObj);
// };



export const getIdProof = async (requestObj) => {

  let url = Configs.BASE_URL + "/api/animals" + requestObj.itemId;

  return sendPostData(url, requestObj);
};