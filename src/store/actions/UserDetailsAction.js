export const SET_CURRENT_USER_ACTION =
  "[set current action] set current action";

export function setCurrentUserAction(currentData) {
  return {
    type: SET_CURRENT_USER_ACTION,
    payload: currentData,
  };
}
