import styled from "@emotion/styled";
import Link from "next/link";
import React from "react";

const Combine = styled(Link)<{ hasLink: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: fit-content;
  pointer-events: ${({ hasLink }) => (hasLink ? "auto" : "none")};

  h1:hover {
    color: ${({ hasLink }) => (hasLink ? "#233d2c" : "")}; /* <-----fix*/
  }
`;
const HeaderText = styled.h1<{ size: number | undefined }>`
  min-width: fit-content;
  font-weight: bold;
  font-size: ${({ size }) => (size ? `${size}rem` : "1.4rem")};
  white-space: nowrap;

  @media (max-width: 600px) {
    font-size: ${({ size }) => (size ? `${size - 4}rem` : "1rem")};
  }
`;

type HeaderSectionProps = {
  children: any;
  link?: string | undefined;
  underline?: boolean;
  size?: number | undefined;
};

const HeaderSection: React.FC<HeaderSectionProps> = ({
  children,
  link,
  underline,
  size,
}) => {
  return (
    <Combine href={link ? link : "none"} hasLink={link ? true : false}>
      <HeaderText size={size}>{children}</HeaderText>
      {underline && (
        <svg width="110" height="2" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="#F5B963" />
        </svg>
      )}
    </Combine>
  );
};

export default HeaderSection;
