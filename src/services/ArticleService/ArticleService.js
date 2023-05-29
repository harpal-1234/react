import instance from "../Instance";
import {
  ARTICLE_ACTION,
  DELETE_ARTICLE,
  GET_ARTICLES,
  POST_ARTICLE,
} from "./ArticleEndPoints";

export function getArticle(currentPage, limit, search,filterType) {
  const data = localStorage.getItem("tokenDetails");
  const myHeaders = {
    Authorization: `Bearer ${data}`,
  };
  return instance.get(
    GET_ARTICLES + `?page=${currentPage}&limit=${limit}&search=${search}&articleType=${filterType}`,
    {
      headers: myHeaders,
    }
  );
}

export function deleteArticle(id) {
  const data = localStorage.getItem("tokenDetails");
  console.log(id);
  const myHeaders = {
    Authorization: `Bearer ${data}`,
  };
  const postData = {
    id: id,
  };
  return instance.delete(DELETE_ARTICLE + `?id=${id}`, {
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
  const postData = { id };
  return instance.put(ARTICLE_ACTION, postData, {
    headers: myHeaders,
  });
}

export function postArticle(responseImage, title, category, description,type,tag) {
  const data = localStorage.getItem("tokenDetails");
  const myHeaders = {
    'Access-Control-Allow-Origin': '*',
    // "Content-Type": "application/x-www-form-urlencoded",
    
    Authorization: `Bearer ${data}`,
  };
  const postData = {
    image: responseImage,
    title,
    category,
    description,
    articleType:type,
    subCategory:tag
  };
  var formdata = new FormData();
formdata.append("title", title);
formdata.append("description", description);
formdata.append("category", category);
formdata.append("image", responseImage);
  return instance.post(POST_ARTICLE, postData, {
    headers: myHeaders,
  }
  ,);
}
