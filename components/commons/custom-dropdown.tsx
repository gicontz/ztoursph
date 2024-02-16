import React, { useState, useRef } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Input, Select } from "antd";
import Button from "./button";
import type { InputRef, SelectProps } from "antd";
import styled from "@emotion/styled";
import { Poppins } from "next/font/google";

interface CustomDropDownProps extends SelectProps {
  defaultOption: string[];
  dropdownPlaceholder?: string;
  buttonName?: string;
  toAddItemPlaceholder?: string;
}

const Font = Poppins({
  weight: "400",
  subsets: ["latin"],
});

const InputContainer = styled.div`
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
  toAddItemPlaceholder,
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
    <Select
      {...rest}
      className={`${Font.className} ${rest?.className}`}
      dropdownRender={(menu) => (
        <>
          <div className={Font.className}>{menu}</div>
          <InputContainer>
            <Input
              ref={inputRef}
              className={Font.className}
              value={name}
              onChange={onNameChange}
              placeholder={toAddItemPlaceholder}
              onKeyDown={(e) => e.stopPropagation()}
            />
            <StyledButton
              onClick={addItem}
              type="primary"
              icon={<PlusOutlined />}>
              {buttonName}
            </StyledButton>
          </InputContainer>
        </>
      )}
      options={items.map((item) => ({ label: item, value: item }))}
    />
  );
};

export default CustomDropDown;
