import axios from "axios";
import { API_BASE_URL } from "../config/constants";

const http = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});

export { http };
