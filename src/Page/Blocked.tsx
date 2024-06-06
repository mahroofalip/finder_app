import {
    Box
  } from "@mui/material";
  
  import MatchesCard from "./Mathes";
  
  export default function Blocked() {
   
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
              Blocked List
            </div>
            <MatchesCard />
          </Box>
        
      </>
    );
  }