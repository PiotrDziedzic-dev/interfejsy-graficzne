//@ts-nocheck

import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  TextField,
} from "@mui/material";
import { FC, useState } from "react";
import { Cancel } from "@mui/icons-material";
import { useSnackbar } from "notistack";

interface Props {
  open: boolean;
  handleClose: () => void;
  title: string;
  text: string;
  category: string;
  comments: [];
  onAddComment: () => void;
  currentUser: string;
}
const PostDetailsWithCommentsDialog: FC<Props> = ({
  open,
  handleClose,
  title,
  text,
  comments,
  onAddComment,
  currentUser,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [commentText, setCommentText] = useState("");

  const handleAddComment = () => {
    // @ts-ignore
    onAddComment({
      user: currentUser.name + currentUser.surname,
      content: commentText,
    });
    enqueueSnackbar("Pomyślnie dodano komentarz", { variant: "success" });
    setCommentText("");
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth={"lg"}>
      <DialogTitle sx={{ display: "flex", fontWeight: 600 }} color={"primary"}>
        {title}
      </DialogTitle>

      <Divider />

      <DialogContent>
        {text}
        <Box sx={{ paddingTop: "16px", fontWeight: 600, color: "#002dc4" }}>
          Komentarze:
        </Box>
        {comments.map((comment, index) => (
          <Box key={index} sx={{ paddingTop: "24px" }}>
            <b>{comment.user}:</b> {comment.content}
          </Box>
        ))}
        <Box sx={{ paddingTop: "16px", display: "flex", gap: 3 }}>
          <TextField
            minRows={3}
            multiline
            label={"Nowy komentarz"}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            sx={{ width: "70%" }}
          />
          <Button
            variant={"contained"}
            sx={{ height: "fit-content" }}
            onClick={handleAddComment}
          >
            Dodaj komentarz
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default PostDetailsWithCommentsDialog;
