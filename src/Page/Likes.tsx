import {
    Box
  } from "@mui/material";
  
  import MatchesCard from "./Mathes";
  
  export default function Likes() {
   
    return (
      <>
       
          <Box>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                background: "green",
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