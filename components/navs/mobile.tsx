import React, { FunctionComponent, useState } from 'react';
import Link from 'next/Link';
import styled from '@emotion/styled';
import { Tooltip } from '@chakra-ui/react';
import { MdOutlineAirplaneTicket, MdPerson, MdArrowBack } from "react-icons/md"; 

const Container = styled.div`

`;

const NavPanel = styled.div<{ visible?: boolean }>` 
    display: ${({ visible }) => visible ? 'block' : 'none' };
    position: absolute;
    right: 0;
    top: 0;
`;

const MobileNavs: FunctionComponent = () => {
    const [state, setState] = useState({
        toggle: false,
    });

    const handleToggle = () => {
        setState({ toggle: !state.toggle });
    }
    return (
        <Container>
            <MdArrowBack onClick={handleToggle}/>
            <NavPanel visible={state.toggle}>
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
            </NavPanel>
        </Container>
    )
}

export default MobileNavs;