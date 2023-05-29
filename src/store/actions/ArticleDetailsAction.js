export const SET_CURRENT_ARTICLE_ACTION =
  "[set current action] set current action";

export function setCurrentArticleAction(currentData) {
  return {
    type: SET_CURRENT_ARTICLE_ACTION,
    payload: currentData,
  };
}