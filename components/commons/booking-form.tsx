import styled from "@emotion/styled";
import { DatePicker as Picker, Divider } from "antd";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Button from "./button";
import PopupAddTrips from "@components/trips/pop-up";
import { useCookies } from "react-cookie";
import dynamic from "next/dynamic";
import { Added_Trips } from "@constants/added_trips";
import { TTrip } from "@app/modules/trips/types";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "@constants/validations/bookingForm";
import Dropdown from "./dropdown";
import { useDialog } from "@providers/dialog";
import ManageGuestList from "@app/layouts/forms/ManageGuestList";
import LOCAL_STORAGE from "@constants/localstorage";
import { classNames } from "@app/utils/helpers";
import { disablePastDatesAndToday } from "@constants/dates";

const CustomDropDown = dynamic(() => import("./custom-dropdown"), {
  ssr: false,
});

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

const DatePicker = styled(Picker)<{ hasError: boolean }>`
:where(.css-dev-only-do-not-override-1qhpsh8).ant-picker-outlined {
  background-color: #ffffff;
  border-color: ${({ hasError }) => (hasError ? "rgb(185 28 28)" : "#d9d9d9")};
}

  a.ant-picker-now-btn {
    font-size: 0;
  }

  a.ant-picker-now-btn:after {
    content: "ABC";
    font-size: 16px;
  > div button {
    background-color #1677ff;
  }
`;

type BookingFormProps = {
  onSubmit?: (d: any) => void;
  type: string;
  details: {
    tourId?: string | number;
    title: string | undefined;
    thumbnail: string | undefined;
  };
};

const BookingForm: React.FC<BookingFormProps> = ({
  onSubmit,
  type,
  details,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [openDialog, closeDialog] = useDialog();
  const [manageGuest, setManageGuest] = useState(false);
  const [showTrips, setShowAddToTrips] = useState(false);
  const [guests, setGuests] = useState([]);

  const handleGuests = (guests) => {
    setGuests(guests);
  };

  const theGuests =
    guests.length > 0
      ? guests
      : typeof localStorage !== "undefined"
      ? JSON.parse(localStorage.getItem(LOCAL_STORAGE.guests) ?? "[]")
      : [];
  const options = theGuests.map((data) => ({
    label: classNames(
      data.firstName,
      data.middleInitial,
      data.lastName,
      data.suffix && `, ${data.suffix}`,
      data.age,
      data.nationality.toUpperCase()
    ),
    value: data.id,
  }));

  const onSubmitFunc = (formData) => {
    formData.details = details;
    formData.numberOfTravelers = formData.participants?.length ?? 1;
    formData.category = type;
    setShowAddToTrips(true);
    const tripData = {
      tripId: formData.details.tourId,
      title: formData.details.title,
      date: formData.date,
      location: formData.locationPickUp,
      participants: formData.participants,
      numberOfTraveller: formData.numberOfTravelers,
      thumbnail: formData.details.thumbnail,
      category: type,
    };

    if (typeof onSubmit === "function") onSubmit(tripData);
  };

  // const handleManageGuests = () => {
  //   openDialog({
  //     children: (
  //       <ManageGuestList onClose={closeDialog} onChange={handleGuests} />
  //     ),
  //   });
  // };

  return (
    <BookingContainer>
      {showTrips && <PopupAddTrips type={type} />}
      {manageGuest ? (
        <ManageGuestList
          onClose={() => setManageGuest(false)}
          onChange={handleGuests}
        />
      ) : (
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
              <>
                <DatePicker
                  hasError={errors?.date !== undefined}
                  onChange={field.onChange}
                  className="expand"
                  placeholder="Select Date and Time"
                  showNow={false}
                  showToday={false}
                  disabledDate={disablePastDatesAndToday}
                />
                {errors?.date !== undefined && (
                  <p className="text-red-700 text-xs font-italized">
                    {errors?.date?.message}
                  </p>
                )}
              </>
            )}
          />

          <StyledDivider />
          <LabelHeader>
            <h3>Participants</h3>
            <p>
              You must select your participants, you can manage your guest
              list&nbsp;
              <span
                className="text-xs font-bold text-blue-400 cursor-pointer hover:opacity-70 active:opacity-50"
                onClick={() => setManageGuest(true)}>
                here
              </span>
            </p>
          </LabelHeader>
          <Controller
            name="participants"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Dropdown
                mode="multiple"
                onChange={field.onChange}
                className="w-full"
                options={options}
              />
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
                hasError={errors.locationPickUp !== undefined}
                helperText={errors.locationPickUp?.message}
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
      )}
    </BookingContainer>
  );
};

export default BookingForm;
