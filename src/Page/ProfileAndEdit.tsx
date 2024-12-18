import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import imageCompression from 'browser-image-compression';
import { Grid, TextField, Button, MenuItem, Paper, Avatar, IconButton, Typography, Autocomplete, Chip } from '@mui/material';
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
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error'; // Import error icon
import AlertComponent from '../components/Alerts/AlertComponent';
import { loadIntrestsOptions } from '../action/intrestsOptionsAction';
import { orangeHeaderBg } from '../consts';


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
  profileExt: string;
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
  interests: string[];
  lookingFor: string[];
  place: string
  profileImageKey: string
}



const ProfileForm: React.FC = () => {
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error'>('success');
  const [alertIcon, setAlertIcon] = useState<React.ReactNode>(<CheckIcon fontSize="inherit" />);
  const [errors, setErrors] = useState<Partial<Record<keyof Profile, string>>>({});
  const { genderOptions } = useSelector((state: RootState) => state.genderOption);
  const { educationOptions } = useSelector((state: RootState) => state.educationOption);
  const { professionOptions } = useSelector((state: RootState) => state.professionOption);
  const { eyeColorOptions } = useSelector((state: RootState) => state.eyeColorOption);
  const { intrestsOptions } = useSelector((state: RootState) => state.intrestOption);
  const { hairColorOptions } = useSelector((state: RootState) => state.hairColorOption);
  const { user: authUser } = useSelector((state: RootState) => state.auth);


  const [profile, setProfile] = useState<Profile>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    profileImage: '',
    dob: '19/04/1998',
    height: '55',
    weight: '44',
    eyeColor: 'Blue',
    hairColor: 'Blue',
    education: 'Bsc',
    gender: 'Female',
    profession: 'Artist',
    displayName: 'Deep',
    description: 'Hi im Deepika',
    place: 'Mumbai',
    interests: [],
    lookingFor: [],
    profileExt: '',
    profileImageKey: ''
  });
  useEffect(() => {
    if (authUser) {
      setProfile({
        firstName: authUser.firstName || '',
        lastName: authUser.lastName || '',
        email: authUser.email || '',
        phone: authUser.phone || '',
        profileImage: authUser.profileImage || '',
        dob: authUser.birthDate || '',
        height: authUser.height || '',
        weight: authUser.weight || '',
        eyeColor: authUser.eyeColor || '',
        hairColor: authUser.hairColor || '',
        education: authUser.education || '',
        gender: authUser.gender || '',
        profession: authUser.profession || '',
        displayName: authUser.displayName || '',
        description: authUser.description || '',
        place: authUser.place || '',
        profileExt: '',
        interests: authUser?.interests
          ? authUser.interests.split(',').map((interest: string) => interest.trim()) : [],
        profileImageKey: authUser.profileImageKey || "",
        lookingFor: authUser?.lookingFor
          ? authUser.lookingFor.split(',').map((gender: string) => gender.trim()) : [],
      });
    }
  }, [authUser]);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(loadGenderOptions());
    dispatch(loadIntrestsOptions());
    dispatch(loadEducationOptions());
    dispatch(loadProfessionOptions());
    dispatch(loadEyeColorOptions());
    dispatch(loadhairColorOptions());
    dispatch(getMe());
  }, [dispatch]);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const options = {
          maxSizeMB: 1, // Limit the image size to 1MB
          maxWidthOrHeight: 800, // Resize the image to a max dimension
          useWebWorker: true,
        };

        const compressedFile = await imageCompression(file, options);

        const reader = new FileReader();
        reader.onload = () => {
          const fileExtension = compressedFile.name.split('.').pop();
          setProfile((prevProfile) => ({
            ...prevProfile,
            profileImage: reader.result as string,
            profileExt: fileExtension || ''
          }));
        };

        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.error('Error compressing the image:', error);
      }
    }
  };

  const handleSearchAndChangeOptions = (
    e: React.ChangeEvent<HTMLTextAreaElement> | { target: { name: string; value: string[] | string } }
  ) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
    validate();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // if (validate()) {
    try {


      await dispatch(updateUserProfile(profile));
      // Show success alert
      const token = localStorage.getItem("token");


      setAlertMessage('Your profile has been updated successfully!');
      setAlertSeverity('success');
      dispatch(getMe());
      setAlertIcon(<CheckIcon fontSize="inherit" />);


    } catch (error) {
      // Show error alert
      setAlertMessage('There was an error updating your profile.');
      setAlertSeverity('error');
      setAlertIcon(<ErrorIcon fontSize="inherit" />);
    }
    // }
  };

  useEffect(() => {

    const timer = setTimeout(() => {
      setAlertMessage(null);
    }, 5000);
    return () => clearTimeout(timer);
  }, [alertMessage]);

  return (
    <Paper elevation={3} style={{ padding: '16px', }}>
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
                <EditIcon sx={{ color: orangeHeaderBg }} />
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
            <label >Username</label>
            <TextField
              placeholder="Username"
              name="username"
              size="small"
              id="username"
              value={authUser?.userName || ''}
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
              value={authUser?.email || ''}
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
          <Grid item xs={12} md={6}>
            <label>Looking For</label>

            <Autocomplete
              multiple
              id="tags-filled"
              options={genderOptions.map((option) => option.gender)}
              value={profile.lookingFor}
              defaultValue={profile.lookingFor || []}
              size='small'
              onChange={(event, newValue) => {
                handleSearchAndChangeOptions({ target: { name: 'lookingFor', value: newValue } });
              }}
              renderTags={(value: readonly string[], getTagProps) =>
                value.map((option: string, index: number) => {
                  const { key, ...tagProps } = getTagProps({ index });
                  return (
                    <Chip variant="outlined" label={option} key={key} {...tagProps} />
                  );
                })
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  placeholder="Select your lookingFor"
                  name="lookingFor"
                />
              )}
            />


          </Grid>
          <Grid item xs={12} md={6}>
            <label>Interests</label>
            <Autocomplete
              multiple
              id="tags-filled"
              size='small'
              options={intrestsOptions.map((option) => option.intrest)}
              value={profile.interests} // Controlled value for editing form
              defaultValue={profile.interests || []} // Default value for edit form
              freeSolo
              onChange={(event, newValue) => {
                // Update the state when the user selects or removes an option
                handleSearchAndChangeOptions({ target: { name: 'interests', value: newValue } });
              }}
              renderTags={(value: readonly string[], getTagProps) =>
                value.map((option: string, index: number) => {
                  const { key, ...tagProps } = getTagProps({ index });
                  return (
                    <Chip variant="outlined" label={option} key={key} {...tagProps} />
                  );
                })
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"

                  placeholder="Select your interests"
                  name="interests"
                />
              )}
            />


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
              maxLength={1995}
            />
            {errors.description && (
              <Typography color="error" variant="body2">
                {errors.description}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            {alertMessage && (
              <AlertComponent
                message={alertMessage}
                severity={alertSeverity}
                icon={alertIcon}
              />
            )}

            <Button
              sx={{
                mt: 2,
                backgroundColor: orangeHeaderBg, // Background color
                color: 'white', // Text color
                borderColor: orangeHeaderBg, // Border color (if needed, though contained buttons usually don't show borders)
                '&:hover': {
                  backgroundColor: 'darkorange', // Background color on hover
                  color: 'white', // Text color on hover
                },
              }}
              type="submit"
              fullWidth
              variant="contained"
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default ProfileForm;
