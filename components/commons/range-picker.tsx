import React from "react";
import { DatePicker } from "antd";
import styled from "@emotion/styled";
import { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

const CheckInOutPicker = styled(RangePicker)`
  .ant-picker-input > input::placeholder {
    color: black;
  }
  color: black;
  height: 3.5rem;
  @media screen and (max-width: 821px) {
    width: 100%;
  }
`;

const CheckInOut: React.FC<RangePickerProps> = ({ ...rest }) => {
  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    return (current && current) < dayjs().endOf("day");
  };
  return <CheckInOutPicker {...rest} disabledDate={disabledDate} />;
};
export default CheckInOut;
