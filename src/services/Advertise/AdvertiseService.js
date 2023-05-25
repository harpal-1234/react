import instance from "../Instance";
import {
  AVERTISE_ACTION,
  DELETE_AVERTISE,
  GET_AVERTISE,
  POST_AVERTISE,
} from "./AdvertiseEndPoints";

export function getAdvertise(currentPage, limit, search) {
  const data = localStorage.getItem("tokenDetails");
  const myHeaders = {
    Authorization: `Bearer ${data}`,
  };
  return instance.get(
    GET_AVERTISE + `?page=${currentPage}&limit=${limit}&search=${search}`,
    {
      headers: myHeaders,
    }
  );
}

export function deleteAdvertise(id) {
  const data = localStorage.getItem("tokenDetails");
  console.log(id);
  const myHeaders = {
    Authorization: `Bearer ${data}`,
  };
  const postData = {
    id: id,
  };
  return instance.delete(DELETE_AVERTISE + `?id=${id}`, {
    headers: {
      Authorization: `Bearer ${data}`,
    },
  });
}

export function actionAdvertise(id) {
  const data = localStorage.getItem("tokenDetails");
  const myHeaders = {
    Authorization: `Bearer ${data}`,
  };
  const postData = { id };
  return instance.put(AVERTISE_ACTION, postData, {
    headers: myHeaders,
  });
}

export function postAdvertise(responseImage, couponTitle, couponCode, offer) {
  const data = localStorage.getItem("tokenDetails");
  const myHeaders = {
    Authorization: `Bearer ${data}`,
  };
  const postData = {
    image: responseImage,
    couponTitle,
    couponCode,
    offer,
  };
  return instance.post(POST_AVERTISE, postData, {
    headers: myHeaders,
  });
}
