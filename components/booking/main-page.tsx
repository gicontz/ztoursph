import React from "react";
import { useForm } from "react-hook-form";
import RangePickerComponent from "@components/commons/range-picker";
import Dropdown from "@components/commons/dropdown";
import Button from "@components/commons/button";
import { Space } from "antd";
import styled from "@emotion/styled";

import { MapIcon, TravellersIcon } from "@components/commons/icons";

const ContainerCard = styled(Space)`
  display: flex;
  padding: 25px 20px;
  box-shadow: 0px 0px 5px black;
  border-radius: 0.2rem;
`;

const MainPageBooking = () => {
  return (
    <div className="flex">
      <div>I want to go</div>
      <div>Check In</div>
      <div>Check Out</div>
      <div>Travellers</div>
      <div>Book</div>
    </div>
  );
};

export default MainPageBooking;
