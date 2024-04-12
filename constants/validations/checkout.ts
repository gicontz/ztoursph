import { max } from "lodash";
import { object, string, number, array, boolean, date } from "yup";

const schema = object().shape({
  firstName: string().required("Firstname is a required field."),
  middleInitial: string().max(2),
  lastName: string().required("Lastname is a required field."),
  sex: string().oneOf(["M", "F"]).required("Sex is a required field."),
  birthday: date().required("Birthday is a required field."),
  nationality: string().required("Nationality is a required field."),
  mobileNumber1: object().shape({
    countryCode: string().required("Country code is a required field"),
    number: string()
      .matches(/^\d{10}$/, "Mobile number must be exactly 10 digits")
      .required("Number is a required field"),
  }),
  mobileNumber2: object().shape({
    countryCode: string().required("Country code is a required field"),
    number: string()
      .matches(/^\d{10}$/, "Mobile number must be exactly 10 digits")
      .required("Number is a required field"),
  }),
  email: string()
    .email("Email must be valid email")
    .required("Email is a required field."),
  // isSameAsLeadGuest: boolean().required(),
  //     guests: array().when("isSameAsLeadGuest", {
  //         is: false,
  //         then: (schema) =>
  //             schema.min(1, "Guest is required when not same as lead guest"),
  //         otherwise: (schema) => schema.notRequired(),
  //     }),
  // maxParticipants: number(),
  // guests: array().of(guestSchema),
});

export default schema;
