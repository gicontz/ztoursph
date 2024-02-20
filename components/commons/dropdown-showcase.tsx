import Dropdown, { DropdownProps } from "@components/commons/dropdown";
import { blurImageData } from "@constants/image";
import styled from "@emotion/styled";
import { Tooltip } from "antd";
import Image from "next/image";
import { title } from "process";
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
  view?: ((d: boolean) => void) | undefined;
  loadMore?: boolean;
  control: any;
}

const DropdownShowcase: React.FC<DestDropdownProps> = ({
  data,
  view,
  loadMore,
  control,
  ...rest
}) => {
  const [dropdownOptions, setDropdownOptions] =
    React.useState<typeof data>(data);
  const { ref, inView } = useInView({ threshold: 1 });

  React.useEffect(() => {
    setDropdownOptions(data);
  }, [data]);

  React.useMemo(() => {
    if (view) {
      view(inView);
    }
  }, [inView]);

  const option = dropdownOptions?.map((element, index) => {
    return {
      value: element.slug,
      label: (
        <div
          key={index}
          ref={index === dropdownOptions?.length - 1 ? ref : null}>
          <DropDownSearchList
            imageUrl={element.url}
            title={element.title}
            description={element.description}
          />
          {index === dropdownOptions?.length - 1 && loadMore ? (
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
