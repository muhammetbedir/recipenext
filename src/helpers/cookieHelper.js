import { setCookie, getCookie, deleteCookie } from 'cookies-next'

export const GetCookie = (key, context) => {
  return getCookie(key, context)
};

export const SetCookie = (key, value, option = null, context) => {
  var options = {
    ...context,
    ...option
  }
  return setCookie(key, value, options)
};

export const RemoveCookie = (key, context) => {
  return deleteCookie(key, context)
};
