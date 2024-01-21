import styled from "@emotion/styled";
import { AutoCompleteProps, ConfigProvider } from "antd";
import { Controller } from "react-hook-form";
import { AutoComplete as AntAutoComplete } from "antd";

const StyledAutoComplete = styled(AntAutoComplete)`
  .ant-select-selection-placeholder {
    color: black;
  }
  width: "19rem";
  height: 3.5rem;
`;

interface AutoComplete extends AutoCompleteProps {
  name: string;
  control: any;
  rules?: any;
}

const AutoComplete = ({ ...rest }) => {
  return (
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
  );
};

export default AutoComplete;
