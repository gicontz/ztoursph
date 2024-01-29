import React from "react";
import { Button as AntButton, ButtonProps } from "antd";
import styled from "@emotion/styled";

const StyledButton = styled(AntButton)<ButtonProps>`
  background-color: ${(props) => (props.type === "primary" ? "#233d2c" : "")};
  width: fit-content;
  &:active {
    color: #23432c;
  }
  &.ant-btn-primary:hover {
    background-color: #23432c !important;
    color: white !important;
  }
`;

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <StyledButton {...rest}>{children}</StyledButton>
);

export default Button;
