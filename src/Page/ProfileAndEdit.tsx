import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, TextField, Button, MenuItem, Paper, Avatar, IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { AppDispatch, RootState } from '../store';
import { loadGenderOptions } from '../action/genderOptionsAction';
import { loadEducationOptions } from '../action/educationOptionsAction';
import { loadProfessionOptions } from '../action/professionOptionsAction';
import { loadEyeColorOptions } from '../action/eyeColorAction';
import { loadhairColorOptions } from '../action/hairColorAction';
import GooglePlacesAutocomplete from '../components/AutoComplete/GoogleLocation';
import { TextareaAutosize as BaseTextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import { updateUserProfile } from '../action/profileAction';
import { getMe } from '../action/authActions';

const blue = {
  100: '#DAECFF',
  200: '#b6daff',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Textarea = styled(BaseTextareaAutosize)(
  ({ theme }) => `
  box-sizing: border-box;
  width: 100%;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 12px;
  border-radius: 8px;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 2px ${theme.palette.mode === 'dark' ? grey[900] : grey[50]};

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`,
);

interface Profile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  profileImage: string;
  dob: string;
  height: string;
  weight: string;
  eyeColor: string;
  hairColor: string;
  education: string;
  gender: string;
  profession: string;
  displayName: string;
  description: string;
  place: string
  // place: PlaceType | null;
}

// interface PlaceType {
//   description: string| null;
//   place_id: string| null;
// }

const ProfileForm: React.FC = () => {

  const [errors, setErrors] = useState<Partial<Record<keyof Profile, string>>>({});
  const { user } = useSelector((state: RootState) => state.auth);
  const { genderOptions } = useSelector((state: RootState) => state.genderOption);
  const { educationOptions } = useSelector((state: RootState) => state.educationOption);
  const { professionOptions } = useSelector((state: RootState) => state.professionOption);
  const { eyeColorOptions } = useSelector((state: RootState) => state.eyeColorOption);
  const { hairColorOptions } = useSelector((state: RootState) => state.hairColorOption);

  const [profile, setProfile] = useState<Profile>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    profileImage: '',
    dob: '',
    height: '',
    weight: '',
    eyeColor: '',
    hairColor: '',
    education: '',
    gender: '',
    profession: '',
    displayName: '',
    description: '',
    place: '',
  });
  useEffect(() => {
    if (user) {
      setProfile({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        profileImage: user.profileImage || '',
        dob: user.birthDate || '',
        height: user.height || '',
        weight: user.weight || '',
        eyeColor: user.eyeColor || '',
        hairColor: user.hairColor || '',
        education: user.education || '',
        gender: user.gender || '',
        profession: user.profession || '',
        displayName: user.displayName || '',
        description: user.description || '',
        place: user.place || '',
        // place:{ 
        //   description:user.place,
        //   place_id: null },

      });
    }
  }, [user]);



  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(loadGenderOptions());
    dispatch(loadEducationOptions());
    dispatch(loadProfessionOptions());
    dispatch(loadEyeColorOptions());
    dispatch(loadhairColorOptions());
    dispatch(getMe());
    // console.log(genderOptions, "genderOptions");
    // console.log(educationOptions, "educationOptions");
    // console.log(professionOptions, "professionOptions");
    // console.log(eyeColorOptions, "eyeColorOptions");
    // console.log(hairColorOptions, "hairColorOptions");
  }, [dispatch]);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfile((prevProfile) => ({ ...prevProfile, profileImage: reader.result as string }));
        setErrors((prevErrors) => ({ ...prevErrors, profileImage: '' })); // Clear the avatar error
        validate()
      };

      reader.readAsDataURL(file);
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, description: value }));
    setErrors((prevErrors) => ({ ...prevErrors, description: '' })); // Clear the description error
    validate()
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' })); // Clear the error for the changed field
    validate()
  };

  const handlePlaceSelect = (place: any | null) => {
    setProfile((prevProfile) => ({ ...prevProfile, place }));
    setErrors((prevErrors) => ({ ...prevErrors, place: '' })); // Clear the place error
    validate()

  };

  const validate = () => {

    let tempErrors: Partial<Record<keyof Profile, string>> = {};

    if (!profile.firstName.match(/^[a-zA-Z]+$/)) {
      tempErrors.firstName = 'First Name is required and should contain only alphabets.';
    }

    if (!profile.lastName.match(/^[a-zA-Z]+$/)) {
      tempErrors.lastName = 'Last Name is required and should contain only alphabets.';
    }

    if (!profile.profileImage) {
      tempErrors.profileImage = 'Profile is required.';
    } else {
      tempErrors.profileImage = ''
    }

    if (!profile.dob) {
      tempErrors.dob = 'Date of Birth is required.';
    } else {
      tempErrors.dob = ''
    }

    if (!profile.education) {
      tempErrors.education = 'Education is required.';
    } else {
      tempErrors.education = ''
    }

    if (!profile.gender) {
      tempErrors.gender = 'Gender is required.';
    } else {
      tempErrors.gender = ''
    }

    if (!profile.profession) {
      tempErrors.profession = 'Profession is required.';
    } else {
      tempErrors.profession = ''
    }

    if (!profile.displayName) {
      tempErrors.displayName = 'Display Name is required.';
    } else {
      tempErrors.displayName = ''
    }

    if (!profile.description.trim()) {
      tempErrors.description = 'Description is required.';
    } else {
      tempErrors.description = ''
    }

    if (!profile.place) {
      tempErrors.place = 'Place is required.';
    } else {
      tempErrors.place = ''
    }

    Object.keys(tempErrors).forEach(key => {
      if (tempErrors[key as keyof Profile] === '') {
        delete tempErrors[key as keyof Profile];
      }
    });

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(validate(), "tempErrors validate()");

    if (validate()) {
      dispatch(updateUserProfile(profile));
      console.log('tempErrors Profile submitted:', profile);
    }
  };

  return (
    <Paper elevation={3} style={{ padding: '16px' }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <div style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
              <Avatar
                sx={{ width: 150, height: 150, cursor: 'pointer' }}
                alt="Profile Avatar"
                src={profile.profileImage}
                onClick={handleAvatarClick}
              />
              <IconButton
                color="primary"
                aria-label="edit profile"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                }}
                onClick={handleAvatarClick}
              >
                <EditIcon />
              </IconButton>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleAvatarChange}
              />
              {errors.profileImage && (
                <Typography color="error" variant="body2">
                  {errors.profileImage}
                </Typography>
              )}
            </div>
          </Grid>

          <Grid item xs={12} md={6}>
            <label>Username</label>
            <TextField
              placeholder="Username"
              name="username"
              size="small"
              id="username"
              value={user?.userName || ''}
              InputProps={{
                readOnly: true,
                sx: {
                  backgroundColor: 'rgba(0, 0, 0, 0.1)', 
                  '& .MuiInputBase-input': {
                    color: 'rgba(0, 0, 0, 0.5)', 
                  },
                },
              }}
              InputLabelProps={{
                sx: {
                  color: 'rgba(0, 0, 0, 0.5)', // Label color
                },
              }}
              fullWidth
              disabled 
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <label>Email</label>
            <TextField
              placeholder="Email"
              name="email"
              size="small"
              id="email"
              value={user?.email || ''}
              InputProps={{
                readOnly: true,
                sx: {
                  backgroundColor: 'rgba(0, 0, 0, 0.1)', 
                  '& .MuiInputBase-input': {
                    color: 'rgba(0, 0, 0, 0.5)', 
                  },
                },
              }}
              InputLabelProps={{
                sx: {
                  color: 'rgba(0, 0, 0, 0.5)', // Label color
                },
              }}
              fullWidth
              disabled 
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <label>First Name</label>
            <TextField
              placeholder="First Name"
              name="firstName"
              size="small"
              id="firstName"
              value={profile.firstName}
              onChange={handleChange}
              fullWidth
            />
            {errors.firstName && (
              <Typography color="error" variant="body2">
                {errors.firstName}
              </Typography>
            )}
          </Grid>

          <Grid item xs={12} md={6}>
            <label>Last Name</label>
            <TextField
              placeholder="Last Name"
              name="lastName"
              size="small"
              id="lastName"
              value={profile.lastName}
              onChange={handleChange}
              fullWidth
            />
            {errors.lastName && (
              <Typography color="error" variant="body2">
                {errors.lastName}
              </Typography>
            )}
          </Grid>

          <Grid item xs={12} md={6}>
            <label>Date of Birth</label>
            <TextField
              type="date"
              name="dob"
              size="small"
              id="dob"
              value={profile.dob}
              onChange={handleChange}
              fullWidth
            />
            {errors.dob && (
              <Typography color="error" variant="body2">
                {errors.dob}
              </Typography>
            )}
          </Grid>

          <Grid item xs={12} md={6}>
            <label>Height</label>
            <TextField
              placeholder="Height"
              name="height"
              type='number'
              size="small"
              id="height"
              value={profile.height}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <label>Weight</label>
            <TextField
              placeholder="Weight"
              name="weight"
              size="small"
              id="weight"
              type='number'
              value={profile.weight}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <label>Eye Color</label>
            <TextField
              select
              name="eyeColor"
              size="small"
              id="eyeColor"
              value={profile.eyeColor}
              onChange={handleChange}
              fullWidth
            >
              {eyeColorOptions.map((option: any) => (
                <MenuItem key={option} value={option.eyeColor}>
                  {option.eyeColor}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} md={6}>
            <label>Hair Color</label>
            <TextField
              select
              name="hairColor"
              size="small"
              id="hairColor"
              value={profile.hairColor}
              onChange={handleChange}
              fullWidth
            >
              {hairColorOptions.map((option: any) => (
                <MenuItem key={option.id} value={option.hairColor}>
                  {option.hairColor}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} md={6}>
            <label>Education</label>
            <TextField
              select
              name="education"
              size="small"
              id="education"
              value={profile.education}
              onChange={handleChange}
              fullWidth
            >
              {educationOptions.map((option: any) => (
                <MenuItem key={option.id} value={option.education}>
                  {option.education}
                </MenuItem>
              ))}
            </TextField>
            {errors.education && (
              <Typography color="error" variant="body2">
                {errors.education}
              </Typography>
            )}
          </Grid>

          <Grid item xs={12} md={6}>
            <label>Gender</label>
            <TextField
              select
              name="gender"
              size="small"
              id="gender"
              value={profile.gender}
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
          </Grid>

          <Grid item xs={12} md={6}>
            <label>Profession</label>
            <TextField
              select
              name="profession"
              size="small"
              id="profession"
              value={profile.profession}
              onChange={handleChange}
              fullWidth
            >
              {professionOptions.map((option: any) => (
                <MenuItem key={option.id} value={option.profession}>
                  {option.profession}
                </MenuItem>
              ))}
            </TextField>
            {errors.profession && (
              <Typography color="error" variant="body2">
                {errors.profession}
              </Typography>
            )}
          </Grid>

          <Grid item xs={12} md={6}>
            <label>Display Name</label>
            <TextField
              placeholder="Display Name"
              name="displayName"
              size="small"
              id="displayName"
              value={profile.displayName}
              onChange={handleChange}
              fullWidth
            />
            {errors.displayName && (
              <Typography color="error" variant="body2">
                {errors.displayName}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <label>Place</label>
            <GooglePlacesAutocomplete initialValue={profile.place}
              onSelect={handlePlaceSelect} />
            {errors.place && (
              <Typography color="error" variant="body2">
                {errors.place}
              </Typography>
            )}
          </Grid>

          <Grid item xs={12}>
            <label>Description</label>
            <Textarea
              minRows={3}
              placeholder="Write a brief description about yourself..."
              name="description"
              id="description"
              value={profile.description}
              onChange={handleTextareaChange}
            />
            {errors.description && (
              <Typography color="error" variant="body2">
                {errors.description}
              </Typography>
            )}
          </Grid>



          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default ProfileForm;
