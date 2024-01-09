//@ts-nocheck

import {
  Box,
  Dialog,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import initialData from "./../../database/groups.json";
import { Close } from "@mui/icons-material";

interface Props {
  open: boolean;
  handleClose: () => void;
  groupId: number;
}

const InspectGroupDialog: FC<Props> = ({ open, handleClose, groupId }) => {
  const [group, setGroup] = useState(null);

  useEffect(() => {
    // Pobierz dane grup z localStorage lub z pliku JSON
    const groupsData = JSON.parse(
      localStorage.getItem("groupsData") || JSON.stringify(initialData)
    );
    // Znajdź grupę o danym ID
    const foundGroup = groupsData.find((g) => g.id === groupId);
    setGroup(foundGroup);
  }, [groupId]);

  console.log("takie mam ");
  console.log(group);

  return (
    <Dialog open={open} onClose={handleClose} maxWidth={"lg"}>
      <DialogTitle
        sx={{
          display: "flex",
          fontWeight: 600,
          minWidth: "800px",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        color={"primary"}
      >
        Grupa: {group?.name}
        <IconButton onClick={handleClose}>
          <Close color={"primary"} />
        </IconButton>
      </DialogTitle>
      <Divider />
      <Stack sx={{ width: "100%", padding: "32px" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
          <Typography
            sx={{ fontWeight: 600, minWidth: "100px" }}
            color={"primary"}
          >
            Opis Grupy:
          </Typography>
          <Box>{group?.description}</Box>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Typography
            sx={{ fontWeight: 600, minWidth: "100px" }}
            color={"primary"}
          >
            Sport:
          </Typography>
          <Box>{group?.sport}</Box>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Typography
            sx={{ fontWeight: 600, minWidth: "100px" }}
            color={"primary"}
          >
            Kategoria:
          </Typography>
          <Box>{group?.category}</Box>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Typography
            sx={{ fontWeight: 600, minWidth: "100px" }}
            color={"primary"}
          >
            Lokacja:
          </Typography>
          <Box>{group?.location}</Box>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Typography
            sx={{ fontWeight: 600, minWidth: "100px" }}
            color={"primary"}
          >
            Data utworzenia:
          </Typography>
          <Box>{group?.dateOfCreation}</Box>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Typography
            sx={{ fontWeight: 600, minWidth: "100px" }}
            color={"primary"}
          >
            Typ grupy:
          </Typography>
          <Box>{group?.isPublic ? "Publiczna" : "Prywatna"}</Box>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Typography
            sx={{ fontWeight: 600, minWidth: "100px" }}
            color={"primary"}
          >
            Liczba członków:
          </Typography>
          <Box>{group?.numberOfMembers}</Box>
        </Box>
      </Stack>
      <Divider />
    </Dialog>
  );
};

export default InspectGroupDialog;
