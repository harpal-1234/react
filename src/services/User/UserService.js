import instance from "../Instance";
import {
  APPROVE_USER_DETAILS,
  BLOCK_USERS,
  DELETE_USERS,
  GET_USERS,
  GET_USER_DETAILS,
  VERIFY_USER_DETAILS,
} from "./UserApiEndPoints";
export function getAllUsers(currentPage, limit, search) {
  // console.log(search, " search");
  const data = localStorage.getItem("tokenDetails");
  const myHeaders = {
    Authorization: `Bearer ${data}`,
  };
  return instance.get(GET_USERS + `?page=${currentPage}&limit=${limit}&search=${search}`, {
    headers: myHeaders,
  });
}

export function deleteUser(id) {
  const data = localStorage.getItem("tokenDetails");

  return instance.delete(DELETE_USERS, {
    headers: {
      Authorization: `Bearer ${data}`,
    },
    data: { id },
  });
}

export function blockUser(id) {
  const data = localStorage.getItem("tokenDetails");
  const myHeaders = {
    Authorization: `Bearer ${data}`,
  };
  const postData = { id };
  return instance.put(BLOCK_USERS, postData, {
    headers: myHeaders,
  });
}

//user details

// export function getOneUser(userId) {
//   const data = localStorage.getItem("token");
//   const myHeaders = {
//     Authorization: `Bearer ${data}`,
//   };
//   return instance.get(GET_USER_DETAILS + `?userId=${userId}`, {
//     headers: myHeaders,
//   });
// }

export function approveUser(userId) {
  const postData = {
    userId,
    
  };
  const data = localStorage.getItem("tokenDetails");
  const myHeaders = {
    Authorization: `Bearer ${data}`,
  };
  return instance.post(APPROVE_USER_DETAILS, postData, {
    headers: myHeaders,
  });
}
