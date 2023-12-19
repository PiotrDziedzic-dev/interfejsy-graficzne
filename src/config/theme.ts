import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#002dc4",
    },
    secondary: {
      main: "#000000",
    },
    background: {
      default: "#fafafa",
      paper: "#fff",
    },
  },
  typography: {
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: false,
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiFilledInput-root": {
            "& input": {
              // style problems with chrome autofill
              // https://github.com/mui/material-ui/issues/283#issuecomment-925484837
              "&:-webkit-autofill, &:-webkit-autofill:hover, &:-webkit-autofill:focus, &:-webkit-autofill:active":
                {
                  WebkitTextFillColor: "inherit",
                  WebkitBoxShadow: `0 0 0 1000px #F1F5FA inset`,
                  // put here the right colors
                },
            },
          },
        },
      },
    },
  },
});

export default theme;
