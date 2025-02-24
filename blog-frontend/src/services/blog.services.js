import { MODULES } from "../config/constants";
import { http } from "./http";
import { store } from "../store/store";
import { tokenExpiryRedirection } from "../config/utilities";

const tokenized = () => {
  const auth = store.getState().auth;
  const token = auth?.token;

  if (token) {
    http.defaults.headers = http.defaults.headers || {};
    http.defaults.headers["Authorization"] = `Bearer ${token}`;
  }

  return http;
};

export const listing = async (payload) => {
  try {
    return await tokenized()
      .get(`${MODULES.BLOGS.LISTING}?page=${payload.currentPage}&limit=10`)
      .catch(tokenExpiryRedirection);
  } catch (error) {
    throw error;
  }
};

export const create = async (payload) => {
  try {
    return await tokenized()
      .post(MODULES.BLOGS.CREATE, payload)
      .catch(tokenExpiryRedirection);
  } catch (error) {
    throw error;
  }
};

export const view = async (payload) => {
  try {
    return await tokenized()
      .get(`${MODULES.BLOGS.VIEW}/${payload}`)
      .catch(tokenExpiryRedirection);
  } catch (error) {
    throw error;
  }
};

export const edit = async (id, payload) => {
  try {
    return await tokenized()
      .put(`${MODULES.BLOGS.EDIT}/${id}`, payload)
      .catch(tokenExpiryRedirection);
  } catch (error) {
    throw error;
  }
};

export const remove = async (payload) => {
  try {
    return await tokenized()
      .delete(`${MODULES.BLOGS.DELETE}/${payload}`)
      .catch(tokenExpiryRedirection);
  } catch (error) {
    throw error;
  }
};
