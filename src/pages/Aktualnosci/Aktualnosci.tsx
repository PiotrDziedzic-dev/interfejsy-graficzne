//@ts-nocheck

import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  IconButton,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import {
  ChatBubbleOutlineOutlined,
  Notifications,
  NotificationsNoneOutlined,
  ThumbUp,
  ThumbUpAltOutlined,
} from "@mui/icons-material";
import PostDetailsWithCommentsDialog from "./../../components/PostDetailsWithCommentDialog/PostDetailsWithCommentsDialog";
import { useSnackbar } from "notistack";
import initialData from "./../../database/aktualnosci.json"; // Załaduj dane
import userData from "./../../database/userProfile.json"; // Załaduj dane

const Forum = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]); // Używamy stanu do przechowywania danych
  const [inspectPost, setInspectPost] = useState(null);

  useEffect(() => {
    // Załaduj dane z localStorage lub, jeśli nie ma, ustaw z pliku JSON
    const storedData = localStorage.getItem("aktualnosciData");
    if (storedData) {
      setData(JSON.parse(storedData));
    } else {
      setData(initialData);
      localStorage.setItem("aktualnosciData", JSON.stringify(initialData));
    }
  }, []);

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

  const updateData = (newData) => {
    setData(newData);
    localStorage.setItem("aktualnosciData", JSON.stringify(newData));
  };

  // Funkcja do dodawania komentarza do postu
  const handleAddComment = (postId, newComment) => {
    const newData = data.map((post) =>
      post.id === postId
        ? { ...post, komentarze: [...post.komentarze, newComment] }
        : post
    );
    updateData(newData); // Aktualizuj dane i localStorage
  };

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

  const handleChange = (event, value) => {
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
      <Stack
        sx={{
          width: "100%",
          padding: "32px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Stack spacing={2}>
          <Grid container spacing={4}>
            {data
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

        {/* Pagination */}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Pagination
            page={currentPage}
            onChange={handleChange}
            count={Math.ceil(data.length / 6)}
            variant={"outlined"}
            color={"primary"}
          />
        </Box>
      </Stack>

      {/* Post Details Dialog */}
      {inspectPost && (
        <PostDetailsWithCommentsDialog
          open={!!inspectPost}
          handleClose={() => setInspectPost(null)}
          title={inspectPost.title}
          text={inspectPost.text}
          comments={inspectPost.komentarze}
          onAddComment={(newComment) =>
            handleAddComment(inspectPost.id, newComment)
          }
          currentUser={currentUser} // Przekazanie aktualnego użytkownika do komponentu dialogowego
        />
      )}
    </Box>
  );
};

export default Forum;
