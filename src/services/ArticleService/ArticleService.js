import instance from "../Instance";
import {
  ARTICLE_ACTION,
  DELETE_ARTICLE,
  GET_ARTICLES,
  POST_ARTICLE,
} from "./ArticleEndPoints";

export function getArticle(currentPage, limit) {
  const data = localStorage.getItem("tokenDetails");
  const myHeaders = {
    Authorization: `Bearer ${data}`,
  };
  return instance.get(GET_ARTICLES + `?page=${currentPage}&limit=${limit}`, {
    headers: myHeaders,
  });
}

export function deleteArticle(id) {
  const data = localStorage.getItem("tokenDetails");
  console.log(id)
  const myHeaders = {
    Authorization: `Bearer ${data}`,
  };
  const postData = {
    id: id,
  };
  return instance.delete(
    DELETE_ARTICLE + `?id=${id}`,{
    headers: {
      Authorization: `Bearer ${data}`,
    },
   
});
}

export function actionArticle(id) {
  const data = localStorage.getItem("tokenDetails");
  const myHeaders = {
    Authorization: `Bearer ${data}`,
  };
  const postData = {id};
  return instance.put(ARTICLE_ACTION ,postData, {
    headers: myHeaders,
  });
}

export function postArticle(responseImage, title, category, description) {
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
  return instance.post(POST_ARTICLE, postData, {
    headers: myHeaders,
  });
}
