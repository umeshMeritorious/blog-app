import { Formik, Form } from "formik";
import React from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { postSchema } from "../../config/validationSchema";
import { useSelector } from "react-redux";
import { create } from "../../services/blog.services";
import { toast } from "sonner";
import layout from "../../components/layout";

const Create = () => {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <div className="container m-auto h-[100vh]">
      <div className="grid grid-cols-12 gap-3">
        <div className="col-start-3 col-span-8">
          <div className="my-5 flex items-center">
            <Link
              to={"/posts"}
              className="px-4 py-2 mr-3 bg-gray-800 text-sm rounded-md text-white flex items-center"
            >
              <FiArrowLeft className="text-lg mr-1" />
              BACK
            </Link>
            <h1 className="text-4xl font-black">Create Blog</h1>
          </div>
          <div className="p-10 border border-gray-200 rounded">
            <Formik
              initialValues={{
                title: "",
                content: "",
              }}
              validationSchema={postSchema}
              onSubmit={(values) => {
                values = { ...values, posted_by: auth.user._id };
                create(values)
                  .then((res) => {
                    if (res.status === 201) {
                      toast.success("Successfully Created");
                    }
                  })
                  .then(() => {
                    navigate("/posts");
                  });
              }}
            >
              {(props) => (
                <Form>
                  <div className="flex flex-col relative mb-5">
                    <label htmlFor="title" className="text-gray-900 text-lg">
                      Title <span className="text-red-500 font-bold">*</span>
                    </label>
                    <input
                      name="title"
                      id="title"
                      className="border border-gray-800 p-[10px] h-10 text-sm rounded w-full focus:outline-none"
                      value={props.values.title}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                    {props.errors.title && props.touched.title ? (
                      <span className="text-red-500 text-xs absolute -bottom-4">
                        {props.errors.title}
                      </span>
                    ) : null}
                  </div>
                  <div className="flex flex-col relative mb-5">
                    <label htmlFor="content" className="text-gray-900 text-lg">
                      Content
                      <span className="text-red-500 font-bold">*</span>
                    </label>
                    <textarea
                      name="content"
                      id="content"
                      className="border border-gray-800 p-[10px] text-sm rounded w-full focus:outline-none"
                      value={props.values.content}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      rows={15}
                    />
                    {props.errors.content && props.touched.content ? (
                      <span className="text-red-500 text-xs absolute -bottom-4">
                        {props.errors.content}
                      </span>
                    ) : null}
                  </div>
                  <button className="px-4 w-full py-2 mt-3 bg-blue-800 text-lg rounded-md text-white text-center">
                    SUBMIT
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};
export default layout(Create);
