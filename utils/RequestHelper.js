import { getAsyncData } from "./Utils";

const getFormData = (obj) => {
  let formdata = new FormData();
  for (let key in obj) {
    formdata.append(key, obj[key]);
  }
  return formdata;
};

const getUserToken = async () => {
  const data = await getAsyncData("@antz_user_token");

  return `Bearer ${data}`;
};

export async function sendPostData(url, obj) {
  const token = await getUserToken();

  let response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: token,
    },
    body: obj == undefined ? null : getFormData(obj),
  });
  // console.log(">>>>>>>>>>>>>>>>>>>>>>>",await response.text());
  // return;
  let data = await response.json();
  if (!response.ok) {
    throw new ValidationError(data.message, data.errors);
  }
  return data;
}

export async function sendGetRequest(url, params = {}) {
  const token = await getUserToken();
  if (Object.keys(params).length != 0) {
    let queryString = new URLSearchParams(params);
    url += "?" + queryString.toString();
  }
  let response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: token
    },
  });
  let data = await response.json();
  if (!response.ok) {
    throw new ValidationError(data.message, data.errors);
  }
  return data;
}

export class ValidationError extends Error {
  constructor(message, errors = {}) {
    super(message);
    this.name = "ValidationError";
    this.errors = errors;
  }
}
