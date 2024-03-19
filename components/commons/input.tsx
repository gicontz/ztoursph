import React from "react";
import { Input as Int, InputProps } from "antd";
import styled from "@emotion/styled";

export interface CustomInputProps extends InputProps {
  name: string;
  type: string;
}
const StyledInput = styled(Int)`
padding: 0.7rem;
`

export const Input: React.FC<CustomInputProps> = ({...rest}) => {
  return (
          <StyledInput {...rest}/>
  );
};
