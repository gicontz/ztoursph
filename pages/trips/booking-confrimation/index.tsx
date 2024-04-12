import React from "react";
import styled from "@emotion/styled";
import { Row } from "@components/commons/common";
import {
  MainFont,
  primaryColor,
  secondaryFont,
} from "@app/layouts/fonts/fonts";
import { SuccesfulRecieptIcon } from "@components/commons/icons";
import Link from "next/link";
import Button from "@components/commons/button";
import { Viewer } from "@react-pdf-viewer/core";

const Container = styled(Row)`
  * {
    // border: blue 1px solid;
  }
  padding: 1rem;
`;

function BookingConfirmation() {
  return (
    <Container
      className={`${MainFont.className} h-screen relative flex justify-center align-middle items-center`}>
      <Link href={"/"} className="absolute top-2 left-2">
        Back to homepage
      </Link>
      <div className="h-1/2 flex flex-col items-center space-y-5">
        <div className="w-fit h-fit flex flex-col align-center justify-self-center items-center space-y-2">
          <SuccesfulRecieptIcon />
          <h4
            className={`text-3xl w-fit text-[${primaryColor}] ${secondaryFont.className}`}>
            Booking is {`Successful`}
          </h4>

          <p className={`w-2/3 text-center ${MainFont.className}`}>
            Booking is successful. Your booking reference is{" "}
            <span className="italic ">{`FE05E27f`}</span> other details will be
            found below.{" "}
            <Link href={"/tours"} className="underline">
              Book more tours?
            </Link>
          </p>
        </div>
        <div className="w-fit flex justify-center">
          <Button type="link">Send to Email</Button>
          <Button type="primary">Download</Button>
        </div>
        <div>
          <Viewer
            fileUrl={
              "https://drive.google.com/file/d/1Ypo4bVp6dvmr4-s5XlJScgz0l04JlcT7/view?usp=sharing"
            }
          />
        </div>
      </div>
    </Container>
  );
}

export default BookingConfirmation;
