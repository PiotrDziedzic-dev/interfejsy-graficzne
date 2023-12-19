import { useSnackbar } from "notistack";
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { sports } from "./../../constants/constants";
import { FC, useState } from "react";
import { useDropzone } from "react-dropzone";

interface Props {
  open: boolean;
  handleClose: () => void;
}

const CreateGroupDialog: FC<Props> = ({ open, handleClose }) => {
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
  const [privateGroup, setPrivateGroup] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();
  return (
    <Dialog open={open} onClose={handleClose} maxWidth={"lg"}>
      <DialogTitle
        sx={{ display: "flex", fontWeight: 600, minWidth: "800px" }}
        color={"primary"}
      >
        {"Tworzenie nowej grupy"}
      </DialogTitle>

      <Divider />

      <Stack spacing={2} sx={{ padding: "16px" }}>
        <TextField label={"Nazwa grupy"} />
        <FormControl>
          <InputLabel>Sport</InputLabel>
          <Select>
            {sports.map((sport) => {
              return <MenuItem value={sport}>{sport}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel>Kategoria</InputLabel>
          <Select>
            <MenuItem value={"Mecze"}>{"Mecze"}</MenuItem>
            <MenuItem value={"Uprawianie sportu"}>
              {"Uprawianie sportu"}
            </MenuItem>
            <MenuItem value={"Wydarzenia sportowe"}>
              {"Wydarzenia sportowe"}
            </MenuItem>
          </Select>
        </FormControl>
        <TextField label={"Opis Grupy"} multiline minRows={4} />
        <Box sx={{ fontWeight: 600 }}>Przedział wiekowy:</Box>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Box>od</Box>
          <input type={"number"} />
          <Box>do</Box>
          <input type={"number"} />
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Checkbox />
            Dowolny
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            gap: 4,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Checkbox
              checked={privateGroup}
              onClick={() => setPrivateGroup(true)}
            />
            Prywatna
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Checkbox
              checked={!privateGroup}
              onClick={() => setPrivateGroup(false)}
            />
            Publiczna
          </Box>
        </Box>
        <TextField label={"Lokalizacja"} />
        <Button variant={"outlined"} onClick={onClick}>
          Dodaj zdjęcie grupy
        </Button>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant={"contained"}
              sx={{ backgroundColor: "#C01111" }}
              onClick={handleClose}
            >
              Anuluj
            </Button>
            <Button
              variant={"contained"}
              onClick={() => {
                handleClose();
                enqueueSnackbar("Grupa dodana pomyślnie", {
                  variant: "success",
                });
              }}
            >
              Utwórz
            </Button>
          </Box>
        </Box>
      </Stack>
    </Dialog>
  );
};

export default CreateGroupDialog;
