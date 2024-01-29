import TestImageA from "@assets/images/tour_a.jpg";
import TestImageB from "@assets/images/tour_b.jpg";
import TestImageC from "@assets/images/tour_c.jpg";
import styled from "@emotion/styled";
import HeaderSection from "@components/commons/header-section";
import ListingCard from "@components/listing/listing-card";
import { PanelSection, Row } from "@components/commons/common";
import Layout from "@components/pages/layout";
import Button from "@components/commons/button";

const ListCardsContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1000px;
  margin: auto;
  width: 100%;
  @media (max-width: 1085px) {
    width: 90%;
  }
`;

const Panel = styled(Row)`
  display: flex;
  width: 67rem;
  margin: auto;
  margin-top: 7rem;
  margin-bottom: 1rem;
  flex-direction: column;
  gap: 10px;
  @media (max-width: 1000px) {
    font-size: 0.6rem;
    width: 90%;
  }
`;

const Description = styled.div`
  font-size: 0.9rem;
  display: flex;
  color: #596363;
  justify-content: space-between;

  a {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    font-size: 0.6rem;
  }
`;

const LoadMoreButton = styled(Button)`
  margin: auto;

  &.ant-btn-primary {
    background-color: transparent !important;
    border-color: #23432c !important;
    color: #23432c !important;

    &:hover {
      background-color: #23432c !important;
      border-color: #23432c !important;
    }
  }
`;

export default function Tours() {
  const data = [
    {
      location: `Tour A`,
      title: "El Nido Island Tour A",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eu aliquam ligula. Pellentesque ut nunc consequat, dapibus nisi vitae, euismod velit. Pellentesque sit amet enim elit.",
      price: 1000,
      rate: 5,
      reviews: 84,
      imageUrl: TestImageA,
    },
    {
      location: `Tour B`,
      title: "El Nido Island Tour B",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eu aliquam ligula. Pellentesque ut nunc consequat, dapibus nisi vitae, euismod velit. Pellentesque sit amet enim elit.",
      price: 1000,
      rate: 5,
      reviews: 87,
      imageUrl: TestImageB,
    },
    {
      location: `Tour C`,
      title: "El Nido Island Tour C",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eu aliquam ligula. Pellentesque ut nunc consequat, dapibus nisi vitae, euismod velit. Pellentesque sit amet enim elit.",
      price: 1000,
      rate: 5,
      reviews: 97,
      imageUrl: TestImageC,
    },
    {
      location: `Tour D`,
      title: "Cebu Tour D",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eu aliquam ligula. Pellentesque ut nunc consequat, dapibus nisi vitae, euismod velit. Pellentesque sit amet enim elit.",
      price: 1000,
      rate: 5,
      reviews: 84,
      imageUrl:
        "https://i0.wp.com/wanderlustyle.com/wp-content/uploads/2017/12/boy-swims-w-whale-shark.jpg?fit=1600%2C970&ssl=1",
    },
    {
      location: `Tour E`,
      title: "Cebu Tour E",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eu aliquam ligula. Pellentesque ut nunc consequat, dapibus nisi vitae, euismod velit. Pellentesque sit amet enim elit.",
      price: 1000,
      rate: 5,
      reviews: 87,
      imageUrl:
        "https://www.islandtrektours.com/wp-content/uploads/2023/09/whale-shark-watching-from-the-boat-in-Oslob-cebu.jpg",
    },
    {
      location: `Tour F`,
      title: "Cebu Tour F",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eu aliquam ligula. Pellentesque ut nunc consequat, dapibus nisi vitae, euismod velit. Pellentesque sit amet enim elit.",
      price: 1000,
      rate: 5,
      reviews: 97,
      imageUrl:
        "https://myhouse.ph/wp-content/uploads/2022/12/mactan-banner.jpg-1170x0-c-center.webp",
    },
  ];
  return (
    <Layout>
      <Panel>
        <HeaderSection>Our Tour Collection</HeaderSection>
        <Description>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
            pharetra, lacus eget consectetur eleifend, quam sem mattis dolor,
            non sodales tellus nulla nec est.
          </p>
        </Description>
        <ListCardsContainer>
          {data.map((data, key) => (
            <ListingCard key={key} data={data} />
          ))}
        </ListCardsContainer>
        <LoadMoreButton
          onClick={() => console.log("Load More Tours")}
          type="primary">
          Load More Tours
        </LoadMoreButton>
      </Panel>
    </Layout>
  );
}
