import {
  Box,
  Grid,
  IconButton,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import {
  AktualnosciPost,
  AktualnosciSportowe,
  ForumPostsMocked,
  OpinieEkspertow,
} from "../../constants/constants";
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

const SekcjaEkspercka = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [likes, setLikes] = useState<number[]>([]);
  const [subscribes, setSubscribes] = useState<number[]>([]);
  const [inspectPost, setInspectPost] = useState<AktualnosciPost>();

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
            {OpinieEkspertow.slice((currentPage - 1) * 6, currentPage * 6).map(
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
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Pagination
            page={currentPage}
            onChange={handleChange}
            count={Math.ceil(OpinieEkspertow.length / 6)}
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
    </Box>
  );
};

export default SekcjaEkspercka;
