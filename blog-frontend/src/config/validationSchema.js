import * as Yup from "yup";

export const login = Yup.object().shape({
  username: Yup.string().required(),
  password: Yup.string().required(),
});

export const postSchema = Yup.object().shape({
  title: Yup.string().required(),
  content: Yup.string().required()
});