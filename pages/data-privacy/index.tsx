import Layout from "@components/pages/layout";
import React from "react";

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

const DataPrivacy = () => {
  return (
    <Layout>
      <p>Data Privacy</p>
    </Layout>
  );
};

export default DataPrivacy;
