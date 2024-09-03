import { Toast } from "@/helpers/responseHandler";
import BaseService from "./baseService";
import { RemoveCookie } from "@/helpers/cookieHelper";

export const createPromise = async (requestParameters) => {
  let promise = new Promise(() => {});
  let service = BaseService(requestParameters?.context);
  switch (requestParameters?.type) {
    case "POST":
      promise = await service.post(
        requestParameters?.url,
        requestParameters?.payload
      );
      break;
    case "GET":
      promise = await service.get(requestParameters?.url);
      break;
    case "PUT":
      promise = service.put(requestParameters?.url, requestParameters?.payload);
      break;
    case "DELETE":
      promise = service.del(requestParameters?.url);
      break;
    default:
      break;
  }

  return promise;
};

export const makeGetRequest = async (
  url,
  context = null,
  showNotifications = true
) => {
  const requestParameters = {
    type: "GET",
    url,
    showNotifications,
    context,
  };

  return await makeRequest(requestParameters);
};

export const makePostRequest = async (
  url,
  payload,
  context = null,
  showNotifications = true
) => {
  const requestParameters = {
    type: "POST",

    url,

    payload,

    showNotifications,

    context,
  };

  return await makeRequest(requestParameters);
};

export const makePutRequest = async (
  url,
  payload,
  context = null,
  showNotifications = true
) => {
  const requestParameters = {
    type: "PUT",

    url,

    payload,

    showNotifications,

    context,
  };

  return await makeRequest(requestParameters);
};

export const makeDeleteRequest = async (
  url,
  context = null,
  showNotifications = true
) => {
  const requestParameters = {
    type: "DELETE",

    url,

    showNotifications,

    context,
  };
  return await makeRequest(requestParameters);
};

const makeRequest = async (requestParameters) => {
  return createPromise(requestParameters)
    .then((response) => {
      return handleSuccess(response);
    })

    .catch((error) => {
      return handleError(error, requestParameters.showNotifications);
    });
};

const handleSuccess = async (response) => {
  return Promise.resolve(response);
};

const handleError = async (error, showNotifications) => {
  //handle error codes
  if (error?.response?.data?.StatusCode === 401) {
    RemoveCookie(process.env.NEXT_PUBLIC_AUTH);
    window.location.reload();
    return Promise.reject({ error });
  }
  showNotifications && Toast.errorToast(error.response?.data?.Message);
  return Promise.reject({ error });
};
