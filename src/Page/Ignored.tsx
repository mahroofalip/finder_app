import {
    Box
  } from "@mui/material";
  
  import MatchesCard from "./Mathes";
  
  export default function Ignored() {
   
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
              Ignored List
            </div>
            <MatchesCard />
          </Box>
        
      </>
    );
  }