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
    { key: "2", label: "Why Choose Us?", children: <p>Our client’s satisfaction regarding their journey with us truly matters. Our agency always makes sure that the tours we offer are all crafted personally for our dearest clients. Behind the itinerary that our client enjoys is made by a passionate individual who always wanted to give and provide excellent and exceptional services. We are also dedicated and actively participating in sustainable and responsible tourism, and supporting local community activities.
    </p> },
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
    { key: "1", label: "Terms and Conditions", children: <div><p><strong>A. Reservation Policies</strong></p>
    <p>First, at least a 50% deposit of the total amount is required for confirmation of booking, and the remaining amount should be settled a day before guest arrival. If full payment is not received before the arrival date, Z Tours.ph Travel and Tours have the right to charge the guest before going on the tour or any activities.</p>
    
    <p>All reservations require the quotation of tours. Partner travel agencies will be given priority.</p>
    
    <p>Pencil blocking is only until one (1) week before the scheduled guest arrival. No confirmation until the time limit will automatically forfeit from the blocking.</p>
    
    <p><strong>B. Discounted Policy</strong></p>
    <ul>
      <li>Kids aged 0-3 years old are free of charge.</li>
      <li>Those aged 4 to 6 years old are required to pay at least 50% of the original tour price.</li>
      <li>Kids aged 7 years old and above are all required to pay the full amount.</li>
      <li>Senior Citizens with a valid Office of Senior Citizen Affairs (OSCA ID) are entitled to a 20% discount from the original price. (Note: This is only applicable for Filipino Senior Citizens.)</li>
      <li>Persons with Disabilities (PWD) are also entitled to a 20% discount from the original tour price.</li>
    </ul>
    
    <p><strong>Note:</strong> This only applies to the regular rate of island-hopping tours. All government fees are not included in discounted rates.</p>
    
    </div> },
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
