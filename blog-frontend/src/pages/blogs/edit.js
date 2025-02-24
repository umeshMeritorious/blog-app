import React, { useEffect, useRef, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { edit, view } from "../../services/blog.services";
import { formatDate } from "../../config/utilities";
import { Form, Formik } from "formik";
import { postSchema } from "../../config/validationSchema";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import layout from "../../components/layout";
const Edit = () => {
  const [postData, setPostData] = useState({});
  const { id } = useParams();
  const hasFetched = useRef(false);

  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    if (id) {
      view(id).then((res) => {
        if (res.status === 200) {
          setPostData(res.data);
        }
      });
    }
  }, []);

  return (
    <div className="container m-auto h-[100vh]">
      <div className="grid grid-cols-12 gap-3">
        <div className="col-start-3 col-span-8">
          <div className="my-5">
            <Link
              to={"/posts"}
              className="px-4 py-2 mb-4 bg-gray-600 text-xs rounded-md text-white flex items-center w-fit"
            >
              <FiArrowLeft className="text-sm mr-1" />
              BACK
            </Link>
            <div className="flex flex-col">
              <h1 className="text-4xl font-black">{postData?.title}</h1>
              <h3 className="text-sm text-gray-400 font-bold">
                {formatDate(postData?.createdAt)}
              </h3>
            </div>
          </div>
          <Formik
            initialValues={postData}
            enableReinitialize="true"
            validationSchema={postSchema}
            onSubmit={(values) => {
              edit(id, values)
                .then((res) => {
                  if (res.status === 200) {
                    toast.success(res.data.message);
                    navigate("/posts");
                  }
                })
                .catch((error) => {
                  toast.error(error.data.messagae);
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
                  UPDATE
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
export default layout(Edit);
