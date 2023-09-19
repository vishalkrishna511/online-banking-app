// import React from "react";
import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import ChangeCircleOutlinedIcon from "@mui/icons-material/ChangeCircleOutlined";
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
      </Link>
    </Typography>
  );
}

const defaultTheme = createTheme();

const ChangePassword = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(true);
  const [passChanged, setPassChanged] = useState(false);
  const [matchPass, setMatchPass] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const currPass = data.get("currentPassword");
    const confPass = data.get("confirmPassword");
    console.log(currPass);

    const loginBackendUrl = `http://localhost:8080/resetPassword/${currPass}`;

    const loginData = {
      userId: data.get("userid"),
      pswd: data.get("newPassword"),
    };

    if (currPass == confPass) {
      setMatchPass(true);
      axios
        .post(loginBackendUrl, loginData)
        .then((response) => {
          if (response.status === 200) {
            setSuccess(true);
            setPassChanged(true);
          } else {
            setSuccess(false);
            setPassChanged(false);
          }
        })
        .catch((error) => {
          // handle error
          if (error.response && error.response.status === 409) {
            console.log(error.response.data);
            setSuccess(false);
            setPassChanged(false);
          } else {
            console.error(error);
            setPassChanged(true);
            setSuccess(false);
          }
        });
    } else {
      setMatchPass(false);
    }
  };

  return (
    <>
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
            <Avatar sx={{ m: 1, bgcolor: "green" }}>
              <ChangeCircleOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Change Password
            </Typography>
            {!matchPass && (
              <p style={{ color: "magenta" }}>
                New Password and Confirm Password Should Match
              </p>
            )}
            {!success && <ErrorPage />}
            {passChanged && (
              <p style={{ color: "green" }}>
                Your Password Changed Successfully
              </p>
            )}
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
                name="currentPassword"
                label="Current Password"
                type="currentPassword"
                id="currentPassword"
                autoComplete="current-password"
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="newPassword"
                label="New Password"
                type="newPassword"
                id="newPassword"
                autoComplete="new-password"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm New Password"
                type="confirmPassword"
                id="confirmPassword"
                autoComplete="confirm-password"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                style={{ backgroundColor: "#D41C2C" }}
              >
                Reset Password
              </Button>

              <Grid container justifyContent="center" sx={{ mt: 2 }}>
                <Grid item>
                  <Link onClick={() => navigate("/")} variant="body2">
                    {"Changed your mind? Go to Homepage"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>

          <Copyright sx={{ mt: 4, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </>
  );
};

export default ChangePassword;
