import { FC } from "react";
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
}

const AddPostDialog: FC<Props> = ({ open, handleClose }) => {
  const { enqueueSnackbar } = useSnackbar();
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
        <TextField label={"Tytuł"} />
        <FormControl>
          <InputLabel>Sport</InputLabel>
          <Select>
            {sports.map((sport) => {
              return <MenuItem value={sport}>{sport}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <TextField label={"Opis"} multiline minRows={4} />
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant={"contained"}
            onClick={() => {
              handleClose();
              enqueueSnackbar("Post dodany pomyślnie", { variant: "success" });
            }}
          >
            Zapisz
          </Button>
        </Box>
      </Stack>
    </Dialog>
  );
};

export default AddPostDialog;
