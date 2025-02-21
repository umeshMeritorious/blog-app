import React, { useEffect } from "react";
import {
  matchPath,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Login from "./pages/login";
import { Toaster } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import Listing from "./pages/blogs";
import Edit from "./pages/blogs/edit";
import View from "./pages/blogs/view";
import Create from "./pages/blogs/create";

const Logout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: "LOGOUT",
    });
    // eslint-disable-next-line
  }, []);
  return <></>;
};

const App = () => {
  const auth = useSelector((state) => state.auth);
  const allRoutes = ["/posts", "/post/create", "/post/edit", "/post/view"];

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (auth.token) {
      navigate("/posts");
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, [auth.token]);

  const isAppRoute = allRoutes.some((route) =>
    matchPath(route, location.pathname)
  );

  return (
    <React.Fragment>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/posts" element={<Listing />} />
        <Route path="/post/create" element={<Create />} />
        <Route path="/post/edit/:id" element={<Edit />} />
        <Route path="/post/view/:id" element={<View />} />
        <Route path="/" element={<Navigate to="/posts" />} />
        {isAppRoute && !auth.token ? (
          <Route path="*" element={<Navigate to="/login" />} />
        ) : (
          ""
        )}
      </Routes>
      <Toaster position="top-right" richColors />
    </React.Fragment>
  );
};

export default App;
