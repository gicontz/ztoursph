import styled from "@emotion/styled";
import { AutoCompleteProps } from "antd";
import { AutoComplete as AntAutoComplete } from "antd";
import { ReactNode } from "react";

const StyledAutoComplete = styled(AntAutoComplete)`
  height: 3.5rem;
  width: 100%;
`;

const AutoCompleteWrapper = styled.div<{ icon?: boolean }>`
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
  }

  @media screen and (max-width: 821px) {
    width: 100%;
  }
`;

interface AutoComplete extends AutoCompleteProps {
  prefixicon?: ReactNode;
}

const AutoComplete: React.FC<AutoComplete> = ({ ...rest }) => {
  return (
    <AutoCompleteWrapper icon={rest?.prefixicon ? true : false}>
      {rest?.prefixicon && (
        <div className="prefix-icon-wrapper">{rest?.prefixicon}</div>
      )}
      <StyledAutoComplete {...rest} />
    </AutoCompleteWrapper>
  );
};

export default AutoComplete;
