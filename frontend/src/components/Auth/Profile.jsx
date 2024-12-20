import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "react-bootstrap";

const ProfileSchema = Yup.object({
  email: Yup.string().email("Invalid email format").required("Email is required"),
  password: Yup.string().min(5, "Password must be at least 5 characters").required("Password is required"),
});

const Profile = ({ initialValues, handleProfileUpdate, handleDeleteUser }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ProfileSchema}
      onSubmit={handleProfileUpdate}
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
            <ErrorMessage name="email" component="div" className="text-danger" />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <Field
              type="password"
              name="password"
              id="password"
              className="form-control"
            />
            <ErrorMessage name="password" component="div" className="text-danger" />
          </div>

          <Button
            type="submit"
            className="btn btn-primary w-100 my-2"
          >
            Update Profile
          </Button>

          <Button
            type="button"
            className="btn btn-danger w-100 my-2"
            onClick={handleDeleteUser}
          >
            Delete Account
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default Profile;
