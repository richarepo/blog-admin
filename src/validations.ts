import * as Yup from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
var regexp = /^\S*$/;

const formSchema = Yup.object().shape({
  first_name: Yup.string()
    .required("Required")
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
    .matches(regexp, "No space allowed"),
  last_name: Yup.string()
    .required("Required")
    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ")
    .matches(regexp, "No space allowed"),
  email: Yup.string()
    .email("Invalid email")
    .required("Required")
    .matches(regexp, "No space allowed"),
  phone: Yup.string()
    .required("Required")
    .min(10, "Only 10 characters allowed")
    .max(10, "Only 10 characters allowed")
    .matches(phoneRegExp, "Phone number is not valid")
    .matches(regexp, "No space allowed"),
  qualification: Yup.string()
    .required("Required")
    .matches(regexp, "No space allowed"),
});
export default formSchema;
