// getAnimal function Created  by Ganesh 
// Date:- 31 March 2023

import Configs from "../configs/Config";
import { sendGetRequest, sendPostData } from "../utils/RequestHelper";

export const getAnimal = async (requestObj) => {
  let url = Configs.BASE_URL + "animals";
  return sendGetRequest(url, requestObj);
};