import React from "react";
import { Link } from "react-router-dom";
import { FaPowerOff } from "react-icons/fa6";

const layout = (WrappedComponent) => {
  return function LayoutWrapper(props) {
    return (
      <React.Fragment>
        <Link
          to="/logout"
          className="fixed top-5 right-5 bg-red-500 rounded-full h-8 w-8 flex items-center justify-center shadow-xl"
        >
          <FaPowerOff />
        </Link>
        <WrappedComponent {...props} />
      </React.Fragment>
    );
  };
};

export default layout;
