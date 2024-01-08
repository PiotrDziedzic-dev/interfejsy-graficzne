//@ts-nocheck
import {
  Box,
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { AktualnosciPost, sports } from "../../constants/constants";
import {
  Add,
  ChatBubbleOutlined,
  ChatBubbleOutlineOutlined,
  Notifications,
  NotificationsNoneOutlined,
  ThumbUp,
  ThumbUpAlt,
  ThumbUpAltOutlined,
} from "@mui/icons-material";
import PostDetailsWithCommentsDialog from "./../../components/PostDetailsWithCommentDialog/PostDetailsWithCommentsDialog";
import { useSnackbar } from "notistack";
import AddPostDialog from "./../../components/AddPostDialog/AddPostDialog";
import initialData from "./../../database/forumPosts.json";
import userData from "./../../database/userProfile.json"; // Załaduj dane

const Forum = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [currentSport, setCurrentSport] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [data, setData] = useState([]); // Stan dla danych forum
  const [inspectPost, setInspectPost] = useState<AktualnosciPost>();
  const [addPostDialogOpen, setAddPostDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    // Załaduj dane z localStorage lub, jeśli nie ma, ustaw z pliku JSON
    const storedData = localStorage.getItem("forumData");
    if (storedData) {
      setData(JSON.parse(storedData));
    } else {
      setData(initialData);
      localStorage.setItem("forumData", JSON.stringify(initialData));
    }
  }, []);

  const updateData = (newData: any) => {
    setData(newData);
    localStorage.setItem("forumData", JSON.stringify(newData));
  };

  const handleAddComment = (postId, newComment) => {
    const newData = data.map((post) =>
      post.id === postId
        ? { ...post, komentarze: [...post.komentarze, newComment] }
        : post
    );
    updateData(newData); // Aktualizuj dane i localStorage
  };

  const [currentUser, setCurrentUser] = useState({ name: "Anonim" });

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    } else {
      setCurrentUser(userData);
      localStorage.setItem("userData", JSON.stringify(userData));
    }
  }, []);

  const handleLike = (id) => {
    const newData = data.map((item) =>
      item.id === id ? { ...item, liked: !item.liked } : item
    );
    updateData(newData);
    const post = newData.find((item) => item.id === id);
    enqueueSnackbar(
      `${post.liked ? "Polubiłeś" : "Cofnięto polubienie"} "${post.title}"`,
      { variant: "info" }
    );
  };

  const handleSubscribe = (id) => {
    const newData = data.map((item) =>
      item.id === id ? { ...item, subscribed: !item.subscribed } : item
    );
    updateData(newData);
    const post = newData.find((item) => item.id === id);
    enqueueSnackbar(
      `${post.subscribed ? "Zasubskrybowano" : "Odsubskrybowano"} "${
        post.title
      }"`,
      { variant: "info" }
    );
  };

  const filteredData = data.filter((post) => {
    // Logika filtrowania dla "Inne"
    if (currentSport === "Inne") {
      return !sports.includes(post.category); // Pokaż posty, których kategoria nie znajduje się w sports
    }
    // Standardowa logika filtrowania
    return !currentSport || post.category === currentSport;
  });

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Box
      sx={{
        padding: "0 24px",
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

      <Stack
        sx={{
          width: "100%",
          padding: "0px 32px 32px 32px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Stack spacing={2}>
          <Button
            sx={{ alignSelf: "flex-end" }}
            variant="contained"
            startIcon={<Add />}
            onClick={() => setAddPostDialogOpen(true)}
          >
            Add Post
          </Button>
          <Grid container spacing={4}>
            {filteredData
              .slice((currentPage - 1) * 6, currentPage * 6)
              .map((forumPost) => (
                <Grid item xs={12} sm={10} md={8} lg={6} key={forumPost.id}>
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
                      <IconButton onClick={() => handleLike(forumPost.id)}>
                        {forumPost.liked ? (
                          <ThumbUp color={"primary"} />
                        ) : (
                          <ThumbUpAltOutlined color={"secondary"} />
                        )}
                      </IconButton>

                      {/* Inspect Post Button */}
                      <IconButton onClick={() => setInspectPost(forumPost)}>
                        <ChatBubbleOutlineOutlined color={"secondary"} />
                      </IconButton>

                      {/* Subscribe Button */}
                      <IconButton onClick={() => handleSubscribe(forumPost.id)}>
                        {forumPost.subscribed ? (
                          <Notifications color={"primary"} />
                        ) : (
                          <NotificationsNoneOutlined color={"secondary"} />
                        )}
                      </IconButton>
                    </Box>
                  </Stack>
                </Grid>
              ))}
          </Grid>
        </Stack>
        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "16px" }}
        >
          <Pagination
            page={currentPage}
            onChange={handleChange}
            count={Math.ceil(filteredData.length / 6)}
            variant={"outlined"}
            color={"primary"}
          />
        </Box>
      </Stack>
      {!!inspectPost?.id && (
        <PostDetailsWithCommentsDialog
          open={!!inspectPost.id}
          handleClose={() => setInspectPost(undefined)}
          title={inspectPost?.title}
          text={inspectPost?.text}
          category={inspectPost?.category}
          comments={inspectPost?.komentarze}
          onAddComment={(newComment) =>
            handleAddComment(inspectPost.id, newComment)
          }
          currentUser={currentUser} // Przekazanie aktualnego użytkownika do komponentu dialogowego
        />
      )}
      {addPostDialogOpen && (
        <AddPostDialog
          open={addPostDialogOpen}
          handleClose={() => setAddPostDialogOpen(false)}
          addNewPost={(newPost) => {
            // Tutaj logika dodawania nowego postu do danych i aktualizacja localStorage
            const updatedData = [...data, { ...newPost, id: Date.now() }]; // przykładowe generowanie ID posta
            updateData(updatedData);
          }}
        />
      )}
    </Box>
  );
};

export default Forum;
