import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  Divider,
  Stack,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Checkbox,
  FormControlLabel,
  Box,
  FormHelperText,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { sports } from "./../../constants/constants";

interface Props {
  open: boolean;
  handleClose: () => void;
  refetch: boolean;
  setRefetch: (x: boolean) => void;
}

const CreateGroupDialog: React.FC<Props> = ({
  open,
  handleClose,
  setRefetch,
  refetch,
}) => {
  const [groupName, setGroupName] = useState("");
  const [groupSport, setGroupSport] = useState("");
  const [groupCategory, setGroupCategory] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [ageFrom, setAgeFrom] = useState("");
  const [ageTo, setAgeTo] = useState("");
  const [location, setLocation] = useState("");
  const [privateGroup, setPrivateGroup] = useState(false);
  const [errors, setErrors] = useState({
    groupName: false,
    groupSport: false,
    groupCategory: false,
    groupDescription: false,
    location: false,
  });

  const { enqueueSnackbar } = useSnackbar();

  const handleCreateGroup = () => {
    let hasError = false;
    let newErrors = { ...errors };

    if (!groupName.trim()) {
      newErrors.groupName = true;
      hasError = true;
    }
    if (!groupSport.trim()) {
      newErrors.groupSport = true;
      hasError = true;
    }
    if (!groupCategory.trim()) {
      newErrors.groupCategory = true;
      hasError = true;
    }
    if (!groupDescription.trim()) {
      newErrors.groupDescription = true;
      hasError = true;
    }
    if (!location.trim()) {
      newErrors.location = true;
      hasError = true;
    }

    setErrors(newErrors);

    if (hasError) {
      return;
    }

    const newGroup = {
      id: Date.now(),
      rate: 5,
      name: groupName,
      sport: groupSport,
      category: groupCategory,
      description: groupDescription,
      ageFrom: parseInt(ageFrom),
      ageTo: parseInt(ageTo),
      numberOfMembers: 1,
      dateOfCreation: "2024-01-09",
      location,
      isPublic: !privateGroup,
      członkowie: [1],
    };

    const existingGroups = JSON.parse(
      localStorage.getItem("groupsData") || "[]"
    );
    const updatedGroups = [...existingGroups, newGroup];
    localStorage.setItem("groupsData", JSON.stringify(updatedGroups));

    enqueueSnackbar("Grupa dodana pomyślnie", { variant: "success" });
    setRefetch(!refetch);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth={"lg"}>
      <DialogTitle
        sx={{ display: "flex", fontWeight: 600, minWidth: "800px" }}
        color={"primary"}
      >
        Tworzenie nowej grupy
      </DialogTitle>
      <Divider />
      <Stack spacing={2} sx={{ padding: "16px" }}>
        <TextField
          error={errors.groupName}
          helperText={errors.groupName && "Nazwa grupy jest wymagana"}
          label="Nazwa grupy"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <FormControl fullWidth error={errors.groupSport}>
          <InputLabel>Sport</InputLabel>
          <Select
            value={groupSport}
            onChange={(e) => setGroupSport(e.target.value)}
          >
            {sports.map((sport, index) => (
              <MenuItem key={index} value={sport}>
                {sport}
              </MenuItem>
            ))}
          </Select>
          {errors.groupSport && (
            <FormHelperText>Sport jest wymagany</FormHelperText>
          )}
        </FormControl>
        <FormControl fullWidth error={errors.groupCategory}>
          <InputLabel>Kategoria</InputLabel>
          <Select
            value={groupCategory}
            onChange={(e) => setGroupCategory(e.target.value)}
          >
            <MenuItem value="Mecze">Mecze</MenuItem>
            <MenuItem value="Uprawianie sportu">Uprawianie sportu</MenuItem>
            <MenuItem value="Wydarzenia sportowe">Wydarzenia sportowe</MenuItem>
          </Select>
          {errors.groupCategory && (
            <FormHelperText>Kategoria jest wymagana</FormHelperText>
          )}
        </FormControl>
        <TextField
          error={errors.groupDescription}
          helperText={errors.groupDescription && "Opis grupy jest wymagany"}
          label="Opis Grupy"
          multiline
          minRows={4}
          value={groupDescription}
          onChange={(e) => setGroupDescription(e.target.value)}
        />
        <Box sx={{ fontWeight: 600 }}>Przedział wiekowy:</Box>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Box>od</Box>
          <input
            min={1}
            type="number"
            value={ageFrom}
            onChange={(e) => setAgeFrom(e.target.value)}
          />
          <Box>do</Box>
          <input
            min={1}
            type="number"
            value={ageTo}
            onChange={(e) => setAgeTo(e.target.value)}
          />
        </Box>
        <TextField
          error={errors.location}
          helperText={errors.location && "Lokalizacja jest wymagana"}
          label="Lokalizacja"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            gap: 4,
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={privateGroup}
                onChange={() => setPrivateGroup(true)}
              />
            }
            label="Prywatna"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={!privateGroup}
                onChange={() => setPrivateGroup(false)}
              />
            }
            label="Publiczna"
          />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#C01111" }}
            onClick={handleClose}
          >
            Anuluj
          </Button>
          <Button variant="contained" onClick={handleCreateGroup}>
            Utwórz
          </Button>
        </Box>
      </Stack>
    </Dialog>
  );
};

export default CreateGroupDialog;
