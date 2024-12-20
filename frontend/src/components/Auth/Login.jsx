import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Login = ({ onSubmit }) => {
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
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
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <Field
              type="email"
              name="email"
              id="email"
              className="form-control"
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

          <button type="submit" className="btn btn-danger w-100 my-2" >
            Login
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default Login;
