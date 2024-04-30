import styled from "@emotion/styled";
import { AutoCompleteProps } from "antd";
import { AutoComplete as AntAutoComplete } from "antd";
import classNames from "classnames";
import React from "react";
import { ReactNode } from "react";

const StyledAutoComplete = styled(AntAutoComplete)`
  height: 3.5rem;
  width: 100%;
`;

const AutoCompleteWrapper = styled.div<{ icon?: boolean; hasError?: boolean }>`
  position: relative;
  width: 14rem;

  .prefix-icon-wrapper {
    position: absolute;
    z-index: 1;
    width: 3rem;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .ant-select-selection-placeholder {
    color: black;
  }

  .ant-select .ant-select-selector {
    text-indent: ${(props) => (props.icon ? "calc(2rem - 8px)" : "")};
    border-color: ${({ hasError }) =>
      hasError ? "rgb(185 28 28)" : "#d9d9d9"};
  }

  @media screen and (max-width: 821px) {
    width: 100%;
  }
`;

interface AutoComplete extends AutoCompleteProps {
  prefixicon?: ReactNode;
  helperText?: string;
  hasError?: boolean;
}

const AutoComplete: React.FC<AutoComplete> = ({
  helperText,
  hasError,
  ...rest
}) => {
  return (
    <React.Fragment>
      <AutoCompleteWrapper
        hasError={hasError}
        icon={rest?.prefixicon ? true : false}>
        {rest?.prefixicon && (
          <div className="prefix-icon-wrapper">{rest?.prefixicon}</div>
        )}
        <StyledAutoComplete
          {...rest}
          className={classNames(rest.className, "!text-base !lg:text-lg")}
        />
      </AutoCompleteWrapper>
      {helperText !== undefined && (
        <p className="text-red-700 text-xs font-italized">{helperText}</p>
      )}
    </React.Fragment>
  );
};

export default AutoComplete;
