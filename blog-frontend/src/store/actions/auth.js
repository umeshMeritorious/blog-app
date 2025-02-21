import { toast } from "sonner";
import { login } from "../../services/auth.services";

export const userLogin = (payload) => async (dispatch) => {
  try {
    const response = await login(payload);
    if (response.status === 200) {
      return dispatch({
        type: "SET_TOKEN",
        payload: response.data,
      });
    }
  } catch (error) {
    if (error.response) {
      toast.error(error.response.data.message);
    }
  }
};
