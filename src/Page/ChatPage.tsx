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
import { format, isToday, isYesterday, differenceInDays } from 'date-fns';
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { getMessagesByRoomId, pushReciverNewMessage, sendMessage } from "../action/messageActions";
import socket from "../socket.ts/socket";
import { useSelector } from "react-redux";
import { calculateAge } from "../util";
import { getTimeAgo } from "../components/TimeFunctions/TimeFunction";
import { OnlineBadge } from "../components/Badges/Badges";
import { getMe } from "../action/authActions";
import Subheader from "../components/subHeaderChat/SubHeader";
import { orangeHeaderBg } from "../consts";

export default function ChatPage(props: any) {
  const dispatch: AppDispatch = useDispatch();

  const selectedMessages = useSelector((state: RootState) => state?.message?.selectedMessages);
  const [newMessage, setNewMessage] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [chatHeight, setChatHeight] = useState<number>(
    window.innerHeight * 0.6
  );
  const user = useSelector((state: RootState) => state.auth.user);

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
  
    socket.on("disconnect", () => {
      socket.connect();
    });
  
    // Cleanup on unmount
    return () => {
      socket.off("receive-message", handleReceiveMessage);
    };
  }, [dispatch]);
  

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

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    dispatch(getMe());
  }, [dispatch]);

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

  const formatMessageDate = (date: Date) => {
    if (isToday(date)) {
      return 'Today';
    } else if (isYesterday(date)) {
      return 'Yesterday';
    } else {
      const daysAgo = differenceInDays(new Date(), date);
      if (daysAgo < 7) {
        return format(date, 'EEEE'); // Day name (e.g., Wednesday)
      } else {
        return format(date, 'MMM dd'); // Date (e.g., Aug 24)
      }
    }
  };

  let lastMessageDate: string | null = null;

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
                  src={props?.messageRoom?.senderId == user?.id ? props?.messageRoom?.Receiver.profileImage : props?.messageRoom?.Sender.profileImage}
                />
              </Badge>
            </>
          }

          title={
            <Typography variant="body1" color={"black"}>
              {props?.messageRoom?.senderId == user?.id ? props?.messageRoom?.Receiver.firstName : props?.messageRoom?.Sender.firstName} &nbsp;
              {props?.messageRoom?.senderId == user?.id ? props?.messageRoom?.Receiver.lastName : props?.messageRoom?.Sender.lastName},
              {calculateAge(props?.messageRoom?.senderId == user?.id ? props?.messageRoom?.Receiver?.birthDate : props?.messageRoom?.Sender?.birthDate)},&nbsp;
              {props?.messageRoom?.senderId == user?.id ? props?.messageRoom?.Receiver.place : props?.messageRoom?.Sender.place}
            </Typography>
          }
          subheader={
            <Subheader messageRoom={props?.messageRoom} user={user} />
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
          {selectedMessages.map((msg: any, index: any) => {
            const messageDate = new Date(msg.createdAt);
            const currentDate = formatMessageDate(messageDate);
            const showDateLabel = currentDate !== lastMessageDate;

            lastMessageDate = currentDate;

            return (
              <React.Fragment key={index}>
                {showDateLabel && (
                  <div style={{
                    textAlign: "center",
                    marginBottom: 10,
                    fontWeight: "lighter",
                    color: "#888", // Lighter color for the day label
                    fontSize: "0.9rem", // Slightly smaller font size
                  }}>
                    {currentDate}
                  </div>
                )}
                <div
                  style={{
                    alignSelf: msg?.senderId == user?.id ? "flex-end" : "flex-start",
                    backgroundColor: msg?.senderId == user?.id ? "#d8e1f9" : "white",
                    padding: 5,
                    paddingRight: 15,
                    paddingLeft: 15,
                    marginBottom: 5,
                    borderRadius: 5,
                    border: "1px solid #ded9d9",
                  }}
                >
                  <div>{msg.message_content}</div>
                  <div style={{ fontSize: 12, display: "flex", justifyContent: "end", color: "gray", fontWeight: "lighter" }}>
                    {format(messageDate, 'HH:mm')}
                  </div>
                </div>
              </React.Fragment>
            );
          })}

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
                  <SendIcon sx={{ color: orangeHeaderBg }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
    </Box>
  );
}
