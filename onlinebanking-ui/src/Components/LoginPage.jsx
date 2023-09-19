import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ErrorPage from "./ErrorPage";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="/login">
        Team 6 Batch 3
      </Link>{" "}
      {/* {new Date().getFullYear()}
            {"."} */}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function LoginPage() {
  const navigate = useNavigate();

  const [success, setSuccess] = useState(true);
  const handleSubmit = (event) => {
    event.preventDefault();

    const loginBackendUrl = "http://localhost:8080/login";
    const data = new FormData(event.currentTarget);

    const loginData = {
      userId: data.get("userid"),
      pswd: data.get("password"),
    };
    console.log(loginData);

    axios.post(loginBackendUrl, loginData).then((response) => {
      console.log(response);
      if (response.data === true) {
        navigate("/");
        sessionStorage.setItem("userId", data.get("userid"));
      } else {
        // navigate("/error");
        setSuccess(false);
      }
    });
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
            Sign in
          </Typography>
          {!success && <ErrorPage />}
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="userid"
              label="User Id"
              name="userid"
              autoComplete="userid"
              autoFocus
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
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{ backgroundColor: "#D41C2C" }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link onClick={() => navigate("/register")} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>

        <Copyright sx={{ mt: 4, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
