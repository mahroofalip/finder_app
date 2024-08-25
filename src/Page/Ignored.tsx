import {
    Box
  } from "@mui/material";
  
  import MatchesCard from "./Mathes";
import { orangeHeaderBg } from "../consts";
  
  export default function Ignored() {
   
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
              Ignored List
            </div>
            <MatchesCard />
          </Box>
        
      </>
    );
  }