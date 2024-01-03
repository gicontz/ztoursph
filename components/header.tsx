import React from 'react';
import { Grid, GridItem } from '@chakra-ui/react'
import styled from '@emotion/styled';
import Image from 'next/image';
import Logo from '@assets/images/logo.png';
import MainNav from './navs/main';

const Header = () => {
    return (
        <Grid w="100%" templateColumns='repeat(5, 1fr)' gap={4} className="p-4">
            <GridItem colSpan={2} h="20" className="flex items-center">
                <Image src={Logo} width={150} height={100} alt="logo" />
                <h1 className="hidden">Z Tours PH</h1>
            </GridItem>
            <GridItem colStart={3} colEnd={6} h="20" className="flex items-center">
                <MainNav />
            </GridItem>
        </Grid>
    )
}

export default Header;