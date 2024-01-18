import React, { ReactNode } from "react";
import { Select, SelectProps } from "antd";
import styled from "@emotion/styled";
import { Controller } from "react-hook-form";

const SelectWrapper = styled.div<{ icon?: boolean }>`
  position: relative;

  .prefix-icon-wrapper {
    position: absolute;
    z-index: 1;
    width: 3rem;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .ant-select .ant-select-selector {
    padding-left: ${(props) => (props.icon ? "calc(3rem - 8px)" : "")};
  }
`;

const StyledSelect = styled(Select)<{ isnumber?: boolean }>`
  .ant-select-selection-placeholder {
    color: black;
  }
  width: ${(props) => (props.isnumber ? "10rem" : "18rem")};
  height: 3rem;
`;

interface DropdownProps extends SelectProps {
  prefixIcon?: ReactNode;
  isnumber?: boolean;
  control: any;
  name: string;
  rules?: Record<string, any>;
  placeholder: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  prefixIcon,
  isnumber,
  name,
  control,
  rules,
  ...rest
}) => {
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <SelectWrapper icon={prefixIcon ? true : false}>
      {prefixIcon && <div className="prefix-icon-wrapper">{prefixIcon}</div>}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <StyledSelect
            isnumber={isnumber}
            filterOption={filterOption}
            {...field}
            {...rest}
          />
        )}
      />
    </SelectWrapper>
  );
};

export default Dropdown;
