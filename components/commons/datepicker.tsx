import { DatePicker } from "antd";
import { DatePickerProps, RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";

const Datepicker: React.FC<DatePickerProps> = ({ ...rest }) => {
  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    return current && current < dayjs().endOf("day");
  };

  return <DatePicker disabledDate={disabledDate} {...rest} />;
};

export default Datepicker;
