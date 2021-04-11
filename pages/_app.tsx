import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "@hooks/auth";
import { theme } from "@styles/theme.chakra";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme} resetCSS>
      <AuthProvider>
        <Head>
          <title>DevTree - Link sharing for developers</title>
        </Head>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
