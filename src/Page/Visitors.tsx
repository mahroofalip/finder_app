import {
  Box
} from "@mui/material";

import MatchesCard from "./Mathes";
import { backgroundNav, orangeHeaderBg } from "../consts";

export default function Visitors() {
 
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
          <MatchesCard />
        </Box>
      
    </>
  );
}