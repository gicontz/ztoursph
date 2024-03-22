import styled from "@emotion/styled";
import { DatePicker as Picker } from "antd";
import { DatePickerProps, RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
import { forwardRef } from "react";

const DatePicker = styled(Picker)`
  a.ant-picker-now-btn {
    font-size: 0;
    background-color #1677ff;
  }

  a.ant-picker-now-btn:after {
    content: "ABC";
    font-size: 16px; /* original font size */
  }
  > div button {
    background-color #1677ff;
  }
`

const Datepicker: React.ForwardRefExoticComponent<DatePickerProps> = forwardRef(({ ...rest }, ref) => {
  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    return current && current < dayjs().endOf("day");
  };

  return <DatePicker disabledDate={disabledDate} {...rest} ref={ref as any}/>;
});
Datepicker.displayName = "Datepicker";
export default Datepicker;
