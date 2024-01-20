"use client";

import { FullWidth, Row } from "@components/commons/common";
import Header from "@components/header";
import styled from "@emotion/styled";
import { Providers } from "./providers";
import BannerImage from "@assets/images/banner.jpg";
import MainPageBooking from "@components/booking/main-page";
import MainPageListing from "@components/listing/main-page";

const Banner = styled(FullWidth)`
  position: relative;
  background-image: url(${BannerImage.src});
  background-attachment: fixed;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center top;
  height: 500px;
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
    <Providers>
      <main className="relative flex flex-col overflow-x-hidden sm:w-[100%] h-[100vh]">
        <Row>
          <Header />
        </Row>
        <Banner>
          <Row className="pt-24 pb-24">
            <TagLine>Seize the Zen</TagLine>
            <div className="text-right">
              <Phrase>
                Embrace the nature in the magnificent waters
                <br /> of Palawan. Experience the breathtaking
                <br /> views and sceneries that you can only catch
                <br /> here in the Philippines.
                <br />
                <strong>Be You. Be Free. Be Zest.</strong>
              </Phrase>
            </div>
          </Row>
        </Banner>
        <MainPageBooking />
        <MainPageListing />
      </main>
    </Providers>
  );
}
