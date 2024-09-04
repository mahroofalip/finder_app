

import { useDispatch } from "react-redux";
import { AppDispatch, RootState, User } from "../store";
import React from "react";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import ProfileList from "./ProfileList";
import { intewellToFetch, orangeHeaderBg } from "../consts";
import { getBlockedProfiles, unBlockUser } from "../action/profileAction";




export default function Blocked() {
  const dispatch: AppDispatch = useDispatch();
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [openMessage, setOpenMessage] = React.useState(false);
  const { blockedUsers, loading } = useSelector((state: RootState) => state.pofile);

  const handleLike = (user: User) => {
    // dispatch(addLike({ profileId: user.id }));
    // dispatch(getIgnoredProfileForUser());

  };
  const unblockProfile = (user: User) => {
    dispatch(unBlockUser({ profileId: user.id }));
    dispatch(getBlockedProfiles());

  };

  React.useEffect(() => {
    dispatch(getBlockedProfiles());
    const intervalId = setInterval(() => {
      dispatch(getBlockedProfiles());
    }, intewellToFetch);

    return () => clearInterval(intervalId);
  }, [dispatch, intewellToFetch]);


  const handleClickOpenMessage = (user: any) => {
    setSelectedUser(user)
    setOpenMessage(true);
  };

  return (
    <>

      <Box>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            background: orangeHeaderBg,
            color: "white",
          }}
        >
          Blocked Profiles
        </div>
        <ProfileList unblcokIcon={true} ignoreIcon={false} messageIcon={false} setOpenMessage={setOpenMessage} openMessage={openMessage} list={blockedUsers} me={null} handleClickOpenMessage={handleClickOpenMessage} handleLike={handleLike} selectedUser={selectedUser} likeIcon={false}
        unblockProfile={unblockProfile} handleCancelClick={()=>console.log("no cancel")
        } />
      </Box>

    </>
  );
}