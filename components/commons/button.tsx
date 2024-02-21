import React from "react";
import { Button as AntButton, ButtonProps } from "antd";
import styled from "@emotion/styled";
import { Source_Serif_4 } from "next/font/google";

const SourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

const StyledButton = styled(AntButton)<ButtonProps>`
  background-color: ${(props) => (props.type === "primary" ? "#233d2c" : "")};
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

interface Button extends ButtonProps {
  className?: string;
}

const Button: React.FC<Button> = ({ children, className, ...rest }) => (
  <StyledButton className={`${SourceSerif.className} ${className} `} {...rest}>
    {children}
  </StyledButton>
);

export default Button;
