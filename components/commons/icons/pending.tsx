import React from "react";

type props = {
  scale?: number;
  className?: string;
};
function Pending({ scale = 100, ...rest }: props) {
  return (
    <div className={`w-fit ${rest?.className}`} {...rest}>
      <svg
        width={scale}
        height={scale}
        viewBox="0 0 164 164"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <circle cx="82" cy="82" r="82" fill="#CACD2C" />
        <g clip-path="url(#clip0_224_67)">
          <path
            d="M85.7104 76.0677H54.3643"
            stroke="white"
            stroke-width="6.26923"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M110.788 38.4524H51.2299C47.9045 38.4524 44.7153 39.7734 42.3639 42.1248C40.0124 44.4762 38.6914 47.6655 38.6914 50.9909V119.952L54.3645 110.549L70.0376 119.952L85.7106 110.549L101.384 119.952V47.8562C101.384 45.3622 102.374 42.9703 104.138 41.2067C105.901 39.4432 108.294 38.4524 110.788 38.4524ZM110.788 38.4524C113.281 38.4524 115.674 39.4432 117.437 41.2067C119.201 42.9703 120.191 45.3622 120.191 47.8562V69.7985H101.384"
            stroke="white"
            stroke-width="6.26923"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_224_67">
            <rect
              width="87.4985"
              height="87.4985"
              fill="white"
              transform="translate(38 38)"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

export default Pending;
