import React from "react";
import { DatePicker } from "antd";
import styled from "@emotion/styled";

const { RangePicker } = DatePicker;

const CheckInOutPicker = styled(RangePicker)`
  .ant-picker-input > input::placeholder {
    color: black;
  }
  color: black;
  width: 15rem;
  height: 3rem;
`;

interface CheckInOutProps {
  onChange?: (value: string, dateString: [string, string]) => void;
}

const CheckInOut: React.FC<CheckInOutProps> = ({ onChange }) => (
  <CheckInOutPicker
    placeholder={["Check In", "Check Out"]}
    onChange={onChange}
  />
);

export default CheckInOut;
