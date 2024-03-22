import { DatePicker } from "antd";
import { DatePickerProps, RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
import { forwardRef } from "react";

const Datepicker: React.ForwardRefExoticComponent<DatePickerProps> = forwardRef(({ ...rest }, ref) => {
  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    return current && current < dayjs().endOf("day");
  };

  return <DatePicker disabledDate={disabledDate} {...rest} ref={ref as any}/>;
});

<<<<<<< HEAD
Datepicker.displayName = "Datepicker";
=======
Datepicker.displayName = 'Datepicker';
>>>>>>> 2dd54fd8837661aa316fae5d9294312ab76efee9

export default Datepicker;
