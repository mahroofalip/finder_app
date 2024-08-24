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
import IconButton from "@mui/material/IconButton";
import { useDispatch } from "react-redux";
import { AppDispatch, Message, RootState } from "../store";
import { getMessagesByRoomId, pushReciverNewMessage, sendMessage } from "../action/messageActions";
import socket from "../socket.ts/socket";
import { useSelector } from "react-redux";
import { calculateAge } from "../util";
import { getTimeAgo } from "../components/TimeFunctions/TimeFunction";
import { OnlineBadge } from "../components/Badges/Badges";

export default function ChatPage(props: any) {
  const dispatch: AppDispatch = useDispatch();

  const token = localStorage.getItem("token") ?? "";
  const selectedMessages = useSelector((state: RootState) => state.message.selectedMessages);
  const [newMessage, setNewMessage] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [chatHeight, setChatHeight] = useState<number>(
    window.innerHeight * 0.6
  );

  // Load messages when the component mounts
  useEffect(() => {
    if (props.messageRoom.id) {
     
      dispatch(getMessagesByRoomId(props.messageRoom.id));
      
    }
  }, [dispatch, props.messageRoom.id]);

  // Listen for incoming messages
  useEffect(() => {
    const handleReceiveMessage = (data: any) => {
     dispatch(pushReciverNewMessage(data));
    };
    socket.on("receive-message", handleReceiveMessage);
  }, []);

  const submitMessage = () => {
    if (newMessage.trim() !== "") {
      dispatch(sendMessage(newMessage, props.messageRoom.id));
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
  }, [selectedMessages]);

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
              {props?.messageRoom?.Receiver.firstName}
              {props?.messageRoom?.Receiver.lastName},
              {calculateAge(props?.messageRoom?.Receiver?.birthDate)},
              {props?.messageRoom?.Receiver.place}
            </Typography>
          }
          subheader={
            <Typography>
              {props?.messageRoom?.Receiver?.isOnline
                ? "Online"
                : getTimeAgo(props?.messageRoom?.Receiver?.updatedAt)}
              <OnlineBadge />
            </Typography>
          }
        />
      </div>

      <div
        style={{
          border: "1px solid #ded9d9",
          height: chatHeight,
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
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {selectedMessages.map((msg:any, index:any) => (
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
