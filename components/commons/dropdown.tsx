import React, { ReactNode } from "react";
import { ConfigProvider, Select, SelectProps } from "antd";
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
    text-indent: ${(props) => (props.icon ? "calc(2rem - 8px)" : "")};
  }
`;

const StyledSelect = styled(Select)<{ isnumber?: boolean }>`
  .ant-select-selection-placeholder {
    color: black;
  }
  width: 19rem;
  height: 3.5rem;
`;

export interface DropdownProps extends SelectProps {
  prefixIcon?: ReactNode;
  control: any;
  name?: string;
  rules?: Record<string, any>;
  placeholder?: string | number | ReactNode | boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  prefixIcon,
  name,
  control,
  rules,
  ...rest
}) => {
  return (
    <SelectWrapper icon={prefixIcon ? true : false}>
      {prefixIcon && <div className="prefix-icon-wrapper">{prefixIcon}</div>}
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
            <StyledSelect {...field} {...rest} />
          </ConfigProvider>
        )}
      />
    </SelectWrapper>
  );
};

export default Dropdown;
