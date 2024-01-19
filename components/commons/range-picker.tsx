import React from "react";
import { ConfigProvider, DatePicker } from "antd";
import styled from "@emotion/styled";
import { Control, Controller, FieldValues } from "react-hook-form";
import { ThemeConfig } from "@chakra-ui/react";

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
      <ConfigProvider
        theme={{
          token: {
            colorBgContainer: "#EAEAEA",
            borderRadius: 2,
          },
        }}>
        <CheckInOutPicker onChange={onChange} {...rest} />
      </ConfigProvider>
    )}
  />
);

export default CheckInOut;
