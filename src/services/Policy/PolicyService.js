import instance from "../Instance";
import { POST_POLICY } from "./PolicyEndPoints";

export function postPolicy(description,type) {
    const data = localStorage.getItem("tokenDetails");
    const myHeaders = {
      Authorization: `Bearer ${data}`,
    };
    const postData = {
      description,
      type,
    };
    return instance.post(POST_POLICY, postData, {
      headers: myHeaders,
    });
  }
  