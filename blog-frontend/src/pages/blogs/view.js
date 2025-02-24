import React, { useEffect, useRef, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import { view } from "../../services/blog.services";
import { convertUTCToIST, formatDate } from "../../config/utilities";
import layout from "../../components/layout";
const View = () => {
  const [postData, setPostData] = useState({});
  const { id } = useParams();
  const hasFetched = useRef(false);

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
          <div
            className="p-10 border border-gray-200 rounded"
            dangerouslySetInnerHTML={{ __html: postData?.content }}
          ></div>
        </div>
      </div>
    </div>
  );
};
export default layout(View);
