import styled from "@emotion/styled";
import { Divider } from "antd";
import React, { useState } from "react";
import Datepicker from "./datepicker";
import { Controller, useForm } from "react-hook-form";
import TravelersInput from "./travelerInput";
import CustomDropDown from "./custom-dropdown";
import Button from "./button";
import PopupAddTrips from "@components/trips/pop-up";
import { useCookies } from "react-cookie";

const BookingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 0 10px 0 10px;

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
  font-weight: 500;
`;

type SlugBookingFormProps = {
  onSubmit: (d: any) => void;
  type: string;
};

const SlugBookingForm: React.FC<SlugBookingFormProps> = ({
  onSubmit,
  type,
}) => {
  const [_, setBooking] = useCookies([type]);
  const { handleSubmit, control } = useForm();
  const [addTrip, setAddToTrip] = useState<any | undefined>();
  const [travellersArray, setTravellersArray] = useState<string[]>();
  const onSubmitFunc = (formData) => {
    formData.Travelers = travellersArray;
    formData.numberOfTravelers = travellersArray?.length;
    setAddToTrip(formData);
    setBooking("booking", formData);
    onSubmit(formData);
  };

  return (
    <BookingContainer>
      {addTrip && <PopupAddTrips type="tours" />}
      <Form onSubmit={handleSubmit(onSubmitFunc)}>
        <LabelHeader>
          <h3>Date of {type}</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </LabelHeader>
        <Controller
          name="date"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Datepicker {...field} className="expand" name="Date" />
          )}
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
        <Controller
          name="pick-up"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <CustomDropDown
              {...field}
              placeholder="Enter pick-up location"
              buttonName="Add location"
              dropdownPlaceholder="Add location"
              className="expand"
              toAddItemPlaceholder="Add location"
              defaultOption={["To be Provided"]}
            />
          )}
        />

        <StyledButton htmlType="submit" type="primary">
          Add {type.charAt(0).toUpperCase() + type.slice(1)}
        </StyledButton>
      </Form>
    </BookingContainer>
  );
};

export default SlugBookingForm;
