import "./App.css";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import useMediaQuery from "@mui/material/useMediaQuery";
import SettingsIcon from "@mui/icons-material/Settings";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SignLanguageIcon from "@mui/icons-material/SignLanguage";
import MessageIcon from "@mui/icons-material/Message";
import { Avatar } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import MatchesCard from "./Page/Mathes";
import SearchingCriteria from "./Page/SearchingCriteria";
import Visitors from "./Page/Visitors";
import Likes from "./Page/Likes";
import Blocked from "./Page/Blocked";
import Ignored from "./Page/Ignored";
import Messages from "./Page/Messages";
import Login from "./Page/Login";
import Register from "./Page/Register";
import LoginIcon from "@mui/icons-material/Login";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "./store";
import { getMe, loginUser, logoutUser, registerUser } from "./action/authActions";
import ProfileForm from "./Page/ProfileAndEdit";

const drawerWidth = 240;

interface Props {
  window?: () => Window;
}

function App(props: Props) {
  const dispatch: AppDispatch = useDispatch();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [isLoggedIn, setLoggedIn] = React.useState(false);
  const [isAccountCreated, setAccountCreated] = React.useState(true);
  const [selectedMenuItem, setSelectedMenuItem] = React.useState("");
  const matches = useMediaQuery("(max-width:600px)");

  const me = useSelector((state: RootState) => state.auth);
  const user = useSelector((state: RootState) => state.auth.user);


  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token || user?.status === "success") {
      setLoggedIn(true);

    } else {
      setLoggedIn(false);
    }
  }, [user, dispatch]);



  const handleRegisterSubmit = (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
  }) => {
    const { password, phone, email, firstName, lastName } = data;
    const userData: any = {
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      email: email,
      password: password,
    };
    dispatch(registerUser(userData));
  };

  const handleLoginSubmit = (data: { email: string; password: string }) => {
    const { password, email } = data;
    const userData: any = {
      password,
      email,
    };


    dispatch(loginUser(userData));
  };

  const displaySignUp = () => {
    setSelectedMenuItem("Matches");
    setAccountCreated(false);
  };
  const displayLogin = () => {
    setAccountCreated(true);
  };

  const handleMenuItemClick = (text: string) => {
    if (text === "Logout") {
      setLoggedIn(false);
      dispatch(logoutUser());
      setSelectedMenuItem("");
    } else {
      setSelectedMenuItem(text);
    }
  };
  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };
  React.useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);
  const drawer = (
    <div className="hide-scrollbar" style={{ overflowY: "auto", height: "100%" }}>
      {matches && (
        <Toolbar>
          <Avatar alt="Remy Sharp" src={me.user?.profileImage || ""}  />
          <img
            height={30}
            src="https://cdn.logojoy.com/wp-content/uploads/2018/05/01140918/958-768x591.png"
            alt="logo"
            style={{ paddingLeft: "20px" }}
          />
          <Typography
            sx={{ fontWeight: "bold", marginLeft: "5px", color: "#f516e6" }}
          >
            {"Finder"}
          </Typography>
          <IconButton style={{ marginLeft: "10px" }} aria-label="delete">
            <SettingsIcon />
          </IconButton>
        </Toolbar>
      )}

      <Divider />
          
      <List className="bg-Body">
        {[
          "Profile",
          "Matches",
          "Search",
          "Visitors",
          "likes",
          "Messages",
          "Ignored",
          "Blocked",
          "Logout",
        ].map((text, index) => (
          <ListItem key={text} onClick={() => handleMenuItemClick(text)}>
            <ListItemButton>
              <ListItemIcon>
                {index === 0 && <PersonIcon sx={{ color: "green" }} />}
                {index === 1 && <SignLanguageIcon sx={{ color: "skyblue" }} />}
                {index === 2 && <SearchOutlinedIcon sx={{ color: "black" }} />}
                {index === 3 && <RemoveRedEyeIcon sx={{ color: "greenyellow" }} />}
                {index === 4 && <FavoriteBorderIcon sx={{ color: "red" }} />}
                {index === 5 && <MessageIcon sx={{ color: "blue" }} />}
                {index === 6 && <ThumbDownOffAltIcon sx={{ color: "rosybrown" }} />}
                {index === 7 && <BlockOutlinedIcon sx={{ color: "orange" }} />}
                {index === 8 && <LoginIcon sx={{ color: "black" }} />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return isLoggedIn ? (
    <Box sx={{ display: "flex" , }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          background:
            "linear-gradient(90deg, rgba(255,2,254,1) 0%, rgba(140,59,247,1) 4%, rgba(225,27,254,1) 47%, rgba(198,49,254,1) 66%, rgba(254,44,207,1) 99%, rgba(24,115,240,1) 100%, rgba(155,84,254,1) 100%, rgba(0,212,255,1) 100%)",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {selectedMenuItem}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }  }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            // display: { xs: 'block', sm: 'none' },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              
            },
          }}
          
          open
        >
          <Toolbar>
            <Avatar
              alt="Remy Sharp"
              src={me.user?.profileImage || ""}             />

            <img
              height={20}
              src="https://cdn.logojoy.com/wp-content/uploads/2018/05/01140918/958-768x591.png"
              alt="logo"
              style={{ paddingLeft: "25px" }}
            />
            <Typography
              sx={{ fontWeight: "bold", marginLeft: "5px", color: "#f516e6" }}
            >
              {"Finder"}
            </Typography>
            <IconButton style={{ marginLeft: "10px" }} aria-label="delete">
              <SettingsIcon />
            </IconButton>
          </Toolbar>

          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {selectedMenuItem === "Profile" && (
          <>
            <ProfileForm />
          </>
        )}
        
        {selectedMenuItem === "Matches" && (
          <>
            <MatchesCard />
          </>
        )}
        {selectedMenuItem === "Search" && (
          <>
            <SearchingCriteria />
          </>
        )}
        {selectedMenuItem === "Visitors" && (
          <>
            <Visitors />
          </>
        )}

        {selectedMenuItem === "likes" && (
          <>
            <Likes />
          </>
        )}
        {selectedMenuItem === "Messages" && (
          <>
            <Messages />
          </>
        )}
        {selectedMenuItem === "Ignored" && (
          <>
            <Ignored />
          </>
        )}
        {selectedMenuItem === "Blocked" && (
          <>
            <Blocked />
          </>
        )}
      </Box>
    </Box>
  ) : (
    <>
      <Box sx={{ display: "flex" }}>
        <AppBar
          position="fixed"
          sx={{
            height: "10%",
            background:
              "linear-gradient(90deg, rgba(255,2,254,1) 0%, rgba(140,59,247,1) 4%, rgba(225,27,254,1) 47%, rgba(198,49,254,1) 66%, rgba(254,44,207,1) 99%, rgba(24,115,240,1) 100%, rgba(155,84,254,1) 100%, rgba(0,212,255,1) 100%)",
          }}
        ></AppBar>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
          {!isAccountCreated ? (
            <Register
              showLoginPage={displayLogin}
              signUpSubmit={handleRegisterSubmit}
            />
          ) : (
            <Login
              showRegisterPage={displaySignUp}
              loginSubmit={handleLoginSubmit}
            />
          )}
        </Box>
      </Box>
    </>
  );
}

export default App;
