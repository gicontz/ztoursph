import dayjs from "dayjs";

export const disableFutureDates = (d) => d && d > dayjs().endOf("day");

export const getAge = (date: Date) => {
  const dob = dayjs(date);
  return dayjs().diff(dob, "year");
};