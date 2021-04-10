import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "@hooks/auth";
import { theme } from "@styles/theme.chakra";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme} resetCSS>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
