import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import ChatPage from "./ChatPage";
import { loadUserChats } from "../action/messageActions";
import { useDispatch } from "react-redux";
import { AppDispatch, Message, RootState } from "../store";
import { useSelector } from "react-redux";
import socket from "../socket.ts/socket";
import { calculateAge } from "../util";
import { getTimeAgo } from "../components/TimeFunctions/TimeFunction";
import { OnlineBadge } from "../components/Badges/Badges";
import { getMe } from "../action/authActions";
import { intewellToFetch } from "../consts";
import { updateUserOnlineStatus } from "../action/usersAction";

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

  const chatRooms = useSelector((state: RootState) => state.message.messages);
  const user = useSelector((state: RootState) => state.auth.user);

  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);
  const dispatch: AppDispatch = useDispatch();

  React.useEffect(() => {
    dispatch(loadUserChats()); // Fetch users from your backend
  }, [dispatch]);
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    dispatch(getMe());
  }, [dispatch]);

  React.useEffect(() => {
    socket.on("receive-message", (data: Message) => {
      dispatch(loadUserChats()); // Fetch users from your backend
    });

    // return () => {
    //   socket.off("receive-message");
    //   socket.disconnect();
    // };
  }, [dispatch]);

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
  };
  const nullfyUserSelect = () => {
    setSelectedUser(null)
    dispatch(loadUserChats());
  };
  
  React.useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(loadUserChats());
      dispatch(updateUserOnlineStatus());
    }, intewellToFetch);

    return () => clearInterval(intervalId);
  }, [dispatch, user, intewellToFetch]);

  return (
    <>
      {selectedUser ? (
        <ChatPage backToMessageList={nullfyUserSelect} messageRoom={selectedUser} onClose={() => setSelectedUser(null)} />
      ) : (
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {chatRooms.map((chat: any, index: any) => (

            <React.Fragment key={index}>
              <ListItem
                alignItems="flex-start"
                sx={{ cursor: "pointer" }}
                onClick={() => handleUserClick(chat)}
              >
                <ListItemAvatar>
                  <Avatar alt={""} src={chat?.Receiver?.profileImage} />
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
                          You: {chat?.last_message_content}
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

                        </Typography>

                      </div>
                    </React.Fragment>
                  }
                />
              </ListItem>
              {index < chatRooms.length - 1 && (
                <Divider variant="inset" component="li" />
              )}
            </React.Fragment>
          ))}
        </List>
      )}
    </>
  );
};

export default Messages;
