import Dropdown, { DropdownProps } from "@components/commons/dropdown";
import { blurImageData } from "@constants/image";
import styled from "@emotion/styled";
import { Tooltip } from "antd";
import Image from "next/image";
import { title } from "process";
import React from "react";
import { useInView } from "react-intersection-observer";
import { StyledDivider } from "./common";

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

  h1 {
    font-size: 0.9rem;
  }

  p {
    font-size: 0.8rem;
  }
`;

const StyledSelect = styled(Dropdown)`
  .rc-virtual-list-scrollbar {
    display: hidden;
  }
`;

const DropDownSearchList = ({ ...data }): JSX.Element => {
  const summary = () => (
    <SummaryContainer>
      <p>{data.description}</p>
    </SummaryContainer>
  );
  return (
    <Tooltip title={summary} placement="right" mouseEnterDelay={0.6}>
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
  control: any;
}

const DropdownShowcase: React.FC<DestDropdownProps> = ({
  data,
  control,
  ...rest
}) => {
  const [dataCotent, setDataCotent] = React.useState(data);
  const { ref, inView } = useInView({ threshold: 0 });

  React.useEffect(() => {
    setDataCotent((d) => [...d, ...data]);
  }, [inView, rest?.loading]);

  const option = (dataCotent || data)?.map((element, index) => {
    const isLastItem = index === dataCotent?.length - 1;
    const isEndOfGroup = (index + 1) % data?.length === 0;
    return {
      value: element.slug,
      label: (
        <div ref={index === dataCotent?.length - 1 ? ref : null}>
          <DropDownSearchList
            imageUrl={element.url}
            title={element.title}
            description={element.description}
          />
        </div>
      ),
      customLabel: element.title,
    };
  });

  return (
    <StyledSelect
      showSearch
      control={control}
      options={option}
      optionLabelProp="customLabel"
      {...rest}
      name={title}
    />
  );
};

export default DropdownShowcase;
