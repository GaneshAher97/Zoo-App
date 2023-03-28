

import Configs from "../configs/Config";



export const mannerOfDeath = async (requestObj) => {
    let url = Configs.BASE_URL + "masters/carcassCondition";
    return sendGetRequest(url, requestObj);
  };



  export const CarcassCondition = async (requestObj) => {
    let url = Configs.BASE_URL + " ";
    return sendGetRequest(url, requestObj);
  };


  export const CarcassDisposition = async (requestObj) => {
    let url = Configs.BASE_URL + " ";
    return sendGetRequest(url, requestObj);
  };