import { object, string, number, array } from "yup";

export const guestSchema = object().shape({
    firstName: string().required("First Name is a required field."),
    middleInitial: string().max(2),
    lastName: string().required("Lastname is a required field."),
    suffix: string(),
    nationality: string().required("Nationality is a required field."),
    age: number().required("Age is a required field."),
});

const schema = object().shape({
    guests: array().of(guestSchema)
});

export default schema;