import React from "react";
import { Input as Int } from "antd";
import styled from "@emotion/styled";

export interface CustomInputProps extends React.ComponentProps<typeof Int> {
  name?: string;
  type: string;
}
const StyledInput = styled(Int)`
padding: 0.7rem;
`

const Input: React.FC<CustomInputProps> = ({...rest}) => {
  return (
          <StyledInput {...rest}/>
  );
};

export default Input;
