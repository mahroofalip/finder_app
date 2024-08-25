import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ButtonWithLoader from '../ButtonWithLoader';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { orangeHeaderBg } from '../consts';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        www.finder.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

interface LoginProps {
  showRegisterPage: () => void;
  loginSubmit: (data: {
    email: string;
    password: string;
    rememberMe: boolean;
  }) => void;
}

const defaultTheme = createTheme();

const Login: React.FC<LoginProps> = ({ showRegisterPage, loginSubmit }) => {
  const auth = useSelector((state: RootState) => state.auth);
  const [isSubmit, setIsSubmit] = React.useState(false);
  const [errors, setErrors] = React.useState({
    email: '',
    password: '',
  });

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const rememberMe = formData.get("remember") ? true : false;

    let formErrors = { email: '', password: '' };

    if (!email) {
      formErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      formErrors.email = 'Invalid email address';
    }

    if (!password) {
      formErrors.password = 'Password is required';
    }

    setErrors(formErrors);

    if (!formErrors.email && !formErrors.password) {
      setIsSubmit(true);
      loginSubmit({ email, password, rememberMe });
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: orangeHeaderBg}}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          {/* Conditionally Render Error Message */}
          {auth.error && isSubmit && (
            <Typography color="error" sx={{ mt: 2 }}>
              Authentication failed. Please check your email and password.
            </Typography>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={Boolean(errors.email)}
              helperText={errors.email}
              InputLabelProps={{
                sx: {
                  '& .MuiInputLabel-asterisk': {
                    color: 'red',
                  },
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={Boolean(errors.password)}
              helperText={errors.password}
              InputLabelProps={{
                sx: {
                  '& .MuiInputLabel-asterisk': {
                    color: 'red',
                  },
                },
              }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" sx={{
                color: orangeHeaderBg,
                '&.Mui-checked': {
                  color: orangeHeaderBg,
                },
              }}/>}
              label="Remember me"
              name="remember"
            />
            <ButtonWithLoader
              loading={auth.loading}
              fullWidth={true}
              variant="contained"
              type="submit"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: orangeHeaderBg,
                color: 'white',
                borderColor: orangeHeaderBg,
                '&:hover': {
                  backgroundColor: 'darkorange',
                  borderColor: 'darkorange',
                  color: 'white',
                },
              }}
            >
              Sign In
            </ButtonWithLoader>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" sx={{
                  color: orangeHeaderBg,
                  textDecoration: 'underline',
                  '&:hover': {
                    color: orangeHeaderBg,
                    textDecorationColor: orangeHeaderBg,
                  }
                }}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Typography
                  variant="body2"
                  onClick={showRegisterPage}
                  sx={{
                    color: orangeHeaderBg,
                    textDecoration: 'underline',
                    '&:hover': {
                      color: orangeHeaderBg,
                      textDecorationColor: orangeHeaderBg,
                    }
                  }}
                >
                  Don't have an account? Sign Up
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};

export default Login;
