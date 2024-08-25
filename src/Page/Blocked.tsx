import {
    Box
  } from "@mui/material";
  
  import MatchesCard from "./Mathes";
import { orangeHeaderBg } from "../consts";
  
  export default function Blocked() {
   
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
              Blocked List
            </div>
            <MatchesCard />
          </Box>
        
      </>
    );
  }