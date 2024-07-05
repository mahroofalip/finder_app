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
  }) => void;

}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();
const Login:React.FC<LoginProps> = ({ showRegisterPage,loginSubmit }) => {


  const loading = useSelector((state: RootState) => state.auth.loading);
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };
    // validateForm(data)
    // const errors = null;

    // setFormErrors(errors);
    // const hasErrors = Object.values(errors).some((error) => error !== "");
    // const hasErrors = false;
    if (loginSubmit) {
      loginSubmit({
        email:data.email,
        password: data.password,
       });
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
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
              InputLabelProps={{
                sx: {
                  '& .MuiInputLabel-asterisk': {
                    color: 'red',
                  },
                },
              }}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
              <ButtonWithLoader
              loading={loading}
              fullWidth={true}
              variant="contained"
              type="submit"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </ButtonWithLoader>
            
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
              <Typography
            variant="body2"
            onClick={showRegisterPage}
            sx={{ cursor: 'pointer', textDecoration: 'underline', color: 'primary.main' }}
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
