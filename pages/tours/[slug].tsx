import { Row } from "@components/commons/common";
import styled from "@emotion/styled";
import ImageTemplate from "@components/tours/image-template";
import TourBookingForm from "@components/commons/tour-booking-form";
import TestImageA from "@assets/images/tour_a.jpg";
import TestImageB from "@assets/images/tour_b.jpg";
import TestImageC from "@assets/images/tour_c.jpg";
import { useRouter } from "next/router";
import { Divider } from "antd";
import PageTitle from "@components/pages/page-title";
import Layout from "@components/pages/layout";

const Panel = styled(Row)`
  display: flex;
  flex-direction: column;
  font-size: 1.1rem;
  gap: 0.5rem;
  line-height: 1.7rem;
  margin: 0 auto;
  margin-bottom: 1rem;
  width: 50rem;

  h2 {
    color: #23432c;
    font-family: "Source_Serif_Pro";
    font-size: 1.5rem;
    font-weight: 900;
    line-height: 2rem;
  }
  @media screen and (max-width: 740px) {
    width: 90%;
  }
`;

const PackageDetail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  ul {
    list-style-type: none;
    padding-left: 20px;
  }

  li {
    margin: 2px 0;
  }

  li::marker {
    content: "• ";
    color: black;
    font-size: 15px;
    margin-right: 10px;
  }
`;

const StyledDivider = styled(Divider)`
  border-top: 1px solid #23432c;
  margin: 10px 0;
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
    "5 Island Destinations",
    "Licensed Tour Guide ",
    "Picnic/Buffet Lunch",
    "Life Vest ",
    "Comfortable Boat",
  ];

  const data = {
    title: "El Nido Island Tour A",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    inclusion: Inclusion,
    price: 1000,
    bannerImage: "https://i.imgur.com/fsyrScY.jpg",
    images: dummyData,
    discount: { previous: 1250, current: 1000 },
  };

  const InclusionContent =
    data.inclusion && data.inclusion.length !== 0 ? (
      <>
        <h2>Inclusion</h2>
        <ul>
          {data.inclusion?.map((e, index) => (
            <li key={index}>{e}</li>
          ))}
        </ul>
      </>
    ) : (
      ""
    );

  const priceContent = data.discount ? (
    <div className=" px-2 py-2 font-semibold w-full bg-gray-100 flex gap-2 items-center">
      <p className=" text-[1rem] line-through opacity-90">
        ₱{data.discount.previous}
      </p>
      <p className="text-2xl ">₱{data.discount.current}</p>
      <div className="text-xs px-1 bg-[#23432C] text-white">
        -
        {Math.floor(
          ((data.discount.previous - data.discount.current) /
            data.discount.current) *
            100
        )}
        %
      </div>
    </div>
  ) : (
    <p className="text-2xl px-2 py-2 font-semibold w-full bg-gray-100">
      ₱{data.price}
    </p>
  );
  return (
    <Layout>
      <div className="mt-[6rem] ">
        <PageTitle title={data.title} bgImage={data.bannerImage} />
      </div>
      <Panel>
        <Row>
          <div className="mt-[2rem] flex flex-col gap-2">
            <h2>Package Details</h2>
            {priceContent}
          </div>
        </Row>
        <Row>
          <div>
            <PackageDetail className="text-justify">
              <div>
                <h2>Tour Details</h2>
                <p>{data.description}</p>
              </div>
              <div>{InclusionContent}</div>
            </PackageDetail>
          </div>
        </Row>
        <Row>
          <h2 className="mb-1">Gallery</h2>
          <ImageTemplate data={data.images} />
        </Row>

        <Row>
          <div>
            <h2>Book This Tour</h2>
            <StyledDivider />
          </div>

          <TourBookingForm onSubmit={(e) => console.log(e)} />
        </Row>
      </Panel>
      <br />
    </Layout>
  );
}
