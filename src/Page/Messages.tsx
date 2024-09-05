import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import ChatPage from "./ChatPage";
import BlockIcon from '@mui/icons-material/Block';
import { loadUserChats } from "../action/messageActions";
import { useDispatch } from "react-redux";
import { AppDispatch, Message, RootState } from "../store";
import { useSelector } from "react-redux";
import socket from "../socket.ts/socket";
import { calculateAge, playSound } from "../util";
import { getTimeAgo } from "../components/TimeFunctions/TimeFunction";
import { OnlineBadge } from "../components/Badges/Badges";
import { getMe } from "../action/authActions";
import { intewellToFetch } from "../consts";
import { updateUserOnlineStatus } from "../action/usersAction";
import { Box, IconButton, Tooltip } from "@mui/material";
import { blockUser } from "../action/profileAction";
import AlertComponent from "../components/Alerts/AlertComponent";

interface User {
  name: {
    first: string;
    last: string;
  };
  dob: {
    age: number;
  };
  picture: {
    large: string;
  };
}

const Messages: React.FC = () => {
  const { messages } = useSelector((state: RootState) => state.message);
  const user = useSelector((state: RootState) => state.auth.user);

  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);
  const dispatch: AppDispatch = useDispatch();
  const [change, setChange] = React.useState<boolean>(false);
  const [blockAlert, setBlockAlert] = React.useState<string | null>(null);

  React.useEffect(() => {
    dispatch(loadUserChats());
  }, [dispatch]);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    dispatch(getMe());
  }, [dispatch]);

  React.useEffect(() => {
    socket.on("receive-message", (data: Message) => {
      dispatch(loadUserChats());
    });

    socket.on("blocked-you-user", (data: { username: string }) => {
      // Update the block alert message
      setBlockAlert(`${data.username} has blocked you.`);
      
      // Play the sound notification
      playSound()
    });
  }, [dispatch]);

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
  };

  const nullfyUserSelect = () => {
    setSelectedUser(null);
    dispatch(loadUserChats());
  };

  const blockUserFn = (event: React.MouseEvent, roomId: any, profileId: any) => {
    event.stopPropagation(); // Prevents the click from propagating to the ListItem
    dispatch(blockUser(roomId, profileId));
    setChange(!change);
  };

  React.useEffect(() => {
    dispatch(loadUserChats());
  }, [change]);

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(loadUserChats());
      dispatch(updateUserOnlineStatus());
    }, intewellToFetch);

    return () => clearInterval(intervalId);
  }, [dispatch, user, intewellToFetch]);

  return (
    <>
      {blockAlert && (
        <AlertComponent
          icon={<BlockIcon />}
          severity="error"
          message={blockAlert}
        />
      )}
      {selectedUser ? (
        <ChatPage backToMessageList={nullfyUserSelect} messageRoom={selectedUser} onClose={() => setSelectedUser(null)} />
      ) : (
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {messages.map((chat: any, index: any) => (
            <React.Fragment key={index}>
              <ListItem
                alignItems="flex-start"
                sx={{ cursor: "pointer" }}
                onClick={() => handleUserClick(chat)}
              >
                <ListItemAvatar>
                  <Avatar alt={chat?.Receiver?.firstName} src={
                    chat?.senderId === user?.id
                      ? chat?.Receiver.profileImage
                      : chat?.Sender.profileImage
                  } />
                </ListItemAvatar>

                <ListItemText
                  primary={`${chat?.senderId == user?.id ? chat?.Receiver?.firstName : chat?.Sender?.firstName}  ${chat?.senderId == user?.id ? chat?.Receiver?.lastName : chat?.Sender?.lastName}, ${calculateAge(chat?.Receiver?.birthDate)}`}
                  secondary={
                    <React.Fragment>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="gray"
                        >
                          {chat?.last_message_content}
                        </Typography>

                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="gray"
                        >
                          {
                            chat?.Receiver?.id !== user?.id
                              ? chat?.Receiver?.isOnline
                                ? (
                                  <>
                                    Online <OnlineBadge />
                                  </>
                                )
                                : (
                                  getTimeAgo(chat?.Receiver?.lastActiveAt)
                                )
                              : chat?.Sender?.isOnline
                                ? (
                                  <>
                                    Online <OnlineBadge />
                                  </>
                                )
                                : (
                                  getTimeAgo(chat?.Sender?.lastActiveAt)
                                )
                          }

                          <Tooltip sx={{ ml: 2 }} title="Block">
                            <IconButton
                              onClick={(event) =>
                                blockUserFn(
                                  event,
                                  chat.id,
                                  chat?.Receiver?.id !== user?.id ? chat?.Receiver?.id : chat?.Sender?.id
                                )
                              }
                              aria-label="block"
                            >
                              <BlockIcon />
                            </IconButton>
                          </Tooltip>
                        </Typography>
                      </div>
                    </React.Fragment>
                  }
                />
              </ListItem>
              {index < messages.length - 1 && (
                <Divider variant="inset" component="li" />
              )}
            </React.Fragment>
          ))}
          {messages?.length === 0 &&  <Box sx={{display:"flex", justifyContent:"center"}}>No Messages</Box>}
        </List>
      )}
    </>
  );
};

export default Messages;
