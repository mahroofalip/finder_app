
import {
  Box
} from "@mui/material";
import { intewellToFetch, orangeHeaderBg } from "../consts";
import React from "react";
import { AppDispatch, RootState, User } from "../store";
import { useDispatch } from "react-redux";
import { addLike } from "../action/likeActions";
import { useSelector } from "react-redux";
import ProfileList from "./ProfileList";
import { getVisitors } from "../action/visitorActions";

export default function Visitors() {
  const dispatch: AppDispatch = useDispatch();
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [openMessage, setOpenMessage] = React.useState(false);
  const { visitors } = useSelector((state: RootState) => state.visitor);

  const handleLike = (user: User) => {
    dispatch(addLike({ profileId: user.id })).finally(()=>{
      dispatch(getVisitors());
    })

  };
  React.useEffect(() => {
    dispatch(getVisitors());
    const intervalId = setInterval(() => {
      dispatch(getVisitors());
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
          Visitors For You
        </div>
        <ProfileList setOpenMessage={setOpenMessage}
          ignoreIcon={false} openMessage={openMessage}
          list={visitors} me={null}
          handleClickOpenMessage={handleClickOpenMessage}
          handleLike={handleLike}
          selectedUser={selectedUser}
          handleCancelClick={function (user: User): void {
            throw new Error("Function not implemented.");
          }} likeIcon={true} unblockProfile={function (user: User): void {
            throw new Error("Function not implemented.");
          }} messageIcon={true} unblcokIcon={false} />
      </Box>

    </>
  );
}