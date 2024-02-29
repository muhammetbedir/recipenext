import BaseService from "src/services/BaseService";

export const createPromise = async (requestParameters) => {
  let promise = new Promise(() => {});
  let service = BaseService();
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

const makeRequest = async (requestParameters) => {
  return createPromise(requestParameters)
    .then((response) => {
      return handleSuccess(response);
    })

    .catch((error) => {
      return handleError(error);
    });
};

const handleSuccess = async (response) => {
  return Promise.resolve(response);
};

const handleError = async (error) => {
  //handle error codes
  return Promise.reject({ error });
};
