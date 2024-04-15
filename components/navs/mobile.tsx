import React, { FunctionComponent, useEffect, useState } from "react";
import Link from "next/link";
import styled from "@emotion/styled";
import { Tooltip } from "@chakra-ui/react";
import { MdOutlineAirplaneTicket, MdPerson, MdArrowBack } from "react-icons/md";
import { MENU_LINKS } from "@constants/nav";
import { useTripsContext } from "@providers/trips";
import { getTrips } from "@app/modules/trips/actions";
import { useCookies } from "react-cookie";
import { Added_Trips } from "@constants/added_trips";
import { classNames } from "@app/utils/helpers";

const Container = styled.div`
  align-items: center;
  justify-content: space-between;
  color: black;
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
  color: #533557;
  background-color: #ffffff;
  left: ${({ visible }) => (visible ? "25%" : "100%")};
  height: 100vh;
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
  border-radius: 5px;
  z-index: 20;
  transition: all 0.5s ease;
  &:before,
  &:after {
    content: "";
    position: absolute;
    width: 20px;
    height: 2px;
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

const MobileNavs = ({ sticky }) => {
  const [state, setState] = useState({
    toggle: false,
  });
  const [cookie] = useCookies([Added_Trips]);
  const { tripStore, tripDispatch } = useTripsContext();
  
  useEffect(() => {
    getTrips(tripDispatch, cookie[Added_Trips] ?? []);
  }, []);

  const handleToggle = (v: boolean) => {
    setState({ toggle: v });
  };
  return (
    <Container className="flex lg:hidden">
      <Tooltip label="My Trips">
        <Link href="/trips" className="relative">
          <MdOutlineAirplaneTicket color={sticky ? 'black' : 'white'} size="2em" />
          {tripStore.trips.length > 0 && <span className="absolute -right-1 -mt-4 bg-red-600 rounded-full text-white text-xs w-4 h-4 text-center">{tripStore.trips.length}</span>}
        </Link>
      </Tooltip>

      {/* <Tooltip label="My Account">
        <Link href="/account">
          <MdPerson size="2em" />
        </Link>
      </Tooltip> */}

      <LabelMenuBtn htmlFor="screen1_menu_check" />
      <MenuToggler
        type="checkbox"
        id="screen1_menu_check"
        onChange={(v) => handleToggle(v.target.checked)}
      />
      <Hamburger className={classNames("hamburger-menu", sticky || state.toggle ? "bg-black [&:after]:bg-black [&:before]:bg-black" : "bg-white [&:after]:bg-white [&:before]:bg-white")} />
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
