import HeaderText from "@components/commons/header-text";
import Layout from "@components/pages/layout";
import PageBanner from "@components/pages/page-banner";
import styled from "@emotion/styled";
import Image from "next/image";
import React from "react";

const AboutUsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  padding: 2rem 7rem;

  @media screen and (max-width: 800px) {
    flex-direction: column;
    gap: 1.5rem;
    padding: 2rem;
  }
`;

const AboutUsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 1rem;

  .list {
    padding-left: 1.4rem;
    list-style-type: circle;
  }

  p {
    text-align: justify;
  }

  .ant-timeline {
    li {
      font-size: 1rem;
    }
    margin-top: 1rem;
  }
`;

const NextImage = styled(Image)`
  object-fit: none;
  width: 100%;
  height: 16rem;
`;

type ImageIndividualProps = {
  name: string;
  title: string;
  url: string;
};

type ImageTeamProps = {
  department: string;
  data: ImageIndividualProps[];
};
const ImageIndividual: React.FC<ImageIndividualProps> = ({
  name,
  title,
  url,
}) => {
  return (
    <div className="flex flex-col w-64 ">
      <NextImage
        className="rounded-lg "
        src={url}
        alt={`image of ${name}`}
        width={500}
        height={500}
      />
      <h4 className="font-bold text-xl mt-5">{name}</h4>
      <p className="text-sm">{title}</p>
    </div>
  );
};

const ImageTeam: React.FC<ImageTeamProps> = ({ department, data }) => {
  return (
    <>
      <h2 className="font-bold text-2xl">{department}</h2>
      <div className="card_divider">
        {data?.map((d, index) => (
          <ImageIndividual
            key={index}
            name={d.name}
            title={d.title}
            url={d.url}
          />
        ))}
      </div>
    </>
  );
};

const AboutUs = () => {
  const bannerText = {
    title: "About Us",
    description:
      " A section of who we are and anything about us under the sun.",
    bannerImage: "/about-us.jpeg",
  };

  return (
    <Layout>
      <PageBanner
        title={bannerText.title}
        description={bannerText.description}
        bannerImage={bannerText.bannerImage}
      />
      <AboutUsContainer>
        <AboutUsSection>
          <HeaderText size={2} underline>
            Welcome to ZTours.ph! We are here to help you transform your travel
            plans into a memorable one.
          </HeaderText>
          <p>
            For a brief history, ZTours.ph was founded and established years
            ago. This agency is now making a name to the scene of travel and
            tour agency here in Palawan. Our good office is originally located
            at Rizal St. Brgy. Maligaya, El Nido, Palawan, and is also owned by
            a humble former local guide based in El Nido.
          </p>
        </AboutUsSection>
        <AboutUsSection>
          <HeaderText size={2} underline>
            Our Mission
          </HeaderText>
          <p>
            As we begin on this journey, our mission is clear and that is to
            stand out as one of the premier travels and tour agencies in the
            Philippines, highlighting the unique experience of each of our
            client’s chosen tours and trips. We are truly committed in
            delivering high-quality and value-driven services using creative and
            innovative solutions that surpass the guest expectations.
          </p>
        </AboutUsSection>
        <AboutUsSection>
          <HeaderText size={2} underline>
            Our Vision
          </HeaderText>
          <p>
            By 2025, we aim to carve and solidify our standing as the leading
            go-to provider of island tours, expedition tours, van transfers, and
            various activities on the island. In order to maintain a consistent
            stream of satisfied customers, we strive to provide exceptional
            hassle-free experiences that goes above beyond expectations.
          </p>
        </AboutUsSection>
        <AboutUsSection>
          <HeaderText size={2} underline>
            Our Goals
          </HeaderText>
          <p>
            Navigate and execute successful travel and tour agency operations to
            maximize benefits for both the organization and attendees. Delight
            clients with superior services, cultivating trust for future
            bookings and reservations with our travel and tour agency. Provide
            services that not only exceed expectations but also come at a
            reasonable cost. Continuously innovate and inspire customers in
            their future travels.
          </p>
        </AboutUsSection>
        <AboutUsSection>
          <HeaderText size={2} underline>
            Our Team
          </HeaderText>
          <p>
            Mind, Heart, and Soul: Meet the masters behind ZTours.ph! Our team
            is composed of a good and humble people, seasoned experts and
            enthusiast in their respective fields and crafts, and licensed
            guides – all of us are bound by a sole purpose, and that is to make
            your every journey with our agency truly unparalleled and
            exceptional.
          </p>
        </AboutUsSection>
      </AboutUsContainer>
    </Layout>
  );
};

export default AboutUs;
