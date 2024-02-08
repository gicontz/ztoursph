import Dropdown, { DropdownProps } from "@components/commons/dropdown";
import { blurImageData } from "@constants/image";
import styled from "@emotion/styled";
import { Tooltip } from "antd";
import Image from "next/image";
import { title } from "process";

const PanelSearch = styled.div`
  display: flex;
  padding: 0.2rem 0;
  gap: 1rem;
  align-items: center;
  width: 100%;
  font-size: 16px;
  overflow-wrap: break-word;

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

const DropDownSearchList = ({ ...data }): JSX.Element => {
  const summary = () => (
    <SummaryContainer>
      <p>{data.description}</p>
    </SummaryContainer>
  );
  return (
    <Tooltip title={summary} placement="right">
      <PanelSearch>
        <Image src={data.imageUrl} alt={data.title} blurDataURL={blurImageData} />
        <p>{data.title}</p>
      </PanelSearch>
    </Tooltip>
  );
};

interface DestDropdownProps extends DropdownProps {
  data: {
    title: string;
    description: string;
    value: string;
    url: React.ComponentProps<typeof Image>['src'];
  }[];
  control: any;
}

const DropdownShowcase: React.FC<DestDropdownProps> = ({
  data,
  control,
  ...rest
}) => {
  const option = data?.map((element) => {
    return {
      value: element.value,
      label: (
        <DropDownSearchList
          imageUrl={element.url}
          title={element.title}
          description={element.description}
        />
      ),
      customLabel: element.title,
    };
  });

  return (
    <Dropdown
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
