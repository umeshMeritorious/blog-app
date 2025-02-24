import React, { useEffect, useRef, useState } from "react";
import { listing } from "../../services/blog.services";
import { formatDate } from "../../config/utilities";
import { Link } from "react-router-dom";
import { GoArrowRight } from "react-icons/go";

const Grid = () => {
  const [data, setData] = useState([]);
  const hasFetched = useRef(false);
  const fetchData = () => {
    listing(data)
      .then((res) => {
        if (res.status === 200) {
          setData(res.data.posts);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    fetchData();
    // eslint-disable-next-line
  }, [data]);

  return (
    <div className="container m-auto h-[100vh]">
      <div className="grid grid-cols-4 gap-7 pt-5">
        {data.length
          ? data.map((post, index) => {
              return (
                <div
                  key={index}
                  className="bg-gray-200 rounded-md p-10 min-h-[250px] relative"
                >
                  <p className="text-sm text-gray-500">
                    {formatDate(post.createdAt)}
                  </p>
                  <h2 className="text-2xl font-bold">{post.title}</h2>
                  <Link
                    to={`/${post._id}`}
                    className="text-md absolute bottom-10 left-10 flex items-center gap-2"
                  >
                    Read more <GoArrowRight className="text-xl font-bold" />
                  </Link>
                </div>
              );
            })
          : "No Post Available"}
      </div>
    </div>
  );
};

export default Grid;
