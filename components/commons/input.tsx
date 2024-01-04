import React from "react";
import { Controller } from "react-hook-form";
import { Input } from "antd";

export interface CustomInputProps {
  control: any;
  name: string;
  rules: Record<string, any>;
  placeholder: string;
  type: string;
}

export const CustomInput = ({
  type = "text",
  placeholder = "Enter Response",
  ...rest
}: CustomInputProps) => {
  return (
    <Controller
      name={rest.name}
      control={rest.control}
      rules={rest.rules}
      render={({ field, fieldState }) => (
        <Input
          {...field}
          type={type}
          placeholder={placeholder}
          className={fieldState.invalid ? "custom-input error" : "custom-input"}
        />
      )}
    />
  );
};
