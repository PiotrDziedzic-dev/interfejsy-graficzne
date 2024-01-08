import {
  Avatar,
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
import data from "./../../database/userProfile.json";
// @ts-ignore
import volleyball_player from "./../../assets/volleyball_player.webp";

const MyProfile = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [section, setSection] = useState<"my_profile" | "my_groups">(
    "my_profile"
  );
  const [errors, setErrors] = useState({
    name: false,
    surname: false,
    email: false,
    phoneNumber: false,
    location: false,
  });

  // Przygotowanie stanu do przechowywania danych użytkownika
  const [userData, setUserData] = useState(() => {
    // Sprawdź czy dane są w localStorage, jeśli nie, użyj domyślnych z pliku
    const localData = localStorage.getItem("userData");
    return localData ? JSON.parse(localData) : data;
  });

  // Funkcja aktualizująca stan i zapisująca do localStorage
  const saveChanges = () => {
    // Definicja prostego wyrażenia regularnego dla e-mail
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    const newErrors = {
      name: !userData.name.trim(),
      surname: !userData.surname.trim(),
      email: !emailRegex.test(userData.email),
      phoneNumber:
        !userData.phoneNumber.trim() || !/^\d+$/.test(userData.phoneNumber),
      location: !userData.location.trim(),
      checkbox:
        [
          userData.public,
          userData.private,
          userData.visible_only_for_friends,
        ].filter(Boolean).length !== 1,
    };

    // Aktualizacja stanu błędów
    setErrors(newErrors);

    // Sprawdź, czy są jakieś błędy
    if (Object.values(newErrors).some(Boolean)) {
      enqueueSnackbar("Proszę poprawić błędy przed zapisaniem!", {
        variant: "error",
      });
      return;
    }
    // Sprawdź, czy tylko jeden checkbox jest zaznaczony
    const checkboxes = [
      userData.public,
      userData.private,
      userData.visible_only_for_friends,
    ];
    const checkedCount = checkboxes.filter(Boolean).length;
    if (checkedCount !== 1) {
      enqueueSnackbar("Tylko jeden status konta może być zaznaczony!", {
        variant: "error",
      });
      return;
    }
    localStorage.setItem("userData", JSON.stringify(userData));
    enqueueSnackbar("Zapisano zmiany", { variant: "success" });
  };

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
        spacing={2}
        sx={{
          width: "fit-content",
          padding: "24px",
          alignItems: "center",
        }}
      >
        <Avatar
          alt="volleyball_player"
          src={volleyball_player}
          sx={{ width: "80%", height: "20%" }}
        />
        <Button variant={"outlined"} onClick={onClick}>
          Zmień zdjęcie
        </Button>
      </Stack>
    );
  };

  const rightPanel = () => {
    // Funkcja obsługująca zmiany w inputach
    const handleChange = (event: any) => {
      const { name, value, checked, type } = event.target;

      setUserData((prevData: any) => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      }));
    };

    return (
      <Stack sx={{ padding: "24px" }} spacing={2}>
        <Box sx={{ display: "flex", gap: 3 }}>
          <TextField
            label="Imię"
            name="name"
            value={userData.name}
            onChange={handleChange}
            error={errors.name}
            helperText={errors.name && "Imię nie może być puste"}
          />
          <TextField
            label="Nazwisko"
            name="surname"
            value={userData.surname}
            onChange={handleChange}
            error={errors.surname}
            helperText={errors.surname && "Nazwisko nie może być puste"}
          />
        </Box>
        <TextField
          label="e-mail"
          name="email"
          value={userData.email}
          onChange={handleChange}
          error={errors.email}
          helperText={
            errors.email && "Prosze podac email o poprawnej strukturze"
          }
        />
        <TextField
          label="Numer telefonu"
          name="phoneNumber"
          value={userData.phoneNumber}
          onChange={handleChange}
          error={errors.phoneNumber}
          helperText={
            errors.phoneNumber &&
            "Numer telefonu jest wymagany i może zawierać tylko cyfry"
          }
        />
        <TextField
          label="Lokalizacja"
          name="location"
          value={userData.location}
          onChange={handleChange}
          error={errors.location}
          helperText={errors.location && "Lokalizacja nie może być pusta"}
        />
        <FormControlLabel
          control={
            <Checkbox
              name="public"
              checked={userData.public}
              onChange={handleChange}
            />
          }
          label="Konto publiczne"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="private"
              checked={userData.private}
              onChange={handleChange}
            />
          }
          label="Konto prywatne"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="visible_only_for_friends"
              checked={userData.visible_only_for_friends}
              onChange={handleChange}
            />
          }
          label="Widoczne tylko dla znajomych"
        />
        <TextField
          label="Opis"
          name="description"
          multiline
          minRows={5}
          value={userData.description}
          onChange={handleChange}
        />
        <Button variant="contained" onClick={() => saveChanges()}>
          Zapisz zmiany
        </Button>
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
