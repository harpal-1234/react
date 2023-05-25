import { SET_CURRENT_USER_ACTION } from "../actions/UserDetailsAction";

const initialState = {
  currentData: [],
};

export default function UserDetailsReducer(state = initialState, action) {
  if (action.type === SET_CURRENT_USER_ACTION) {
    return {
      ...state,
      currentData: action.payload,
    };
  }
  return state;
}
