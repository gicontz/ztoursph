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
    { key: "1", label: "Our History", children: <p>For a brief story, ZTours.ph was founded and established years ago. This agency is now making a name to the scene of travel and tour agency here in Palawan.
    Our good office is originally located at Rizal St. Brgy. Maligaya, El Nido, Palawan, and is also owned by a humble former local guide based in El Nido.
    </p> },
    { key: "2", label: "Why Choose Us?", children: <p>Our client’s satisfaction regarding their journey with us truly matters. Our agency always makes sure that the tours we offer are all crafted personally for our dearest clients. Behind the itinerary that our client enjoys is made by a passionate individual who always wanted to give and provide excellent and exceptional services. We are also dedicated and actively participating in sustainable and responsible tourism, and supporting local community activities.
    </p> },
  ],
  OurTours: [
    {
      key: "1",
      label: "What are the most popular tours in El Nido?",
      children: <p>The most popular and breathtaking tour in El Nido is often considered TOUR A. It features stunning lagoons and picturesque limestone formations with crystal-clear seawater.
      </p>,
    },
    { key: "2", label: "Safety Measures", children: <p>ZTous.ph ensures that our clients are safe in whatever tour they choose. Our staffs are all well-trained regarding different safety emergency trainings like first-aid and CPR trainings. We also consider health condition like food allergies (if client&apos;s have), informing us ahead of time regarding this matter is highly appreciated. Rest assured that our agency is capable of giving the best service and the trust that you have given us.
    </p> },
    { key: "3", label: "How much does a single tour cost per person?", children: <p>The cost for a single tour per person varies and is based on the specific tour package you choose. It&apos;s advisable to check the “TOURS” main tabs option on the top right side of the website.
    </p> },
    { key: "4", label: "What is the time duration of the tour?", children: <p>The tour duration depends on the specific package/tour you have chosen. But typically, each tour takes almost a full day to finish.
    </p> },
    { key: "5", label: "When is the departure and arrival times for the tour?", children: <p> The passenger boat can carry and accommodate varying people capacities, but usually holds 10-12 passengers per boat.
    </p> },
    { key: "6", label: "What is the maximum capacity per boat for accommodating passengers?", children: <p> Tour departure and arrival times depends on the operator, and tour package you avail. For regular tours, it usually starts at 9:00 in the morning and ends by 5:00 in the afternoon. Private tours start earlier, like around 7:00 am, and then also ends by 5:00 in the afternoon.
    </p> },
    { key: "7", label: "What are the inclusions of the Island Tour?", children: <p> Inclusions of the island tour basically includes a boat, tour guide, life vest, lunch, etc. Please note that the package inclusions changes depending on how long you will stay and what kind of package you have availed. For you to see the details, just check our Tour section in this website.
    </p> },
    { key: "8", label: "Where does the island tour start?", children: <p>  Island tours generally start from El Nido Town Proper.</p> },
    { key: "9", label: "Which island tour would you recommend?", children: <p> All island tours are recommendable; each has its own uniqueness and vivid differences to showcase. It will vary based on your taste and preference. 
    </p> },
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
    { key: "1", label: "Accessible Contact Numbers", children: <div><p>For future questions or inquiries, you can contact us through these numbers:</p>
    <p><strong>0966-442-8625</strong></p>
    <p><strong>0962-078-7353</strong></p>
    <p>You can also reach us through our social media accounts:</p>
    <p>Facebook page: Z Tours.ph</p>
    </div> },
    { key: "2", label: "Send Us a Message", children: <p>We want to hear something from you! You can use this website to send us a message.
    Just refer to Contact Us page to start composing your thoughts or queries, etc.</p> },
    {
      key: "3",
      label: "Location and Address Information",
      children: <p>ZTours.ph agency office is located at Rizal St. Brgy. Maligaya, El Nido, Palawan. 
      Refer to Contact Us page for you to view the exact route / direction of our office.
      </p>,
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
