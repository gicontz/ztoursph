import React, { useState, useRef, forwardRef } from "react";
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
  addClass?: string;
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

const CustomDropDown: React.ForwardRefExoticComponent<CustomDropDownProps> = forwardRef(({
  defaultOption = [""],
  dropdownPlaceholder = "Please enter item",
  buttonName = "Add Item",
  toAddItemPlaceholder,
  addClass,
}, ref) => {
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
      ref={ref as any}
      className={`${Font.className} ${addClass}`}
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
});

CustomDropDown.displayName = "CustomDropDown";

export default CustomDropDown;
