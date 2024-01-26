import React, { useState } from "react";
import Button from "./button";
import { ConfigProvider, Input } from "antd";
import styled from "@emotion/styled";
import { TrashIcon } from "./icons";

const IndividualNameContainer = styled.div`
  display: flex;
  font-size: 0.8rem;
  justify-content: space-between;
  border: solid rgba(0, 0, 0, 0.1) 1px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 0.9rem;
  border-radius: 3px;
  margin: 5px 0;
`;

const StyledInput = styled(Input)`
  padding: 0.7rem;
`;

interface ParticipantInputProps {
  onChange: (e: string[]) => void;
}

const ParticipantInput: React.FC<ParticipantInputProps> = ({ onChange }) => {
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
    <IndividualNameContainer key={index}>
      <p>{name}</p>
      <p className="cursor-pointer" onClick={() => deleteName(index)}>
        <TrashIcon boxSize={5} />
      </p>
    </IndividualNameContainer>
  ));

  return (
    <>
      {nameList}
      <ConfigProvider
        theme={{
          token: {
            colorBgContainer: "#EAEAEA",
            borderRadius: 2,
          },
        }}>
        <StyledInput
          value={participant}
          onChange={handleInputChange}
          type="text"
          placeholder="Enter Participants Name"
        />
      </ConfigProvider>
      <Button
        className="w-full"
        type="primary"
        onClick={handleAddParticipantClick}>
        Add Participant
      </Button>
    </>
  );
};

export default ParticipantInput;
