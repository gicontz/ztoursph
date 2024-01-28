import styled from "@emotion/styled";
import { Divider } from "antd";
import React, { useState } from "react";
import Datepicker from "./datepicker";
import { useForm } from "react-hook-form";
import ParticipantInput from "./participantInput";
import CustomDropDown from "./custom-dropdown";
import Button from "./button";

const BookingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .expand {
    width: 100%;
    height: 3rem;
  }
`;

const LabelHeader = styled.p`
  display: flex;
  color: rgba(12, 16, 17, 0.6);
  font-size: 0.6rem;
  font-weight: bold;
  &::before {
    content: "* ";
    color: red;
    font-size: 0.6rem;
    font-weight: bold;
    margin-right: 4px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
`;

const TourBookingForm = () => {
  const { handleSubmit, control } = useForm();
  const [participantArray, setParticipantArray] = useState<string[]>();
  const onSubmitFunc = (formData) => {
    formData.participants = participantArray;
    formData.numberOfParticipants = participantArray?.length;
    console.log(formData);
  };

  return (
    <BookingContainer>
      <Divider />
      <Form onSubmit={handleSubmit(onSubmitFunc)}>
        <LabelHeader>Date of Tour</LabelHeader>
        <Datepicker className="expand" control={control} name="Date" />
        <LabelHeader>Participants</LabelHeader>
        <ParticipantInput onChange={(e) => setParticipantArray(e)} />
        <LabelHeader>Pick up location</LabelHeader>
        <CustomDropDown
          DropdownPlaceholder="Add location"
          placeholder="Enter pick up location"
          className="expand"
          defaultOption={["To be Provided"]}
          names={"PickUp"}
          control={control}
          rules={{ require: "Location must be provided." }}
        />
        <Button
          htmlType="submit"
          className="bg-[#23432C] text-white font-semibold h-[3rem]">
          Add Tour
        </Button>
      </Form>
    </BookingContainer>
  );
};

export default TourBookingForm;
