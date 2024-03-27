import { max } from "lodash";
import { object, string, number, array, boolean, date } from "yup";

const guestSchema = object().shape({
        name: string().required("Name is a required field."),
        nationality: string().required("Nationality is a required field."),
        age: number().required("Age is a required field."),
});

const schema = object().shape({
    firstname: string().required("Firstname is a required field."),
    middleInitial: string()
        .max(2)
        .required("Middle Initial is a required field."),
    lastname: string().required("Lastname is a required field."),
    birthday: date().required("Birthday is a required field."),
    nationality: string().required("Nationality is a required field."),
    mobileNumber1: number().required("Mobile 1 is a required field."),
    mobileNumber2: number().required("Mobile 2 is a required field."),
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
    maxParticipants: number(),
    guests: array().of(guestSchema),
});

export default schema;
