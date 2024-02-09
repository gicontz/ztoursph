import styled from "@emotion/styled";
import { Collapse, CollapseProps } from "antd";
import { Poppins } from "next/font/google";
import React from "react";

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

const text = `
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et nunc sapien. Aliquam vestibulum congue odio. Pellentesque finibus nisl est, ut tempor nisi volutpat id.
`;

const collapseItems = {
  AboutUs: [
    { key: "1", label: "Our History", children: <p>{text}</p> },
    { key: "2", label: "Why Choose Us?", children: <p>{text}</p> },
  ],
  OurTours: [
    {
      key: "1",
      label: "What are the most popular tours in El Nido?",
      children: <p>{text}</p>,
    },
    { key: "2", label: "Safety Measures", children: <p>{text}</p> },
    { key: "3", label: "Can We Customize Tours?", children: <p>{text}</p> },
  ],
  Legals: [
    { key: "1", label: "Terms and Conditions", children: <p>{text}</p> },
  ],
  Contact: [
    { key: "1", label: "Accessible Contact Numbers", children: <p>{text}</p> },
    { key: "2", label: "Send Us a Message", children: <p>{text}</p> },
    {
      key: "3",
      label: "Location and Address Information",
      children: <p>{text}</p>,
    },
  ],
};

const poppins = Poppins({ weight: "400", subsets: ["latin"] });

const Category = ({ category = "About Us" }) => {
  const items =
    collapseItems[category.replace(" ", "")] || collapseItems.AboutUs;

  return (
    <StyledCollapse
      className={poppins.className}
      bordered={false}
      expandIcon={({ isActive }) => (isActive ? "" : "")}
      items={items}
      defaultActiveKey={["1"]}
    />
  );
};

export default Category;
