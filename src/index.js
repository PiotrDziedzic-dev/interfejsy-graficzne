import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import theme from "./config/theme";
import { ThemeProvider } from "@mui/system";
import { Box, CssBaseline } from "@mui/material";
import { SnackbarProvider } from "notistack";

const index = ReactDOM.createRoot(document.getElementById("root"));
index.render(
  <React.StrictMode>
    <SnackbarProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <Box component="main" sx={{ flexGrow: 1 }}>
              <App />
            </Box>
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    </SnackbarProvider>
  </React.StrictMode>
);

reportWebVitals();
