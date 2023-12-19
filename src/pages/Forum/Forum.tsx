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
import { useState } from "react";
import {
  AktualnosciPost,
  ForumPostsMocked,
  sports,
} from "../../constants/constants";
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

const Forum = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [currentSport, setCurrentSport] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [likes, setLikes] = useState<number[]>([]);
  const [subscribes, setSubscribes] = useState<number[]>([]);
  const [inspectPost, setInspectPost] = useState<AktualnosciPost>();
  const [addPostDialogOpen, setAddPostDialogOpen] = useState<boolean>(false);

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
      <Stack
        sx={{
          width: "100%",
          padding: "32px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Stack spacing={2}>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant={"outlined"}
              startIcon={<Add />}
              onClick={() => setAddPostDialogOpen(true)}
            >
              Add Post
            </Button>
          </Box>
          <Grid container spacing={4}>
            {ForumPostsMocked.slice((currentPage - 1) * 6, currentPage * 6).map(
              (forumPost, index) => (
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

                    <Box sx={{ fontWeight: 550 }}>{forumPost?.category}</Box>
                    <Box>{forumPost?.text}</Box>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: 2,
                      }}
                    >
                      <IconButton
                        onClick={() => {
                          if (likes.includes(forumPost?.id)) {
                            setLikes((prevState) =>
                              [...prevState].filter((t) => t !== forumPost?.id)
                            );
                          } else {
                            setLikes((prevState) => [
                              ...prevState,
                              forumPost?.id,
                            ]);
                          }
                        }}
                      >
                        {likes.includes(forumPost?.id) ? (
                          <ThumbUp color={"primary"} />
                        ) : (
                          <ThumbUpAltOutlined color={"secondary"} />
                        )}
                      </IconButton>
                      <IconButton onClick={() => setInspectPost(forumPost)}>
                        <ChatBubbleOutlineOutlined color={"secondary"} />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          if (subscribes.includes(forumPost?.id)) {
                            enqueueSnackbar(
                              `Odsubskrybowałeś posta o tytuleś ${forumPost?.title}`,
                              { variant: "info" }
                            );
                            setSubscribes((prevState) =>
                              [...prevState].filter((t) => t !== forumPost?.id)
                            );
                          } else {
                            enqueueSnackbar(
                              `Zasubskrybowałeś posta o tytule ${forumPost?.title}`,
                              { variant: "info" }
                            );
                            setSubscribes((prevState) => [
                              ...prevState,
                              forumPost?.id,
                            ]);
                          }
                        }}
                      >
                        {subscribes.includes(forumPost?.id) ? (
                          <Notifications color={"primary"} />
                        ) : (
                          <NotificationsNoneOutlined color={"secondary"} />
                        )}
                      </IconButton>
                    </Box>
                  </Stack>
                </Grid>
              )
            )}
          </Grid>
        </Stack>
        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "16px" }}
        >
          <Pagination
            page={currentPage}
            onChange={handleChange}
            count={Math.ceil(ForumPostsMocked.length / 6)}
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
        />
      )}
      {addPostDialogOpen && (
        <AddPostDialog
          open={addPostDialogOpen}
          handleClose={() => setAddPostDialogOpen(false)}
        />
      )}
    </Box>
  );
};

export default Forum;
