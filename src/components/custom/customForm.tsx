"use client";
import React from "react";
import { Formik, Form, FormikConfig, FormikValues, FormikProps } from "formik";

export interface CustomFormProps<Values extends FormikValues = FormikValues>
  extends FormikConfig<Values> {
  children: ((props: FormikProps<Values>) => React.ReactNode) | React.ReactNode;
  className?: string;
}

export default function CustomForm<Values extends FormikValues = FormikValues>({
  children,
  className,
  ...formikProps
}: CustomFormProps<Values>) {
  return (
    <Formik {...formikProps}>
      {(formik) => (
        <Form className={className}>
          {typeof children === "function" ? children(formik) : children}
        </Form>
      )}
    </Formik>
  );
}
