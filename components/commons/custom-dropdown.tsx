import React, { useState, useRef } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { ConfigProvider, Input, Select } from "antd";
import Button from "./button";
import type { InputRef, SelectProps } from "antd";
import { Controller } from "react-hook-form";
import styled from "@emotion/styled";

interface CustomDropDownProps extends SelectProps {
  defaultOption: string[];
  names: string;
  control: any;
  rules?: any;
  dropdownPlaceholder?: string;
  buttonName?: string;
}

const CustomInput = styled.div`
  display: flex;
  gap: 0.6rem;
  font-size: 1rem;
  margin-top: 0.4rem;

  button,
  input {
    height: 2.2rem;
  }
`;

const StyledButton = styled(Button)`
  &.ant-btn-primary {
    background-color: transparent !important;
    border-color: #23432c !important;
    color: #23432c !important;

    &:hover {
      background-color: #23432c !important;
      border-color: #23432c !important;
    }
  }
`;

const CustomDropDown: React.FC<CustomDropDownProps> = ({
  defaultOption = [""],
  dropdownPlaceholder = "Please enter item",
  buttonName = "Add Item",
  names,
  control,
  rules,
  ...rest
}) => {
  const [items, setItems] = useState(defaultOption);
  const [name, setName] = useState("");
  const inputRef = useRef<InputRef>(null);

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const addItem = (index) => {
    if (name) {
      setItems([...items, name || `New item ${index++}`]);
      setName("");
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  };
  return (
    <Controller
      name={names}
      control={control}
      rules={rules}
      render={({ field }) => {
        return (
          <ConfigProvider
            theme={{
              token: {
                colorBgContainer: "#EAEAEA",
                borderRadius: 2,
              },
            }}>
            <Select
              {...field}
              {...rest}
              dropdownRender={(menu) => (
                <>
                  {menu}
                  <CustomInput>
                    <Input
                      placeholder={dropdownPlaceholder}
                      ref={inputRef}
                      value={name}
                      onChange={onNameChange}
                      onKeyDown={(e) => e.stopPropagation()}
                    />
                    <StyledButton
                      onClick={addItem}
                      type="primary"
                      icon={<PlusOutlined />}>
                      {buttonName}
                    </StyledButton>
                  </CustomInput>
                </>
              )}
              options={items.map((item) => ({ label: item, value: item }))}
            />
          </ConfigProvider>
        );
      }}
    />
  );
};

export default CustomDropDown;
