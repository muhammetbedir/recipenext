import { makePostRequest } from "src/services/requestService";

export const login = async (payload) => {
  return await makePostRequest("url", payload);
};
