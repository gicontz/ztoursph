import styled from "@emotion/styled";
import { AutoCompleteProps, ConfigProvider } from "antd";
import { Controller } from "react-hook-form";
import { AutoComplete as AntAutoComplete } from "antd";
import { ReactNode } from "react";

const StyledAutoComplete = styled(AntAutoComplete)`
  .ant-select-selection-placeholder {
    color: black;
  }
  width: "19rem";
  height: 3.5rem;
`;

const AutoCompleteWrapper = styled.div<{ icon?: boolean }>`
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
`;

interface AutoComplete extends AutoCompleteProps {
  name: string;
  control: any;
  rules?: any;
  prefixIcon?: ReactNode;
}

const AutoComplete = ({ ...rest }) => {
  return (
    <AutoCompleteWrapper icon={rest?.prefixIcon ? true : false}>
      {rest?.prefixIcon && (
        <div className="prefix-icon-wrapper">{rest?.prefixIcon}</div>
      )}
      <Controller
        name={rest.name}
        control={rest.control}
        rules={rest.rules}
        render={({ field }) => (
          <ConfigProvider
            theme={{
              token: {
                colorBgContainer: "#EAEAEA",
                borderRadius: 2,
              },
            }}>
            <StyledAutoComplete {...rest} {...field} />
          </ConfigProvider>
        )}
      />
    </AutoCompleteWrapper>
  );
};

export default AutoComplete;
