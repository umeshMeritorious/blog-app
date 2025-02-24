import React from "react";
import { Form, Formik } from "formik";
import { login } from "../config/validationSchema";
import { userLogin } from "../store/actions/auth";
import { connect } from "react-redux";

const Login = (props) => {
  return (
    <div className="bg-base">
      <div className="container h-[100vh]">
        <div className="absolute z-0 h-screen w-full left-0 top-0 flex items-center text-9xl font-bold flex-col text-white pt-72">
          <p className="flex flex-col text-right">
            Hello World!<span className="text-7xl text-gray-100">Welcome</span>
          </p>
        </div>
        <div className="grid grid-cols-12 gap-12 h-screen relative z-10">
          <div className="col-start-5 col-span-4 p-8 bg-card shadow-xl rounded h-fit m-auto w-full">
            <h1 className="text-4xl font-bold text-primary mb-2">LOGIN</h1>
            <Formik
              initialValues={{
                username: "admin",
                password: "password",
              }}
              validationSchema={login}
              onSubmit={(values) => {
                props.authenticate(values);
              }}
            >
              {(props) => (
                <Form name="loginForm">
                  <div className="pb-5 flex flex-col relative">
                    <label
                      htmlFor="username"
                      className="text-gray-300 font-light text-xs"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      className="border border-none bg-input p-[10px] h-10 text-sm rounded w-full focus:outline-none text-primary"
                      placeholder="Username"
                      value={props.values.username}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />
                    {props.errors.username && props.touched.username ? (
                      <span className="text-red-500 text-xs absolute bottom-1">
                        {props.errors.username}
                      </span>
                    ) : null}
                  </div>
                  <div className="pb-5 flex flex-col relative">
                    <label
                      htmlFor="password"
                      className="text-gray-300 font-light text-xs"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      className="border border-none bg-input p-[10px] h-10 text-sm rounded w-full focus:outline-none text-primary"
                      placeholder="Password"
                      value={props.values.password}
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                    />

                    {props.errors.password && props.touched.password ? (
                      <span className="text-red-500 text-xs absolute bottom-1">
                        {props.errors.password}
                      </span>
                    ) : null}
                  </div>
                  <button
                    type="submit"
                    className="bg-btn-primary h-11 shadow-drop px-4 text-white rounded font-medium focus:outline-none flex items-center justify-center w-full"
                  >
                    LOGIN
                  </button>
                </Form>
              )}
            </Formik>
            <span className="text-xs text-gray-400">
              By login here, you can access blog posts.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = {
  authenticate: userLogin,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
