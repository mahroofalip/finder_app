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
import { useDispatch } from "react-redux";
import { AppDispatch, RootState, User } from "../store";
import { useSelector } from "react-redux";
import { OnlineBadge } from "../components/Badges/Badges";
import { getTimeAgo } from "../components/TimeFunctions/TimeFunction";
import { orangeHeaderBg } from "../consts";
import { getProfile } from "../action/profileAction";
import { calculateAge } from "../util";
import InterestsComponent from "../components/Interests/InterestsChip";
import { getMe } from "../action/authActions";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { addVisitor } from "../action/visitorActions";

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

const GrayLabel = styled(Typography)({
    color: "gray",
    marginTop: 10,
});


type ExpandedProfiles = boolean[];
type ProfileListProps = {
    list: User[] | null;
    me: User | null;
    handleClickOpenMessage: (user: User) => void;
    handleLike: (user: User) => void;
    handleCancelClick: (user: User) => void;
    unblockProfile: (user: User) => void;
    likeIcon: boolean
    setOpenMessage: React.Dispatch<React.SetStateAction<boolean>>;
    openMessage: boolean;
    ignoreIcon: boolean;
    messageIcon: boolean;
    unblcokIcon: boolean;
    selectedUser: User | null;
};

export default function ProfileList({ likeIcon , unblcokIcon,selectedUser,unblockProfile, messageIcon, handleCancelClick, ignoreIcon, setOpenMessage, openMessage, list, handleClickOpenMessage, handleLike }: ProfileListProps) {
    const matches = useMediaQuery("(max-width:600px)");
    const [expandedProfiles, setExpandedProfiles] =
        React.useState<ExpandedProfiles>([]);
    const dispatch: AppDispatch = useDispatch();
    const { profile, loading, error } = useSelector((state: RootState) => state.pofile);
    const me = useSelector((state: RootState) => state.auth.user);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = (id?: any) => {
        dispatch(addVisitor({ profileId: id }));
        dispatch(getProfile(id));
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleExpandClick = (index: number,id:any) => {
        dispatch(addVisitor({ profileId: id }));
        const expandedProfilesCopy = [...expandedProfiles];
        expandedProfilesCopy[index] = !expandedProfilesCopy[index];
        setExpandedProfiles(expandedProfilesCopy);
    };

    React.useEffect(() => {
        const token = localStorage.getItem("token");
        dispatch(getMe());
    }, [dispatch]);

    return (
        <>
            <Grid container spacing={2}>
                {list?.length !== 0 &&
                    list?.map((user, index) => {
                        const timeAgo = getTimeAgo(user?.updatedAt);
                        //  ? return  
                        return (
                            user?.id !== me?.id && <>
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
                                                    {`${user?.firstName} ${user?.lastName}`}
                                                </Typography>
                                            }
                                            subheader={`${user?.isOnline ? "Online" : timeAgo}`}
                                            action={
                                                <Badge
                                                    style={{ marginRight: 12 }}
                                                    overlap="circular"
                                                    anchorOrigin={{
                                                        vertical: "bottom",
                                                        horizontal: "right",
                                                    }}
                                                    badgeContent={user?.isOnline ? <OnlineBadge /> : null}
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
                                                Age: {calculateAge(user?.birthDate)} , {user?.place}
                                            </h5>
                                            <h6 style={{ padding: 0, margin: 0 }}>
                                                {user?.profession}
                                            </h6>

                                            <h6 style={{ padding: 0, margin: 0 }}>
                                                {user?.education}
                                            </h6>
                                        </CardContent>
                                        <CardActions sx={{ Padding: 0, margin: 0 }} disableSpacing>

                                            {messageIcon && <IconButton
                                                aria-label="send message"
                                                onClick={() => handleClickOpenMessage(user)}
                                            >
                                                <MessageOutlinedIcon sx={{ color: orangeHeaderBg }} />
                                            </IconButton>}
                                            {likeIcon &&
                                            <IconButton
                                                onClick={() => handleLike(user)}
                                                aria-label="add to favorites"
                                            >
                                                {!user?.isLiked ? (
                                                    <FavoriteBorderOutlinedIcon sx={{ color: orangeHeaderBg }} />
                                                ) : (
                                                    <FavoriteOutlinedIcon sx={{ color: "red" }} />
                                                )}
                                            </IconButton>}
                                            {ignoreIcon && <IconButton aria-label="share" onClick={() => handleCancelClick(user)}>
                                                <CancelIcon sx={{ color: orangeHeaderBg }} />
                                            </IconButton>}
                                            {unblcokIcon && <IconButton aria-label="share" onClick={() => unblockProfile(user)}>
                                                <LockOpenIcon sx={{ color: orangeHeaderBg }} />
                                            </IconButton>}

                                            {/* {!matches &&} */}

                                            {matches ? (
                                                <ExpandMore
                                                    expand={expandedProfiles[index]}
                                                    onClick={() => handleExpandClick(index,user.id)}
                                                    aria-expanded={expandedProfiles[index]}
                                                    aria-label="show more"
                                                >
                                                    <ExpandMoreIcon />
                                                </ExpandMore>
                                            ) : (
                                                <div style={{ marginLeft: "auto" }}>
                                                    <IconButton
                                                        onClick={() => {
                                                            handleClickOpen(user.id)
                                                        }}
                                                        aria-label="info"
                                                    >
                                                        <InfoIcon sx={{ color: orangeHeaderBg }} />
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
                                                    {user?.interests && <InterestsComponent interests={user?.interests} />}
                                                </div>

                                                <Typography variant="h6" paragraph>
                                                    About:
                                                </Typography>
                                                <Typography variant="subtitle1" paragraph>
                                                    {user?.description}                        </Typography>
                                                {/*  */}

                                                <Typography variant="h6" paragraph>
                                                    Basic Info:
                                                </Typography>
                                                <div key={user?.id}>
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
                                                    {profile?.height && profile.height.trim() !== "" && (
                                                        <Typography variant="subtitle2">
                                                            <GrayLabel variant="inherit">Height</GrayLabel>
                                                            {profile.height}
                                                        </Typography>
                                                    )}

                                                    {profile?.weight && profile.weight.trim() !== "" && (
                                                        <Typography variant="subtitle2">
                                                            <GrayLabel variant="inherit">Weight</GrayLabel>
                                                            {profile.weight}
                                                        </Typography>
                                                    )}

                                                    {profile?.eyeColor && profile.eyeColor.trim() !== "" && (
                                                        <Typography variant="subtitle2">
                                                            <GrayLabel variant="inherit">Eye Color</GrayLabel>
                                                            {profile.eyeColor}
                                                        </Typography>
                                                    )}

                                                    {profile?.hairColor && profile.hairColor.trim() !== "" && (
                                                        <Typography variant="subtitle2">
                                                            <GrayLabel variant="inherit">Hair Color</GrayLabel>
                                                            {profile.hairColor}
                                                        </Typography>
                                                    )}

                                                </div>
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
                            alt={profile?.firstName}
                            src={profile?.profileImage}
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
                            <span style={{ color: "gray" }}> Full Name :</span>
                            {profile?.firstName} {profile?.lastName},
                            <span style={{ color: "gray" }}> Age :</span> {calculateAge(profile?.birthDate)},
                            <span style={{ color: "gray" }}>Place :</span> {profile?.place}
                        </strong>
                    </Box>

                    {profile?.profession && <h6 style={{ padding: 0, margin: 0, textAlign: "center" }}>
                        {profile?.profession}
                    </h6>}

                    {profile?.education && <h6 style={{ padding: 0, margin: 0, textAlign: "center" }}>
                        {profile?.education}
                    </h6>}
                    {profile?.interests && <InterestsComponent interests={profile?.interests} />}


                    {profile?.description && <h4 style={{ padding: 0, margin: 0, textAlign: "center" }}>
                        {profile?.description}
                    </h4>}

                    <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                        {profile?.gender && <Typography variant="subtitle2">
                            <GrayLabel variant="inherit">Gender</GrayLabel>
                            {profile?.gender}
                        </Typography>}
                        {profile?.userName && <Typography variant="subtitle2">
                            <GrayLabel variant="inherit">Username</GrayLabel>
                            {profile?.userName}
                        </Typography>}
                        {profile?.birthDate && <Typography variant="subtitle2">
                            <GrayLabel variant="inherit">DOB</GrayLabel>
                            {profile?.birthDate}
                        </Typography>}
                        {profile?.height && profile.height.trim() !== "" && (
                            <Typography variant="subtitle2">
                                <GrayLabel variant="inherit">Height</GrayLabel>
                                {profile.height}
                            </Typography>
                        )}

                        {profile?.weight && profile.weight.trim() !== "" && (
                            <Typography variant="subtitle2">
                                <GrayLabel variant="inherit">Weight</GrayLabel>
                                {profile.weight}
                            </Typography>
                        )}

                        {profile?.eyeColor && profile.eyeColor.trim() !== "" && (
                            <Typography variant="subtitle2">
                                <GrayLabel variant="inherit">Eye Color</GrayLabel>
                                {profile.eyeColor}
                            </Typography>
                        )}

                        {profile?.hairColor && profile.hairColor.trim() !== "" && (
                            <Typography variant="subtitle2">
                                <GrayLabel variant="inherit">Hair Color</GrayLabel>
                                {profile.hairColor}
                            </Typography>
                        )}

                    </div>

                </DialogContent>
                <DialogActions>
                    <Button
                        variant="outlined"
                        sx={{
                            borderColor: orangeHeaderBg,
                            color: orangeHeaderBg,
                            '&:hover': {
                                backgroundColor: orangeHeaderBg,
                                color: 'white',
                                borderColor: orangeHeaderBg,
                            },
                        }}
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
