import * as yup from "yup";

// const passwordRules= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* ).{5,16}$/

export const userFormValidationSchema = yup.object().shape({
    email: yup.string().email("Please enter a valid email").required("Required"),
    name: yup.string().required("Required"),
    status: yup.string().required("Required"),
    gender: yup.string().required("Required"),
});

export const toDoFormValidationSchema = yup.object().shape({
    user_id: yup.string().required("Required"),
    title: yup.string().required("Required"),
    // due_on: yup.string().required("Required"),
    status: yup.string().required("Required"),
});