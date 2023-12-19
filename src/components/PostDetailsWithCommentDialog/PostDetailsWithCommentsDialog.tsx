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
import { FC } from "react";
import { Cancel } from "@mui/icons-material";
import { useSnackbar } from "notistack";

interface Props {
  open: boolean;
  handleClose: () => void;
  title: string;
  text: string;
  category: string;
}
const PostDetailsWithCommentsDialog: FC<Props> = ({
  open,
  handleClose,
  title,
  text,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  return (
    <Dialog open={open} onClose={handleClose} maxWidth={"lg"}>
      <DialogTitle sx={{ display: "flex", fontWeight: 600 }} color={"primary"}>
        {title}
      </DialogTitle>

      <Divider />

      <DialogContent>{text}</DialogContent>
      <Divider />
      <Box sx={{ padding: "16px", fontWeight: 600 }}>Komentarze:</Box>
      <Box sx={{ padding: "16px", display: "flex", gap: 3 }}>
        <TextField
          minRows={3}
          multiline
          label={"Nowy komentarz"}
          sx={{ width: "70%" }}
        />
        <Button
          variant={"contained"}
          sx={{ height: "fit-content" }}
          onClick={() => {
            enqueueSnackbar("Pomyślnie dodano komentarz", {
              variant: "success",
            });
            handleClose();
          }}
        >
          Dodaj komentarz
        </Button>
      </Box>
    </Dialog>
  );
};

export default PostDetailsWithCommentsDialog;
