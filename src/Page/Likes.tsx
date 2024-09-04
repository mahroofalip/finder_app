import {
  Box
} from "@mui/material";

import MatchesCard from "./Mathes";
import { intewellToFetch, orangeHeaderBg } from "../consts";
import React from "react";
import { AppDispatch, RootState, User } from "../store";
import { useDispatch } from "react-redux";
import { addLike, getLikesForUser } from "../action/likeActions";
import { useSelector } from "react-redux";
import ProfileList from "./ProfileList";

export default function Likes() {
  const dispatch: AppDispatch = useDispatch();
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [openMessage, setOpenMessage] = React.useState(false);
  const { likes, loading } = useSelector((state: RootState) => state.like);

  const handleLike = (user: User) => {
    dispatch(addLike({ profileId: user.id })).finally(()=>{
      dispatch(getLikesForUser());
    })

  };
  React.useEffect(() => {
    dispatch(getLikesForUser());
    const intervalId = setInterval(() => {
      dispatch(getLikesForUser());
    }, intewellToFetch);

    return () => clearInterval(intervalId);
  }, [dispatch, intewellToFetch]);


  const handleClickOpenMessage = (user: any) => {
    console.log(user, "handleClickOpenMessage");
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
          Likes For You
        </div>
        <ProfileList setOpenMessage={setOpenMessage} ignoreIcon={true} openMessage={openMessage} list={likes} me={null} handleClickOpenMessage={handleClickOpenMessage} handleLike={handleLike} selectedUser={selectedUser}
          handleCancelClick={function (user: User): void {
            throw new Error("Function not implemented.");
          }} likeIcon={true} unblockProfile={function (user: User): void {
            throw new Error("Function not implemented.");
          }} messageIcon={true} unblcokIcon={false} />
      </Box>

    </>
  );
}