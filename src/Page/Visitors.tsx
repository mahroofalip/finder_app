import {
  Box
} from "@mui/material";

import MatchesCard from "./Mathes";
import { backgroundNav } from "../consts";

export default function Visitors() {
 
  return (
    <>
        <Box>
          <div
            style={{
              display: "flex",
              background: backgroundNav,
              color: "orange",
            }}
          >
            Visitors For You
          </div>
          <MatchesCard />
        </Box>
      
    </>
  );
}