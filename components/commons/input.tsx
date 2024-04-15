import React from "react";
import { Input as Int } from "antd";
import styled from "@emotion/styled";
import { classNames } from "@app/utils/helpers";

export interface CustomInputProps extends React.ComponentProps<typeof Int> {
  name?: string;
  type: string;
  helperText?: string;
  hasError?: boolean;
}
const StyledInput = styled(Int)`
  padding: 0.7rem;

  :where(.css-dev-only-do-not-override-1qhpsh8).ant-input-outlined {
    background: #ffffff;
    border-width: 1px;
    border-style: solid;
  }
  .ant-input {
    outline-color: red;
    background-color: red;
  }
`;

const Input: React.FC<CustomInputProps> = ({ hasError, ...rest }) => {
  return (
    <div className={classNames("w-full", rest.className)}>
      <StyledInput
        className={classNames(hasError ? "border-red-700" : "!border[#d9d9d9]")}
        {...rest}
      />
      {rest.helperText && (
        <p className="text-red-700 text-xs font-italized">{rest.helperText}</p>
      )}
    </div>
  );
};

export default Input;
