import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useState } from "react";
import { enqueueSnackbar, useSnackbar } from "notistack";
import { useDropzone } from "react-dropzone";

const MyProfile = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [section, setSection] = useState<"my_profile" | "my_groups">(
    "my_profile"
  );

  const handleAddFile = async (file: File) => {
    enqueueSnackbar("Plik załadowany poprawnie", { variant: "success" });
  };

  const { getRootProps } = useDropzone({
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
    },
    onDrop: (files: any) => handleAddFile(files[0]),
    onError: (err: any) => enqueueSnackbar(err.message, { variant: "error" }),
  });

  const { onClick } = getRootProps();
  const leftPanel = () => {
    return (
      <Stack
        sx={{
          width: "fit-content",
          padding: "24px",
          alignItems: "center",
        }}
      >
        <AccountCircle sx={{ fontSize: "128px" }} />
        <Button variant={"outlined"} onClick={onClick}>
          Zmień zdjęcie
        </Button>
      </Stack>
    );
  };

  const rightPanel = () => {
    return (
      <Stack sx={{ padding: "24px" }} spacing={2}>
        <Box sx={{ display: "flex", gap: 3 }}>
          <TextField label={"Imię"} />
          <TextField label={"Nazwisko"} />
        </Box>
        <TextField label={"e-mail"} />
        <TextField label={"Numer telefonu"} />
        <TextField label={"Lokalizacja"} />
        <FormControlLabel control={<Checkbox />} label="Konto publiczne" />
        <FormControlLabel control={<Checkbox />} label="Konto prywatne" />
        <FormControlLabel
          control={<Checkbox />}
          label="Widoczne tylko dla znajomych"
        />
        <TextField label={"Opis"} multiline minRows={5} />
        <Button variant={"contained"}>Zapisz zmiany</Button>
      </Stack>
    );
  };

  const myGroups = () => {
    return (
      <Stack sx={{ width: "100%" }}>
        <Box>
          <Button
            onClick={() => setSection("my_profile")}
            variant={"contained"}
          >
            Mój profil
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            minHeight: "80px",
            justifyContent: "space-between",
            fontWeight: 600,
          }}
        >
          Boisko na Sławkowskiej treningi w czwartek
          <Box sx={{ color: "red" }}>2 nowe posty</Box>
          <Button variant={"outlined"}>Wyświetl</Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            minHeight: "80px",
            justifyContent: "space-between",
            fontWeight: 600,
          }}
        >
          Siatkówka, Bronowice treningi w poniedziałek
          <Button variant={"outlined"}>Wyświetl</Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            minHeight: "80px",
            justifyContent: "space-between",
            fontWeight: 600,
          }}
        >
          Entuzjaści koszykówki <Button variant={"outlined"}>Wyświetl</Button>
        </Box>
      </Stack>
    );
  };

  return (
    <Stack sx={{ height: "100%" }} alignItems={"center"} spacing={2}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "fit-content",
          border: "2px solid blue",
          fontWeight: 600,
          padding: "16px",
          fontSize: "250%",
          color: "blue",
          width: "60%",
          borderRadius: "8px",
        }}
      >
        Mój Profil
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "60%",
          justifyContent: "center",
        }}
      >
        {section === "my_profile" && leftPanel()}
        {section === "my_profile" && rightPanel()}
        {section === "my_groups" && myGroups()}
        {section === "my_profile" && (
          <Box sx={{ paddingTop: "24px" }}>
            <Button
              variant={"contained"}
              onClick={() => setSection("my_groups")}
            >
              Moje grupy
            </Button>
          </Box>
        )}
      </Box>
    </Stack>
  );
};

export default MyProfile;
