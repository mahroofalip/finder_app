import {
  Box
} from "@mui/material";

import MatchesCard from "./Mathes";

export default function Visitors() {
 
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
            Visitors For You
          </div>
          <MatchesCard />
        </Box>
      
    </>
  );
}