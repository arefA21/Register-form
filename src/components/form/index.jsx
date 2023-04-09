import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export const MyForm = () => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validation = Yup.object({
    name: Yup.string().required("name is required !"),
    email: Yup.string()
      .email("Invalid Email !")
      .required("email is required !"),
    password: Yup.string()
      .min(6, "must be 6 characters or more !")
      .required("password is required !"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "not match !")
      .required("confirm password is required !"),
  });

  const handleSubmit = (values) => {
    console.log(values);
  };
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validation}
        onSubmit={handleSubmit}
      >
        {({ touched, errors }) => (
          <Form>
            <div>
              <label htmlFor="name">Name: </label>
              <Field type="text" name="name" />
              <ErrorMessage name="name" />
            </div>
            <div>
              <label htmlFor="email">Email: </label>
              <Field type="email" name="email" />
              <ErrorMessage name="email" />
            </div>
            <div>
              <label htmlFor="name">Password: </label>
              <Field type="password" name="password" />
              <ErrorMessage name="password" />
            </div>
            <div>
              <label htmlFor="name">Confirm Password: </label>
              <Field type="password" name="confirmPassword" />
              <ErrorMessage name="confirmPassword" />
            </div>

            <button type="submit">Register</button>
          </Form>
        )}
      </Formik>
    </>
  );
};
