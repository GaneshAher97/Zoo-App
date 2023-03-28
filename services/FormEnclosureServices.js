import Config from "../configs/Config";
import { sendPostData ,sendGetRequest} from "../utils/RequestHelper";

export const AddEnclosure = async (requestObj) => {
    let url = Config.BASE_URL + "/enclosure/create-enclosure";
    return sendPostData(url,requestObj);
};
export const GetEnclosure = async () => {
	let url = Config.BASE_URL + "/enclosures";
	return sendGetRequest(url);
}

export const GetDetailesEnclosure = async ({itemId}) => {
	let url = Config.BASE_URL + "/enclosure/get-enclosure/" + itemId.itemId;
	return sendGetRequest(url, itemId);
}
export const editEnclosure = async (requestObj) => {
    let url = Config.BASE_URL + "enclosure/update-enclosure";
    return sendPostData(url, requestObj);
};