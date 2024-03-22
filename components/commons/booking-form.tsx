import styled from "@emotion/styled";
import { Divider } from "antd";
import React, { useState } from "react";
import Datepicker from "./datepicker";
import { Controller, useForm } from "react-hook-form";
import TravelersInput from "./travelerInput";
import Button from "./button";
import PopupAddTrips from "@components/trips/pop-up";
import { useCookies } from "react-cookie";
import dynamic from "next/dynamic";
import { Added_Trips } from "@constants/added_trips";

const CustomDropDown = dynamic(() => import("./custom-dropdown"), { ssr: false });

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

type BookingFormProps = {
  onSubmit: (d: any) => void;
  type: string;
  details: { title: string | undefined; banner: string | undefined };
};

const BookingForm: React.FC<BookingFormProps> = ({
  onSubmit,
  type,
  details,
}) => {
  const [booking, setBooking] = useCookies([Added_Trips]);
  const { register, handleSubmit, control } = useForm();
  const [showTrips, setShowAddToTrips] = useState(false);

  const onSubmitFunc = (formData) => {
    console.log(formData)
    const data = booking[Added_Trips]
      ? booking[Added_Trips].slice().concat(formData)
      : [formData];
      
      formData.details = details;
      formData.numberOfTravelers = formData.participants?.length ?? 1;
      formData.category = type.charAt(0).toUpperCase() + type.slice(1);
      setShowAddToTrips(true);
      setBooking(Added_Trips, data);
      onSubmit(formData);
  };

  return (
    <BookingContainer>
      {showTrips && <PopupAddTrips type={type} />}
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
            <Datepicker onChange={field.onChange} className="expand" showTime placeholder="Select Date and Time" showNow={false}/>
          )}
        />

        <StyledDivider />
        <LabelHeader>
          <h3>Participants</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </LabelHeader>
        <Controller
          name="participants"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TravelersInput onChange={field.onChange} />
          )}
        />

        <StyledDivider />
        <LabelHeader>
          <h3>Pick up location</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </LabelHeader>
        <Controller
          name="locationPickUp"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <CustomDropDown
              onChange={field.onChange}
              placeholder="Enter pick-up location"
              buttonName="Add location"
              dropdownPlaceholder="Add location"
              addClass="expand"
              toAddItemPlaceholder="Add location"
              defaultOption={["To be Provided"]}
            />
          )}
        />

        <StyledButton htmlType="submit" type="primary">
          Add {type[0].toUpperCase() + type.slice(1)}
        </StyledButton>
      </Form>
    </BookingContainer>
  );
};

export default BookingForm;
