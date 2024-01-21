import Dropdown from "@components/commons/dropdown";
import { MapIcon } from "@components/commons/icons";
import styled from "@emotion/styled";
import { Tooltip } from "antd";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

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

interface DestDropdownProps {
  data: {
    title: string;
    description: string;
    value: string;
    image: string | StaticImport;
  }[];
  control: any;
}

const DropDownSearchList = ({ url, title, description }): JSX.Element => {
  const summary = (
    <div>
      <p>Package Summary:</p>
      <p>{description}</p>
    </div>
  );
  return (
    <Tooltip title={summary} placement="right">
      <PanelSearch>
        <Image src={url} alt={title} />
        <p>{title}</p>
      </PanelSearch>
    </Tooltip>
  );
};

const SearchDestinationDropdown: React.FC<DestDropdownProps> = ({
  data,
  control,
}) => {
  const option = data?.map((element) => {
    return {
      value: element.value,
      label: (
        <DropDownSearchList
          url={element.image}
          title={element.title}
          description={element.description}
        />
      ),
      customLabel: element.title,
    };
  });

  const filterOption = (input, option) =>
    option.props.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;

  return (
    <Dropdown
      showSearch
      filterOption={filterOption}
      prefixIcon={<MapIcon />}
      name="destination"
      control={control}
      placeholder="I want to go"
      options={option}
      optionLabelProp="customLabel"
    />
  );
};

export default SearchDestinationDropdown;
