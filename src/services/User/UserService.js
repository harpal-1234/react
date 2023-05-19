import instance from "../Instance";
import { BLOCK_USERS, DELETE_USERS, GET_USERS, GET_USER_DETAILS, VERIFY_USER_DETAILS } from "./UserApiEndPoints";
;

export function getAllUsers(currentPage, limit, search) {
  console.log(search, " search");
  const data = localStorage.getItem("tokenDetails");
  const myHeaders = {
    Authorization: `Bearer ${data}`,
  };
  return instance.get(
    GET_USERS ,
    {
      headers: myHeaders,
    }
  );
}

export function deleteUser(userId) {
  const data = localStorage.getItem("tokenDetails");
  const myHeaders = {
    Authorization: `Bearer ${data}`,
  };
  return instance.delete(DELETE_USERS + `?userId=${userId}`, {
    headers: myHeaders,
  });
}

export function blockUser(userId) {
  const data = localStorage.getItem("tokenDetails");
  const myHeaders = {
    Authorization: `Bearer ${data}`,
  };
  return instance.put(BLOCK_USERS + `?userId=${userId}`, {
    headers: myHeaders,
  });
}


//user details

export function getOneUser(userId) {

  const data = localStorage.getItem("token");
  const myHeaders = {
    Authorization: `Bearer ${data}`,
  };
  return instance.get(GET_USER_DETAILS + `?userId=${userId}`, {
    headers: myHeaders,
  });
}


export function verifyUserDetails(userId, type,response) {
  const postData = {
    userId,
    type,
    response,
    
  };
  const data = localStorage.getItem("token");
  const myHeaders = {
    Authorization: `Bearer ${data}`,
  };
  return instance.post(VERIFY_USER_DETAILS, postData, {
    headers: myHeaders,
  });
}