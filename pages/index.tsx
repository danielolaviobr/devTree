import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  FormLabel,
  GridItem,
  Grid,
  useBoolean,
  useMediaQuery,
} from "@chakra-ui/react";
import { Site } from "@dtos/site";
import Head from "next/head";
import useAuth from "@hooks/auth";
import React from "react";
import useSWR from "swr";
import AddSiteModal from "../components/shared/AddSiteModal";
import Container from "../components/shared/Container";
import fetcher from "../utils/fetcher";
import { useRouter } from "next/router";
import { FaGithub, FaGithubAlt } from "react-icons/fa";

export default function Page() {
  const [isLargerThan992] = useMediaQuery("(min-width: 992px)");
  const { signInWithGitHub } = useAuth();
  const { push } = useRouter();
  const [flag, setFlag] = useBoolean();

  const handleLogin = async () => {
    setFlag.toggle;
    await signInWithGitHub();
    push("/dashboard");
  };

  return (
    <>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
                if (document.cookie && document.cookie.includes('devtree-auth')) {
                window.location.href = "/dashboard"
                }`,
          }}
        />
      </Head>
      <Grid
        templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(3, 1fr)" }}
        h="100vh">
        <GridItem
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center">
          <Heading mb={12}>Start sharing now</Heading>
          <Button
            isLoading={flag}
            colorScheme="green"
            onClick={handleLogin}
            leftIcon={<FaGithub size={24} />}
            size="lg">
            Join with GitHub
          </Button>
        </GridItem>
        {isLargerThan992 && (
          <GridItem
            bg="green.500"
            colSpan={2}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center">
            <FaGithubAlt size={128} color="#EDF2F7" />
            <Heading size="3xl" color="bg" letterSpacing={-2}>
              DevTree
            </Heading>
          </GridItem>
        )}
      </Grid>
    </>
  );
}
