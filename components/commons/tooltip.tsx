import { Tooltip as AntTooltip } from "antd";
import { TooltipPropsWithTitle } from "antd/es/tooltip";
import React from "react";

interface TooltipProps extends TooltipPropsWithTitle {
  text: string;
}

const TooltipText: React.FC<TooltipProps> = ({ text, children, ...rest }) => {
  const textTooltip = <span>{text}</span>;
  return (
    <AntTooltip color="#233d2ccc" {...rest} title={textTooltip}>
      {children}
    </AntTooltip>
  );
};

export default TooltipText;
