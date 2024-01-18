import React, { ReactNode } from "react";
import { Select } from "antd";
import styled from "@emotion/styled";

interface DropdownProps {
  option?: { label: string | number; value: string | number }[];
  prefixIcon?: ReactNode;
  onSearch?: (e: any) => void;
  onChange?: (e: any) => void;
  className?: string;
  placeholder?: string;
  isNumber?: boolean;
}

const SelectWrapper = styled.div`
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

  && .ant-select .ant-select-selector {
    padding-left: calc(3rem - 8px);
  }
`;

const StyledSelect = styled(Select)<{ isNumber?: boolean }>`
  .ant-select-selection-placeholder {
    color: black;
  }
  width: ${(props) => (props.isNumber ? "8rem" : "15rem")};
  height: 3rem;
`;

const Dropdown: React.FC<DropdownProps> = ({
  onChange,
  onSearch,
  option,
  className,
  isNumber,
  placeholder,
  prefixIcon,
  ...rest
}) => {
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <SelectWrapper>
      {prefixIcon && <div className="prefix-icon-wrapper">{prefixIcon}</div>}
      <StyledSelect
        showSearch
        placeholder={placeholder}
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}
        options={option}
        filterOption={filterOption}
        isNumber={isNumber ?? false}
        {...rest}
      />
    </SelectWrapper>
  );
};

export default Dropdown;
