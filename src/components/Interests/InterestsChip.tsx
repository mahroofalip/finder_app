import React from "react";
import Chip from "@mui/material/Chip";

interface InterestsComponentProps {
  interests: string;
}

const InterestsComponent: React.FC<InterestsComponentProps> = ({ interests }) => {
  // Split the interests string into an array
  const interestsArray = interests ? interests.split(",") : [];

  return (
    <div
      style={{
        padding: 10,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 8,
        marginBottom: "10px",
      }}
    >
      {interestsArray.map((interest, index) => (
        <Chip key={index} label={interest.trim()} size="small" variant="outlined" />
      ))}
    </div>
  );
};

export default InterestsComponent;
