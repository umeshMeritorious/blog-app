export const API_BASE_URL = "http://127.0.0.1:8000";

export const MODULES = {
  AUTH: {
    LOGIN: "login",
    USER: "get-user",
  },
  BLOGS: {
    LISTING: "posts",
    CREATE: "post/create",
    EDIT: "post/update",
    VIEW: "post",
    DELETE: "post/delete",
  },
  PULSE_CHECK: "/heartbeat",
};
