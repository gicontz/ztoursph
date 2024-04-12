import React, { useCallback } from "react";
import { AutoComplete, InputProps, Select } from "antd";
import styled from "@emotion/styled";
import { classNames } from "@app/utils/helpers";
import Input from "./input";
import CountryCode from "country-codes-list";

const SelectWrapper = styled.div<{ hasError?: boolean }>`
  position: relative;
  overflow: hidden;

  .country-calling-code-wrapper {
    position: absolute;
    z-index: 1;
    width: 4rem;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .ant-select-selector {
      border-color: ${({ hasError }) =>
        hasError ? "rgb(185 28 28)" : "#d9d9d9"};
      border-radius: 3px 0 0 3px;
    }
  }

  .ant-input-outlined {
    text-indent: calc(4rem - 8px);
    border-color: ${({ hasError }) =>
      hasError ? "rgb(185 28 28)" : "#d9d9d9"};
  }

  @media screen and (max-width: 821px) {
    width: 100%;
  }

  .ant-select-seletion-placeholder {
    color: black;
  }
`;

const StyledInput = styled(Input)`
  height: 100%;
  @media screen and (max-width: 821px) {
    width: 100%;
  }
`;

export interface DropdownProps extends InputProps {
  onGetNumber?: (e: { countryCode: string; number: undefined }) => void;
  className?: string;
  hasError?: boolean;
  helperText?: string;
}

const MobileNumberInput: React.FC<DropdownProps> = ({
  onGetNumber,
  className,
  hasError,
  helperText,
  ...rest
}) => {
  let mutableValue = {
    countryCode: "",
    number: undefined,
  };
  const [number, setNumber] = React.useState(mutableValue);
  const countryCodeString = "countryCode";
  const myCountryCodesObject = CountryCode.customList(
    countryCodeString && undefined, // <== just remove red line
    "+{countryCallingCode}"
  );

  const contactOption = Object.keys(myCountryCodesObject).map((e) => ({
    label: e,
    value: myCountryCodesObject[e],
  }));

  const countryCallingCodeHandler = (value) => {
    if (!value) return;
    setNumber((prev) => {
      onGetNumber && onGetNumber({ ...prev, countryCode: value });
      return { ...prev, countryCode: value };
    });
  };

  const onChangeInputHandler = (e) => {
    const value = e.target.value;
    setNumber((prev) => {
      onGetNumber &&
        onGetNumber({ ...prev, number: value === "" ? undefined : value });
      return { ...prev, number: value === "" ? undefined : value };
    });
  };
  return (
    <React.Fragment>
      <SelectWrapper
        className={classNames("h-fit", className)}
        hasError={hasError}>
        <AutoComplete
          className="country-calling-code-wrapper "
          value={number.countryCode}
          options={contactOption}
          onChange={countryCallingCodeHandler}
          placeholder="ex. PH"
          filterOption={(inputValue, option: { label }) =>
            option.label.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0 ||
            option.label.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0
          }
        />
        <StyledInput
          type="number"
          value={number.number}
          {...rest}
          onChange={onChangeInputHandler}
          className="w-full"
        />
      </SelectWrapper>
      {helperText && (
        <p className="text-red-700 text-xs font-italized">{helperText}</p>
      )}
    </React.Fragment>
  );
};

export default MobileNumberInput;
