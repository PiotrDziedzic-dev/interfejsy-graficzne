import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { GroupsData, sports } from "./../../constants/constants";
import CreateGroupDialog from "./../../components/CreateGroupDialog/CreateGroupDialog";
import AddSortingDialog from "./../../components/AddSortingDialog/AddSortingDialog";
import AddFilterDialog from "./../../components/AddFilterDialog/AddFilterDialog";
import { Add, Star, StarBorder } from "@mui/icons-material";
// @ts-ignore
import real_picture from "./../../assets/real.png";

const Groups = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentSport, setCurrentSport] = useState<string>("");
  const [createGroup, setCreateGroup] = useState<boolean>(false);
  const [addSortsDialogOpen, setAddSortsDialogOpen] = useState<boolean>(false);
  const [addFiltersDialogOpen, setAddFiltersDialogOpen] =
    useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <Box
      sx={{
        padding: "24px",
        width: "100%",
        height: "100%",
        display: "flex",
        gap: 4,
      }}
    >
      <Box
        sx={{
          width: "fit-content",
          padding: "24px",
          border: "2px blue solid",
          borderRadius: "16px",
        }}
      >
        <List>
          {sports.map((section, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                sx={{
                  borderRadius: "8px",
                  backgroundColor: currentSport === section ? "blue" : "",
                  color: currentSport === section ? "white" : "",
                }}
                onClick={() => {
                  setCurrentSport(section);
                }}
              >
                <ListItemText
                  primary={section}
                  color={"primary"}
                  sx={{
                    fontWeight: 500,
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      <Stack sx={{ width: "100%" }} spacing={4}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "16px",
          }}
        >
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant={"contained"}
              onClick={() => setAddSortsDialogOpen(true)}
            >
              Sortowanie
            </Button>
            <Button
              variant={"contained"}
              onClick={() => setAddFiltersDialogOpen(true)}
            >
              Filtrowanie
            </Button>
          </Box>
          <Button variant={"outlined"} onClick={() => setCreateGroup(true)}>
            Stwórz grupę
          </Button>
        </Box>

        {GroupsData.map((group) => {
          return (
            <Box
              sx={{
                border: "2px solid blue",
                borderRadius: "8px",
                padding: "12px",
                display: "flex",
                gap: 3,
              }}
            >
              <Box sx={{ maxWidth: "600px" }}>{group?.description}</Box>
              <Stack>
                <Box>{group?.isPublic ? "Publiczna" : "Prywatna"}</Box>
                <Box>{group?.sport}</Box>
                <Box>{group?.category}</Box>
                <Box>
                  Przedział wiekowy: {group?.ageFrom}-{group?.ageTo}
                </Box>
                <Box>{group?.location}</Box>
                <Box>Liczba członków{group?.numerOfMembers}</Box>
              </Stack>
              <Stack>
                <img
                  src={real_picture}
                  alt={"real_picture"}
                  style={{ maxWidth: "100%", maxHeight: "100px" }}
                ></img>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {[1, 2, 3, 4, 5].map((t) => {
                    if (t <= group.rate) {
                      return <Star />;
                    } else {
                      return <StarBorder />;
                    }
                  })}
                </Box>
              </Stack>
              <Button
                variant={"contained"}
                startIcon={<Add />}
                sx={{ height: "fit-content" }}
                onClick={() => {
                  enqueueSnackbar("Pomyślnie dołączono do grupy", {
                    variant: "success",
                  });
                }}
              >
                Dołącz do grupy
              </Button>
            </Box>
          );
        })}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Pagination
            page={currentPage}
            onChange={handleChange}
            count={Math.ceil(GroupsData.length / 6)}
            variant={"outlined"}
            color={"primary"}
          />
        </Box>
      </Stack>
      {createGroup && (
        <CreateGroupDialog
          open={createGroup}
          handleClose={() => setCreateGroup(false)}
        />
      )}
      {addSortsDialogOpen && (
        <AddSortingDialog
          open={addSortsDialogOpen}
          handleClose={() => setAddSortsDialogOpen(false)}
        />
      )}
      {addFiltersDialogOpen && (
        <AddFilterDialog
          open={addFiltersDialogOpen}
          handleClose={() => setAddFiltersDialogOpen(false)}
        />
      )}
    </Box>
  );
};

export default Groups;
