import PageTitle from "@components/pages/page-title";
import React from "react";
import BannerImage from "@assets/images/banner.jpg";
import Layout from "@components/pages/layout";

export default function BookingConfirmation() {

  return (
    <Layout>
      <PageTitle title="Booking Confirmationn" bgImage={BannerImage} />
      <div>
        <p>Your booking has been confirmed. Thank you for booking with us.</p>
      </div>
    </Layout>
  );
}
