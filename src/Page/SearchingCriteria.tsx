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
import { useSelector } from "react-redux";
import { RootState, SearchFields } from "../store";
import GooglePlacesAutocomplete from "../components/AutoComplete/GoogleLocation";

function valuetext(value: any) {
  return `${value}°C`;
}

export default function SearchingCriteria() {
  const [value, setValue] = useState([20, 37]);
  const [gender, setGender] = React.useState("");
  const [errors, setErrors] = useState<Partial<Record<keyof SearchFields, string>>>({});
  const [searchFields, setSearchFields] = useState<SearchFields>({
    age: null,
    gender: "",
    location: '',
    name: "",
    eycolor:"",
    height:null,
    weight:null,
    
  });
  const { genderOptions } = useSelector((state: RootState) => state.genderOption);
  const matches = useMediaQuery("(max-width:600px)");
  const [searched, setSearch] = React.useState(false);
  const onSearch = () => {
    setSearch(!searched);
  };
  const handleGender = (event: any) => {
    setGender(event.target.value);
  };

  const handlePlaceSelect = (place: any | null) => {
    setSearchFields((prevSerchFields) => ({ ...prevSerchFields, place }));
    // setErrors((prevErrors) => ({ ...prevErrors, place: '' })); // Clear the place error
    // validate()
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSearchFields((prevSearchFields) => ({ ...prevSearchFields, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' })); // Clear the error for the changed field
    validate()
  };
  const validate = () => {

    let tempErrors: Partial<Record<keyof SearchFields, string>> = {};

  
  };
const handleSliderChange = (event: Event, newValue: number | number[]) => {
  setValue(newValue as number[]);
  setSearchFields((prevSearchFields) => ({
    ...prevSearchFields,
    age: newValue as number[], 
  }));
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
              <FormControl fullWidth >
                <label>Gender</label>
                <TextField
                  select
                  name="gender"
                  size="small"
                  id="gender"
                  value={searchFields.gender}
                  onChange={handleChange}
                  fullWidth
                >
                  {genderOptions.map((option: any) => (
                    <MenuItem key={option.id} value={option.gender}>
                      {option.gender}
                    </MenuItem>
                  ))}
                </TextField>
                {errors.gender && (
                  <Typography color="error" variant="body2">
                    {errors.gender}
                  </Typography>
                )}
              </FormControl>

            </Grid>
            <Grid item sm={12} xs={12} lg={6}>
            <label>Location</label>
              <GooglePlacesAutocomplete initialValue={searchFields.location}
                onSelect={handlePlaceSelect} />
            </Grid>
            <Grid item sm={12} xs={12} lg={6}>
            <label>Location</label>
              <GooglePlacesAutocomplete initialValue={searchFields.location}
                onSelect={handlePlaceSelect} />
            </Grid>
            <Grid item sm={12} xs={12} lg={6}>
            <label>Location</label>
              <GooglePlacesAutocomplete initialValue={searchFields.location}
                onSelect={handlePlaceSelect} />
            </Grid>
            <Grid item sm={12} xs={12} lg={6}>
              <Typography >
                {/* align="end" */}
                <label>Age</label> {value[0]} - {value[1]}{" "}
              </Typography>
              <Slider
                getAriaLabel={() => "Age"}
                value={value}
                onChange={handleSliderChange} // Use the correct handler for Slider
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
          {/* <MatchesCard /> */}
        </Box>
      )}
    </>
  );
}

const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 }
];
