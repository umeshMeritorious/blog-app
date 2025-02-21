import React, { useEffect, useState } from "react";
import { listing } from "../../services/blog.services";
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import layout from "../../components/layout";

const Listing = () => {
  const [data, setData] = useState({
    currentPage: 1,
    totalPages: 0,
    totalPosts: 0,
    posts: [],
  });

  useEffect(() => {
    const controller = new AbortController();
    listing().then((res) => {
      if (res.status === 200) {
        setData(res.data);
      }
    });
    return () => controller.abort();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container m-auto h-[100vh]">
      <div className="grid grid-cols-12 gap-3">
        <div className="col-start-2 col-span-10">
          <div className="my-5 flex justify-between items-center">
            <h1 className="text-4xl font-black">Blogs</h1>
            <Link
              to={"/post/create"}
              className="px-5 py-2 bg-btn-primary rounded-md text-white flex items-center"
            >
              <FiPlus className="text-lg" />
              Create
            </Link>
          </div>
          <div className="p-5 border border-gray-200 rounded overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-300">
                  <th className="px-6 py-3 text-left text-gray-600 font-semibold">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-gray-600 font-semibold">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-gray-600 font-semibold"></th>
                </tr>
              </thead>
              <tbody>
                {data.posts.map((post, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-3">{post._id}</td>
                    <td className="px-6 py-3">{post.title}</td>
                    <td className="px-6 py-3">
                      <span className="inline-block bg-blue-500 text-white rounded px-3 py-2 cursor-pointer text-xs mr-2">
                        Edit
                      </span>
                      <span className="inline-block bg-red-500 text-white rounded px-3 py-2 cursor-pointer text-xs">
                        Delete
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default layout(Listing);
