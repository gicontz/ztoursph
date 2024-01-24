import styled from "@emotion/styled";
import { Divider } from "antd";
import React from "react";
import Datepicker from "./datepicker";
import { useForm } from "react-hook-form";

const BookingContainer = styled.div`
  display: flex;
  flex-direction: column;
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
  width: 100%;
`;

const TourBookingForm = () => {
  const { handleSubmit, control } = useForm();
  const onSubmitFunc = (e) => {
    console.log(e);
  };
  return (
    <BookingContainer>
      <Divider />
      <Form onSubmit={handleSubmit(onSubmitFunc)}>
        <LabelHeader>Date of Tour</LabelHeader>
        <Datepicker control={control} name="Date" />
      </Form>
    </BookingContainer>
  );
};

export default TourBookingForm;
