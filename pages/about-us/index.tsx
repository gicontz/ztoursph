import HeaderText from "@components/commons/header-text";
import Layout from "@components/pages/layout";
import PageBanner from "@components/pages/page-banner";
import styled from "@emotion/styled";
import { Timeline } from "antd";
import { Poppins } from "next/font/google";
import Image from "next/image";
import React from "react";

const PoppinsFont = Poppins({
  weight: "400",
  subsets: ["latin"],
});

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

const TeamImage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  div {
    display: flex;
  }

  .card_divider {
    gap: 1rem;

    margin-top: 0.5rem;
    margin-bottom: 1rem;
    @media screen and (max-width: 800px) {
      flex-direction: column;
      padding: 1.5rem;
    }
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
        {data?.map((e) => (
          <ImageIndividual
            key={e.name}
            name={e.name}
            title={e.title}
            url={e.url}
          />
        ))}
      </div>
    </>
  );
};

const AboutUs = () => {
  const bannerText = {
    title: "About us",
    description:
      "learn about us Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    bannerImage:
      "https://scontent.fmnl19-1.fna.fbcdn.net/v/t39.30808-6/385242088_643227361255401_1388942983329103279_n.png?_nc_cat=103&ccb=1-7&_nc_sid=783fdb&_nc_eui2=AeE3y0selT99SWmCkzGYqgFmk-q0EDwg8qyT6rQQPCDyrCH7uAmEnXP1_zVzMspjtylrvGAw9tCQmV9cp6eGpbNy&_nc_ohc=UDVhahdTP6QAX8YFomD&_nc_ht=scontent.fmnl19-1.fna&oh=00_AfDApjlW6u8T45biYhESXo3wgXhsye0ECWoTSwaErm2Zag&oe=65CE35A0",
  };

  const developer = [
    {
      name: "John Doe ",
      title: "Frontend",
      url: "https://beforeigosolutions.com/wp-content/uploads/2021/12/dummy-profile-pic-300x300-1.png",
    },
    {
      name: "John Doe ",
      title: "Backend",
      url: "https://beforeigosolutions.com/wp-content/uploads/2021/12/dummy-profile-pic-300x300-1.png",
    },
  ];

  const timeline_content = [
    {
      children:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. 2015-09-01",
      color: "#233d2c",
    },
    {
      children: "Lorem ipsum dolor sit amet, consectetur. 2015-09-01",
      color: "#233d2c",
    },
    {
      children: "Lorem ipsum dolor sit amet. 2015-09-01",
      color: "#233d2c",
    },
    {
      children:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. 2015-09-01",
      color: "#233d2c",
    },
  ];
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
            About us
          </HeaderText>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec at
            condimentum nulla. Nullam ultrices tempus ligula, eget luctus magna
            consectetur sed. In tincidunt porta risus sed eleifend. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Donec at condimentum
            nulla. Nullam ultrices tempus ligula, eget luctus magna consectetur
            sed. In tincidunt porta risus sed eleifend.
          </p>
        </AboutUsSection>
        <AboutUsSection>
          <HeaderText link=" " size={2} underline>
            Our Mission
          </HeaderText>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec at
            condimentum nulla. Nullam ultrices tempus ligula, eget luctus magna
            consectetur sed. In tincidunt porta risus sed eleifend.
          </p>
          <ul className="list">
            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
            <li>Donec at condimentum nulla.</li>
            <li>
              Nullam ultrices tempus ligula, eget luctus magna consectetur sed.
            </li>
          </ul>
        </AboutUsSection>
        <AboutUsSection>
          <HeaderText size={2} underline>
            Our Journey
          </HeaderText>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec at
            condimentum nulla. Nullam ultrices tempus ligula, eget luctus magna
            consectetur sed. In tincidunt porta risus sed eleifend.
          </p>
          <Timeline
            className={PoppinsFont.className}
            items={timeline_content}
          />
        </AboutUsSection>
        <AboutUsSection>
          <HeaderText link=" " size={2} underline>
            Our Team
          </HeaderText>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec at
            condimentum nulla. Nullam ultrices tempus ligula, eget luctus magna
            consectetur sed. In tincidunt porta risus sed eleifend.
          </p>
          <TeamImage>
            <ImageTeam
              department="CEO "
              data={[
                {
                  title: "Founder",
                  name: "John Doe",
                  url: "https://beforeigosolutions.com/wp-content/uploads/2021/12/dummy-profile-pic-300x300-1.png",
                },
              ]}
            />
            <ImageTeam department="Developer" data={developer} />
            <ImageTeam
              department="Marketing"
              data={[
                {
                  title: "Content Creator",
                  name: "John Doe",
                  url: "https://beforeigosolutions.com/wp-content/uploads/2021/12/dummy-profile-pic-300x300-1.png",
                },
              ]}
            />
          </TeamImage>
        </AboutUsSection>
      </AboutUsContainer>
    </Layout>
  );
};

export default AboutUs;
