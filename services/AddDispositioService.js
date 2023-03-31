import { sendPostData } from "../utils/RequestHelper";
import Configs from "../configs/Config";

// sendGetRequest

export const addanimalmortality= async(requestObj) =>{
    let url = Configs.BASE_URL + "animal/addanimalmortality"
    return sendPostData(url, requestObj)
  }
                                  