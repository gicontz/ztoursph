import React from "react";
import { Input as Int } from "antd";
import styled from "@emotion/styled";

export interface CustomInputProps extends React.ComponentProps<typeof Int> {
  name?: string;
  type: string;
  helperText?: string;
}
const StyledInput = styled(Int)`
  padding: 0.7rem;
`;

const Input: React.FC<CustomInputProps> = ({ ...rest }) => {
  return (
    <React.Fragment>
      <StyledInput {...rest} />
      {rest.helperText && (
        <p className="text-red-700 text-xs font-italized">{rest.helperText}</p>
      )}
    </React.Fragment>
  );
};

export default Input;
