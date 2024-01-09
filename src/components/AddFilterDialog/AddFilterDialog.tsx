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
import { sports } from "./../../constants/constants";

interface Props {
  open: boolean;
  handleClose: () => void;
  handleFilter: (filterOptions: any) => void;
  filterOptions: any;
  setFilterOptions: (x: any) => void;
}

const AddFilterDialog: FC<Props> = ({
  open,
  handleClose,
  handleFilter,
  filterOptions,
  setFilterOptions,
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const handleSave = () => {
    handleFilter(filterOptions);
    enqueueSnackbar("Filtrowanie zastosowane pomyślnie", {
      variant: "success",
    });
    handleClose();
  };

  const handleChange = (field: string, value: string) => {
    // @ts-ignore
    setFilterOptions((prev) => ({ ...prev, [field]: value }));
  };

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
        <FormControl fullWidth>
          <InputLabel>Kategoria</InputLabel>
          <Select
            value={filterOptions.category}
            onChange={(e) => handleChange("category", e.target.value)}
          >
            <MenuItem value={"Mecze"}>{"Mecze"}</MenuItem>
            <MenuItem value={"Uprawianie sportu"}>
              {"Uprawianie sportu"}
            </MenuItem>
            <MenuItem value={"Wydarzenia sportowe"}>
              {"Wydarzenia sportowe"}
            </MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Rodzaj grupy</InputLabel>
          <Select
            value={filterOptions.groupType}
            onChange={(e) => handleChange("groupType", e.target.value)}
          >
            <MenuItem value={"Publiczna"}>{"Publiczna"}</MenuItem>
            <MenuItem value={"Prywatna"}>{"Prywatna"}</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Liczba członków</InputLabel>
          <Select
            value={filterOptions.memberCount}
            onChange={(e) => handleChange("memberCount", e.target.value)}
          >
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

        <FormControl fullWidth>
          <InputLabel>Ocena</InputLabel>
          <Select
            value={filterOptions.rate}
            onChange={(e) => handleChange("rate", e.target.value)}
          >
            <MenuItem value={"1 Gwiazdka"}>{"1 Gwiazdka"}</MenuItem>
            <MenuItem value={"2 Gwiazdki"}>{"2 Gwiazdki"}</MenuItem>
            <MenuItem value={"3 Gwiazdki"}>{"3 Gwiazdki"}</MenuItem>
            <MenuItem value={"4 Gwiazdki"}>{"4 Gwiazdki"}</MenuItem>
            <MenuItem value={"5 Gwiazdek"}>{"5 Gwiazdek"}</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant={"contained"} onClick={handleSave}>
            Zapisz reguły filtrowania
          </Button>
        </Box>
      </Stack>
    </Dialog>
  );
};

export default AddFilterDialog;
