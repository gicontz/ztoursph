import styled from "@emotion/styled";
import { Button, Divider } from "antd";
import React, { useState } from "react";
import Datepicker from "./datepicker";
import { useForm } from "react-hook-form";
import { CustomInput } from "./input";
import ParticipantInput from "./participantInput";

const BookingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  * {
  }

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
  gap: 0.2rem;
  width: 100%;
`;

const TourBookingForm = () => {
  const { handleSubmit, control } = useForm();
  const [participant, setParticipant] = useState<string[]>();
  const onSubmitFunc = (e) => {
    console.log(e, participant);
  };

  return (
    <BookingContainer>
      <Divider />
      <Form onSubmit={handleSubmit(onSubmitFunc)}>
        <LabelHeader>Date of Tour</LabelHeader>
        <Datepicker className="expand" control={control} name="Date" />
        <LabelHeader>Participants</LabelHeader>
        <ParticipantInput onChange={(e) => setParticipant(e)} />
        <Button htmlType="submit">Submit</Button>
      </Form>
    </BookingContainer>
  );
};

export default TourBookingForm;
