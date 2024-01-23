import React from "react";
import { Button as AntButton, ButtonProps } from "antd";
import styled from "@emotion/styled";

// const StyledButton = styled(AntButton)<ButtonProps>`
//   background-color: ${(props) => (props.type === "primary" ? "#233d2c" : "")};
//   width: fit-content;
//   &:active {
//     color: #23432c;
//   }
//   &:hover {
//     color: #233d2ce6;
//   }
// `;

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
    <AntButton {...rest}>{children}</AntButton>
);

export default Button;
