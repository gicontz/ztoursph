import styled from "@emotion/styled";
import React from "react";
import Button from "@components/commons/button";
import Link from "next/link";
import HeaderText from "@components/commons/header-text";

const CookiesPopUp = () => {
  const [consent, setConsent] = React.useState(false);
  const [show, setShow] = React.useState(false);

  const AgreeCookiesLocalStorage = (bool: boolean) => {
    localStorage.setItem("agree_cookies_policy", bool?.toString());
    return Boolean(localStorage.getItem("agree_cookies_policy"));
  };

  React.useEffect(() => {
    if (localStorage.getItem("agree_cookies_policy") !== "true") {
      console.log(!Boolean(localStorage.getItem("agree_cookies_policy")));
      setTimeout(() => {
        setShow(true);
      }, 2500);
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
        <HeaderText size={2}>Cookies Policy</HeaderText>
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
            setConsent(AgreeCookiesLocalStorage(true));
            setShow(false);
          }}>
          Agree
        </Button>
        <Link href="/cookies-policy">
          <Button
            type="link"
            onClick={() => {
              setConsent(AgreeCookiesLocalStorage(false));
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
