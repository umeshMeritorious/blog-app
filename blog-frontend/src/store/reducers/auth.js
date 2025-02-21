import { AUTH } from "../init";

const auth = (state = AUTH, action) => {
  switch (action.type) {
    case "SET_TOKEN":
      return action.payload;

    case "LOGOUT":
      return AUTH;

    default:
      return state;
  }
};

export { auth };
