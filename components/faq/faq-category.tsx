import styled from "@emotion/styled";
import { Collapse } from "antd";
import { Poppins } from "next/font/google";
import React from "react";
import { collapseItems } from "./faq-content";

type CategoryProps = {
  category: string;
  activeKey: string | number | undefined;
};

const StyledCollapse = styled(Collapse)`
  border-radius: 3px;
  width: 27.5rem;
  .ant-collapse-header {
    font-size: 1.1rem !important;
    color: #233d2c !important;
  }

  @media screen and (max-width: 800px) {
    width: 100%;
  }
`;

const poppins = Poppins({ weight: "400", subsets: ["latin"] });

const Category: React.FC<CategoryProps> = ({ category, activeKey }) => {
  const items =
    collapseItems[category.replace(" ", "")] || collapseItems.AboutUs;

  return activeKey ? (
    <StyledCollapse
      className={poppins.className}
      bordered={false}
      items={items}
      expandIcon={({ isActive }) => (isActive ? "" : "")}
      defaultActiveKey={activeKey}
      activeKey={activeKey}
    />
  ) : (
    <StyledCollapse
      className={poppins.className}
      bordered={false}
      items={items}
      expandIcon={({ isActive }) => (isActive ? "" : "")}
      defaultActiveKey={activeKey}
    />
  );
};

export default Category;
