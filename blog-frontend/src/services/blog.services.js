import { MODULES } from "../config/constants";
import { http } from "./http";
import { store } from "../store/store";

const tokenized = () => {
  const auth = store.getState().auth;
  http.defaults.headers["Authorization"] = `Bearer ${auth.token}`;
  return http;
};

export const listing = () => {
  return tokenized().get(MODULES.BLOGS.LISTING);
};

export const create = (payload) => {
  return tokenized().post(MODULES.BLOGS.CREATE, payload);
};
