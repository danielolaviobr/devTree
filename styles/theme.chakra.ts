import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  fonts: {
    "*": `Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
  },
  colors: {
    bg: "#EDF2F7",
    brand: {
      100: "#f7fafc",
      900: "#1a202c",
    },
  },
  fontWeights: {
    normal: 400,
    medium: 600,
    bold: 700,
  },
  styles: {
    global: {
      "html, body": {
        minWidth: "360px",
        scrollBehavior: "smooth",
        backgroundColor: "#EDF2F7",
      },
      "#__next": {
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      },
    },
  },
  components: {
    Input: {
      variants: {
        outline: ({ colorScheme: c }) => ({
          field: {
            _focus: {
              borderColor: `${c}.500`,
            },
          },
        }),
      },
    },
  },
});
