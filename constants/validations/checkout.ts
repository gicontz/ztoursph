import { object, string, number, array, boolean } from 'yup';

const schema = object().shape({
    firstname: string().required(),
    middleInitial: string().max(2).required(),
    lastname: string().required(),
    age: number().required(),
    nationality: string().required(),
    mobile1: number().required(),
    mobile2: number().required(),
    email: string().email().required(),
    isSameAsLeadGuest: boolean().required(),
    guests: array().when('isSameAsLeadGuest', {
        is: false,
        then: (schema) => schema.min(1, "Guest is required when not same as lead guest"),
        otherwise: (schema) => schema.notRequired(),
    }),
});

export default schema;