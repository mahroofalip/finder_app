import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ChatPage from './ChatPage';

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
  const [users, setUsers] = React.useState<User[]>([]);
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://randomuser.me/api/?results=5");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        setUsers(jsonData.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
  };

  return (
    <>
      {selectedUser ? (
        <ChatPage user={selectedUser} onClose={() => setSelectedUser(null)} />
      ) : (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {users.map((user, index) => (
            <React.Fragment key={index}>
              <ListItem
                alignItems="flex-start"
                sx={{ cursor: 'pointer' }}
                onClick={() => handleUserClick(user)}
              >
                <ListItemAvatar>
                  <Avatar alt={user.name.first} src={user.picture.large} />
                </ListItemAvatar>
                <ListItemText
                  primary={`${user.name.first} ${user.name.last}, ${user.dob.age}`}
                  secondary={
                    <React.Fragment>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="gray"
                        >
                          You: {" How Are you ?"}
                        </Typography>
                        <Typography
                          sx={{ display: 'inline' }}
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
              {index < users.length - 1 && <Divider variant="inset" component="li" />}
            </React.Fragment>
          ))}
        </List>
      )}
    </>
  );
};

export default Messages;