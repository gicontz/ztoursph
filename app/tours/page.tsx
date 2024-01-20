"use client";

import styled from "@emotion/styled";
import Link from "next/link";

const PanelContainer = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin: 10rem;

  h1 {
    font-size: 2rem;
    font-weight: bold;
  }
  a:hover {
    text-decoration: underline;
  }
`;

export default function Tour() {
  return (
    <PanelContainer>
      <h1>All Tour Lists</h1>
      <Link href="/">Back</Link>
    </PanelContainer>
  );
}
