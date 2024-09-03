import { makeGetRequest } from "./requestService";

export const getCategories = async (context) => {
  return await makeGetRequest(process.env.NEXT_PUBLIC_GETCATEGORIES, context);
};
