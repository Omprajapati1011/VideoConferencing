import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from '../contexts/AuthContext';
import { Snackbar } from '@mui/material';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: '#1976d2'
    },
    secondary: {
      main: '#9c27b0'
    }
  }
});

export default function Authentication() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [error, setError] = React.useState("");
  const [message, setMessage] = React.useState("");

  const [formState, setFormState] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const { handleRegister, handleLogin } = React.useContext(AuthContext);

  const handleAuth = async () => {
    try {
      if (formState === 0) {
        await handleLogin(username, password);
      } else {
        const result = await handleRegister(name, username, password);
        console.log(result);
        setMessage(result);
        setOpen(true);
        setUsername("");
        setPassword("");
        setName("");
        setError("");
        setFormState(0);
      }
    } catch (err) {
      console.log(err);
      const message = err.response?.data?.message || "Something went wrong!";
      setError(message);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Card elevation={10} sx={{ borderRadius: 4, width: '100%', p: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar sx={{ m: 1, bgcolor: 'primary.main', width: 56, height: 56 }}>
                  <LockOutlinedIcon fontSize="large" />
                </Avatar>

                <Typography component="h1" variant="h4" sx={{ mb: 2 }}>
                  {formState === 0 ? "Sign In" : "Sign Up"}
                </Typography>

                <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                  <Button
                    variant={formState === 0 ? "contained" : "outlined"}
                    onClick={() => { setFormState(0); setError(""); }}
                  >
                    Sign In
                  </Button>

                  <Button
                    variant={formState === 1 ? "contained" : "outlined"}
                    onClick={() => { setFormState(1); setError(""); }}
                  >
                    Sign Up
                  </Button>
                </Stack>

                <Box component="form" noValidate sx={{ width: '100%' }}>
                  {formState === 1 && (
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="name"
                      label="Full Name"
                      name="name"
                      value={name}
                      autoFocus
                      onChange={(e) => setName(e.target.value)}
                    />
                  )}

                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    value={username}
                    autoFocus={formState === 0}
                    onChange={(e) => setUsername(e.target.value)}
                  />

                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                  />

                  {error && (
                    <Typography sx={{ color: "red", mt: 1, textAlign: 'center' }}>
                      {error}
                    </Typography>
                  )}

                  <Button
                    type="button"
                    fullWidth
                    size="large"
                    variant="contained"
                    sx={{ mt: 3, mb: 2, py: 1.5 }}
                    onClick={handleAuth}
                  >
                    {formState === 0 ? "Login" : "Register"}
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>

      <Snackbar
        open={open}
        autoHideDuration={4000}
        message={message}
        onClose={() => setOpen(false)}
      />
    </ThemeProvider>
  );
}
