import { makePostRequest } from "./requestService";

export const follow = async (payload, context) => {
  return await makePostRequest(
    process.env.NEXT_PUBLIC_FOLLOW,
    payload,
    context
  );
};

export const unFollow = async (payload, context) => {
  return await makePostRequest(
    process.env.NEXT_PUBLIC_UNFOLLOW,
    payload,
    context
  );
};
