import { FullWidth, Row } from "@components/commons/common";
import Header from "@components/header";
import styled from "@emotion/styled";
import BannerImage from "@assets/images/banner.jpg";
import MainPageBooking from "@components/booking/main-page";
import MainPageListing from "@components/listing/main-page";
import MainPageTestimonial from "@components/testimonial/main-page";
import MainPageClosing from "@components/closing/main-page";
import Layout from "@components/pages/layout";

const Banner = styled(FullWidth)`
  position: relative;
  background-image: url(${BannerImage.src});
  background-attachment: fixed;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center top;
  height: 500px;
  padding-top: 100px;
  &::before {
    content: "";
    background-color: rgba(0, 0, 0, 0.3);
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
  @media screen and (max-width: 1200px) {
    background-position: unset;
  }
`;

const TagLine = styled.h2`
  position: relative;
  font-family: Source Serif Pro;
  font-weight: bold;
  font-size: 44px;
  color: #ffffff;
`;

const Phrase = styled.p`
  position: relative;
  margin-top: 20px;
  font-weight: normal;
  color: #ffffff;
  text-align: left;
`;

export default function Home() {
  return (
    <Layout>
      <Banner>
        <Row className="pb-24">
          <TagLine>Travel Way Beyond Your Borders! </TagLine>
          <div className="text-right">
            <Phrase>
            Explore and seize the ethereal beauty and
              <br />paradisiacal vibe of the Last Frontier of the Philippines – Palawan.
            </Phrase>
          </div>
        </Row>
      </Banner>
      <MainPageBooking />
      <MainPageListing />
      <MainPageTestimonial />
      <MainPageClosing />
    </Layout>
  );
}
