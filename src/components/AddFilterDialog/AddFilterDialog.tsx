import { FC } from "react";
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
} from "@mui/material";
import { sports } from "./../../constants/constants";

interface Props {
  open: boolean;
  handleClose: () => void;
}

const AddFilterDialog: FC<Props> = ({ open, handleClose }) => {
  const { enqueueSnackbar } = useSnackbar();
  return (
    <Dialog open={open} onClose={handleClose} maxWidth={"lg"}>
      <DialogTitle
        sx={{ display: "flex", fontWeight: 600, minWidth: "600px" }}
        color={"primary"}
      >
        {"Zastosuj reguły filtrowania"}
      </DialogTitle>

      <Divider />

      <Stack spacing={2} sx={{ padding: "16px" }}>
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
        <FormControl>
          <InputLabel>Rodzaj grupy</InputLabel>
          <Select>
            <MenuItem value={"Publiczna"}>{"Publiczna"}</MenuItem>
            <MenuItem value={"Prywatna"}>{"Prywatna"}</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel>Rodzaj grupy</InputLabel>
          <Select>
            <MenuItem value={"Poniżej 10 członków"}>
              {"Poniżej 10 członków"}
            </MenuItem>
            <MenuItem value={"10-20 członków"}>{"10-20 członków"}</MenuItem>
            <MenuItem value={"21-30 członków"}>{"21-30 członków"}</MenuItem>
            <MenuItem value={"31-50 członków"}>{"31-50 członków"}</MenuItem>
            <MenuItem value={"Powyżej 50 członków"}>
              {"Powyżej 50 członków"}
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel>Ocena</InputLabel>
          <Select>
            <MenuItem value={"1 Gwiazdka"}>{"1 Gwiazdka"}</MenuItem>
            <MenuItem value={"2 Gwiazdki"}>{"2 Gwiazdki"}</MenuItem>
            <MenuItem value={"3 Gwiazdki"}>{"3 Gwiazdki"}</MenuItem>
            <MenuItem value={"4 Gwiazdki"}>{"4 Gwiazdki"}</MenuItem>
            <MenuItem value={"5 Gwiazdek"}>{"5 Gwiazdek"}</MenuItem>
          </Select>
        </FormControl>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant={"contained"}
            onClick={() => {
              handleClose();
              enqueueSnackbar("Filtrowanie zaplikowane pomyślnie", {
                variant: "success",
              });
            }}
          >
            Zapisz reguły filtrowania
          </Button>
        </Box>
      </Stack>
    </Dialog>
  );
};

export default AddFilterDialog;
