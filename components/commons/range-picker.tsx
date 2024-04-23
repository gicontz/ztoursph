import React from "react";
import { DatePicker } from "antd";
import styled from "@emotion/styled";
import { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import { RangePickerDateProps } from "antd/es/date-picker/generatePicker";

const { RangePicker } = DatePicker;

interface CheckInOutProps extends RangePickerDateProps<Dayjs> {
  hasError?: boolean;
  helperText?: string;
}

const CheckInOutPicker = styled(RangePicker)<{ hasError?: boolean }>`
  .ant-picker-input > input::placeholder {
    color: black;
  }
  :where(.css-dev-only-do-not-override-1qhpsh8).ant-picker-outlined {
    border-color: ${({ hasError }) =>
      hasError ? "rgb(185 28 28)" : "#d9d9d9"};
  }
  color: black;
  height: 3.5rem;
  @media screen and (max-width: 821px) {
    width: 100%;
  }
`;

const CheckInOut: React.FC<CheckInOutProps> = ({
  hasError,
  helperText,
  ...rest
}) => {
  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    return (current && current) < dayjs().endOf("day");
  };
  return (
    <React.Fragment>
      <CheckInOutPicker
        className="!text-base !lg:text-lg"
        hasError={hasError}
        {...rest}
        disabledDate={disabledDate}
      />
      {helperText !== undefined && (
        <p className="text-red-700 text-xs font-italized">{helperText}</p>
      )}
    </React.Fragment>
  );
};
export default CheckInOut;
