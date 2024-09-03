import { setCookie, getCookie, deleteCookie } from "cookies-next";

export const GetCookie = (key, context) => {
  const cookieValue = getCookie(key, context);
  if (isValidJSON(cookieValue)) {
    return JSON.parse(cookieValue);
  }
  return cookieValue;
};

const isValidJSON = (str) => {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
};

export const SetCookie = (key, value, option = null, context) => {
  var options = {
    ...context,
    ...option,
  };
  return setCookie(key, value, options);
};

export const RemoveCookie = (key, context) => {
  return deleteCookie(key, context);
};
