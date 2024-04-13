import React from "react";

type props = {
  scale?: number;
  className?: string;
};
function Failed({ scale = 100, ...rest }: props) {
  return (
    <div className={`w-fit ${rest?.className}`} {...rest}>
      <svg
        width={scale}
        height={scale}
        viewBox="0 0 164 164"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <circle cx="82" cy="82" r="82" fill="#E04C4C" />
        <g clip-path="url(#clip0_229_32)">
          <path
            d="M87.1686 44.4003C86.6441 43.3765 85.8472 42.5173 84.8658 41.9174C83.8844 41.3174 82.7564 41 81.6061 41C80.4558 41 79.3278 41.3174 78.3464 41.9174C77.3649 42.5173 76.5681 43.3765 76.0436 44.4003L41.6686 113.15C41.1892 114.102 40.9609 115.16 41.0055 116.225C41.0501 117.289 41.366 118.324 41.9234 119.232C42.4807 120.14 43.2609 120.891 44.1899 121.412C45.1188 121.934 46.1657 122.21 47.2311 122.213H115.981C117.047 122.21 118.093 121.934 119.022 121.412C119.952 120.891 120.732 120.14 121.289 119.232C121.846 118.324 122.162 117.289 122.207 116.225C122.252 115.16 122.023 114.102 121.543 113.15L87.1686 44.4003Z"
            stroke="white"
            stroke-width="6.78571"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M81.6069 69.0884V89.4009"
            stroke="white"
            stroke-width="6.78571"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M81.6069 106.588C80.744 106.588 80.0444 105.889 80.0444 105.026C80.0444 104.163 80.744 103.463 81.6069 103.463"
            stroke="white"
            stroke-width="6.78571"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M81.6069 106.588C82.4699 106.588 83.1694 105.889 83.1694 105.026C83.1694 104.163 82.4699 103.463 81.6069 103.463"
            stroke="white"
            stroke-width="6.78571"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_229_32">
            <rect
              width="87.5"
              height="87.5"
              fill="white"
              transform="translate(38 38)"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

export default Failed;
