import React from "react";
import styled from "@emotion/styled";
import { Row } from "@components/commons/common";
import PageBanner from "@components/pages/page-banner";
import CheckoutForm from "@app/layouts/forms/CheckoutForm";

const font = Poppins({
  weight: "400",
  subsets: ["latin"],
});

const Container = styled(Row)`
  color: #23432c;
  padding: 1rem;
`;

function BookingConfirmation() {
  return (
    <>
      <PageBanner
        title={"Checkout"}
        bannerImage="/banner.jpg"
        description={"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
      />
      <Container className={font.className}></Container>
    </>
  );
}

export default BookingConfirmation;
