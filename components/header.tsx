import React from "react";
import { Flex, Box, Center, Spacer } from "@chakra-ui/react";
import Image from "next/image";
import Logo from "@assets/images/logo.png";
import LogoWhite from "@assets/images/logo-white.png";
import MainNav from "./navs/main";
import MobileNavs from "./navs/mobile";

const Header = ({ sticky }) => {
  return (
    <Flex w="100%" gap={4} className={`bg-transparent p-4`}>
      <Box p="2" className="flex items-center">
        <Image src={sticky ? Logo : LogoWhite} width={150} height={100} alt="logo" />
        <h1 className="hidden">Z Tours PH</h1>
      </Box>
      <Spacer />
      <Center gap="2">
        <MainNav sticky={sticky} />
        <MobileNavs sticky={sticky} />
      </Center>
    </Flex>
  );
};

export default Header;
