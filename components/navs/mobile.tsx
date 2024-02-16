import React, { FunctionComponent, useState } from "react";
import Link from "next/link";
import styled from "@emotion/styled";
import { Tooltip } from "@chakra-ui/react";
import { MdOutlineAirplaneTicket, MdPerson, MdArrowBack } from "react-icons/md";
import { MENU_LINKS } from "@constants/nav";

const Container = styled.div`
  align-items: center;
  justify-content: space-between;
  background-color: #ffffff;
  color: #533557;
  padding: 0 10px;
  z-index: 10;
`;

const LabelMenuBtn = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  transition: all 0.5s ease-in-out;
  z-index: 2;
  margin-right: -35px;
  cursor: pointer;
`;

const MenuToggler = styled.input`
  display: none;
  &:checked {
    ~ .hamburger-menu {
      transform: translateX(-50px);
      background: transparent;
    }
    ~ .hamburger-menu::before {
      transform: rotate(45deg) translate(35px, -35px);
    }
    ~ .hamburger-menu::after {
      transform: rotate(-45deg) translate(35px, 35px);
    }
  }
`;

const NavPanel = styled.ul<{ visible?: boolean }>`
  position: absolute;
  z-index: 1;
  background-color: #ffffff;
  left: ${({ visible }) => (visible ? "25%" : "100%")};
  height: 100%;
  width: 55%;
  margin-left: 20%;
  padding: 20px 0;
  top: 0;
  transition: all 0.5s ease-in-out;
  > li {
    padding: 10px 0;
    text-align: center;
    transition: all 0.2s ease;
    list-style-type: none;
    cursor: pointer;
    &:hover {
      letter-spacing: 2px;
      opacity: 0.6;
    }
  }
`;

const Hamburger = styled.div`
  width: 20px;
  height: 2px;
  background-color: #533557;
  border-radius: 5px;
  z-index: 20;
  transition: all 0.5s ease;
  &:before,
  &:after {
    content: "";
    position: absolute;
    width: 20px;
    height: 2px;
    background: #533557;
    border-radius: 5px;
    transition: all 0.5s ease;
  }
  &:before {
    transform: translateY(-6px);
  }
  &:after {
    transform: translateY(6px);
  }
`;

const MobileNavs: FunctionComponent = () => {
  const [state, setState] = useState({
    toggle: false,
  });

  const handleToggle = (v: boolean) => {
    setState({ toggle: v });
  };
  return (
    <Container className="flex lg:hidden">
      <Tooltip label="My Trips">
        <Link href="/trips" className="mr-4">
          <MdOutlineAirplaneTicket size="2em" />
        </Link>
      </Tooltip>

      <Tooltip label="My Account">
        <Link href="/account">
          <MdPerson size="2em" />
        </Link>
      </Tooltip>

      <LabelMenuBtn htmlFor="screen1_menu_check" />
      <MenuToggler
        type="checkbox"
        id="screen1_menu_check"
        onChange={(v) => handleToggle(v.target.checked)}
      />
      <Hamburger className="hamburger-menu" />
      <NavPanel visible={state.toggle}>
        {MENU_LINKS.map(({ label, href }) => (
          <li key={label}>
            <Link href={href}>{label}</Link>
          </li>
        ))}
      </NavPanel>
    </Container>
  );
};

export default MobileNavs;
