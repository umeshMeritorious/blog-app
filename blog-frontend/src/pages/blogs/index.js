import React, { useEffect, useRef, useState } from "react";
import { listing, remove } from "../../services/blog.services";
import { Link } from "react-router-dom";
import { FiPlus, FiEye, FiEdit, FiTrash } from "react-icons/fi";
import layout from "../../components/layout";
import Swal from "sweetalert2";
import { toast } from "sonner";
import { convertUTCToIST } from "../../config/utilities";
import Pagination from "../../components/pagination";

const Listing = () => {
  const [data, setData] = useState({
    currentPage: 1,
    totalPages: 0,
    totalPosts: 0,
    posts: [],
  });

  const hasFetched = useRef(false);
  const fetchData = (filters = data) => {
    listing(filters)
      .then((res) => {
        if (res.status === 200) {
          setData(res.data);
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
  }, [data, data.currentPage]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete Confirmation",
      text: "Please confirm to delete record.",
      icon: "warning",
      animation: false,
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Confirm",
      customClass: {
        icon: "h-[40px] w-[40px] mt-[20px] text-[10px] font-extrabold border border-[5px]",
        title: "text-2xl pt-[10px]",
        htmlContainer: "pt-[10px]",
        actions: "mt-[10px]",
        container: "p-[20px]",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        await remove(id)
          .then((res) => {
            if (res.status === 204) {
              Swal.fire({
                title: "Deleted!",
                text: "Successfully deleted",
                icon: "success",
                animation: false,
                customClass: {
                  title: "text-2xl pt-[10px]",
                  htmlContainer: "pt-[10px]",
                },
              });
            }
          })
          .catch((error) => {
            if (error.status === 404) {
              toast.error(error.response.data.message);
            }
          })
          .finally(fetchData);
      }
    });
  };

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
                  <th className="px-6 py-3 text-left text-gray-600 font-semibold">
                    Author
                  </th>
                  <th className="px-6 py-3 text-left text-gray-600 font-semibold">
                    Created By
                  </th>
                  <th className="px-6 py-3 text-left text-gray-600 font-semibold"></th>
                </tr>
              </thead>
              <tbody>
                {data.posts.length ? (
                  data.posts.map((post, index) => (
                    <tr
                      key={index}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-3">{post._id}</td>
                      <td className="px-6 py-3">{post.title}</td>
                      <td className="px-6 py-3">{post.posted_by.username}</td>
                      <td className="px-6 py-3">
                        {convertUTCToIST(post.createdAt)}
                      </td>
                      <td className="px-6 py-3 flex gap-2">
                        <Link
                          to={`/post/view/${post._id}`}
                          className="inline-block bg-blue-500 text-white rounded px-3 py-2 cursor-pointer"
                        >
                          <FiEye />
                        </Link>
                        <Link
                          to={`/post/edit/${post._id}`}
                          className="inline-block bg-blue-500 text-white rounded px-3 py-2 cursor-pointer"
                        >
                          <FiEdit />
                        </Link>
                        <span
                          onClick={() => handleDelete(post._id)}
                          className="inline-block bg-red-500 text-white rounded px-3 py-2 cursor-pointer"
                        >
                          <FiTrash />
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5}>
                      <div className="flex flex-col items-center justify-center w-full p-4 text-gray-400 font-bold">
                        <img
                          src={"/empty-archive.png"}
                          className="h-[100px] w-[100px] opacity-40"
                        />
                        No records found
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <Pagination
              currentPage={data.currentPage}
              totalPages={data.totalPages}
              onPageChange={(changePage) => {
                hasFetched.current = false;
                setData({ ...data, currentPage: changePage });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default layout(Listing);
