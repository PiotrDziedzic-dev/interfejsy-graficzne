//@ts-nocheck

import React, { FC, useState } from "react";
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
import { useSnackbar } from "notistack";

interface Props {
  open: boolean;
  handleClose: () => void;
  handleSort: (sortOption: string) => void;
  sortOption: string;
  setSortOption: () => void;
}

const AddSortingDialog: FC<Props> = ({
  open,
  handleClose,
  handleSort,
  sortOption,
  setSortOption,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [helperState, setHelperState] = useState();

  const handleSave = () => {
    handleSort(helperState);
    enqueueSnackbar("Sortowanie zastosowane pomyślnie", { variant: "success" });
    handleClose();
  };

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
        <FormControl fullWidth>
          <InputLabel>Sortowanie</InputLabel>
          <Select
            value={helperState}
            onChange={(e) => setHelperState(e.target.value as string)}
          >
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
          <Button variant={"contained"} onClick={handleSave}>
            Zapisz regułę sortowania
          </Button>
        </Box>
      </Stack>
    </Dialog>
  );
};

export default AddSortingDialog;
