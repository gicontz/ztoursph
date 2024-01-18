import React from "react";
import { DatePicker } from "antd";
import styled from "@emotion/styled";
import { Control, Controller, FieldValues } from "react-hook-form";

const { RangePicker } = DatePicker;

const CheckInOutPicker = styled(RangePicker)`
  .ant-picker-input > input::placeholder {
    color: black;
  }
  color: black;
  width: 15rem;
  height: 3rem;
`;

interface RangePickerProps {
  name: string;
  control: Control<FieldValues>;
  rules?: Record<string, any>;
}

const CheckInOut: React.FC<RangePickerProps> = ({
  name,
  control,
  rules,
  ...rest
}) => (
  <Controller
    name={name}
    control={control}
    rules={rules}
    render={({ field: { onChange } }) => (
      <CheckInOutPicker onChange={onChange} {...rest} />
    )}
  />
);

export default CheckInOut;
