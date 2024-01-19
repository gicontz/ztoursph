import React from 'react';
import { Flex, Box, Center, Spacer } from '@chakra-ui/react'
import styled from '@emotion/styled';
import Image from 'next/image';
import Logo from '@assets/images/logo.png';
import MainNav from './navs/main';
import MobileNavs from './navs/mobile';

const Header = () => {
    return (
        <Flex w="100%" gap={4} className="p-4">
            <Box p='2' className="flex items-center">
                <Image src={Logo} width={150} height={100} alt="logo" />
                <h1 className="hidden">Z Tours PH</h1>
            </Box>
            <Spacer />
            <Center gap='2'>
                <MainNav />
                <MobileNavs />
            </Center>
        </Flex>
    )
}

export default Header;