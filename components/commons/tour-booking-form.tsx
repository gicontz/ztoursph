import styled from "@emotion/styled";
import { Divider } from "antd";
import React, { useState } from "react";
import Datepicker from "./datepicker";
import { useForm } from "react-hook-form";
import TravelersInput from "./travelerInput";
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

const LabelHeader = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.8rem;
  h3 {
    font-family: "Source_Serif_Pro";
    font-size: 1.2rem;
    font-weight: bold;
    color: #23432c;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
`;

const StyledDivider = styled(Divider)`
  border-top: 1px solid #23432c;
  margin: 10px 0;
`;

const StyledButton = styled(Button)`
  width: 100%;
  height: 2.6rem;
  font-weight: 800;
`;

const TourBookingForm = ({ onSubmit }) => {
  const { handleSubmit, control } = useForm();
  const [travellersArray, setTravellersArray] = useState<string[]>();
  const onSubmitFunc = (formData) => {
    formData.Travelers = travellersArray;
    formData.numberOfTravelers = travellersArray?.length;
    onSubmit(formData);
  };

  return (
    <BookingContainer>
      <Form onSubmit={handleSubmit(onSubmitFunc)}>
        <LabelHeader>
          <h3>Date of Tour</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </LabelHeader>
        <Datepicker
          className="expand"
          control={control}
          name="Date"
          rules={{ required: true }}
        />
        <StyledDivider />
        <LabelHeader>
          <h3>Participants</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </LabelHeader>
        <TravelersInput onChange={(e) => setTravellersArray(e)} />
        <StyledDivider />
        <LabelHeader>
          <h3>Pick up location</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </LabelHeader>
        <CustomDropDown
          buttonName="Add location"
          dropdownPlaceholder="Add location"
          placeholder="Enter pick up location"
          className="expand"
          defaultOption={["To be Provided"]}
          names={"PickUp"}
          control={control}
          rules={{ required: true }}
        />
        <StyledButton htmlType="submit" type="primary">
          Add Tour
        </StyledButton>
      </Form>
    </BookingContainer>
  );
};

export default TourBookingForm;
