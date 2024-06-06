import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import {
  Avatar,
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from '@mui/icons-material/Close';


export default function ResponsiveMessageBox(props) {
  const { open, handleClose } = props;
  const [showError, setShowError] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [message, setMessage] = React.useState("Hi");
  const [disable, setDisable] = React.useState(false);
  function submitMessage() {
    setMessage("");
    setDisable(true);
  }
  function resetStates(){
    setDisable(false);
    setMessage('Hi')
  }
  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      aria-labelledby="responsive-dialog-title"
    >
         <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          zIndex: 1,
        }}
      >
        <IconButton aria-label="close" onClick={()=>{
            resetStates()
            handleClose()}}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: "flex",
          p: 1,

          justifyContent: "center",
          width: "100%",
        }}
      >
        <Avatar
          alt="Remy Sharp"
          src="https://usrimg.quackquack.co/resize_159443301244458938835159.jpg"
          sx={{ width: 100, height: 100 }}
        />
      </Box>
      <DialogTitle align="center" id="responsive-dialog-title">
        {"Send Message to Mia"}
      </DialogTitle>
      <DialogContent>
        {disable && (
          <Typography
            variant="body2"
            align="center"
            color={"green"}
            gutterBottom
          >
            Message Sent
          </Typography>
        )}
        {!disable && (
          <TextField
            fullWidth
            error={showError}
            id="standard-error-helper-text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            defaultValue="Hi there!"
            helperText={showError ? "Field Required" : " "}
            variant="standard"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={submitMessage}
                    aria-label="toggle password visibility"
                  >
                    <SendIcon sx={{ color: "#03befc" }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
        {disable && (
          
          <Button fullWidth  variant="contained" onClick={()=>{
            resetStates()
            handleClose()}}>Ok</Button>
        )}
      </DialogContent>
    
    </Dialog>
  );
}
