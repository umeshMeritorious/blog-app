import axios from "axios";
import { API_BASE_URL, MODULES } from "../config/constants";
import { store } from "../store/store";
import { tokenExpiryRedirection } from "../config/utilities";

const http = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});

export const checkPulse = () => {
  http.get(MODULES.PULSE_CHECK).catch(tokenExpiryRedirection);
};

export { http };
