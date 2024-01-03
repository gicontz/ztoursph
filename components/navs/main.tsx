import React from 'react';
import styled from '@emotion/styled';
import { Tooltip } from '@chakra-ui/react';
import { MdOutlineAirplaneTicket, MdPerson } from "react-icons/md"; 
import Link from 'next/link';

const Container = styled.div`
  padding-top: 5px;
  padding-bottom: 5px;
  display: flex;
  > a {
    margin-right: 35px;
    display: flex;
    align-items: center;
  }
`;

const MainNav = () => {
    return (
        <Container>
            <Link href="/">
                Home
            </Link>
            <Link href="/">
                Tours & Travel Packages
            </Link>
            <Link href="/">
                Deals & Promos
            </Link>
            <Link href="/">
                About Us
            </Link>
            <Link href="/">
                Contact Us
            </Link>
            <Tooltip label="My Trips">
                <Link href="/trips">
                        <MdOutlineAirplaneTicket size="2em" />
                </Link>
            </Tooltip>
            <Tooltip label="My Account">
                <Link href="/account">
                        <MdPerson size="2em" />
                </Link>
            </Tooltip>
        </Container>
    )
}

export default MainNav;