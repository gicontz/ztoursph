import { MainFont, secondaryFont } from "@app/layouts/font/font";
import { ChevronRightIcon } from "@chakra-ui/icons";
import Button from "@components/commons/button";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";

const headerStyle = `font-bold text-xl text-cs-green text-scheme-green text-justify  ${secondaryFont.className}`;

const descriptionStyle = `ml-3 mt-2 text-sm text-justify`;
const content = {
  Overview:
    "ZTours PH operates tours and manages the manifest of boats, vessels, cars, vans, and similar transport modes. In the course of providing these services, the Company may collect and process personal data. This Agreement sets forth the terms and conditions governing the collection, processing, and protection of such personal data.",
  Definitions:
    '"Personal Data" means any information relating to an identified or identifiable natural person."Processing" means any operation or set of operations which is performed on personal data. "Data Subject" means the individual to whom the Personal Data relates.',
  "Data Collection and Use":
    "The Company collects Personal Data solely for the purpose of organizing and managing tours and maintaining manifests of boats, vessels, cars, vans, and similar transport modes. Personal Data collected may include, but is not limited to, name, contact information, identification documents, and payment details. ",
  "Legal Basis for Processing":
    "The Company processes Personal Data based on the consent of the Data Subject or as necessary for the performance of a contract to which the Data Subject is a party.",
  "Data Security":
    "The Company shall implement appropriate technical and organizational measures to ensure the security and confidentiality of Personal Data. This includes measures to prevent unauthorized access, disclosure, alteration, or destruction of Personal Data.",
  "Data Sharing":
    "The Company may share Personal Data with third-party service providers solely for the purpose of providing tour-related services. Any third-party service provider shall be bound by confidentiality obligations and shall only process Personal Data in accordance with the instructions of the Company.",
  "Data Retention":
    "Personal Data shall be retained only for as long as necessary to fulfill the purposes for which it was collected, unless otherwise required by law.",
  "Data Subject Rights":
    "Data Subjects have the right to request access to, rectification, erasure, or restriction of processing of their Personal Data. Requests should be submitted to the Company using the contact information provided below.",
  Amendments:
    "The Company reserves the right to amend this Agreement at any time. Any amendments shall be effective upon posting of the revised Agreement on the Company's website.",
};

const ValueOfEmptyCanvas =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAAtJREFUGFdjYAACAAAFAAGq1chRAAAAAElFTkSuQmCC";

const DataPrivacyPopup = ({ onCloseItself }) => {
  const route = useRouter();
  const [openSignature, setOpenSignature] = useState(false);
  const [identifySignature, setIdentifySignature] = useState({
    signature_src: undefined,
  });

  useEffect(() => {
    if (route.pathname !== "/trips") {
      onCloseItself();
    }
  }, [route.pathname]);

  const signatureCanvas = useRef() as any;
  const styledContent = Object.entries(content).map(
    ([title, description], i) => {
      return (
        <>
          <h4 className={`${headerStyle}`}>
            {i + 1}. {title}
          </h4>
          <p className={descriptionStyle}>{description}</p>
          <br />
        </>
      );
    }
  );

  const handleSetSignature = () => {
    if (identifySignature)
      setIdentifySignature((prev) => ({ ...prev, signature_src: undefined }));
    setOpenSignature(true);
  };

  const handleSaveSignature = () => {
    if (
      signatureCanvas.current.getTrimmedCanvas().toDataURL("image/png") !==
      ValueOfEmptyCanvas
    ) {
      setIdentifySignature((prev) => ({
        ...prev,
        signature_src: signatureCanvas.current
          .getTrimmedCanvas()
          .toDataURL("image/png"),
      }));
      setOpenSignature(false);
    }
  };

  const handleClearSignature = () => {
    signatureCanvas.current.clear();
  };

  const handleOnProceed = () => {
    setOpenSignature(false);
    route.push("/trips/checkout");
  };
  return !openSignature ? (
    <div
      className={`flex flex-col space-y-3 m-auto p-5 h-54 w-full ${MainFont.className}`}>
      <h3 className={`${headerStyle} text-3xl `}>Data Privacy Agreement</h3>
      <div className="text-sm">
        This Data Privacy Agreement (&quot;Agreement&quot;) is entered into as
        of [date], by and between ZTours PH (&quot;Company&quot;), and the
        individual or entity agreeing to the terms herein (&quot;User&quot;).
      </div>
      <div className="w-fit h-48 overflow-auto mx-1 border border-gray-200 p-2 ">
        {styledContent}

        <h4 className={`${headerStyle}`}>10. Contact Information</h4>
        <p className={descriptionStyle}>Z tours PH</p>
        <p className={descriptionStyle}>Some Address</p>
        <p className={descriptionStyle}>Some Email Address </p>
        <p className={descriptionStyle}>Some Address Phone Number</p>
      </div>
      <p className="italic text-xs mx-1">
        <b>Note:</b> This template is provided for informational purposes only
        and should be customized to reflect the specific circumstances and
        requirements of ZTours PH. It is recommended to seek legal advice when
        drafting a Data Privacy Agreement.
      </p>
      <img
        width={100}
        src={identifySignature.signature_src}
        aria-disabled={identifySignature.signature_src !== undefined}
      />
      <div className="flex justify-between space-x-1 pt-5">
        <template className="text-xs flex items-center space-x-1  ">
          <input
            id="signiture"
            checked={identifySignature.signature_src !== undefined || false}
            onClick={handleSetSignature}
            type="checkbox"
          />
          <label>Signiture must be provided before agreeing</label>
        </template>
        <Button
          type="primary"
          disabled={identifySignature.signature_src === undefined}
          onClick={handleOnProceed}>
          I agree and Continue
        </Button>
      </div>
    </div>
  ) : (
    <div
      className={`relative flex flex-col space-y-3 m-auto my-3 p-5 h-fit w-full ${MainFont.className}`}>
      <div
        className={`absolute top-2 right-2 text-scheme-green flex justify-end items-center ${secondaryFont.className}}`}
        onClick={() => setOpenSignature(false)}>
        <p className={secondaryFont.className}>Back</p> <ChevronRightIcon />
      </div>
      <h4 className={headerStyle}>Signing Conditions</h4>
      <p className={descriptionStyle}>
        By signing below, the User agrees to the terms and conditions of this
        Data Privacy Agreement.
      </p>
      <SignatureCanvas
        ref={signatureCanvas}
        penColor="black"
        canvasProps={{
          width: window.innerWidth / signatureCanvas.width,
          height: window.innerHeight / signatureCanvas.height,
          className: "sigCanvas border w-full",
        }}
      />
      <div className="flex space-x-3 justify-end">
        <Button onClick={handleClearSignature}> Clear</Button>
        <Button type="primary" onClick={handleSaveSignature}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default DataPrivacyPopup;
