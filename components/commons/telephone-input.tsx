import React from "react";
import { AutoComplete, InputProps, Select } from "antd";
import styled from "@emotion/styled";
import { classNames } from "@app/utils/helpers";
import Input from "./input";
import CountryCode from "country-codes-list";
import Flags from "react-world-flags";
import _ from "lodash";

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
    text-indent: 8px;
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

export interface DropdownProps extends InputProps {
  onGetNumber?: (e: { countryCode: string; number?: number }) => void;
  className?: string;
  hasError?: boolean;
  helperText?: string;
  defaultVal?: {
    countryCode?: string;
    number?: string;
  };
}

const MobileNumberInput: React.FC<DropdownProps> = ({
  onGetNumber,
  className,
  hasError,
  helperText,
  defaultVal,
  ...rest
}) => {
  let mutableValue = {
    countryCode: defaultVal?.countryCode ?? "",
    number: defaultVal?.number ? parseInt(defaultVal?.number) : undefined,
  };
  const [number, setNumber] = React.useState(mutableValue);
  const countryCodeString = "countryCode";
  const myCountryCodesObject = CountryCode.customList(
    countryCodeString && undefined,
    "+{countryCallingCode}"
  );

  const contactOption = Object.keys(myCountryCodesObject).map((e) => ({
    label: `${e} ${myCountryCodesObject[e]}`,
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
        className={classNames("flex relative items-center h-10", className)}
        hasError={hasError}
      >
        <div className="absolute z-[11] left-2 top-3 w-8 h-6">
          <Flags
            code={_.findKey(
              myCountryCodesObject,
              (o) => o === number.countryCode
            )?.toLowerCase()}
          />
        </div>

        <AutoComplete
          className="h-full [&>.ant-select-selector>span>input]:text-right -mr-4 z-10 [&>.ant-select-selector]:rounded-r-none !w-32"
          value={number.countryCode}
          options={contactOption}
          onChange={countryCallingCodeHandler}
          placeholder="ex. PH"
          filterOption={(inputValue, option: { label }) =>
            option.label.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0 ||
            option.label.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0
          }
        />
        <Input
          type="number"
          value={number.number}
          {...rest}
          onChange={onChangeInputHandler}
          className="w-full h-full"
        />
      </SelectWrapper>
      {helperText && (
        <p className="text-red-700 text-xs font-italized">{helperText}</p>
      )}
    </React.Fragment>
  );
};

export default MobileNumberInput;
