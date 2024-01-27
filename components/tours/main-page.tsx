import { FullWidth, PanelSection } from "@components/commons/common";
import styled from "@emotion/styled";
import ImageTemplate, { ImageTemplateProps } from "./image-grid";
import TourBookingForm from "@components/commons/tour-booking-form";

const HeaderContainer = styled(FullWidth)`
  display: flex;
  justify-content: center;
`;

const Panel = styled(PanelSection)`
  padding-top: 5rem;
  display: flex;
  flex-direction: column;
  justify-items: center;
  gap: 10px;
`;

const TextHeader = styled.h1`
  text-align: center;
  width: 100%;
  font-family: "Source Serif Pro";
  font-size: 4rem;
`;

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

// * Props: title_string, detail_unknown, price_num, images[]
interface MainPageHeaderProps {
  data: {
    title: string;
    description: string;
    inclusion?: string[] | undefined;
    price: number;
    images: { src: string | { src: string }; alt: string }[];
  };
}
const MainPageHeader: React.FC<MainPageHeaderProps> = ({ data }) => {
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
    <HeaderContainer>
      <Panel>
        <TextHeader>
          <strong>{data.title}</strong>
        </TextHeader>
        <div>
          <p className="text-xl font-semibold">Package Details</p>
          <p className="font-semibold">₱{data.price}</p>
        </div>
        <PackageDetail>
          <p>{data.description}</p>
          {InclusionContent}
        </PackageDetail>
        <ImageTemplate data={data.images} />
        <TourBookingForm />
      </Panel>
    </HeaderContainer>
  );
};

export default MainPageHeader;
