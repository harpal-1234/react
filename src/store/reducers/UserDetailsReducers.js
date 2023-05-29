import { SET_CURRENT_ARTICLE_ACTION } from "../actions/ArticleDetailsAction";


const initialState = {
  currentData: [],
};

export default function UserDetailsReducer(state = initialState, action) {
  if (action.type === SET_CURRENT_ARTICLE_ACTION) {
    return {
      ...state,
      currentData: action.payload,
    };
  }
  return state;
}
