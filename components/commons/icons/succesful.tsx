import React from "react";

type props = {
  scale?: number;
  className?: string;
};
function Succesful({ scale = 100, ...rest }: props) {
  return (
    <div className={`w-fit ${rest?.className}`} {...rest}>
      <svg
        width={scale}
        height={scale}
        viewBox="0 0 164 164"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <circle cx="82" cy="82" r="82" fill="#23432C" />
        <g clip-path="url(#clip0_224_45)">
          <path
            d="M56.1409 82.7969L68.5724 92.1205L90.3275 67.2575"
            stroke="white"
            stroke-width="6.21574"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M113.637 42.3945H54.587C51.29 42.3945 48.128 43.7043 45.7966 46.0357C43.4653 48.367 42.1555 51.529 42.1555 54.826V123.199L57.6949 113.876L73.2342 123.199L88.7736 113.876L104.313 123.199V51.7181C104.313 49.2454 105.295 46.8738 107.044 45.1254C108.792 43.3768 111.164 42.3945 113.637 42.3945ZM113.637 42.3945C116.109 42.3945 118.481 43.3768 120.23 45.1254C121.978 46.8738 122.96 49.2454 122.96 51.7181V73.4732H104.313"
            stroke="white"
            stroke-width="6.21574"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_224_45">
            <rect
              width="87.4985"
              height="87.4985"
              fill="white"
              transform="translate(38.8086 39.0476)"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

export default Succesful;
