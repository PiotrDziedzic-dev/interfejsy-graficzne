import { useSnackbar } from "notistack";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { sports } from "@/constants/constants";
import { FC } from "react";

interface Props {
  open: boolean;
  handleClose: () => void;
}

const AddSortingDialog: FC<Props> = ({ open, handleClose }) => {
  const { enqueueSnackbar } = useSnackbar();
  return (
    <Dialog open={open} onClose={handleClose} maxWidth={"lg"}>
      <DialogTitle
        sx={{ display: "flex", fontWeight: 600, minWidth: "600px" }}
        color={"primary"}
      >
        {"Zastosuj reguły sortowania"}
      </DialogTitle>

      <Divider />

      <Stack spacing={2} sx={{ padding: "16px" }}>
        <FormControl>
          <InputLabel>Sortowanie</InputLabel>
          <Select>
            <MenuItem value={"Rosnąco po dacie stworzenia"}>
              {"Rosnąco po dacie stworzenia"}
            </MenuItem>
            <MenuItem value={"Malejąco po dacie stworzenia"}>
              {"Malejąco po dacie stworzenia"}
            </MenuItem>
            <MenuItem value={"Rosnąco po ocenie grupy"}>
              {"Rosnąco po ocenie grupy"}
            </MenuItem>
            <MenuItem value={"Malejąco po ocenie grupy"}>
              {"Malejąco po ocenie grupy"}
            </MenuItem>
            <MenuItem value={"Rosnąco po ilości członków"}>
              {"Rosnąco po ilości członków"}
            </MenuItem>
            <MenuItem value={"Malejąco po ilości członków"}>
              {"Malejąco po ilości członków"}
            </MenuItem>
          </Select>
        </FormControl>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant={"contained"}
            onClick={() => {
              handleClose();
              enqueueSnackbar("Sorotwanie zaplikowane pomyślnie", {
                variant: "success",
              });
            }}
          >
            Zapisz regułę sortowania
          </Button>
        </Box>
      </Stack>
    </Dialog>
  );
};

export default AddSortingDialog;
