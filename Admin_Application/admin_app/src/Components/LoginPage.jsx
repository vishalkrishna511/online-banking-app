import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ErrorPage from "./ErrorPage";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

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

    const loginBackendUrl = "http://localhost:8080/admin/login";
    const data = new FormData(event.currentTarget);

    const loginData = {
      adminId: data.get("adminId"),
      pswd: data.get("pswd"),
      username: data.get("username")
    };
    console.log(loginData);

    axios.post(loginBackendUrl, loginData).then((response) => {
      console.log(response);
      if (response.data === true) {
        navigate("/");
        sessionStorage.setItem("userId", data.get("adminId"));
      } else {
        // navigate("/error");
        setSuccess(false);
      }
    });
  };

  return (
    <>
    <>
      <AppBar style={{ background: "#D41C2C" }} position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            Wells Fargo
          </Typography>
        </Toolbar>
      </AppBar>
    </>

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
            Sign In
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
              label="Admin Id"
              name="adminId"
              autoComplete="userid"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Admin Name"
              name="username"
              autoComplete="userid"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="pswd"
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
            
          </Box>
        </Box>

        <Copyright sx={{ mt: 4, mb: 4 }} />
      </Container>
    </ThemeProvider></>
  );
}
