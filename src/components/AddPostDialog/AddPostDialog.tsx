import React, { FC, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { sports } from "./../../constants/constants";
import { useSnackbar } from "notistack";

interface Props {
  open: boolean;
  handleClose: () => void;
  addNewPost: (newPost: any) => void; // Dodajemy tę funkcję do propsów
}

const AddPostDialog: FC<Props> = ({ open, handleClose, addNewPost }) => {
  const { enqueueSnackbar } = useSnackbar();

  // Stan dla nowego postu
  const [newPost, setNewPost] = useState({
    title: "",
    category: "",
    text: "",
  });

  // Stan dla niestandardowej kategorii i błędów
  const [customCategory, setCustomCategory] = useState("");
  const [errors, setErrors] = useState({
    title: false,
    category: false,
    text: false,
    customCategory: false,
  });

  const handleSave = () => {
    // Resetuj stan błędów
    setErrors({
      title: !newPost.title,
      category: !newPost.category,
      text: !newPost.text,
      customCategory: newPost.category === "Inne" && !customCategory,
    });

    // Sprawdź, czy wszystkie pola są wypełnione (i niestandardowa kategoria dla "Inne")
    if (
      newPost.title &&
      newPost.category &&
      newPost.text &&
      (newPost.category !== "Inne" || customCategory)
    ) {
      // Przygotuj obiekt nowego postu do dodania
      const postToAdd = {
        ...newPost,
        category:
          newPost.category === "Inne" ? customCategory : newPost.category,
      };

      addNewPost(postToAdd); // Dodaj nowy post
      enqueueSnackbar("Post dodany pomyślnie", { variant: "success" });
      handleClose(); // Zamknij dialog
      setNewPost({ title: "", category: "", text: "" }); // Resetuj stan
      setCustomCategory(""); // Resetuj niestandardową kategorię
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth={"lg"}>
      <DialogTitle
        sx={{ display: "flex", fontWeight: 600, minWidth: "600px" }}
        color={"primary"}
      >
        {"Dodaj nowy post"}
      </DialogTitle>

      <Divider />

      <Stack spacing={2} sx={{ padding: "16px" }}>
        <TextField
          label={"Tytuł"}
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          error={errors.title}
          helperText={errors.title && "Tytuł nie może być pusty"}
        />
        <FormControl fullWidth error={errors.category}>
          <InputLabel>Sport</InputLabel>
          <Select
            value={newPost.category}
            label="Sport"
            onChange={(e) => {
              setNewPost({ ...newPost, category: e.target.value as string });
              // Resetuj niestandardową kategorię, gdy zmieniasz wybór
              if (e.target.value !== "Inne") setCustomCategory("");
            }}
          >
            {sports.map((sport, index) => (
              <MenuItem key={index} value={sport}>
                {sport}
              </MenuItem>
            ))}
          </Select>
          {errors.category && (
            <Box sx={{ color: "error.main", fontSize: "0.75rem", mt: 1 }}>
              Proszę wybrać kategorię
            </Box>
          )}
        </FormControl>
        {newPost.category === "Inne" && (
          <TextField
            label={"Niestandardowa kategoria"}
            value={customCategory}
            onChange={(e) => setCustomCategory(e.target.value)}
            error={errors.customCategory}
            helperText={errors.title && "Kategoria nie może być pusta"}
          />
        )}
        <TextField
          label={"Opis"}
          multiline
          minRows={4}
          value={newPost.text}
          onChange={(e) => setNewPost({ ...newPost, text: e.target.value })}
          error={errors.text}
          helperText={errors.text && "Opis nie może być pusty"}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant={"contained"} onClick={handleSave}>
            Zapisz
          </Button>
        </Box>
      </Stack>
    </Dialog>
  );
};

export default AddPostDialog;
