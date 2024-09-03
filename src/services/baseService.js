import { GetCookie } from "@/helpers/cookieHelper";
import axios from "axios";

const BaseService = (context) => {
  var user =
    context != null
      ? GetCookie(process.env.NEXT_PUBLIC_AUTH, context)
      : GetCookie(process.env.NEXT_PUBLIC_AUTH);
  var token = user ? `Bearer ${user?.token}` : null;
  let axiosService = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASEURL,
    responseType: "json",
    headers: {
      Authorization: token,
    },
  });

  let get = (path) => {
    return axiosService.get(path).then((response) => response.data);
  };

  let put = (path, payload) => {
    return axiosService
      .request({
        method: "PUT",
        url: path,
        responseType: "json",
        data: payload,
      })
      .then((response) => response.data);
  };

  let post = (path, payload) => {
    return axiosService
      .request({
        method: "POST",
        url: path,
        responseType: "json",
        data: payload,
      })
      .then((response) => response.data);
  };

  let del = (path) => {
    return axiosService.request({
      method: "DELETE",
      url: path,
    });
  };

  return {
    get,
    post,
    put,
    del,
  };
};

export default BaseService;
