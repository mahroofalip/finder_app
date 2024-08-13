import React, { useEffect, useRef, useState } from "react";
import {
  Avatar,
  Badge,
  Box,
  CardHeader,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, Message, RootState } from "../store";
import { receiveMessage, sendMessage } from "../action/messageActions";
import socket from "../socket.ts/socket";

const OnlineBadge = () => (
  <span
    style={{
      width: 10,
      height: 10,
      borderRadius: "50%",
      background: "#03fc5e",
      display: "inline-block",
      marginLeft: 5,
    }}
  />
);

const GrayLabel = styled(Typography)({
  color: "gray",
  marginTop: 10,
});

// const OfflineBadge = () => (
//   <span
//     style={{
//       width: 10,
//       height: 10,
//       borderRadius: "50%",
//       background: "gray",
//       display: "inline-block",
//       marginLeft: 5,
//     }}
//   />
// );

export default function ChatPage(props: any) {
  const dispatch: AppDispatch = useDispatch();
  // const messagesList = useSelector((state: RootState) => state.message.messages);
  // const loading = useSelector((state: RootState) => state.message.loading);
  // const error = useSelector((state: RootState) => state.message.error);

  const initialMessages: Message[] = [];

  const token = localStorage.getItem("token") ?? "";

  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [chatHeight, setChatHeight] = useState<number>(
    window.innerHeight * 0.6
  );

  // useEffect(() => {
  //   dispatch(loadMessages("userId")); // Replace 'userId' with actual user ID logic
  // }, [dispatch]);

  // useEffect(() => {
  //   setMessages(messagesList);
  // }, [messagesList]);

  useEffect(() => {
    // socket.emit("join-room", { room_id: "1" }); // Replace with actual room ID logic
    socket.on("receive-message", (data: Message) => {
      alert('ok')
      console.log("Message received:", data);
      dispatch(receiveMessage(data));
    });

    return () => {
      socket.off("receive-message");
      socket.disconnect();
    };
  }, [dispatch]);

  const submitMessage = () => {
    if (newMessage.trim() !== "") {
      const currentTime = new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
      const message: Message = {
        message_content: newMessage.trim(),
        timestamp: currentTime,
        id: "a", // Generate unique ID for the message
        receiverId: "4", // Replace with actual receiver ID logic
        senderId: "1", // Replace with actual sender ID logic
        room_id: "1", // Replace with actual room ID logic
        status: "unread",
      };

      dispatch(sendMessage(message));
      // socket.emit("send-message", message);
      setNewMessage("");
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      submitMessage();
      event.preventDefault();
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    const handleResize = () => {
      setChatHeight(window.innerHeight * 0.6);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Box style={{ border: "1px solid #ded9d9", borderRadius: "5px" }}>
      <div>
        <CardHeader
          sx={{ backgroundColor: "#f2f7f4" }}
          avatar={
            <>
              <IconButton onClick={props.backToMessageList} aria-label="back">
                <ArrowBackIcon />
              </IconButton>

              <Badge
                overlap="circular"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                sx={{ marginLeft: 3 }}
              >
                <Avatar
                  aria-label="recipe"
                  src={"https://randomuser.me/api/portraits/thumb/men/40.jpg"}
                />
              </Badge>
            </>
          }
          title={
            <Typography variant="body1" color={"black"}>
              Mahroof Ali, 28, Malappuram
            </Typography>
          }
          subheader={
            <Typography>
              {`${4} Min ago`} <OnlineBadge />
            </Typography>
          }
        />
      </div>

      <div
        style={{
          border: "1px solid #ded9d9",
          height: chatHeight, // Dynamic height based on viewport
          padding: 15,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            overflowY: "scroll",
            flexGrow: 1,
            marginBottom: 10,
            // Hide scrollbar but allow scrolling
            scrollbarWidth: "none", // Firefox
            msOverflowStyle: "none", // Internet Explorer 10+
          }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                alignSelf:
                  msg?.senderId && msg.senderId === token ? "flex-end" : "flex-start",
                backgroundColor:
                  msg?.senderId && msg.senderId === token ? "#d8e1f9" : "white",
                padding: 5,
                paddingRight: 15,
                paddingLeft: 15,
                marginBottom: 5,
                borderRadius: 5,
                border: "1px solid #ded9d9",
              }}
            >
              <div>{msg.message_content}</div>
              <div style={{ fontSize: 12 }}>{msg.timestamp}</div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <TextField
          fullWidth
          id="standard-error-helper-text"
          autoFocus
          value={newMessage}
          variant="outlined"
          onKeyPress={handleKeyPress}
          onChange={(e) => setNewMessage(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton aria-label="send message" onClick={submitMessage}>
                  <SendIcon sx={{ color: "#03befc" }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
    </Box>
  );
}
