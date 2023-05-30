import instance from "../Instance";
import {
  APPROVE_USER_DETAILS,
  BLOCK_USERS,
  DELETE_USERS,
  GET_USERS,
  GET_USER_DETAILS,
  POST_USER_DETAILS,
  VERIFY_USER_DETAILS,
} from "./UserApiEndPoints";
export function getAllUsers(currentPage, limit, search) {
  // console.log(search, " search");
  const data = localStorage.getItem("tokenDetails");
  const myHeaders = {
    Authorization: `Bearer ${data}`,
  };
  return instance.get(
    GET_USERS + `?page=${currentPage}&limit=${limit}&search=${search}`,
    {
      headers: myHeaders,
    }
  );
}

export function deleteUser(id) {
  const data = localStorage.getItem("tokenDetails");

  return instance.delete(DELETE_USERS + `?id=${id}`, {
    headers: {
      Authorization: `Bearer ${data}`,
    },
    // data: { id },
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
export function postUser(
  responseImage,
  fname,
  lname,
  email,
  dob,
  phNumber,
  typeOfTrainerSelected,
  locationSelected,
  servicesSelected,
  years,
  clients,
  noOfCertificate,
  fitnessCertificate,
  password,
  countryCode
) {
  const postData = {
    profile: responseImage,
    fName: fname,
    lName: lname,
    email,
    dob,
    phone: phNumber,
    typeOfTrainer: typeOfTrainerSelected,
    trainningLocation: locationSelected,
    services: servicesSelected,
    years,
    clients,
    noOfCertificate: noOfCertificate,
    fitnessCertificate: fitnessCertificate,
    password,
    countryCode,
  };
  const data = localStorage.getItem("tokenDetails");
  const myHeaders = {
    Authorization: `Bearer ${data}`,
  };

  return instance.post(POST_USER_DETAILS, postData, {
    headers: myHeaders,
  });
}
