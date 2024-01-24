import { ConfigProvider, DatePicker, DatePickerProps } from "antd";
import { DatePickerType, RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
import { ReactNode } from "react";
import { Controller } from "react-hook-form";

interface Props extends DatePickerType {
  control: any;
  name: string;
  rules?: Record<string, any>;
  placeholder?: string | number | ReactNode | boolean;
}

const Datepicker: React.FC<Props> = ({
  name,
  control,
  rules,
  ...rest
}) => {
  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    return current && current < dayjs().endOf("day");
  };
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <ConfigProvider
          theme={{
            token: {
              colorBgContainer: "#EAEAEA",
              borderRadius: 2,
            },
          }}>
          <DatePicker
            format="YYYY-MM-DD"
            disabledDate={disabledDate}
            {...field}
            {...rest}
          />
        </ConfigProvider>
      )}
    />
  );
};

export default Datepicker;
