import React, { ReactNode } from "react";
import { Select, SelectProps } from "antd";
import styled from "@emotion/styled";
import { classNames } from "@app/utils/helpers";

const SelectWrapper = styled.div<{ icon?: boolean; hasError?: boolean }>`
  position: relative;
  .prefix-icon-wrapper {
    position: absolute;
    z-index: 1;
    width: 3rem;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .ant-select .ant-select-selector {
    text-indent: ${(props) => (props.icon ? "calc(2rem - 8px)" : "")};
    border-color: ${({ hasError }) =>
      hasError ? "rgb(185 28 28)" : "#d9d9d9"};
  }
  @media screen and (max-width: 821px) {
    width: 100%;
  }

  .ant-select-selection-placeholder {
    color: black;
  }
`;

const StyledSelect = styled(Select)<{ isnumber?: boolean }>`
  height: 100%;

  @media screen and (max-width: 821px) {
    width: 100%;
  }
`;

export interface DropdownProps extends SelectProps {
  prefixIcon?: ReactNode;
  className?: string;
  hasError?: boolean;
  helperText?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  prefixIcon,
  className,
  hasError,
  helperText,
  ...rest
}) => {
  return (
    <React.Fragment>
      <SelectWrapper
        className={classNames("h-10 !text-base !lg:text-lg", className)}
        hasError={hasError}
        icon={prefixIcon ? true : false}>
        {prefixIcon && <div className="prefix-icon-wrapper">{prefixIcon}</div>}
        <StyledSelect {...rest} className="w-full" />
      </SelectWrapper>
      {helperText !== undefined && (
        <p className="text-red-700 text-xs font-italized">{helperText}</p>
      )}
    </React.Fragment>
  );
};

export default Dropdown;
