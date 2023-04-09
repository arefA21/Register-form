import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export const MyForm = () => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    captcha: "",
  };

  const [captcha, setCaptcha] = useState(generateCaptcha());

  function generateCaptcha() {
    return Math.floor(Math.random() * 100000);
  }

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
    captcha: Yup.number()
      .typeError("musr be number !")
      .required("captcha is required !")
      .test("is match", "invalid number", (value) => value === captcha),
    /*
      .test() method takes three arguments: 
      first: is a string that identifies the test.
      second: is error message to display if the test fails.
      third:  is a function that return (true) if success and (false) if it fails.
      */
  });

  const handleSubmit = (values, { resetForm }) => {
    console.log(values);
    resetForm();
    setCaptcha(generateCaptcha());
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
            <div>
              <label htmlFor="captcha">
                {captcha}
                <br />
                Enter number of captcha
              </label>
              <Field type="number" name="captcha" />
              <ErrorMessage name="captcha" />
            </div>

            <button type="submit">Register</button>
          </Form>
        )}
      </Formik>
    </>
  );
};
