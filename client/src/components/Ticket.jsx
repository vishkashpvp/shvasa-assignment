import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { createTicketReq } from "../services/ticket";

export default function Ticket() {
  const [errors, setErrors] = useState({ hasErrors: false, errors: [] });
  const severityLevels = ["critical", "high", "medium", "low"];
  const typeValues = ["bug", "assistance", "feature", "feedback", "refund"];

  const validate = (values) => {
    const errors = {};

    if (!values.topic) {
      errors.topic = "Required";
    } else if (!values.topic.trim()) {
      errors.topic = "Cannot be empty";
    } else if (10 > values.topic.trim().length || values.topic.trim().length > 50) {
      errors.topic = "Must be in range 10-50 characters";
    }

    if (!values.description) {
      errors.description = "Required";
    } else if (!values.description.trim()) {
      errors.description = "Cannot be empty";
    } else if (10 > values.description.trim().length || values.description.trim().length > 200) {
      errors.description = "Must be in range 10-200 characters";
    }

    if (!values.severity) {
      errors.severity = "Required";
    } else if (!values.severity.trim()) {
      errors.severity = "Cannot be empty";
    } else if (!severityLevels.includes(values.severity.trim())) {
      errors.severity = `Allowed values ${severityLevels.join(", ")}`;
    }

    if (!values.type) {
      errors.type = "Required";
    } else if (!values.type.trim()) {
      errors.type = "Cannot be empty";
    } else if (!typeValues.includes(values.type.trim())) {
      errors.type = `Allowed values ${typeValues.join(", ")}`;
    }

    return errors;
  };

  return (
    <>
      <div className="flex w-full mt-5">
        <div
          style={{ backgroundImage: "url('/images/support2.svg')" }}
          className="items-center justify-center hidden w-2/3 text-white bg-no-repeat lg:flex-col lg:flex"
        ></div>

        <div className="flex flex-col w-full lg:justify-center lg:items-center lg:w-1/3">
          <h3 className="mb-5 text-3xl">Create Support Ticket</h3>

          {errors.errors.map((err, i) => (
            <div className="text-sm text-red-500" key={i}>
              {err}
            </div>
          ))}

          <Formik
            initialValues={{ topic: "", description: "", severity: "", type: "" }}
            validate={validate}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setErrors({ hasErrors: false, errors: [] });
              Object.keys(values).forEach((key) => {
                values[key] = values[key].trim();
              });
              createTicketReq(values)
                .then(({ data }) => {
                  const status = data.status == "assigned" ? " and assigned" : "";
                  const message = `'${data.type}' ticket created${status} successfully`;
                  alert(message);
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
                  } else {
                    arr.push(e.message);
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
                  htmlFor="topic"
                >
                  Topic
                </label>
                <Field className="input-group" type="text" name="topic" placeholder="Topic name" />
                <ErrorMessage className="text-red-500" name="topic" component="div" />

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

                <label
                  className="mt-3 after:content-['*'] after:ml-1 after:text-red-500"
                  htmlFor="severity"
                >
                  Severity
                </label>
                <Field className="input-group" as="select" name="severity">
                  <option value="" hidden>
                    Select severity level
                  </option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </Field>
                <ErrorMessage className="text-red-500" name="severity" component="div" />

                <label
                  className="mt-3 after:content-['*'] after:ml-1 after:text-red-500"
                  htmlFor="type"
                >
                  Type
                </label>
                <Field className="input-group" component="select" name="type">
                  <option value="" hidden>
                    Select ticket type
                  </option>
                  <option value="feature">Feature</option>
                  <option value="assistance">Assistance</option>
                  <option value="bug">Bug</option>
                  <option value="feedback">Feedback</option>
                  <option value="refund">Refund</option>
                </Field>
                <ErrorMessage className="text-red-500" name="type" component="div" />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="p-3 mt-10 text-white bg-[#f96500] rounded-lg disabled:bg-[#f8a065] disabled:cursor-not-allowed min-w-80 max-w-96"
                >
                  Create Ticket
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}
