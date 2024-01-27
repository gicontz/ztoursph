import MainPageHeader from "@components/tours/main-page";
import TestImageA from "@assets/images/tour_a.jpg";
import TestImageB from "@assets/images/tour_b.jpg";
import TestImageC from "@assets/images/tour_c.jpg";
import styled from "@emotion/styled";
import HeaderSection from "@components/commons/header-section";
import ListingCard from "@components/listing/listing-card";
import { PanelSection } from "@components/commons/common";
import Layout from "@components/pages/layout";
import Button from "@components/commons/button";

const ListCardsContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const Panel = styled(PanelSection)`
  display: flex;
  width: fit-content;
  margin-top: 1rem;
  flex-direction: column;
  gap: 10px;
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
      location: `Tour A`,
      title: "Cebu Tour A",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eu aliquam ligula. Pellentesque ut nunc consequat, dapibus nisi vitae, euismod velit. Pellentesque sit amet enim elit.",
      price: 1000,
      rate: 5,
      reviews: 84,
      imageUrl:
        "https://i0.wp.com/wanderlustyle.com/wp-content/uploads/2017/12/boy-swims-w-whale-shark.jpg?fit=1600%2C970&ssl=1",
    },
    {
      location: `Tour B`,
      title: "Cebu Tour B",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc eu aliquam ligula. Pellentesque ut nunc consequat, dapibus nisi vitae, euismod velit. Pellentesque sit amet enim elit.",
      price: 1000,
      rate: 5,
      reviews: 87,
      imageUrl:
        "https://www.islandtrektours.com/wp-content/uploads/2023/09/whale-shark-watching-from-the-boat-in-Oslob-cebu.jpg",
    },
    {
      location: `Tour C`,
      title: "Cebu Tour C",
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
        <HeaderSection>Adventure, guided wonders await.</HeaderSection>
        <Description>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Description>
        <ListCardsContainer>
          {data.map((data, key) => (
            <ListingCard key={key} data={data} />
          ))}
        </ListCardsContainer>
        <LoadMoreButton type="primary">Load More</LoadMoreButton>
      </Panel>
    </Layout>
  );
}
