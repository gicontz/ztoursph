import { ConfigProvider, DatePicker, DatePickerProps } from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
import { Controller } from "react-hook-form";

interface Props {
  control: any;
  name: string;
  rules?: Record<string, any>;
  className: string;
}

const Datepicker: React.FC<Props> = ({
  name,
  control,
  rules,
  className,
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
            className={className}
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
