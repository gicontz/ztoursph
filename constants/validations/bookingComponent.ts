import { array, date, number, object, string } from "yup";

const schema = object().shape({
  packages: string().required("Package destination is a required field."),
  date: array().required("Date is a required field."),
  pax: number().required("Pax is a required field."),
});

export default schema;
