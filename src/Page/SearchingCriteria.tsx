import React, { useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import Slider from "@mui/material/Slider";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SearchIcon from "@mui/icons-material/Search";
import useMediaQuery from "@mui/material/useMediaQuery";
import MatchesCard from "./Mathes";
import { orangeHeaderBg } from "../consts";

function valuetext(value: any) {
  return `${value}°C`;
}

export default function SearchingCriteria() {
  const [value, setValue] = useState([20, 37]);
  const [gender, setGender] = React.useState("");
  const matches = useMediaQuery("(max-width:600px)");
  const [searched, setSearch] = React.useState(false);
  const onSearch = () => {
    setSearch(!searched);
  };
  const handleGender = (event: any) => {
    setGender(event.target.value);
  };
  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  return (
    <>
      {!searched ? (
        <Box sx={{ border: 3, borderColor: orangeHeaderBg }}>
          <div
              style={{
                display: "flex",
                justifyContent: "center",
                background: orangeHeaderBg,
                color: "white",
              }}
            >
              Search Criteria
            </div>
         
          <Grid
            sx={{ p: 2 }}
            container
            rowSpacing={5}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item sm={12} xs={12} lg={6}>
              <Typography >
                {/* align="end" */}
                {value[0]} - {value[1]}{" "}
              </Typography>
              <Slider
                getAriaLabel={() => "Age"}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                max={50}
                min={18}
                sx={{
                  color: orangeHeaderBg,
                  '& .MuiSlider-thumb': {
                    borderColor: orangeHeaderBg,
                  },
                  '& .MuiSlider-track': {
                    backgroundColor: orangeHeaderBg,
                  },
                  '& .MuiSlider-rail': {
                    backgroundColor: '#ffd580',
                  }
                }}
              />
            </Grid>
            <Grid item sm={12} xs={12} lg={6}>
              <Autocomplete
                multiple
                id="tags-outlined"
                options={top100Films}
                getOptionLabel={(option) => option.title}
                defaultValue={[top100Films[1]]}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Location"
                    placeholder="Favorites"
                  />
                )}
              />
            </Grid>
            <Grid item sm={12} xs={12} lg={6}>
              <FormControl fullWidth >
                <InputLabel id="demo-select-small-label">Gender</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={gender}
                  label="Gender"
                  fullWidth
                  onChange={handleGender}
                >
                  <MenuItem value={"Male"}>Male</MenuItem>
                  <MenuItem value={"Female"}>Female</MenuItem>
                  <MenuItem value={"Transgender"}>Transgender</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item sm={12} xs={12} lg={6}>
              <FormControlLabel
                control={
                  <Switch
                    defaultChecked
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: orangeHeaderBg, // Thumb color when checked
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: orangeHeaderBg, // Track color when checked
                      },
                    }}
                  />
                }
                label="Show profiles with photos only"
              />

            </Grid>
            <Grid item sm={12} xs={12} lg={12}>
              <div style={{ display: "flex", justifyContent: "end" }}>
                <Button
                  onClick={onSearch}
                  fullWidth={matches ? true : false}
                  variant="outlined"
                  startIcon={<SearchIcon />}
                  sx={{
                    color: orangeHeaderBg, // Text color
                    borderColor: orangeHeaderBg, // Border color
                    '&:hover': {
                      borderColor: 'darkorange', // Border color on hover
                      color: 'darkorange', // Text color on hover
                    },
                  }}
                >
                  Search
                </Button>
              </div>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Box>
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              padding: 0,
              margin: 0,
              paddingBottom: 10,
            }}
          >
            <Button
              onClick={onSearch}
              fullWidth={matches ? true : false}
              variant="outlined"
              sx={{
                color: orangeHeaderBg, // Text color
                borderColor: orangeHeaderBg, // Border color
                '&:hover': {
                  borderColor: 'darkorange', // Border color on hover
                  color: 'darkorange', // Text color on hover
                },
              }}
              startIcon={<SearchIcon />}
            >
              Update Search Criteria
            </Button>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              background: orangeHeaderBg,
              color: "white",
            }}
          >
            Search Results
          </div>
          <MatchesCard />
        </Box>
      )}
    </>
  );
}

const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 }
];
