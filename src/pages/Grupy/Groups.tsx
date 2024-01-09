//@ts-nocheck
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
import React, { useEffect, useState } from "react";
import { sports } from "./../../constants/constants";
import CreateGroupDialog from "./../../components/CreateGroupDialog/CreateGroupDialog";
import AddSortingDialog from "./../../components/AddSortingDialog/AddSortingDialog";
import AddFilterDialog from "./../../components/AddFilterDialog/AddFilterDialog";
import {
  Add,
  Delete,
  DeleteForever,
  Star,
  StarBorder,
} from "@mui/icons-material";
// @ts-ignore
import biegi from "./../../assets/biegi.jpeg";
import koszykowka from "./../../assets/koszykowka.jpeg";
import pilkaNozna from "./../../assets/pilkaNozna.jpeg";
import siatkowka from "./../../assets/siatkowka.webp";
import skoskiSpadochronowe from "./../../assets/skokiSpadochronowe.webp";
import szachy from "./../../assets/szachy.jpeg";
import sportsPicture from "./../../assets/sportsPicture.jpg";
import initialData from "./../../database/groups.json";
import initialUserData from "./../../database/userProfile.json";
import InspectGroupDialog from "./../../components/InspectGroupDialog/InspectGroupDialog";

const Groups = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSport, setCurrentSport] = useState("");
  const [createGroup, setCreateGroup] = useState(false);
  const [addSortsDialogOpen, setAddSortsDialogOpen] = useState(false);
  const [addFiltersDialogOpen, setAddFiltersDialogOpen] = useState(false);
  const [groupsData, setGroupsData] = useState([]);
  const [sortOption, setSortOption] = useState<string>();
  const [inspectGroupId, setInspectGroupId] = useState();
  const [refetch, setRefetch] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    category: "",
    groupType: "",
    memberCount: "",
    rate: "",
  });
  const [filterResults, setFilterResults] = useState();

  useEffect(() => {
    // Ładowanie danych z localStorage lub z pliku JSON
    const storedData = localStorage.getItem("groupsData");
    if (storedData) {
      setGroupsData(JSON.parse(storedData));
    } else {
      setGroupsData(initialData);
      localStorage.setItem("groupsData", JSON.stringify(initialData));
    }
  }, [refetch]);

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Załaduj currentUser z localStorage lub z pliku JSON
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    } else {
      setCurrentUser(initialUserData);
      localStorage.setItem("userData", JSON.stringify(initialUserData));
    }
  }, []);

  const joinGroup = (groupId) => {
    if (!currentUser) {
      enqueueSnackbar("Nie jesteś zalogowany", { variant: "error" });
      return;
    }

    const updatedGroupsData = groupsData.map((group) => {
      if (group.id === groupId) {
        // Dodaj currentUsera do członków grupy, jeśli jeszcze nie jest członkiem
        if (!group.członkowie.includes(currentUser.id)) {
          return {
            ...group,
            członkowie: [...group.członkowie, currentUser.id],
          };
        }
      }
      return group;
    });

    setGroupsData(updatedGroupsData);
    localStorage.setItem("groupsData", JSON.stringify(updatedGroupsData));
    enqueueSnackbar("Dołączono do grupy", { variant: "success" });
  };

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  const getPicture = (sport: string) => {
    if (sport === "Koszykówka") {
      return koszykowka;
    }
    if (sport === "Piłka Nożna") {
      return pilkaNozna;
    }
    if (sport === "Biegi") {
      return biegi;
    }
    if (sport === "Siatkówka") {
      return siatkowka;
    }
    if (sport === "Szachy") {
      return szachy;
    }
    if (sport === "Skoki spadochronowe") {
      return skoskiSpadochronowe;
    }

    return sportsPicture;
  };

  let filteredData = groupsData.filter((group) => {
    if (currentSport === "Inne") {
      return !sports.includes(group.sport);
    }
    return currentSport === "" || group.sport === currentSport;
  });

  const handleFilter = (filterOptions) => {
    const filteredDataX = filteredData.filter((group) => {
      // Filtr kategorii
      const categoryMatch = filterOptions.category
        ? group.category === filterOptions.category
        : true;

      // Filtr rodzaju grupy (publiczna/prywatna)
      const groupTypeMatch = filterOptions.groupType
        ? filterOptions.groupType === "Publiczna"
          ? group.isPublic
          : !group.isPublic
        : true;

      // Filtr liczby członków
      let memberCountMatch = true;
      if (filterOptions.memberCount) {
        const memberCount = parseInt(group.numerOfMembers, 10);
        switch (filterOptions.memberCount) {
          case "Poniżej 10 członków":
            memberCountMatch = memberCount < 10;
            break;
          case "10-20 członków":
            memberCountMatch = memberCount >= 10 && memberCount <= 20;
            break;
          case "21-30 członków":
            memberCountMatch = memberCount >= 21 && memberCount <= 30;
            break;
          case "31-50 członków":
            memberCountMatch = memberCount >= 31 && memberCount <= 50;
            break;
          case "Powyżej 50 członków":
            memberCountMatch = memberCount > 50;
            break;
          default:
            break;
        }
      }

      // Filtr oceny
      const rateMatch = filterOptions.rate
        ? group.rate === parseInt(filterOptions.rate, 10)
        : true;

      // Zwróć grupę tylko jeśli spełnia wszystkie wybrane kryteria
      return categoryMatch && groupTypeMatch && memberCountMatch && rateMatch;
    });

    setIsFilter(true);
    setFilterResults(filteredDataX);
    setSortOption("");
  };

  const leaveGroup = (groupId) => {
    if (!currentUser) {
      enqueueSnackbar("Nie jesteś zalogowany", { variant: "error" });
      return;
    }

    const updatedGroupsData = groupsData.map((group) => {
      if (group.id === groupId) {
        return {
          ...group,
          członkowie: group.członkowie.filter(
            (memberId) => memberId !== currentUser.id
          ),
        };
      }
      return group;
    });

    setGroupsData(updatedGroupsData);
    localStorage.setItem("groupsData", JSON.stringify(updatedGroupsData));
    enqueueSnackbar("Wystąpiłeś z grupy", { variant: "success" });
  };

  const handleSort = (sortOption: string) => {
    let sortedGroups;

    switch (sortOption) {
      case "Rosnąco po dacie stworzenia":
        sortedGroups = [...groupsData].sort(
          (a, b) => new Date(a.dateOfCreation) - new Date(b.dateOfCreation)
        );
        break;
      case "Malejąco po dacie stworzenia":
        sortedGroups = [...groupsData].sort(
          (a, b) => new Date(b.dateOfCreation) - new Date(a.dateOfCreation)
        );
        break;
      case "Rosnąco po ocenie grupy":
        sortedGroups = [...groupsData].sort((a, b) => a.rate - b.rate);
        break;
      case "Malejąco po ocenie grupy":
        sortedGroups = [...groupsData].sort((a, b) => b.rate - a.rate);
        break;
      case "Rosnąco po ilości członków":
        sortedGroups = [...groupsData].sort(
          (a, b) => a.numberOfMembers - b.numberOfMembers
        );
        break;
      case "Malejąco po ilości członków":
        sortedGroups = [...groupsData].sort(
          (a, b) => b.numberOfMembers - a.numberOfMembers
        );
        break;
      default:
        sortedGroups = [...groupsData];
    }

    setSortOption(sortOption);
    setGroupsData(sortedGroups);
  };

  const isUserInGroup = (groupId) => {
    const group = groupsData.find((group) => group.id === groupId);
    return group && group.członkowie.includes(currentUser.id);
  };

  const finalData = isFilter ? filterResults : filteredData;

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
      <Stack>
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
                    if (currentSport === section) {
                      setCurrentSport("");
                    } else {
                      setCurrentSport(section);
                    }
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
      </Stack>

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
            {(sortOption || isFilter) && (
              <Button
                variant={"outlined"}
                color={"error"}
                startIcon={<DeleteForever />}
                onClick={() => {
                  setSortOption("");
                  setFilterOptions({
                    sport: "",
                    category: "",
                    groupType: "",
                    memberCount: "",
                    rate: "",
                  });
                  setIsFilter(false);
                  setRefetch((prevState) => !prevState);
                }}
              >
                Wyczyść reguły wyszukiwania
              </Button>
            )}
          </Box>
          <Button variant={"outlined"} onClick={() => setCreateGroup(true)}>
            Stwórz grupę
          </Button>
        </Box>
        <Box sx={{ display: "flex" }}>
          {sortOption && (
            <Typography color={"primary"}>Sortowanie: {sortOption}</Typography>
          )}
        </Box>
        {isFilter && (
          <Stack>
            Filtry:
            <Box>Kategoria: {filterOptions.category}</Box>
            <Box>Rodzaj grupy: {filterOptions.groupType}</Box>
            <Box>Liczba członków: {filterOptions.memberCount}</Box>
            <Box>Ocena: {filterOptions.rate}</Box>
          </Stack>
        )}

        {finalData
          .slice((currentPage - 1) * 6, currentPage * 6)
          .map((group) => {
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
                  <Box>Lokacja: {group?.location}</Box>
                  <Box>Liczba członków: {group?.numberOfMembers}</Box>
                  <Box>Data utworzenia: {group?.dateOfCreation}</Box>
                </Stack>
                <Stack>
                  <img
                    src={getPicture(group?.sport)}
                    alt={"sport_picture"}
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
                <Box>
                  {isUserInGroup(group.id) ? (
                    <Stack spacing={3}>
                      <Button
                        variant="contained"
                        onClick={() => leaveGroup(group.id)}
                        color={"error"}
                      >
                        Wystąp z grupy
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => setInspectGroupId(group.id)}
                        color={"success"}
                      >
                        Zobacz strone grupy
                      </Button>
                    </Stack>
                  ) : (
                    <Button
                      variant="contained"
                      startIcon={<Add />}
                      onClick={() => joinGroup(group.id)}
                    >
                      Dołącz do grupy
                    </Button>
                  )}
                </Box>

                {isUserInGroup(group.id) && (
                  <Typography
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    color={"primary"}
                    variant={"h6"}
                  >
                    Należysz do tej grupy
                  </Typography>
                )}
              </Box>
            );
          })}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Pagination
            page={currentPage}
            onChange={handleChange}
            count={Math.ceil(filteredData.length / 6)}
            variant={"outlined"}
            color={"primary"}
          />
        </Box>
      </Stack>
      {createGroup && (
        <CreateGroupDialog
          open={createGroup}
          handleClose={() => setCreateGroup(false)}
          refetch={refetch}
          setRefetch={setRefetch}
        />
      )}
      {addSortsDialogOpen && (
        <AddSortingDialog
          handleSort={handleSort}
          open={addSortsDialogOpen}
          handleClose={() => setAddSortsDialogOpen(false)}
          setSortOption={setSortOption}
          sortOption={sortOption}
        />
      )}
      {addFiltersDialogOpen && (
        <AddFilterDialog
          open={addFiltersDialogOpen}
          handleClose={() => setAddFiltersDialogOpen(false)}
          handleFilter={handleFilter}
          filterOptions={filterOptions}
          setFilterOptions={setFilterOptions}
          setIsFilter={setIsFilter}
        />
      )}
      {inspectGroupId && (
        <InspectGroupDialog
          open={inspectGroupId}
          handleClose={() => setInspectGroupId(null)}
          groupId={inspectGroupId}
        />
      )}
    </Box>
  );
};

export default Groups;
