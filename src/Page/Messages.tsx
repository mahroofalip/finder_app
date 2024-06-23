import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import ChatPage from "./ChatPage";
import { loadUserChats, receiveMessage } from "../action/messageActions";
import { useDispatch } from "react-redux";
import { AppDispatch, Message, RootState } from "../store";
import { useSelector } from "react-redux";
import socket from "../socket.ts/socket";

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
  // const [users, setUsers] = React.useState<User[]>([]);
  const chatRooms = useSelector((state: RootState) => state.message.messages);

  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);
  const dispatch: AppDispatch = useDispatch();

  React.useEffect(() => {
    dispatch(loadUserChats()); // Fetch users from your backend
  }, [dispatch]);
  // React.useEffect(() => {
  // const fetchData = async () => {
  //   try {
  //     const response = await fetch("https://randomuser.me/api/?results=5");
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }
  //     const jsonData = await response.json();
  //     setUsers(jsonData.results);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };
  // fetchData();
  // }, []);

  React.useEffect(() => {
    socket.on("receive-message", (data: Message) => {
      // alert('ok')
      dispatch(loadUserChats()); // Fetch users from your backend

      // console.log("Message received:", data);
      // dispatch(receiveMessage(data));
    });

    return () => {
      socket.off("receive-message");
      socket.disconnect();
    };
  }, [dispatch]);

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
  };

  return (
    <>
      {selectedUser ? (
        <ChatPage user={selectedUser} onClose={() => setSelectedUser(null)} />
      ) : (
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
          {/* {JSON.stringify(chatRooms[0].Receiver.firstName)} */}

          {chatRooms.map((chat: any, index: any) => (
            <React.Fragment key={index}>
              <ListItem
                alignItems="flex-start"
                sx={{ cursor: "pointer" }}
                onClick={() => handleUserClick(chat)}
              >
                <ListItemAvatar>
                  <Avatar alt={""} src={chat.Receiver.profileImage} />
                </ListItemAvatar>
                <ListItemText
                  primary={`${chat?.Receiver?.firstName} ${chat?.Receiver?.lastName}, ${chat?.Receiver?.age}`}
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
                          You: {chat.last_message_content}
                        </Typography>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="gray"
                        >
                          Today
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
