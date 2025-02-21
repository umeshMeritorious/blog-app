import { MODULES } from "../config/constants";
import { http } from "./http";

export const login = async (payload) => {
  try {
    return await http.post(MODULES.AUTH.LOGIN, payload);
  } catch (error) {
    throw error;
  }
};