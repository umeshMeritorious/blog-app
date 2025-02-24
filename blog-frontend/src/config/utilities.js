import { format, formatDistanceToNow } from "date-fns";
import { store } from "../store/store";
import { toast } from "sonner";

export const convertUTCToIST = (utcDateString) => {
  const date = new Date(utcDateString);
  return date.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
};

export const formatDate = (inputDate) => {
  if (inputDate) {
    const date = new Date(inputDate);

    const formattedDate = format(date, "MMMM dd, yyyy");

    const timeAgo = formatDistanceToNow(date, { addSuffix: true });

    return `${formattedDate} | ${timeAgo}`;
  }
  return null;
};

export const tokenExpiryRedirection = (error) => {
  if (error.status === 403) {
    toast.error("Login timeout, Please login again.");
    store.dispatch({
      type: "LOGOUT",
    });
  }
  return Promise.reject(error);
};
