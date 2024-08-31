import { useDispatch } from "react-redux";
import { AppDispatch, RootState, User } from "../store";
import React from "react";
import { useSelector } from "react-redux";
import { getIgnoredProfileForUser, ignoreUser } from "../action/ignoreAction";
import { intewellToFetch, orangeHeaderBg } from "../consts";
import { Box } from "@mui/material";
import ProfileList from "./ProfileList";

  

  export default function Ignored() {
    const dispatch: AppDispatch = useDispatch();
    const [selectedUser, setSelectedUser] = React.useState(null);
    const [openMessage, setOpenMessage] = React.useState(false);
    const { ignoredUsers, loading } = useSelector((state: RootState) => state.ignore);
  
    const handleIgnore = (user: User) => {
      dispatch(ignoreUser({ profileId: user.id }));
    };
    React.useEffect(() => {
      dispatch(getIgnoredProfileForUser());
      const intervalId = setInterval(() => {
        dispatch(getIgnoredProfileForUser());
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
            Skipped Profiles
          </div>
          <ProfileList setOpenMessage={setOpenMessage} openMessage={openMessage} list={ignoredUsers} me={null} handleClickOpenMessage={handleClickOpenMessage} handleFn={handleIgnore} selectedUser={selectedUser}
            handleCancelClick={function (user: User): void {
              throw new Error("Function not implemented.");
            }} like={false} />
        </Box>
  
      </>
    );
  }