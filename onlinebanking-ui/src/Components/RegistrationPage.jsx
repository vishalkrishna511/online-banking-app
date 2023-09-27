import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockIcon from "@mui/icons-material/Lock";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import StickyFooter from "./StickyFooter";
import { Alert } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

// function Copyright(props) {
// 	return (
// 		<Typography
// 			variant="body2"
// 			color="text.secondary"
// 			align="center"
// 			{...props}
// 		>
// 			{"Copyright © "}
// 			<Link color="inherit" href="/register">
// 				Team 6 Batch 3
// 			</Link>{" "}
// 			{/* {new Date().getFullYear()}
//             {"."} */}
// 		</Typography>
// 	);
// }

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function RegistrationPage() {
  //setup state for all the text fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [dob, setDob] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isEmptyField, setIsEmptyField] = useState({
    isEmpty: false,
    field: "",
  });

  //   useEffect(() => {
  //     checkFields();
  //   }, [
  //     name,
  //     email,
  //     mobile,
  //     dob,
  //     aadhar,
  //     country,
  //     city,
  //     state,
  //     password,
  //     confirmPassword,
  //   ]);
  const navigate = useNavigate();
  const checkFields = () => {
    if (!name) {
      setIsEmptyField({
        isEmpty: true,
        field: "Name",
      });
      return false;
    }
    if (!email) {
      setIsEmptyField({
        isEmpty: true,
        field: "Email",
      });
      return false;
    }
    if (!mobile) {
      setIsEmptyField({
        isEmpty: true,
        field: "Mobile",
      });
      return false;
    }
    if (!dob) {
      setIsEmptyField({
        isEmpty: true,
        field: "dob",
      });
      return false;
    }

    if (!aadhar) {
      setIsEmptyField({
        isEmpty: true,
        field: "aadhar",
      });
      return false;
    }
    if (!country) {
      setIsEmptyField({
        isEmpty: true,
        field: "country",
      });
      return false;
    }

    if (!city) {
      setIsEmptyField({
        isEmpty: true,
        field: "city",
      });
      return false;
    }
    if (!state) {
      setIsEmptyField({
        isEmpty: true,
        field: "state",
      });
      return false;
    }
    if (!password) {
      setIsEmptyField({
        isEmpty: true,
        field: "Password",
      });
      return false;
    }
    if (!confirmPassword) {
      setIsEmptyField({
        isEmpty: true,
        field: "Password",
      });
      return false;
    }
    return true;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsEmptyField({
      isEmpty: false,
      field: "",
    });
    // boilerplate code to prevent page from reloading
    if (checkFields()) {
      try {
        if (password === confirmPassword) {
          setLoading(false);
          const response = await axios.post(
            "http://localhost:8080/addCustomer",
            {
              name: name,
              email: email,
              mobile: mobile,
              dob: dob,
              aadhar: aadhar,
              country: country,
              city: city,
              state: state,
              pswd: password,
              confirmPassword: confirmPassword,
              fatherName: "",
              motherName: "",
              userId: 0,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.status >= 200 && response.status < 300) {
            enqueueSnackbar(
              `Registration successful, your User-ID is ${response.data.userId}`,
              "success"
            );
            navigate("/login");
          } else throw new Error("Error");
          setError("");
        } else {
          enqueueSnackbar("Passwords are not matching");
        }
      } catch (e) {
        console.log(e);
        setError(e);

        enqueueSnackbar(`An error occured ${e.response.data.message}`, "error");
      } finally {
        setLoading(false);
      }
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
            <Avatar sx={{ m: 1, bgcolor: "#D41C2C" }}>
              <LockIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  {isEmptyField.isEmpty && (
                    <Alert severity="error">
                      {`Please Enter ${isEmptyField.field} Field`}
                    </Alert>
                  )}
                  <TextField
                    required
                    fullWidth
                    id="Name"
                    label="Name"
                    name="Name"
                    autoComplete="Name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="Mobile"
                    label="Mobile Number"
                    name="Mobile"
                    onChange={(e) => setMobile(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="Aadhar"
                    label="Aadhar"
                    name="Aadhar"
                    onChange={(e) => setAadhar(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      // referenceDate="dd-MM-yyyy HH:mm:ss.SSS"
                      inputformat="DD-MM-YYYY"
                      value={dob}
                      onChange={(newValue) => setDob(newValue)}
                    ></DatePicker>
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="Country"
                    label="Country"
                    name="Country"
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="City"
                    fullWidth
                    id="City"
                    label="City"
                    onChange={(e) => setCity(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="State"
                    label="State"
                    name="State"
                    onChange={(e) => setState(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="Confirm password"
                    label="Confirm Password"
                    type="password"
                    id="Confirm password"
                    autoComplete="new-password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
                style={{ backgroundColor: "#D41C2C" }}
              >
                {loading ? "Signing up..." : "Sign up"}
              </Button>
              <Grid container justifyContent="center">
                <Grid item>
                  <Link onClick={() => navigate("/login")} variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          {/* <Copyright sx={{ mt: 3, mb: 4 }} /> */}
        </Container>
      </ThemeProvider>
      <StickyFooter />
    </>
  );
}
