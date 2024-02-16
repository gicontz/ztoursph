import React, { ReactNode } from "react";
import { Select, SelectProps } from "antd";
import styled from "@emotion/styled";

const SelectWrapper = styled.div<{ icon?: boolean }>`
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
  }
  @media screen and (max-width: 821px) {
    width: 100%;
  }

  .ant-select-selection-placeholder {
    color: black;
  }
`;

const StyledSelect = styled(Select)<{ isnumber?: boolean }>`
  width: 19rem;
  height: 3.5rem;
  @media screen and (max-width: 821px) {
    width: 100%;
  }
`;

export interface DropdownProps extends SelectProps {
  prefixIcon?: ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({ prefixIcon, ...rest }) => {
  return (
    <SelectWrapper icon={prefixIcon ? true : false}>
      {prefixIcon && <div className="prefix-icon-wrapper">{prefixIcon}</div>}
      <StyledSelect {...rest} />
    </SelectWrapper>
  );
};

export default Dropdown;
