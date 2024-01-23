//@ts-nocheck

import {
  Avatar,
  Badge,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { useDropzone } from "react-dropzone";
import data from "./../../database/userProfile.json";
import initialGroupsData from "./../../database/groups.json";
// @ts-ignore
import volleyball_player from "./../../assets/volleyball_player.webp";
import InspectGroupDialog from "./../../components/InspectGroupDialog";
import {
  ChatBubbleOutlineOutlined,
  Email,
  Groups,
  Notifications,
  NotificationsNoneOutlined,
  ThumbUp,
  ThumbUpAltOutlined,
} from "@mui/icons-material";
import PostDetailsWithCommentsDialog from "./../../components/PostDetailsWithCommentDialog";
import userData from "@/database/userProfile.json";

const MyProfile = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [section, setSection] = useState<"my_profile" | "my_groups">(
    "my_profile"
  );
  const [inspectGroupId, setInspectGroupId] = useState();
  const [inspectPost, setInspectPost] = useState(null);

  const [myGroups, setMyGroups] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [subscribedPosts, setSubscribedPosts] = useState([]);
  const [refetch, setRefetch] = useState();
  const [aktualnosci, setAktualnosci] = useState([]);
  const [opinie, setOpinie] = useState([]);
  const [posty, setPosty] = useState([]);

  useEffect(() => {
    // Załaduj dane grup z localStorage lub z pliku JSON
    const groupsData = JSON.parse(
      localStorage.getItem("groupsData") || JSON.stringify(initialGroupsData)
    );
    // Filtruj grupy, w których użytkownik o id 1 jest członkiem
    // @ts-ignore
    const filteredGroups = groupsData.filter((group) =>
      group.członkowie.includes(1)
    );

    const postsData = JSON.parse(
      localStorage.getItem("forumData") || JSON.stringify(initialGroupsData)
    ).map((post) => ({
      ...post,
      origin: "post",
    }));
    const aktualnosciData = JSON.parse(
      localStorage.getItem("aktualnosciData") ||
        JSON.stringify(initialGroupsData)
    ).map((post) => ({
      ...post,
      origin: "aktualnosc",
    }));
    const poradyData = JSON.parse(
      localStorage.getItem("opinionsData") || JSON.stringify(initialGroupsData)
    ).map((post) => ({
      ...post,
      origin: "opinia",
    }));

    const likedPosts = [...postsData, ...aktualnosciData, ...poradyData].filter(
      (post) => post?.liked
    );

    const subscribedPosts = [
      ...postsData,
      ...aktualnosciData,
      ...poradyData,
    ].filter((post) => post?.subscribed);

    setAktualnosci(aktualnosciData);
    setOpinie(poradyData);
    setPosty(postsData);
    setLikedPosts(likedPosts);
    setSubscribedPosts(subscribedPosts);
    setMyGroups(filteredGroups);
  }, [refetch]);

  const [errors, setErrors] = useState({
    name: false,
    surname: false,
    email: false,
    phoneNumber: false,
    location: false,
    checkbox: false,
  });

  const updateDataAktualnosc = (newData) => {
    localStorage.setItem("aktualnosciData", JSON.stringify(newData));
    setRefetch((prevState) => !prevState);
  };

  const handleLikeAktualnosc = (id) => {
    const newData = aktualnosci.map((item) =>
      item.id === id ? { ...item, liked: !item.liked } : item
    );
    updateDataAktualnosc(newData);
    const post = newData.find((item) => item.id === id);
    enqueueSnackbar(
      `${post.liked ? "Polubiłeś" : "Cofnięto polubienie"} "${post.title}"`,
      { variant: "info" }
    );
  };

  const handleSubscribeAktualnosc = (id) => {
    const newData = aktualnosci.map((item) =>
      item.id === id ? { ...item, subscribed: !item.subscribed } : item
    );
    updateDataAktualnosc(newData);
    const post = newData.find((item) => item.id === id);
    enqueueSnackbar(
      `${post.subscribed ? "Zasubskrybowano" : "Odsubskrybowano"} "${
        post.title
      }"`,
      { variant: "info" }
    );
  };

  const updateDataForum = (newData) => {
    localStorage.setItem("forumData", JSON.stringify(newData));
    setRefetch((prevState) => !prevState);
  };

  const handleLikeForum = (id) => {
    const newData = posty.map((item) =>
      item.id === id ? { ...item, liked: !item.liked } : item
    );
    updateDataForum(newData);
    const post = newData.find((item) => item.id === id);
    enqueueSnackbar(
      `${post.liked ? "Polubiłeś" : "Cofnięto polubienie"} "${post.title}"`,
      { variant: "info" }
    );
  };

  const handleSubscribeForum = (id) => {
    const newData = posty.map((item) =>
      item.id === id ? { ...item, subscribed: !item.subscribed } : item
    );
    updateDataForum(newData);
    const post = newData.find((item) => item.id === id);
    enqueueSnackbar(
      `${post.subscribed ? "Zasubskrybowano" : "Odsubskrybowano"} "${
        post.title
      }"`,
      { variant: "info" }
    );
  };

  const updateDataOpinie = (newData) => {
    localStorage.setItem("opinionsData", JSON.stringify(newData));
    setRefetch((prevState) => !prevState);
  };

  const handleLikeOpinie = (id) => {
    const newData = opinie.map((item) =>
      item.id === id ? { ...item, liked: !item.liked } : item
    );
    updateDataOpinie(newData);
    const post = newData.find((item) => item.id === id);
    enqueueSnackbar(
      `${post.liked ? "Polubiłeś" : "Cofnięto polubienie"} "${post.title}"`,
      { variant: "info" }
    );
  };

  const handleSubscribeOpinie = (id) => {
    const newData = opinie.map((item) =>
      item.id === id ? { ...item, subscribed: !item.subscribed } : item
    );
    updateDataOpinie(newData);
    const post = newData.find((item) => item.id === id);
    enqueueSnackbar(
      `${post.subscribed ? "Zasubskrybowano" : "Odsubskrybowano"} "${
        post.title
      }"`,
      { variant: "info" }
    );
  };

  // Przygotowanie stanu do przechowywania danych użytkownika
  const [userData, setUserData] = useState(() => {
    // Sprawdź czy dane są w localStorage, jeśli nie, użyj domyślnych z pliku
    const localData = localStorage.getItem("userData");
    return localData ? JSON.parse(localData) : data;
  });

  // Funkcja aktualizująca stan i zapisująca do localStorage
  const saveChanges = () => {
    // Definicja prostego wyrażenia regularnego dla e-mail
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    const newErrors = {
      name: !userData.name.trim(),
      surname: !userData.surname.trim(),
      email: !emailRegex.test(userData.email),
      phoneNumber:
        !userData.phoneNumber.trim() || !/^\d+$/.test(userData.phoneNumber),
      location: !userData.location.trim(),
      checkbox:
        [
          userData.public,
          userData.private,
          userData.visible_only_for_friends,
        ].filter(Boolean).length !== 1,
    };

    // Aktualizacja stanu błędów
    setErrors(newErrors);

    // Sprawdź, czy są jakieś błędy
    if (Object.values(newErrors).some(Boolean)) {
      enqueueSnackbar("Proszę poprawić błędy przed zapisaniem!", {
        variant: "error",
      });
      return;
    }
    // Sprawdź, czy tylko jeden checkbox jest zaznaczony
    const checkboxes = [
      userData.public,
      userData.private,
      userData.visible_only_for_friends,
    ];
    const checkedCount = checkboxes.filter(Boolean).length;
    if (checkedCount !== 1) {
      enqueueSnackbar("Tylko jeden status konta może być zaznaczony!", {
        variant: "error",
      });
      return;
    }
    localStorage.setItem("userData", JSON.stringify(userData));
    enqueueSnackbar("Zapisano zmiany", { variant: "success" });
  };

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
  const leftPanel = () => {
    return (
      <Stack
        spacing={2}
        sx={{
          width: "fit-content",
          padding: "24px",
          alignItems: "center",
        }}
      >
        <Avatar
          alt="volleyball_player"
          src={volleyball_player}
          sx={{ width: "80%", height: "20%" }}
        />
        <Button variant={"outlined"} onClick={onClick}>
          Zmień zdjęcie
        </Button>
      </Stack>
    );
  };

  const rightPanel = () => {
    // Funkcja obsługująca zmiany w inputach
    const handleChange = (event: any) => {
      const { name, value, checked, type } = event.target;

      setUserData((prevData: any) => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      }));
    };

    return (
      <Stack sx={{ padding: "24px" }} spacing={2}>
        <Box sx={{ display: "flex", gap: 3 }}>
          <TextField
            label="Imię"
            name="name"
            value={userData.name}
            onChange={handleChange}
            error={errors.name}
            helperText={errors.name && "Imię nie może być puste"}
          />
          <TextField
            label="Nazwisko"
            name="surname"
            value={userData.surname}
            onChange={handleChange}
            error={errors.surname}
            helperText={errors.surname && "Nazwisko nie może być puste"}
          />
        </Box>
        <TextField
          label="e-mail"
          name="email"
          value={userData.email}
          onChange={handleChange}
          error={errors.email}
          helperText={
            errors.email && "Prosze podac email o poprawnej strukturze"
          }
        />
        <TextField
          label="Numer telefonu"
          name="phoneNumber"
          value={userData.phoneNumber}
          onChange={handleChange}
          error={errors.phoneNumber}
          helperText={
            errors.phoneNumber &&
            "Numer telefonu jest wymagany i może zawierać tylko cyfry"
          }
        />
        <TextField
          label="Lokalizacja"
          name="location"
          value={userData.location}
          onChange={handleChange}
          error={errors.location}
          helperText={errors.location && "Lokalizacja nie może być pusta"}
        />
        <FormControlLabel
          control={
            <Checkbox
              name="public"
              checked={userData.public}
              onChange={handleChange}
            />
          }
          label="Konto publiczne"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="private"
              checked={userData.private}
              onChange={handleChange}
            />
          }
          label="Konto prywatne"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="visible_only_for_friends"
              checked={userData.visible_only_for_friends}
              onChange={handleChange}
            />
          }
          label="Widoczne tylko dla znajomych"
        />
        {errors.checkbox && (
          <Typography color={"red"}>
            Prosze wybrać tylko jeden tryb konta
          </Typography>
        )}
        <TextField
          label="Opis"
          name="description"
          multiline
          minRows={5}
          value={userData.description}
          onChange={handleChange}
        />
        <Button variant="contained" onClick={() => saveChanges()}>
          Zapisz zmiany
        </Button>
      </Stack>
    );
  };

  const myLikedPostsSelection = () => {
    return (
      <Stack spacing={2}>
        <Box
          sx={{
            paddingTop: "24px",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Button
            variant={"contained"}
            onClick={() => setSection("my_profile")}
          >
            Mój Profil
          </Button>
        </Box>
        <Stack spacing={2}>
          {likedPosts.map((forumPost) => (
            <Stack
              spacing={2}
              sx={{
                border: "2px solid blue",
                borderRadius: "8px",
                padding: "12px",
              }}
            >
              <Typography
                variant={"h6"}
                color={"primary"}
                sx={{ fontWeight: 650 }}
              >
                {forumPost.title}
              </Typography>

              <Box sx={{ fontWeight: 550 }}>{forumPost.category}</Box>
              <Box>{forumPost.text}</Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 2,
                }}
              >
                {/* Like Button */}
                <IconButton
                  onClick={() => {
                    if (forumPost.origin === "post") {
                      handleLikeForum(forumPost.id);
                    } else if (forumPost.origin === "aktualnosc") {
                      handleLikeAktualnosc(forumPost.id);
                    } else if (forumPost.origin === "opinia") {
                      handleLikeOpinie(forumPost.id);
                    } else {
                      console.log("clicked");
                    }
                  }}
                >
                  {forumPost.liked ? (
                    <ThumbUp color={"primary"} />
                  ) : (
                    <ThumbUpAltOutlined color={"secondary"} />
                  )}
                </IconButton>

                {/* Subscribe Button */}
                <IconButton
                  onClick={() => {
                    if (forumPost.origin === "post") {
                      handleSubscribeForum(forumPost.id);
                    } else if (forumPost.origin === "aktualnosc") {
                      handleSubscribeAktualnosc(forumPost.id);
                    } else if (forumPost.origin === "opinia") {
                      handleSubscribeOpinie(forumPost.id);
                    }
                  }}
                >
                  {forumPost.subscribed ? (
                    <Notifications color={"primary"} />
                  ) : (
                    <NotificationsNoneOutlined color={"secondary"} />
                  )}
                </IconButton>
              </Box>
            </Stack>
          ))}
        </Stack>
      </Stack>
    );
  };

  const mySubscribedPostsSelection = () => {
    return (
      <Stack spacing={2}>
        <Box
          sx={{
            paddingTop: "24px",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Button
            variant={"contained"}
            onClick={() => setSection("my_profile")}
          >
            Mój Profil
          </Button>
        </Box>
        <Stack spacing={2}>
          {subscribedPosts.map((forumPost) => (
            <Stack
              spacing={2}
              sx={{
                border: "2px solid blue",
                borderRadius: "8px",
                padding: "12px",
              }}
            >
              <Typography
                variant={"h6"}
                color={"primary"}
                sx={{ fontWeight: 650 }}
              >
                {forumPost.title}
              </Typography>

              <Box sx={{ fontWeight: 550 }}>{forumPost.category}</Box>
              <Box>{forumPost.text}</Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 2,
                }}
              >
                {/* Like Button */}
                <IconButton
                  onClick={() => {
                    if (forumPost.origin === "post") {
                      handleLikeForum(forumPost.id);
                    } else if (forumPost.origin === "aktualnosc") {
                      handleLikeAktualnosc(forumPost.id);
                    } else if (forumPost.origin === "opinia") {
                      handleLikeOpinie(forumPost.id);
                    } else {
                      console.log("clicked");
                    }
                  }}
                >
                  {forumPost.liked ? (
                    <ThumbUp color={"primary"} />
                  ) : (
                    <ThumbUpAltOutlined color={"secondary"} />
                  )}
                </IconButton>

                {/* Subscribe Button */}
                <IconButton
                  onClick={() => {
                    if (forumPost.origin === "post") {
                      handleSubscribeForum(forumPost.id);
                    } else if (forumPost.origin === "aktualnosc") {
                      handleSubscribeAktualnosc(forumPost.id);
                    } else if (forumPost.origin === "opinia") {
                      handleSubscribeOpinie(forumPost.id);
                    }
                  }}
                >
                  {forumPost.subscribed ? (
                    <Notifications color={"primary"} />
                  ) : (
                    <NotificationsNoneOutlined color={"secondary"} />
                  )}
                </IconButton>
              </Box>
            </Stack>
          ))}
        </Stack>
      </Stack>
    );
  };

  const myGroupsSection = () => {
    return (
      <Stack sx={{ width: "100%" }}>
        <Box
          sx={{
            paddingTop: "24px",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Button
            variant={"contained"}
            onClick={() => setSection("my_profile")}
          >
            Mój Profil
          </Button>
        </Box>
        {myGroups.map((group) => (
          <Box
            key={group.id}
            sx={{
              display: "flex",
              alignItems: "center",
              minHeight: "80px",
              justifyContent: "space-between",
              fontWeight: 600,
            }}
          >
            {group.name}
            <Button
              variant={"outlined"}
              onClick={() => setInspectGroupId(group.id)}
            >
              Wyświetl
            </Button>
          </Box>
        ))}
      </Stack>
    );
  };

  return (
    <Stack sx={{ height: "100%" }} alignItems={"center"} spacing={2}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "fit-content",
          border: "2px solid blue",
          fontWeight: 600,
          padding: "16px",
          fontSize: "250%",
          color: "blue",
          width: "60%",
          borderRadius: "8px",
        }}
      >
        Mój Profil
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "60%",
          justifyContent: "center",
        }}
      >
        {section === "my_profile" && leftPanel()}
        {section === "my_profile" && rightPanel()}
        {section === "my_groups" && myGroupsSection()}
        {section === "liked_posts" && myLikedPostsSelection()}
        {section === "subscribed_posts" && mySubscribedPostsSelection()}
        {section === "my_profile" && (
          <Box sx={{ paddingTop: "24px" }}>
            <Button
              sx={{ marginRight: "8px", marginTop: "8px" }}
              variant={"contained"}
              onClick={() => setSection("my_groups")}
              endIcon={<Groups />}
            >
              Moje grupy
            </Button>
            <Button
              variant={"contained"}
              onClick={() => setSection("liked_posts")}
              sx={{ marginTop: "8px" }}
              endIcon={<ThumbUp />}
            >
              Polubione posty
            </Button>
            <Button
              variant={"contained"}
              onClick={() => setSection("subscribed_posts")}
              sx={{ marginTop: "8px" }}
              endIcon={<Notifications />}
            >
              Zasubskrybowane posty
            </Button>
          </Box>
        )}
      </Box>
      {inspectGroupId && (
        <InspectGroupDialog
          open={inspectGroupId}
          handleClose={() => setInspectGroupId(null)}
          groupId={inspectGroupId}
        />
      )}
    </Stack>
  );
};

export default MyProfile;
