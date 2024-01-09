//@ts-nocheck

import {
  Box,
  Grid,
  IconButton,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  AccountCircle,
  ChatBubbleOutlineOutlined,
  Notifications,
  NotificationsNoneOutlined,
  ThumbUp,
  ThumbUpAltOutlined,
} from "@mui/icons-material";
import { useSnackbar } from "notistack";
import PostDetailsWithCommentsDialog from "./../../components/PostDetailsWithCommentDialog";
import userData from "./../../database/userProfile.json";
import initialData from "./../../database/opinieEkspertow.json";

const SekcjaEkspercka = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [likes, setLikes] = useState<number[]>([]);
  const [subscribes, setSubscribes] = useState<number[]>([]);
  const [inspectPost, setInspectPost] = useState();
  const [data, setData] = useState([]);

  useEffect(() => {
    // Załaduj dane z localStorage lub, jeśli nie ma, z pliku JSON
    const storedData = localStorage.getItem("opinionsData");
    if (storedData) {
      setData(JSON.parse(storedData));
    } else {
      setData(initialData);
      localStorage.setItem("opinionsData", JSON.stringify(initialData));
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
    localStorage.setItem("opinionsData", JSON.stringify(newData));
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
              .map((forumPost, index) => (
                <Grid item xs={12} sm={10} md={8} lg={6} key={index}>
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
                      {forumPost?.title}
                    </Typography>
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <AccountCircle color={"primary"} />
                      {forumPost?.expertFullName}
                    </Box>
                    <Box sx={{ fontWeight: 550 }}>{forumPost?.category}</Box>
                    <Box>{forumPost?.text}</Box>

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
          currentUser={currentUser}
        />
      )}
    </Box>
  );
};

export default SekcjaEkspercka;
