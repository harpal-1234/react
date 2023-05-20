import instance from "../Instance";
import { AVERTISE_ACTION, DELETE_AVERTISE, GET_AVERTISE, POST_AVERTISE } from "./AdvertiseEndPoints";


export function getAdvertise(currentPage, limit) {
  const data = localStorage.getItem("tokenDetails");
  const myHeaders = {
    Authorization: `Bearer ${data}`,
  };
  return instance.get(GET_AVERTISE + `?page=${currentPage}&limit=${limit}`, {
    headers: myHeaders,
  });
}

export function deleteAdvertise(id) {
  const data = localStorage.getItem("tokenDetails");
  console.log(id)
  const myHeaders = {
    Authorization: `Bearer ${data}`,
  };
  const postData = {
    id: id,
  };
  return instance.delete(
    DELETE_AVERTISE + `?id=${id}`,{
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
  const postData = {id};
  return instance.put(AVERTISE_ACTION ,postData, {
    headers: myHeaders,
  });
}

export function postAdvertise(responseImage, title, category, description) {
  const data = localStorage.getItem("tokenDetails");
  const myHeaders = {
    Authorization: `Bearer ${data}`,
  };
  const postData = {
    profile: responseImage,
    title,
    category,
    description,
  };
  return instance.post(POST_AVERTISE, postData, {
    headers: myHeaders,
  });
}
