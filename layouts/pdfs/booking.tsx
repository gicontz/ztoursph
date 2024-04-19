import { Document, Page, pdfjs } from "react-pdf";
import type { PDFDocumentProxy } from "pdfjs-dist";
import { useResizeObserver } from '@wojtekmaj/react-hooks';
import React, { useCallback, useState } from "react";

if (typeof pdfjs.GlobalWorkerOptions !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.js",
    import.meta.url
  ).toString();
}

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};

const maxWidth = 800;

export type PDFFile = string | File | null;

interface Props {
  file: PDFFile;
}

const BookingPdf: React.FC<Props> = ({ file }) => {
  const [containerWidth, setContainerWidth] = useState<number>();
  const [numPages, setNumPages] = useState<number>();
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const onResize = useCallback<ResizeObserverCallback>((entries) => {
    const [entry] = entries;

    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  useResizeObserver(containerRef, {}, onResize);

  function onDocumentLoadSuccess({
    numPages: nextNumPages,
  }: PDFDocumentProxy): void {
    setNumPages(nextNumPages);
  }
  return (
    <div className="mt-4 [&>div>div>canvas]:mx-auto border border-gray-200 [&>div>div]:!bg-gray-300 [&>div>div]:!py-4" ref={setContainerRef}>
      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
        options={options}
      >
        {Array.from(new Array(numPages), (el, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            width={
              containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth
            }
          />
        ))}
      </Document>
    </div>
  );
};

export default BookingPdf;
