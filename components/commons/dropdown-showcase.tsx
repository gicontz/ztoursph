import Dropdown, { DropdownProps } from "@components/commons/dropdown";
import { blurImageData } from "@constants/image";
import styled from "@emotion/styled";
import { Tooltip } from "antd";
import Image from "next/image";
import React from "react";
import { useInView } from "react-intersection-observer";
import { StyledDivider } from "./common";
import Loading from "./loading";

const PanelSearch = styled.div`
  display: flex;
  padding: 0.2rem 0;
  gap: 0.5rem;
  align-items: center;
  width: 100%;
  font-size: 17px;

  p {
    overflow: hidden;
    white-space: wrap;
    width: 10rem;
  }

  img {
    object-fit: cover;
    width: 100px;
    height: 100px;
    border-radius: 3px;
  }
`;

const SummaryContainer = styled.div`
  display: flex;
  flex-direction: column;

  p {
    font-size: 0.8rem;
  }
`;

const DropDownSearchList = ({ ...data }): JSX.Element => {
  const [screen, setScreen] = React.useState<boolean>(false);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 821) {
        setScreen(true);
      } else {
        setScreen(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const summary = () => (
    <SummaryContainer>
      <p>{data.description}</p>
    </SummaryContainer>
  );
  return (
    <Tooltip
      title={summary}
      placement={screen ? "right" : "top"}
      mouseEnterDelay={0.6}>
      <PanelSearch>
        <Image
          src={data.imageUrl}
          alt={data.title}
          blurDataURL={blurImageData}
          width={320}
          height={216}
        />
        <p>{data.title}</p>
      </PanelSearch>
    </Tooltip>
  );
};

interface DestDropdownProps extends DropdownProps {
  data: {
    title: string;
    description: string;
    slug: string;
    url: React.ComponentProps<typeof Image>["src"];
  }[];
  loadMore?: boolean;
}

const DropdownShowcase: React.FC<DestDropdownProps> = ({
  data,
  loadMore,
  ...rest
}) => {
  const option = data?.map((element, index) => {
    return {
      value: element.slug,
      label: (
        <div key={index}>
          <DropDownSearchList
            imageUrl={element.url}
            title={element.title}
            description={element.description}
          />
          {index === data?.length - 1 && loadMore ? (
            <div className="mx-auto w-fit mt-5">
              <Loading />
            </div>
          ) : null}
        </div>
      ),
      customLabel: element.title,
    };
  });

  return (
    <Dropdown
      showSearch
      options={option}
      optionLabelProp="customLabel"
      {...rest}
    />
  );
};

export default DropdownShowcase;
