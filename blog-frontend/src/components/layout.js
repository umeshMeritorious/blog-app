import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaPowerOff } from "react-icons/fa6";
import { checkPulse } from "../services/http";

const layout = (WrappedComponent) => {
  return function LayoutWrapper(props) {
    const hasFetched = useRef(false);
    useEffect(() => {
      if (hasFetched.current) return;
      hasFetched.current = true;
      setTimeout(() => {
        checkPulse();
      }, [10000]);
      // eslint-disable-next-line
    });
    return (
      <React.Fragment>
        <Link
          to="/logout"
          className="fixed top-5 right-5 bg-red-500 rounded-full h-10 w-10 flex items-center justify-center shadow-xl"
        >
          <FaPowerOff className="text-white" />
        </Link>
        <WrappedComponent {...props} />
      </React.Fragment>
    );
  };
};

export default layout;
