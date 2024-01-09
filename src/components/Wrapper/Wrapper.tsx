import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import {
  AccountBox,
  AccountCircle,
  Facebook,
  Instagram,
  Twitter,
} from "@mui/icons-material";
import { Outlet, useNavigate } from "react-router-dom";
import React, { useState } from "react";
// @ts-ignore
import sport_connect from "./../../assets/sport_connect.jpg";
interface NavigationButton {
  name: string;
  redirectTo:
    | "aktualnosci"
    | "forum"
    | "grupy"
    | "sekcjaEkspercka"
    | "my_profile"
    | "sekcja_ekspercka"
    | "";
}

const Wrapper = () => {
  const [currentTab, setCurrentTab] = useState<
    | "aktualnosci"
    | "forum"
    | "grupy"
    | "sekcjaEkspercka"
    | "my_profile"
    | "sekcja_ekspercka"
    | ""
  >("aktualnosci");

  const navigate = useNavigate();

  const navigationButtons: NavigationButton[] = [
    {
      name: "Aktualnosci",
      redirectTo: "",
    },
    {
      name: "Forum Dyskusyjne",
      redirectTo: "forum",
    },
    {
      name: "Grupy",
      redirectTo: "grupy",
    },
    {
      name: "Sekcja Ekspercka",
      redirectTo: "sekcja_ekspercka",
    },
  ];

  const footer = () => {
    return (
      <Box
        sx={{
          backgroundColor: "#6e88d9",
          display: "flex",
          height: "10%",
          borderRadius: "4px",
          color: "white",
          fontSize: "28px",
          fontFamily: "Georgia",
          fontWeight: 600,
          alignItems: "center",
          padding: "0 24px",
          gap: 30,
        }}
      >
        Zaobserwuj nas na social mediach, żeby nie ominąć żadnych nowości!
        <IconButton
          onClick={() => window.open("https://instagram.com", "_blank")}
        >
          <Instagram />
        </IconButton>
        <IconButton
          onClick={() => window.open("https://facebook.com", "_blank")}
        >
          <Facebook />
        </IconButton>
        <IconButton
          onClick={() => window.open("https://twitter.com", "_blank")}
        >
          <Twitter />
        </IconButton>
      </Box>
    );
  };

  const header = () => {
    return (
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "15%",
          padding: "16px",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Stack
          sx={{ ml: 4 }}
          spacing={1}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <img
            src={sport_connect}
            alt={"logo"}
            style={{ maxWidth: "100px" }}
          ></img>
          <Typography variant={"h6"} color={"primary"} sx={{ fontWeight: 650 }}>
            Sport connect
          </Typography>
        </Stack>
        <Box sx={{ display: "flex", gap: 2 }}>
          {navigationButtons.map((t) => (
            <Button
              variant={currentTab === t?.redirectTo ? "contained" : "outlined"}
              onClick={() => {
                navigate("/" + t?.redirectTo);
                setCurrentTab(t?.redirectTo);
              }}
            >
              {t?.name}
            </Button>
          ))}
        </Box>
        <Box sx={{ mr: 4, display: "flex", alignItems: "center", gap: 3 }}>
          <AccountCircle color={"primary"} sx={{ fontSize: "32px" }} />
          <Button
            variant={currentTab === "my_profile" ? "contained" : "outlined"}
            onClick={() => {
              navigate("/my_profile");
              setCurrentTab("my_profile");
            }}
          >
            Mój Profil
          </Button>
        </Box>
      </Box>
    );
  };

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      {header()}
      <Outlet />
      {footer()}
    </Box>
  );
};

export default Wrapper;
