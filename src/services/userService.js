import { makeGetRequest, makePostRequest } from "./requestService";

export const register = async (payload) => {
  return await makePostRequest(process.env.NEXT_PUBLIC_REGISTER, payload);
};

export const loginRequest = async (payload) => {
  return await makePostRequest(process.env.NEXT_PUBLIC_LOGIN, payload);
};

export const getUserRoleByUserId = async (userId) => {
  return await makeGetRequest(
    process.env.NEXT_PUBLIC_GETUSERROLEBYUSERID + "?id=" + userId
  );
};

export const getUserByUserName = async (
  userName,
  userId,
  context,
  notification
) => {
  return await makeGetRequest(
    process.env.NEXT_PUBLIC_GETUSERBYUSERNAME +
      "?userName=" +
      userName +
      "&currentUserId=" +
      userId,
    context,
    notification
  );
};

export const upsertUserProfilePicture = async (payload) => {
  return await makePostRequest(
    process.env.NEXT_PUBLIC_UPSERTUSERPROFILEPICTURE,
    payload
  );
};

export const changeEmail = async (payload) => {
  return await makePostRequest(process.env.NEXT_PUBLIC_CHANGEEMAIL, payload);
};

export const changePassword = async (payload) => {
  return await makePostRequest(process.env.NEXT_PUBLIC_CHANGEPASSWORD, payload);
};

export const changeUserName = async (payload) => {
  return await makePostRequest(process.env.NEXT_PUBLIC_CHANGEUSERNAME, payload);
};

export const changeUserInfo = async (payload) => {
  return await makePostRequest(process.env.NEXT_PUBLIC_CHANGEUSERINFO, payload);
};
