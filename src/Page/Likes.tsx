import {
    Box
  } from "@mui/material";
  
  import MatchesCard from "./Mathes";
import { intewellToFetch, orangeHeaderBg } from "../consts";
import React from "react";
import { AppDispatch, RootState, User } from "../store";
import { useDispatch } from "react-redux";
import { getLikesForUser } from "../action/likeActions";
import { useSelector } from "react-redux";
import ProfileList from "./ProfileList";
  
  export default function Likes() {
    const dispatch: AppDispatch = useDispatch();
    const {likes,loading} = useSelector((state: RootState) => state.like);

    React.useEffect(() => {
      dispatch(getLikesForUser());
      const intervalId = setInterval(() => {
        dispatch(getLikesForUser());
      }, intewellToFetch);
  
      return () => clearInterval(intervalId);
    }, [dispatch, intewellToFetch]);
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
            <ProfileList list={likes} me={null} handleClickOpenMessage={function (user: User): void {
            throw new Error("Function not implemented.");
          } } handleLike={function (user: User): void {
            throw new Error("Function not implemented.");
          } } handleCancelClick={function (user: User): void {
            throw new Error("Function not implemented.");
          } } like={false}            />
          </Box>
        
      </>
    );
  }