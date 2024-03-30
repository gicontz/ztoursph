import dayjs from "dayjs";

export const disableFutureDates = (d) => d && d > dayjs().endOf("day");
export const disablePastDates = (d) => d && d < dayjs().startOf("day");
export const disablePastDatesAndToday = (d) => d && d < dayjs().add(1, 'day').startOf("day");

export const getAge = (date: Date) => {
  const dob = dayjs(date);
  return dayjs().diff(dob, "year");
};