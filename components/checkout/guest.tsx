import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Poppins } from "next/font/google";
import Button from "@components/commons/button";
import { TrashIcon } from "@components/commons/icons";
import { NameSuffix, NameSuffixValues } from "@app/types/Guest";
import { classNames } from "@app/utils/helpers";
import Dropdown from "@components/commons/dropdown";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { guestSchema } from "@constants/validations/guestList";
import Input from "@components/commons/input";
import { v4 as uuid } from "uuid";
import LOCAL_STORAGE from "@constants/localstorage";

const Font = Poppins({
  weight: "400",
  subsets: ["latin"],
});

const IndividualNameContainer = styled.div`
  display: flex;
  font-size: 0.8rem;
  align-items: center;
  justify-content: space-between;
  border: solid rgba(0, 0, 0, 1) 1px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 0.9rem;
  border-radius: 3px;

  p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

const AddParticipant = styled.div`
  display: flex;
  gap: 0.5rem;
  height: 100%;
`;

const StyledButton = styled(Button)`
  height: 2.9rem;
  &.ant-btn-primary {
    background-color: transparent !important;
    border-color: #23432c !important;
    color: #23432c !important;

    &:hover {
      background-color: #23432c !important;
      border-color: #23432c !important;
    }
  }
`;

export type TGuest = {
  id?: string;
  firstName: string;
  lastName: string;
  middleInitial: string;
  suffix: NameSuffix;
  age: number;
  nationality: string;
};

interface ParticipantInputProps {
  onChange?: (e: TGuest[]) => void;
  helperText?: string;
}

const GuestInput: React.FC<ParticipantInputProps> = ({
  helperText,
  onChange,
}) => {
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(guestSchema)
  });
  const guestsData = localStorage.getItem(LOCAL_STORAGE.guests);
  const [participantData, setParticipantData] = useState<TGuest[]>(JSON.parse(guestsData ?? "[]"));

  const deleteName = (index: number) => {
    setParticipantData((prev) => {
      const newList = prev.filter((_, i) => i !== index);
      if (typeof onChange === "function") onChange([...newList]);
      return newList;
    });
  };

  const handleAddParticipantClick = (formData) => {
    const newGuest = { id: uuid(), ...formData };
    setParticipantData((prev) => {
      if (typeof onChange === "function") onChange([...prev, newGuest]);
      return [...prev, newGuest];
    });
    reset();
  };
  
  const fieldErrors = {
    firstName: errors.firstName !== undefined,
    lastName: errors.lastName !== undefined,
    middleInitial: errors.middleInitial !== undefined,
    age: errors.age !== undefined,
    nationality: errors.nationality !== undefined,
  }

  const NameList = () => 
    participantData.length ? (
      participantData.map((data, index) => (
        <React.Fragment key={`participant-${index}`}>
          <div className="flex flex-auto items-center justify-center border border-green-50" key={data.id}>
            <div className="flex flex-auto text-center">
              <p className="w-1/3 truncate">{classNames(data.firstName, data.middleInitial, data.lastName, data.suffix && `, ${data.suffix}`)}</p>
              <p className="w-1/3">{data.age}</p>
              <p className="w-1/3 truncate">{data.nationality.toUpperCase()}</p>
            </div>
            <TrashIcon
              className="cursor-pointer"
              onClick={() => deleteName(index)}
              boxSize={5}
            />
          </div>
        </React.Fragment>
      ))) : 
      participantData.length === 0 ? 
      (<p>No guests added</p>) 
      : null;

  return (
    <>
      <form 
        onSubmit={handleSubmit(handleAddParticipantClick)}
        className="w-full flex flex-col gap-4 items-center lg:flex-row lg:space-x-2 lg:gap-0">
        <Controller
          control={control}
          name="firstName"
          render={({ field }) => (
            <Input
              className={classNames(Font.className, errors.firstName && "border border-red-700")}
              value={field.value}
              onChange={field.onChange}
              type="text"
              placeholder="First Name"
              hasError={fieldErrors.firstName}
              helperText={errors.firstName?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="middleInitial"
          render={({ field }) => (
            <Input
            className={Font.className}
            value={field.value}
            onChange={field.onChange}
            maxLength={2}
            type="text"
            placeholder="Middle Initial"
            hasError={fieldErrors.middleInitial}
            helperText={errors.middleInitial?.message}
          />
          )}
        />
        <Controller
          control={control}
          name="lastName"
          render={({ field }) => (
            <Input
            className={Font.className}
            value={field.value}
            onChange={field.onChange}
            type="text"
            placeholder="Last Name"
            hasError={fieldErrors.lastName}
            helperText={errors.lastName?.message}
          />
          )}
        />
        <Controller
          control={control}
          name="age"
          render={({ field }) => (
            <Input
            className={Font.className}
            value={field.value}
            onChange={field.onChange}
            type="number"
            placeholder="Age"
            hasError={fieldErrors.age}
            helperText={errors.age?.message}
          />
          )}
        />
        <Controller
          control={control}
          name="suffix"
          render={({ field }) => (
            <Dropdown 
              className="mt-1"
              placeholder="Suffix"
              defaultValue={NameSuffix.None}
              value={field.value}
              onChange={field.onChange}
              options={NameSuffixValues.map((value) => ({ label: value === NameSuffix.None ? "None" : value, value }))}
            />
          )}
        />
        <Controller
          control={control}
          name="nationality"
          render={({ field }) => (
            <Input
            className={Font.className}
            value={field.value}
            onChange={field.onChange}
            type="text"
            placeholder="Nationality"
            hasError={fieldErrors.nationality}
            helperText={errors.nationality?.message}
          />
          )}
        />
        <StyledButton type="primary" htmlType="submit" className="!h-10">
          Add Participant
        </StyledButton>
      </form>
      {helperText && (
        <p className="text-red-700 text-xs font-italized">{helperText}</p>
      )}
      <br />
      <p className="text-lg font-bold">Guests</p>
      <NameList />
    </>
  );
};

export default GuestInput;
