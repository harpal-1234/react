import instance from "../Instance";
import {
  GET_NOTIFICATION,
  GET_USERS,
  POST_NOTIFICATION,
  REJECT_NOTIFICATION,
} from "./NotificationEndpoints";

export function getUsers() {
  const data = localStorage.getItem("tokenDetails");
  const myHeaders = {
    Authorization: `Bearer ${data}`,
  };
  return instance.get(GET_USERS, {
    headers: myHeaders,
  });
}

export function pushNotification(title, body, ids) {
  const data = localStorage.getItem("tokenDetails");
  const postData = {
    title,
    description: body,
    sendTo: ids,
  };
  const myHeaders = {
    Authorization: `Bearer ${data}`,
  };
  return instance.post(POST_NOTIFICATION, postData, {
    headers: myHeaders,
  });
}

export function getNotification(currentPage, limit) {
  const data = localStorage.getItem("tokenDetails");
  const myHeaders = {
    Authorization: `Bearer ${data}`,
  };

  return instance.get(GET_NOTIFICATION +`?page=${currentPage}&limit=${limit}`, {
    headers: myHeaders,
  });
}
export function rejectNotification(userId) {
  const data = localStorage.getItem("tokenDetails");
  const postData = {
    userId,
  };
  const myHeaders = {
    Authorization: `Bearer ${data}`,
  };
  return instance.post(REJECT_NOTIFICATION, postData, {
    headers: myHeaders,
  });
}
