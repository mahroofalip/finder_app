import {
    Box
  } from "@mui/material";
  
  import MatchesCard from "./Mathes";
import { orangeHeaderBg } from "../consts";
  
  export default function Likes() {
   
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
            <MatchesCard />
          </Box>
        
      </>
    );
  }