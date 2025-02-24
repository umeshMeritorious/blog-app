import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { view } from "../../services/blog.services";
import { formatDate } from "../../config/utilities";

const Details = () => {
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
    <div className="container m-auto pt-5">
      <h1 className="text-5xl text-center">{postData?.title}</h1>
      <h1 className="text-1xl text-center text-gray-500">
        <span className="text-gray-700 mr-3 text-2xl">
          {postData?.posted_by?.username}
        </span>
        {formatDate(postData?.createdAt)}
      </h1>
      <div
        className=""
        dangerouslySetInnerHTML={{ __html: postData.content }}
      ></div>
    </div>
  );
};

export default Details;
