import { array, date, object, string } from "yup";

const schema = object().shape({
  locationPickUp: string().required("Location to pick up is a required field"),
  participants: array().min(1).required("Must contain 1 participant"),
  date: date().required("Date field is a required"),
});

export default schema;
