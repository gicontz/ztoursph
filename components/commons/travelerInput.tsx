import React, { useState } from "react";
import Button from "./button";
import { Input } from "antd";
import styled from "@emotion/styled";
import { TrashIcon } from "./icons";
import { Poppins } from "next/font/google";

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

const StyledInput = styled(Input)`
  padding: 0.7rem;
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

interface ParticipantInputProps {
  onChange: (e: string[]) => void;
}

const TravelersInput: React.FC<ParticipantInputProps> = ({ onChange }) => {
  const [participant, setParticipant] = useState<string>("");
  const [names, setNames] = useState<string[]>([]);

  const deleteName = (index: number) => {
    setNames((prev) => prev.filter((_, i) => i !== index));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setParticipant(event.target.value);
  };

  const handleAddParticipantClick = () => {
    if (participant) {
      setNames((prev) => [...prev, participant]);
      setParticipant("");
      return;
    }
  };
  onChange(names);
  const nameList = names.map((name, index) => (
    <>
      <p className="text-sm -mb-[0.5rem] font-thin font-['Source_Serif_Pro']">
        Traveler {index + 1}
      </p>
      <IndividualNameContainer key={index}>
        <p>{name}</p>
        <TrashIcon
          className="cursor-pointer"
          onClick={() => deleteName(index)}
          boxSize={5}
        />
      </IndividualNameContainer>
    </>
  ));

  return (
    <>
      {nameList}
      <AddParticipant>
        <StyledInput
          className={Font.className}
          value={participant}
          onChange={handleInputChange}
          type="text"
          placeholder="Enter Travelers Name"
        />
        <StyledButton type="primary" onClick={handleAddParticipantClick}>
          Add Participant
        </StyledButton>
      </AddParticipant>
    </>
  );
};

export default TravelersInput;
