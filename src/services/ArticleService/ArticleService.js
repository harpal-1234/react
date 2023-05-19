import instance from "../Instance";
import { DELETE_ARTICLE, GET_ARTICLES, POST_ARTICLE } from "./ArticleEndPoints";

export function getArticle(currentPage, limit, search) {
 
    const data = localStorage.getItem("tokenDetails");
    const myHeaders = {
      Authorization: `Bearer ${data}`,
    };
    return instance.get(
        GET_ARTICLES ,
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
    return instance.delete(DELETE_ARTICLE + `?userId=${userId}`, {
      headers: myHeaders,
    });
  }
  
  export function blockUser(userId) {
    const data = localStorage.getItem("tokenDetails");
    const myHeaders = {
      Authorization: `Bearer ${data}`,
    };
    return instance.put(ARTICLE_ACTION + `?userId=${userId}`, {
      headers: myHeaders,
    });
  }

  export function postArticle() {
 
    const data = localStorage.getItem("tokenDetails");
    const myHeaders = {
      Authorization: `Bearer ${data}`,
    };
    return instance.post(
        POST_ARTICLE ,
      {
        headers: myHeaders,
      }
    );
  }