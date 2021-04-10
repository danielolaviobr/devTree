import React from "react";
import {
  ChakraProvider,
  Flex,
  Box,
  Avatar,
  Stack,
  Button,
  Heading,
  useMediaQuery,
} from "@chakra-ui/react";
import useAuth from "@hooks/auth";
import AddSiteModal from "./AddSiteModal";
import { Logo } from "styles/icons";
import ShareModal from "./ShareModal";
import { FaGithubAlt } from "react-icons/fa";
import { useRouter } from "next/router";

interface ContainerProps {
  name?: string;
}

const Container: React.FC<ContainerProps> = ({ children, name }) => {
  const { user, signOut } = useAuth();
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const { replace } = useRouter();

  const handleSignOut = async () => {
    await signOut();
    replace("/");
  };
  return (
    <Flex justifyContent="center" flexDirection="column">
      <Box
        position="fixed"
        w="100vw"
        top={0}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        backgroundColor="white"
        pl={8}
        pr={8}
        pt={4}
        pb={4}
        boxShadow="sm"
        zIndex="1">
        <Stack isInline spacing={4}>
          <FaGithubAlt size={36} color="#38A169" />
        </Stack>
        <Stack spacing={4} isInline>
          <Button
            variant="ghost"
            size="lg"
            colorScheme="green"
            onClick={handleSignOut}>
            Logout
          </Button>
          <Avatar src={user?.photoUrl} />
        </Stack>
      </Box>
      <Box
        pt={16}
        display="flex"
        flexDirection="column"
        justify="center"
        alignItems="center"
        minHeight="100vh"
        backgroundColor="gray.100"
        px={4}>
        <Flex
          mt={8}
          maxWidth="1000px"
          align="center"
          justify="space-between"
          width="100%">
          {name && isLargerThan768 && <Heading>Welcome, {name}</Heading>}
          <Stack
            isInline
            spacing={4}
            align="center"
            ml={{ base: "auto", md: 0 }}>
            <AddSiteModal />
            <ShareModal />
          </Stack>
        </Flex>
        <Box
          ml="auto"
          mr="auto"
          mt={4}
          p={4}
          display="flex"
          flexDirection="column"
          width="100%"
          maxWidth="1000px"
          minHeight="400px"
          backgroundColor="white"
          borderRadius={8}
          boxShadow="sm">
          {children}
        </Box>
      </Box>
    </Flex>
  );
};

export default Container;
