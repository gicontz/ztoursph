import { MainFont, secondaryFont } from "@app/layouts/font/font";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import Button from "@components/commons/button";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";

const headerStyle = `font-bold text-xl text-cs-green text-scheme-green text-justify  ${secondaryFont.className}`;

const ValueOfEmptyCanvas =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAAtJREFUGFdjYAACAAAFAAGq1chRAAAAAElFTkSuQmCC";

const descriptionStyle = `mt-2 text-sm text-justify`;
const DataPrivacyPopup = ({ onCloseItself }) => {
  const [identifySignature, setIdentifySignature] = useState(false);
  const route = useRouter();

  useEffect(() => {
    if (route.pathname !== "/trips") {
      onCloseItself();
    }
  }, [route.pathname]);
  const signatureCanvas = useRef() as any;

  const handleProceedCheckout = () => {
    if (
      signatureCanvas.current.getTrimmedCanvas().toDataURL("image/png") ===
      ValueOfEmptyCanvas
    ) {
      setIdentifySignature(true);
      return;
    }
    // unknown key name!
    localStorage.setItem(
      `signature`,
      signatureCanvas.current.getTrimmedCanvas().toDataURL("image/png")
    );
    onCloseItself();
    route.push("/trips/checkout");
  };

  const handleClearSignature = () => {
    signatureCanvas.current.clear();
  };

  const handleCloseDialog = () => {
    onCloseItself();
  };

  return (
    <div
      className={`relative flex flex-col space-y-3 m-auto my-3 p-5 h-fit w-full ${MainFont.className}`}>
      <div
        className={`text-scheme-green font-semibold flex items-center hover:underline cursor-pointer ${secondaryFont.className}`}
        onClick={handleCloseDialog}>
        <ChevronLeftIcon />
        <p>Back</p>
      </div>
      <h4 className={headerStyle}>Signing Conditions</h4>
      <p className={descriptionStyle}>
        By signing below, the User agrees to the terms and conditions of this{" "}
        <Link
          href={"/faq#legals-2"}
          className="text-scheme-green font-semibold">
          Data Privacy Agreement
        </Link>
        .
      </p>
      <SignatureCanvas
        ref={signatureCanvas}
        penColor="black"
        canvasProps={{
          width: window.innerWidth / signatureCanvas.width,
          height: window.innerHeight / signatureCanvas.height,
          className: "sigCanvas border w-full h-[50vh]",
        }}
      />
      <div className="w-full flex justify-between">
        <div>
          {identifySignature && (
            <p className="text-red-500 text-xs">Signature is not provided!</p>
          )}
        </div>
        <p
          className="hover:underline cursor-pointer "
          onClick={handleClearSignature}>
          Clear
        </p>
      </div>

      <Button type="primary" onClick={handleProceedCheckout}>
        Proceed
      </Button>
    </div>
  );
};

export default DataPrivacyPopup;
