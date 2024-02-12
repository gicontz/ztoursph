import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const Loading: React.FC = () => (
  <Spin
    indicator={
      <LoadingOutlined
        style={{ fontSize: 50, color: "#23432c", width: "fit-content" }}
        spin
      />
    }
  />
);

export default Loading;
