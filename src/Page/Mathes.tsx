import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import InfoIcon from "@mui/icons-material/Info";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CancelIcon from "@mui/icons-material/Cancel";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Grid from "@mui/material/Grid";
import Badge from "@mui/material/Badge";
import { Chip } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import ResponsiveMessageBox from "../components/MessageBox/MessageBox";
import { loadFinderUsers } from "../action/usersAction";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { useSelector } from "react-redux";
import { OnlineBadge } from "../components/Badges/Badges";
import { getTimeAgo } from "../components/TimeFunctions/TimeFunction";
import { intewellToFetch } from "../consts";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

// const OnlineBadge = () => (
//   <span
//     style={{
//       width: 10,
//       height: 10,
//       borderRadius: "50%",
//       background: "#03fc5e",
//       display: "inline-block",
//       marginLeft: 5,
//     }}
//   />
// );
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
type ExpandedProfiles = boolean[];

export default function MatchesCard() {

  const dispatch: AppDispatch = useDispatch();
  const messagesList = useSelector((state: RootState) => state.users.users);
  const user = useSelector((state: RootState) => state.auth);

  // const loading = useSelector((state: RootState) => state.users.loading);
  // const error = useSelector((state: RootState) => state.users.error);

  const [expandedProfiles, setExpandedProfiles] =
    React.useState<ExpandedProfiles>([]);
  // const [users, setUsers] = React.useState<any[]>([]);
  const matches = useMediaQuery("(max-width:600px)");

  const [open, setOpen] = React.useState(false);
  const [like, setLike] = React.useState(false);
  const [selectedUser,setSelectedUser]  = React.useState(null);
  const handleLike = () => {
    setLike(!like);
  };
  const handleClickOpenMessage = (user:any) => {
    setSelectedUser(user)
    setOpenMessage(true);
  };

  const [openMessage, setOpenMessage] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  
  React.useEffect(() => {
    dispatch(loadFinderUsers());
    const intervalId = setInterval(() => {
      console.log(user, "useruseruseruser");
      dispatch(loadFinderUsers());
    }, intewellToFetch);
  
    // if (!user) {
    //   clearInterval(intervalId)
    //   return
    // }

    return () => clearInterval(intervalId);
  }, [dispatch, user, intewellToFetch]);


  const handleExpandClick = (index: number) => {
    const expandedProfilesCopy = [...expandedProfiles];
    expandedProfilesCopy[index] = !expandedProfilesCopy[index];
    setExpandedProfiles(expandedProfilesCopy);
  };

  return (
    <>
      <Grid container spacing={2}>
        {messagesList.length !== 0 &&
          messagesList?.map((user, index) => {
            const timeAgo = getTimeAgo(user.updatedAt);
            return (
              <>
                <Grid key={`key${index}`} item xs={12} sm={6} md={4} lg={4} xl={3}>
                  <Card sx={{ maxWidth: "100%" }}>
                    <CardHeader
                      avatar={
                        <Badge
                          overlap="circular"
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                          }}
                        >
                          <Avatar
                            sx={{ bgcolor: red[500] }}
                            aria-label="recipe"
                            src={'user'}
                          >
                            {/* R */}
                          </Avatar>
                        </Badge>
                      }
                      title={
                        <Typography
                          variant="body1"
                          color={"black"}
                          fontWeight="600"
                        >
                          {`${user.firstName} ${user.lastName}`}
                        </Typography>
                      }
                      subheader={`${user.isOnline ? "Online" : timeAgo}`}
                      action={
                        <Badge
                          style={{ marginRight: 12 }}
                          overlap="circular"
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                          }}
                          badgeContent={ user.isOnline  ? <OnlineBadge /> : null}
                          // user.isOnline
                        ></Badge>
                      }
                    />
                    <CardMedia
                      component="img"
                      height="250"
                      image={user?.profileImage || ""}
                      alt="Paella dish"
                    />
                    <CardContent sx={{ margin: 0 }}>
                      <h5 style={{ padding: 0, margin: 0 }}>
                        Age: {user.age}, {user.city}
                      </h5>
                      <h6 style={{ padding: 0, margin: 0 }}>
                        Working in Legal Professional
                      </h6>

                      <h6 style={{ padding: 0, margin: 0 }}>
                        Studied Higher Secondary / Intermediate
                      </h6>
                    </CardContent>
                    <CardActions sx={{ Padding: 0, margin: 0 }} disableSpacing>
                      <IconButton
                       
                        aria-label="send message"
                        onClick={()=>handleClickOpenMessage(user)}
                      >
                        <MessageOutlinedIcon sx={{ color: "#4287f5" }} />
                      </IconButton>
                      <IconButton
                        onClick={handleLike}
                        aria-label="add to favorites"
                      >
                        {!like ? (
                          <FavoriteBorderOutlinedIcon />
                        ) : (
                          <FavoriteOutlinedIcon sx={{ color: "red" }} />
                        )}
                      </IconButton>
                      <IconButton aria-label="share">
                        <CancelIcon sx={{ color: "black" }} />
                      </IconButton>
                      {/* {!matches &&} */}

                      {matches ? (
                        <ExpandMore
                          expand={expandedProfiles[index]}
                          onClick={() => handleExpandClick(index)}
                          aria-expanded={expandedProfiles[index]}
                          aria-label="show more"
                        >
                          <ExpandMoreIcon />
                        </ExpandMore>
                      ) : (
                        <div style={{ marginLeft: "auto" }}>
                          <IconButton
                            onClick={handleClickOpen}
                            aria-label="info"
                          >
                            <InfoIcon sx={{ color: "#4287f5" }} />
                          </IconButton>
                        </div>
                      )}
                    </CardActions>
                    <Collapse
                      in={expandedProfiles[index]}
                      timeout="auto"
                      unmountOnExit
                    >
                      <CardContent>
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 8,
                            marginBottom: "10px",
                          }}
                        >
                          <Chip label="Small" size="small" variant="outlined" />
                          <Chip label="Small" size="small" variant="outlined" />
                          <Chip label="Small" size="small" variant="outlined" />
                          <Chip label="Small" size="small" variant="outlined" />
                          <Chip label="Small" size="small" variant="outlined" />
                          <Chip label="Small" size="small" variant="outlined" />
                          <Chip label="Small" size="small" variant="outlined" />
                          <Chip label="Small" size="small" variant="outlined" />
                          <Chip label="Small" size="small" variant="outlined" />
                          <Chip label="Small" size="small" variant="outlined" />
                        </div>

                        <Typography variant="h6" paragraph>
                          About:
                        </Typography>
                        <Typography variant="subtitle1" paragraph>
                          Dating me is like dating the funniest person you've
                          ever met… and the most humble.
                        </Typography>
                        {/*  */}

                        <Typography variant="h6" paragraph>
                          Basic Info:
                        </Typography>
                        <div key={user.id}>
                          <Typography variant="subtitle2">
                            <GrayLabel variant="inherit">Gender</GrayLabel>
                            {user["gender"]}
                          </Typography>
                          <Typography variant="subtitle2">
                            <GrayLabel variant="inherit">Username</GrayLabel>
                            {user["userName"]}
                          </Typography>
                          <Typography variant="subtitle2">
                            <GrayLabel variant="inherit">DOB</GrayLabel>
                            {user["birthDate"]}
                          </Typography>
                          <Typography variant="subtitle2">
                            <GrayLabel variant="inherit">Height</GrayLabel>
                            {user["height"]}
                          </Typography>
                          <Typography variant="subtitle2">
                            <GrayLabel variant="inherit">Weight</GrayLabel>
                            {user["weight"]}
                          </Typography>
                          <Typography variant="subtitle2">
                            <GrayLabel variant="inherit">Eye Color</GrayLabel>
                            {user["eyeColor"]}
                          </Typography>
                          <Typography variant="subtitle2">
                            <GrayLabel variant="inherit">Hair Color</GrayLabel>
                            {user["hairColor"]}
                          </Typography>
                        </div>

                        {/*  */}
                      </CardContent>
                    </Collapse>
                  </Card>
                </Grid>
              </>
            );
          })}
      </Grid>
      <Dialog
        fullWidth={true}
        maxWidth={"md"}
        open={open}
        onClose={handleClose}
      >
        <DialogContent>
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
              src="https://usrimg.quackquack.co/resize_17132741094Ni9cL1nWqVpgUdMtZ5PflOKw.jpg"
              sx={{ width: 150, height: 150 }}
            />
          </Box>
          <Box
            noValidate
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              m: "auto",
              width: "fit-content",
            }}
          >
            <strong>
              <span style={{ color: "gray" }}> Full Name :</span> Haseena,
              <span style={{ color: "gray" }}>Age :</span> 27,
              <span style={{ color: "gray" }}>Place :</span> Malappuram
            </strong>
          </Box>

          <h6 style={{ padding: 0, margin: 0, textAlign: "center" }}>
            Working in Legal Professional
          </h6>

          <h6 style={{ padding: 0, margin: 0, textAlign: "center" }}>
            Studied Higher Secondary / Intermediate
          </h6>
          <div
            style={{
              padding: 10,
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 8,
              marginBottom: "10px",
            }}
          >
            <Chip label="Small" size="small" variant="outlined" />
            <Chip label="Small" size="small" variant="outlined" />
            <Chip label="Small" size="small" variant="outlined" />
            <Chip label="Small" size="small" variant="outlined" />
            <Chip label="Small" size="small" variant="outlined" />
            <Chip label="Small" size="small" variant="outlined" />
            <Chip label="Small" size="small" variant="outlined" />
            <Chip label="Small" size="small" variant="outlined" />
            <Chip label="Small" size="small" variant="outlined" />
            <Chip label="Small" size="small" variant="outlined" />
          </div>

          {/*  */}

          <h4 style={{ padding: 0, margin: 0, textAlign: "center" }}>
            Dating me is like dating the funniest person you've ever met… and
            the most humble.
          </h4>

          {/*  */}

          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <Typography variant="subtitle2">
              <GrayLabel variant="inherit">Gender</GrayLabel>
              female
            </Typography>
            <Typography variant="subtitle2">
              <GrayLabel variant="inherit">Username</GrayLabel>
              mahroof
            </Typography>
            <Typography variant="subtitle2">
              <GrayLabel variant="inherit">DOB</GrayLabel>
              12-04-1996
            </Typography>
            <Typography variant="subtitle2">
              <GrayLabel variant="inherit">Height</GrayLabel>
              5.5
            </Typography>
            <Typography variant="subtitle2">
              <GrayLabel variant="inherit">Weight</GrayLabel>
              53
            </Typography>
            <Typography variant="subtitle2">
              <GrayLabel variant="inherit">Eye Color</GrayLabel>
              Blue
            </Typography>
            <Typography variant="subtitle2">
              <GrayLabel variant="inherit">Hair Color</GrayLabel>
              Black
            </Typography>
          </div>

          {/*  */}
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            sx={{ borderColor: "gray", color: "gray" }}
            onClick={handleClose}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <ResponsiveMessageBox
        open={openMessage}
        selectedUser={selectedUser}
        handleClose={() => setOpenMessage(false)}
      />
    </>
  );
}
