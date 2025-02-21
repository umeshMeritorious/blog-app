import React from "react";

const Alert = (props) => {
  return (
    <div className="flex justify-center pb-4">
      {props.type === "error" && (
        <div className="w-full max-w-md flex items-center bg-red-100 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded shadow-md">
          <p className="text-sm font-medium flex-1">{props.message}</p>
        </div>
      )}
      {props.type === "success" && (
        <div className="w-full max-w-md flex items-center bg-green-100 border-l-4 border-green-500 text-gray-700 px-4 py-3 rounded shadow-md">
          <p className="text-sm font-medium flex-1">{props.message}</p>
        </div>
      )}
    </div>
  );
};

export default Alert;
