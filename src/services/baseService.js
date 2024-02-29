import axios from "axios";

const BaseService = () => {
  var user = { token: "sda" }; // TODO cookie den user okunacak
  var token = user ? `Bearer ${JSON.parse(user).token}` : null;

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

  return {
    upload,
    get,
    post,
    put,
  };
};

export default BaseService;
