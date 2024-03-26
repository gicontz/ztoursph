
import { Row } from "@components/commons/common";
import PageBanner from "@components/pages/page-banner";
import styled from "@emotion/styled";
import { Poppins, Source_Serif_4 } from "next/font/google";
import React from "react";
import dynamic from "next/dynamic";
import { classNames } from "@app/utils/helpers";
import CheckoutForm from "@app/layouts/forms/CheckoutForm";
const Input = dynamic(() => import("@components/commons/input"), {
  ssr: false,
});

const font = Poppins({
  weight: "400",
  subsets: ["latin"],
});

const Container = styled(Row)`
  color: #23432c;
  padding: 1rem;
`;
export default function Checkout() {
  return (
    <>
      <PageBanner
        title={"Checkout"}
        bannerImage="/banner.jpg"
        description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
      />
      <Container className={font.className}>
        <CheckoutForm />
      </Container>
    </>
  );
}
