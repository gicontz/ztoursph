import styled from "@emotion/styled";
import React from "react";
import Button from "@components/commons/button";
import HeaderSection from "@components/commons/header-section";
import Link from "next/link";

const CookiesPopUp = () => {
  const [consent, setConsent] = React.useState(false);
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    if (!consent) {
      setTimeout(() => {
        setShow(true);
      }, 3000);
    }
  }, []);

  const PopUp = styled.div<{ visible: boolean }>`
    position: fixed;
    display: ${(props) => (props.visible ? "flex" : "none")};
    border-top: #eaeaea solid 1px;

    gap: 1rem;
    flex-direction: column;
    width: 100%;
    padding: 0.5rem 3rem;
    border-radius: 3px;
    bottom: 0;
    background-color: #fff;
    z-index: 10;

    p {
      font-size: 0.8rem;
      @media (max-width: 600px) {
        font-size: 0.6rem;
      }
    }

    button {
      @media (max-width: 600px) {
        font-size: 0.6rem;
      }
    }

    @media (max-width: 600px) {
      padding: 1rem 0.5rem;
    }
  `;

  return (
    <PopUp visible={show}>
      <div>
        <HeaderSection size={2}>Cookies Policy</HeaderSection>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          interdum iaculis lectus, sed interdum velit convallis a. Curabitur
          maximus molestie dolor, nec rutrum libero ultrices vel. Nulla ac arcu
          ante. Donec ut convallis eros, nec tempor enim.
        </p>
      </div>

      <div className="w-fit ">
        <Button
          type="primary"
          onClick={() => {
            setConsent(true);
            setShow(false);
          }}>
          Agree
        </Button>
        <Link href="/cookies-policy">
          <Button
            type="link"
            onClick={() => {
              setConsent(false);
              setShow(false);
            }}>
            Visit Cookies Policy Page
          </Button>
        </Link>
      </div>
    </PopUp>
  );
};

export default CookiesPopUp;
