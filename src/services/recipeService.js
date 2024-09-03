import { PageCount } from "@/components/page/PaginationCustom";
import {
  makeGetRequest,
  makePostRequest,
  makePutRequest,
} from "./requestService";

export const getPopularRecipes = async (userId, page, count = PageCount) => {
  return await makeGetRequest(
    process.env.NEXT_PUBLIC_GETPOPULARRECIPEBYPAGE +
      `?UserId=${userId}&page=${page}&count=${count}`
  );
};
export const getWeeklyPopularRecipes = async (
  userId,
  page,
  count = PageCount
) => {
  return await makeGetRequest(
    process.env.NEXT_PUBLIC_GETWEEKLYPOPULARRECIPEBYPAGE +
      `?UserId=${userId}&page=${page}&count=${count}`
  );
};

export const getRecipes = async (userId, page, count = PageCount) => {
  return await makeGetRequest(
    process.env.NEXT_PUBLIC_GETRECIPEBYPAGE +
      `?UserId=${userId}&page=${page}&count=${count}`
  );
};
export const getRecipesByCategoryAndPage = async (
  userId,
  categoryName,
  page,
  count = PageCount
) => {
  return await makeGetRequest(
    process.env.NEXT_PUBLIC_GETRECIPEBYCATEGORYANDPAGE +
      `?UserId=${userId}&page=${page}&count=${count}&name=${categoryName}`
  );
};
export const getRecipeCountByCategoryAndPage = async (
  categoryName,
  context
) => {
  return await makeGetRequest(
    process.env.NEXT_PUBLIC_GETRECIPECOUNTBYCATEGORYANDPAGE +
      `?name=${categoryName}`,
    context
  );
};

export const getLatestRecipes = async (
  userId,
  page,
  count = PageCount,
  context
) => {
  return await makeGetRequest(
    process.env.NEXT_PUBLIC_GETLATESTRECIPEBYPAGE +
      `?UserId=${userId}&page=${page}&count=${count}`
  );
};

export const getRecipeById = async (userId, id) => {
  return await makeGetRequest(
    process.env.NEXT_PUBLIC_GETRECIPEBYID + `?UserId=${userId}&id=${id}`
  );
};

export const getRecipeByUserId = async (profileId, userId) => {
  return await makeGetRequest(
    process.env.NEXT_PUBLIC_GETRECIPEBYUSERID +
      `?profileId=${profileId}&userId=${userId}`
  );
};

export const getBookedRecipeByUserId = async (profileId, userId) => {
  return await makeGetRequest(
    process.env.NEXT_PUBLIC_GETBOOKEDRECIPEBYUSERID +
      `?profileId=${profileId}&userId=${userId}`
  );
};

export const getRecipeCount = async (context) => {
  return await makeGetRequest(process.env.NEXT_PUBLIC_GETRECIPECOUNT, context);
};

export const addRecipe = async (payload) => {
  return await makePostRequest(process.env.NEXT_PUBLIC_ADDRECIPE, payload);
};

export const updateRecipe = async (payload) => {
  return await makePutRequest(process.env.NEXT_PUBLIC_UPDATERECIPE, payload);
};

export const addRecipeTutorialPictures = async (payload) => {
  return await makePostRequest(
    process.env.NEXT_PUBLIC_ADDRECIPETUTORIALPICTURES,
    payload
  );
};

export const searchRecipe = async (query, context) => {
  return await makeGetRequest(
    process.env.NEXT_PUBLIC_SEARCHRECIPE + "?query=" + query,
    context
  );
};
