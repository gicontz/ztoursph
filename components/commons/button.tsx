import React from "react";
import { Button as AntButton, ButtonProps } from "antd";
import styled from "@emotion/styled";

const StyledButton = styled(AntButton)<ButtonProps>`
  background-color: ${(props) => (props.type === "primary" ? "#233d2c" : "")};
  width: fit-content;
  color: ${(props) => (props.type === "link" ? "#233d2c" : "")};
  transition: color 0.3s ease-in, transform 0.1s ease-in;

  &:active {
    color: #23432c;
  }
  &.ant-btn-link:hover {
    color: #23432c !important;
    transform: scale(1.02);
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
