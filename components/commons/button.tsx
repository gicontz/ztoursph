import React from "react";
import { Button as AntButton, ButtonProps, ConfigProvider } from "antd";
import styled from "@emotion/styled";

const StyledButton = styled(AntButton)<ButtonProps>`
  background-color: ${(props) => (props.type === "primary" ? "#233d2c" : "")};
  width: fit-content;
`;

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <ConfigProvider
    theme={{
      components: {
        Button: {
          colorPrimaryActive: "#23432c",
          colorPrimaryHover: "#233d2ce6",
        },
      },
    }}>
    <StyledButton {...rest}>{children}</StyledButton>
  </ConfigProvider>
);

export default Button;
