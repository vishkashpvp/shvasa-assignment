import { Formik, Form, Field, ErrorMessage } from "formik";
import { createAgentReq } from "../services/agent";
import { useState } from "react";

export default function Agent() {
  const [errors, setErrors] = useState({ hasErrors: false, errors: [] });

  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = "Required";
    } else if (!values.name.trim()) {
      errors.name = "Cannot be empty";
    } else if (values.name.length > 15) {
      errors.name = "Must be 15 characters or less";
    }

    if (!values.email) {
      errors.email = "Required";
    } else if (!values.email.trim()) {
      errors.email = "Cannot be empty";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }

    if (!values.phone) {
      errors.phone = "Required";
    } else if (!values.phone.trim()) {
      errors.phone = "Cannot be empty";
    }

    if (!values.description) {
      errors.description = "Required";
    } else if (!values.description.trim()) {
      errors.description = "Cannot be empty";
    } else if (values.description.length > 100) {
      errors.description = "Must be 100 characters or less";
    }

    return errors;
  };

  return (
    <>
      <div className="flex w-full mt-5">
        <div className="items-center text-white justify-center hidden w-2/3 bg-[url('./src/assets/images/support1.svg')] bg-no-repeat lg:flex-col lg:flex"></div>

        <div className="flex flex-col w-full lg:justify-center lg:items-center lg:w-1/3">
          <h3 className="mb-5 text-3xl">Create Support Agent</h3>

          {errors.errors.map((err, i) => (
            <div className="text-sm text-red-500" key={i}>
              {err}
            </div>
          ))}

          <Formik
            initialValues={{ name: "", email: "", phone: "", description: "" }}
            validate={validate}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setErrors({ hasErrors: false, errors: [] });
              Object.keys(values).forEach((key) => {
                values[key] = values[key].trim();
              });
              createAgentReq(values)
                .then(({ data }) => {
                  alert(`Account '${data.email}' created successfully`);
                  resetForm();
                  setSubmitting(false);
                })
                .catch((e) => {
                  const arr = [];
                  const message = e.response?.data?.message;
                  if (typeof message == "string") {
                    arr.push(message);
                  } else if (typeof message == "object") {
                    message.forEach((msg) => arr.push(msg.msg));
                  }
                  setSubmitting(false);
                  setErrors({ hasErrors: true, errors: arr });
                });
            }}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col">
                <label
                  className="mt-3 after:content-['*'] after:ml-1 after:text-red-500"
                  htmlFor="name"
                >
                  Name
                </label>
                <Field className="input-group" type="text" name="name" placeholder="Agent name" />
                <ErrorMessage className="text-red-500" name="name" component="div" />

                <label
                  className="mt-3 after:content-['*'] after:ml-1 after:text-red-500"
                  htmlFor="email"
                >
                  Email
                </label>
                <Field
                  className="input-group"
                  type="email"
                  name="email"
                  placeholder="Agent email"
                />
                <ErrorMessage className="text-red-500" name="email" component="div" />

                <label
                  className="mt-3 after:content-['*'] after:ml-1 after:text-red-500"
                  htmlFor="phone"
                >
                  Phone
                </label>
                <Field
                  className="input-group"
                  type="tel"
                  pattern="[0-9]{10}"
                  name="phone"
                  placeholder="Agent phone"
                />
                <ErrorMessage className="text-red-500" name="phone" component="div" />

                <label
                  className="mt-3 after:content-['*'] after:ml-1 after:text-red-500"
                  htmlFor="description"
                >
                  Description
                </label>
                <Field
                  className="resize-none input-group h-28"
                  as="textarea"
                  type="textarea"
                  name="description"
                  placeholder="Describe..."
                />
                <ErrorMessage className="text-red-500" name="description" component="div" />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="p-3 mt-10 text-white bg-[#f96500] rounded-lg disabled:bg-[#f8a065] disabled:cursor-not-allowed min-w-80 max-w-96"
                >
                  Create Agent
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}
