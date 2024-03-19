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

interface ParticipantInputProps {
  onChange: (e: {name: string;
    age: string;
    nationality: string; }[]) => void;
}

const GuestInput: React.FC<ParticipantInputProps> = ({ onChange }) => {
  const [participant, setParticipant] = useState<{name: string, age: string, nationality: string }>({ name: '', age: '', nationality: '' });
  const [participantData, setParticipantData] = useState<{name: string, age: string, nationality: string }[]>([]);

  const deleteName = (index: number) => {
    setParticipantData((prev) => prev.filter((_, i) => i !== index));
  };

const handleInputChange = (event) => {
  const { name, value } = event.target;
  setParticipant((prev) => ({ ...prev, [name]: value }));
};

// 07 10 2003
  const handleAddParticipantClick = () => {
    if (participant.age && participant.name && participant.nationality) {
      setParticipantData((prev) => [...prev, participant]);
      setParticipant({ name: '', age: '', nationality: '' });
      onChange(participantData as any);
      return;
    }
    
  };
  const nameList = participantData.map((data, index) => (
    <>
      <IndividualNameContainer key={index}>
      <p className="w-48">{data.name}</p>
      <p>{data.age}</p>
      <p className="w-40">{data.nationality}</p>
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
     
      <AddParticipant>
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
      <br />
      <p className='text-lg font-bold'>Guests</p>
      <div className="flex flex-col gap-1">{nameList}</div>
     
    </>
  );
};

export default GuestInput;
