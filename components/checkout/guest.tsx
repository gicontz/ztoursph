import React, { useState } from "react";
import { Input } from "antd";
import styled from "@emotion/styled";
import { Poppins } from "next/font/google";
import Button from "@components/commons/button";
import { TrashIcon } from "@components/commons/icons";

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
  name: string;
  age: number;
  nationality: string;
};

interface ParticipantInputProps {
  onChange?: (e: TGuest[]) => void;
  helperText?: string;
  clearGuests?: boolean;
  leadGuest?: TGuest;
}

const GuestInput: React.FC<ParticipantInputProps> = ({
  clearGuests,
  helperText,
  leadGuest,
  onChange,
}) => {
  const [participant, setParticipant] = useState<TGuest>({ name: "", age: 0, nationality: "" });
  const [participantData, setParticipantData] = useState<TGuest[]>([]);

  const setValueChange = React.useCallback(() => {
    if (clearGuests) {
      setParticipantData([]);
      if (typeof onChange === "function") onChange([]);
    }
    //eslint-disable-next-line
  }, [clearGuests]);

  React.useEffect(() => {
    setValueChange();
    //eslint-disable-next-line
  }, [clearGuests]);

  const deleteName = (index: number) => {
    setParticipantData((prev) => {
      const newList = prev.filter((_, i) => i !== index);
      if (typeof onChange === "function") onChange([...newList]);
      return newList;
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setParticipant((prev) => ({ ...prev, [name]: value }));
  };

  // 07 10 2003
  const handleAddParticipantClick = () => {
    if (participant.age && participant.name && participant.nationality) {
      setParticipantData((prev) => {
        if (typeof onChange === "function") onChange([...prev, participant]);
        return [...prev, participant];
      });
      setParticipant({ name: "", age: 0, nationality: "" });

      return;
    }
  };

  const NameList = () => 
    participantData.length ? (
      participantData.map((data, index) => (
        <React.Fragment key={`participant-${index}`}>
          <div className="flex flex-auto items-center justify-center border border-green-50" key={index}>
            <div className="flex flex-auto text-center">
              <p className="w-1/3 truncate">{data.name}</p>
              <p className="w-1/3">{data.age}</p>
              <p className="w-1/3 truncate">{data.nationality}</p>
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
      <AddParticipant className="w-full flex flex-col items-center [&>input]:w-full [&>input]:h-10 lg:flex-row">
        <Input
          className={Font.className}
          value={participant?.name}
          onChange={handleInputChange}
          name="name"
          type="text"
          placeholder="Name"
        />
        <Input
          className={Font.className}
          value={participant?.age}
          onChange={handleInputChange}
          name="age"
          type="number"
          placeholder="Age"
        />
        <Input
          className={Font.className}
          value={participant?.nationality}
          onChange={handleInputChange}
          name="nationality"
          type="text"
          placeholder="Nationality"
        />
        <StyledButton type="primary" onClick={handleAddParticipantClick}>
          Add Participant
        </StyledButton>
      </AddParticipant>
      {helperText && (
        <p className="text-red-700 text-xs font-italized">{helperText}</p>
      )}
      <br />
      <p className="text-lg font-bold">Guests</p>
      <div className="flex flex-col gap-1">
        <div className="flex space-x-2 flex-auto mb-2 text-center [&>p]:py-2">
            <p className="h-10 w-1/3 bg-gray-200">{leadGuest?.name}</p>
            <p className="h-10 w-1/3 bg-gray-200">{leadGuest?.age}</p>
            <p className="h-10 w-1/3 bg-gray-200">{leadGuest?.nationality}</p>
        </div>
        <NameList />
      </div>
    </>
  );
};

export default GuestInput;
