import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Register = ({ onSubmit }) => {
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required!"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required!"),
    password: Yup.string().required("Password is required!"),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {() => (
        <Form className="form-group">
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <Field
              type="text"
              name="username"
              id="username"
              className="form-control border-danger"
            />
            <ErrorMessage
              name="username"
              component="div"
              className="text-danger"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <Field
              type="email"
              name="email"
              id="email"
              className="form-control border-danger"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-danger"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <Field
              type="password"
              name="password"
              id="password"
              className="form-control border-danger"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-danger"
            />
          </div>

          <button type="submit" className="btn btn-danger w-100 my-2">
            Sign Up
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default Register;
