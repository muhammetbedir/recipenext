import { makeDeleteRequest, makePostRequest } from "./requestService";

export const addRecipeToBook = async (payload, context) => {
  return await makePostRequest(
    process.env.NEXT_PUBLIC_ADDRECIPETOBOOK,
    payload,
    context
  );
};

export const deleteRecipeFromBook = async (id, context) => {
  return await makeDeleteRequest(
    process.env.NEXT_PUBLIC_DELETERECIPEFROMBOOK + "/" + id,
    context
  );
};
