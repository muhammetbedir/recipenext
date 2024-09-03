import { PageCount } from "@/components/page/PaginationCustom";
import {
  makeDeleteRequest,
  makeGetRequest,
  makePostRequest,
} from "./requestService";

export const getRecipeCommentsByPage = async (
  recipeId,
  userId,
  page,
  count = PageCount,
  context
) => {
  return await makeGetRequest(
    process.env.NEXT_PUBLIC_GETRECIPECOMMENTSBYPAGE +
      `?recipeId=${recipeId}&page=${page}&count=${count}&userId=${userId}`,
    context
  );
};
export const getRecipeCommentCount = async (recipeId, context) => {
  return await makeGetRequest(
    process.env.NEXT_PUBLIC_GETRECIPECOMMENTCOUNT + `?recipeId=${recipeId}`,
    context
  );
};

export const getRecipeCommentByUserId = async (userId, context) => {
  return await makeGetRequest(
    process.env.NEXT_PUBLIC_GETRECIPECOMMENTBYUSERID + `?userId=${userId}`,
    context
  );
};

export const addComment = async (payload, context) => {
  return await makePostRequest(
    process.env.NEXT_PUBLIC_ADDCOMMENTTORECIPE,
    payload,
    context
  );
};

export const addSubComment = async (payload, context) => {
  return await makePostRequest(
    process.env.NEXT_PUBLIC_ADDSUBCOMMENTTORECIPE,
    payload,
    context
  );
};

export const likeComment = async (payload, context) => {
  return await makePostRequest(
    process.env.NEXT_PUBLIC_LIKECOMMENT,
    payload,
    context
  );
};

export const removeLikeFromComment = async (payload, context) => {
  return await makePostRequest(
    process.env.NEXT_PUBLIC_REMOVELIKEFROMCOMMENT,
    payload,
    context
  );
};

export const deleteSubCommentById = async (id, context) => {
  return await makeDeleteRequest(
    process.env.NEXT_PUBLIC_DELETESUBCOMMENT + "/" + id,
    context
  );
};

export const deleteCommentById = async (id, context) => {
  return await makeDeleteRequest(
    process.env.NEXT_PUBLIC_DELETECOMMENT + "/" + id,
    context
  );
};
