import { myState } from "../states/State";
export const myReducer = (state = myState, action) => {
  switch (action.type) {
    case "SetToDos":
      return {
        ...myState,
        toDos: action.list,
      };
    case "SetExpenses":
      return {
        ...myState,
        expenses: action.list,
      };
    case "SetUrls":
      return {
        ...myState,
        urls: action.list,
      };
    case "SetUser":
      return {
        ...myState,
        user: action.user,
      };
    case "SetToken":
      return {
        ...myState,
        token: action.token,
      };
    default:
      return state;
  }
};
