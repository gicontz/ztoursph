import { FullWidth, PanelSection, Row } from "@components/commons/common";
import styled from "@emotion/styled";
import ImageTemplate from "@components/tours/image-grid";
import TourBookingForm from "@components/commons/tour-booking-form";
import TestImageA from "@assets/images/tour_a.jpg";
import TestImageB from "@assets/images/tour_b.jpg";
import TestImageC from "@assets/images/tour_c.jpg";
import { useRouter } from "next/router";
import { Divider } from "antd";
import PageTitle from "@components/pages/page-title";
import Layout from "@components/pages/layout";

const PackageDetail = styled.div`
  width: 50rem;
  font-size: 1rem;
  gap: 10rem;

  ul {
    list-style-type: none;
    padding-left: 20px;
  }

  li {
    margin: 5px 0;
  }

  li::marker {
    content: "• ";
    color: black;
    font-size: 13px;
    font-weight: bold;
    margin-right: 10px;
  }
`;

export default function Tours() {
  const router = useRouter();
  const slug = router.query.slug;

  const dummyData = [
    {
      src: TestImageA,
      alt: "ImageTest",
    },
    {
      src: TestImageB,
      alt: "ImageTest",
    },
    {
      src: TestImageC,
      alt: "ImageTest",
    },
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png",
      alt: "ImageTest",
    },
    {
      src: "https://i.imgur.com/fsyrScY.jpg",
      alt: "ImageTest",
    },
    {
      src: "https://i.imgur.com/fsyrScY.jpg",
      alt: "ImageTest",
    },
    {
      src: "https://i.imgur.com/fsyrScY.jpg",
      alt: "ImageTest",
    },
    {
      src: TestImageB,
      alt: "ImageTest",
    },
    {
      src: TestImageC,
      alt: "ImageTest",
    },
  ];

  const Inclusion = [
    "Labore et dolore",
    "Sed do eiusmod tempor ",
    "Ullamco laboris",
  ];

  const data = {
    title: "El Nido Tour A",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
    inclusion: Inclusion,
    price: 1000,
    bannerImage: "https://i.imgur.com/fsyrScY.jpg",
    images: dummyData,
  };

  const InclusionContent =
    data.inclusion && data.inclusion.length !== 0 ? (
      <>
        <p className="text-lg mt-4 font-semibold">Inclusion : </p>
        <ul>
          {data.inclusion?.map((e, index) => (
            <li key={index}>{e}</li>
          ))}
        </ul>
      </>
    ) : (
      ""
    );
  return (
    <Layout>
      <FullWidth>
        <PageTitle title={data.title} bgImage={data.bannerImage} />
      </FullWidth>
      <Row>
        <div>
          <p className="text-xl font-semibold">Package Details</p>
          <p className="font-semibold">₱{data.price}</p>
        </div>
        <PackageDetail>
          <p>{data.description}</p>
          {InclusionContent}
        </PackageDetail>
      </Row>
      <Row>
        <h4 className="font-bold text-2xl mb-8 mt-8">Gallery</h4>
      </Row>
      <FullWidth>
        <ImageTemplate data={data.images} />
      </FullWidth>
      <Divider />
      <Row className="!max-w-3xl">
        <h4 className="font-bold text-2xl">Book This Tour</h4>
        <TourBookingForm />
      </Row>
      <br />
    </Layout>
  );
}
