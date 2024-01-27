import React, { useState, useRef } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { ConfigProvider, Input, Select } from "antd";
import Button from "./button";
import type { InputRef, SelectProps } from "antd";
import { Controller } from "react-hook-form";

interface CustomDropDownProps extends SelectProps {
  defaultOption: string[];
  names: string;
  control: any;
  rules?: any;
  DropdownPlaceholder?: string;
}

const CustomDropDown: React.FC<CustomDropDownProps> = ({
  defaultOption = [""],
  DropdownPlaceholder = "Please enter item",
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
    setItems([...items, name || `New item ${index++}`]);
    setName("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
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
                  <Input
                    placeholder={DropdownPlaceholder}
                    ref={inputRef}
                    value={name}
                    onChange={onNameChange}
                    onKeyDown={(e) => e.stopPropagation()}
                  />
                  <Button onClick={addItem} type="text" icon={<PlusOutlined />}>
                    Add item
                  </Button>
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
