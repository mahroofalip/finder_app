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
import * as React from "react";

interface Message {
  message: string;
  time: string;
  isMe: boolean;
}

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

const OfflineBadge = () => (
  <span
    style={{
      width: 10,
      height: 10,
      borderRadius: "50%",
      background: "gray",
      display: "inline-block",
      marginLeft: 5,
    }}
  />
);

export default function ChatPage(props: any) {
  const initialMessages: Message[] = [];

  const [messages, setMessages] = React.useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = React.useState<string>("");
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const [chatHeight, setChatHeight] = React.useState<number>(
    window.innerHeight * 0.6
  );

  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      const currentTime = new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
      const newMsg: Message = {
        message: newMessage.trim(),
        time: currentTime,
        isMe: true,
      };

      setMessages((prevMessages) => [...prevMessages, newMsg]);
      const newMsg2: Message = {
        message: `Yes,   ${newMessage} bro`,
        time: currentTime,
        isMe: false,
      };

      setNewMessage("");

      // Add newMsg2 after a delay of 2 seconds
      setTimeout(() => {
        setMessages((prevMessages) => [...prevMessages, newMsg2]);
      }, 2000);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      sendMessage();
      event.preventDefault();
    }
  };

  React.useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  React.useEffect(() => {
    const handleResize = () => {
      setChatHeight(window.innerHeight * 0.6);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Box style={{ border: "1px solid #ded9d9", borderRadius: "5px" }}>
        <div>
          <CardHeader
            sx={{ backgroundColor: "#f2f7f4" }}
            avatar={
              <>
                <ArrowBackIcon />
                <Badge
                  overlap="circular"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  sx={{ marginLeft: 5 }}
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
                Mahroof ali, 28, Malappuram
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
                  alignSelf: msg.isMe ? "flex-end" : "flex-start",
                  backgroundColor: msg.isMe ? "#d8e1f9" : "white",
                  padding: 5,
                  paddingRight: 15,
                  paddingLeft: 15,
                  marginBottom: 5,
                  borderRadius: 5,
                  border: "1px solid #ded9d9",
                }}
              >
                <div>{msg.message}</div>
                <div style={{ fontSize: 12 }}>{msg.time}</div>
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
                  <IconButton aria-label="send message" onClick={sendMessage}>
                    <SendIcon sx={{ color: "#03befc" }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
      </Box>
    </>
  );
}
