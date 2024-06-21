import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ButtonWithLoader from "../ButtonWithLoader";
import { useSelector } from "react-redux";
import { RootState } from "../store";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        www.finder.com
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

interface RegisterProps {
  showLoginPage: () => void;
  signUpSubmit: (data: {
    firstName: string;
    email: string;
    lastName: string;
    password: string;
    phone: string;
  }) => void;
}

const defaultTheme = createTheme();
const Register: React.FC<RegisterProps> = ({ showLoginPage, signUpSubmit }) => {
  const  {user,loading}= useSelector((state: RootState) => state.auth);
  const  state = useSelector((state: RootState) => state);

  const [formErrors, setFormErrors] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
  });

  const [touched, setTouched] = React.useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    phone: false,
  });

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password: string) => {
    const re =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(password);
  };

  const validateForm = (data: any) => {
    let errors = { ...formErrors };

    // Validate first name
    if (!data.firstName) {
      errors.firstName = "First name is required";
    } else {
      errors.firstName = "";
    }

    // Validate last name
    if (!data.lastName) {
      errors.lastName = "Last name is required";
    } else {
      errors.lastName = "";
    }

    // Validate email
    if (!data.email) {
      errors.email = "Email is required";
    } else if (!validateEmail(data.email)) {
      errors.email = "Invalid email address";
    } else {
      errors.email = "";
    }

    // Validate password
    if (!data.password) {
      errors.password = "Password is required";

      // else if (!validatePassword(data.password)) {
      //   errors.password =
      //     "Password must contain at least 8 characters, including uppercase, lowercase, number, and special character";
    } else {
      errors.password = "";
    }

    // Validate phone number
    if (!data.phone) {
      errors.phone = "Phone number is required";
    } else if (data.phone.length !== 10) {
      errors.phone = "Phone number must be 10 digits";
    } else {
      errors.phone = "";
    }

    return errors;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      phone: formData.get("phone") as string,
    };
    const errors = validateForm(data);
    setFormErrors(errors);
    const hasErrors = Object.values(errors).some((error) => error !== "");
    if (!hasErrors && signUpSubmit) {
      signUpSubmit({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        password: data.password,
      });
    }
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      password: true,
      phone: true,
    });
  };

  const handleBlur = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name } = event.target;
    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: true,
    }));
  };

  const handleKeyPress = (event: any) => {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>

            {/* {JSON.stringify(state)} */}

            {user?.status === "exist" ?  <small className="red-text"> {user?.message} </small>: "" }

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  error={!!formErrors.firstName && touched.firstName}
                  helperText={touched.firstName && formErrors.firstName}
                  onBlur={handleBlur}
                  InputLabelProps={{
                    sx: {
                      "& .MuiInputLabel-asterisk": {
                        color: "red",
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  error={!!formErrors.lastName && touched.lastName}
                  helperText={touched.lastName && formErrors.lastName}
                  onBlur={handleBlur}
                  InputLabelProps={{
                    sx: {
                      "& .MuiInputLabel-asterisk": {
                        color: "red",
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={!!formErrors.email && touched.email}
                  helperText={touched.email && formErrors.email}
                  onBlur={handleBlur}
                  InputLabelProps={{
                    sx: {
                      "& .MuiInputLabel-asterisk": {
                        color: "red",
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={!!formErrors.password && touched.password}
                  helperText={touched.password && formErrors.password}
                  onBlur={handleBlur}
                  InputLabelProps={{
                    sx: {
                      "& .MuiInputLabel-asterisk": {
                        color: "red",
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="phone"
                  label="Phone Number"
                  type="tel"
                  id="phone"
                  autoComplete="tel"
                  inputProps={{ maxLength: 10 }}
                  onKeyPress={handleKeyPress}
                  error={!!formErrors.phone && touched.phone}
                  helperText={touched.phone && formErrors.phone}
                  onBlur={handleBlur}
                  InputLabelProps={{
                    sx: {
                      "& .MuiInputLabel-asterisk": {
                        color: "red",
                      },
                    },
                  }}
                />
              </Grid>
            </Grid>

            <ButtonWithLoader
              loading={loading}
              fullWidth={true}
              variant="contained"
              type="submit"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </ButtonWithLoader>

            <Grid item>
              <Typography
                variant="body2"
                onClick={showLoginPage}
                sx={{
                  cursor: "pointer",
                  textDecoration: "underline",
                  color: "primary.main",
                }}
              >
                Already have an account? Sign in
              </Typography>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
};

export default Register;
