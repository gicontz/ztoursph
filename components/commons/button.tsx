import React from "react";
import { Button as AntButton, ButtonProps, ConfigProvider } from "antd";
import styled from "@emotion/styled";

const StyledButton = styled(AntButton)<ButtonProps>`
  background-color: ${(props) => (props.type === "primary" ? "#233d2c" : "")};
  width: fit-content;
  height: 3rem;
`;

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: "#233d2c",
        colorBgContainer: "#233d2c",
      },
    }}>
    <StyledButton {...rest}>{children}</StyledButton>
  </ConfigProvider>
);

export default Button;
