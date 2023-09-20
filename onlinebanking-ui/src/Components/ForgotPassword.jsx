// import React from "react";
import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";
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

const ForgotPassword = () => {
	const navigate = useNavigate();
	const [success, setSuccess] = useState(true);
	const [newOtp, setNewOtp] = useState(0);
	const [gotOtp, setGotOtp] = useState(false);
	const [matchPass, setMatchPass] = useState(true);
	const [newPass, setNewPass] = useState(null);

	const handleSubmit = (event) => {
		event.preventDefault();

		const loginBackendUrl = `http://localhost:8080/genOtp`;
		const forgetPassUrl = `http://localhost:8080/forgetPasswordNew`;
		const data = new FormData(event.currentTarget);

		const loginData = {
			userId: data.get("userid"),
			pswd: data.get("password"),
		};
		console.log(loginData);

		const currPass = data.get("confirmPassword");
		const confPass = data.get("password");
		// const newPassword = data.get("")

		if (currPass == confPass) {
			setMatchPass(true);
			axios
				.post(loginBackendUrl, loginData)
				.then((response) => {
					if (response != null) {
						console.log(response);
						const otpN = response.data;

						console.log("GOT OTP");
						setSuccess(true);
						setNewOtp(otpN);
						setGotOtp(true);
						console.log(newOtp);
						console.log(gotOtp);
					} else {
						setSuccess(false);
						setGotOtp(false);
					}
				})
				.catch((error) => {
					// handle error
					if (error.response && error.response.status === 409) {
						console.log(error.response.data);
						setSuccess(false);
						setGotOtp(false);
						//   alert("There is a conflict with the current state of the resource");
					} else {
						console.error(error);
						setSuccess(false);
						setGotOtp(false);
					}
				});
		} else {
			setMatchPass(false);
		}

		axios
			.post(forgetPassUrl, loginData)
			.then((response) => {
				if (response != null) {
					console.log(response);
					const np = response.data;
					setNewPass(np);
					setSuccess(true);
				} else {
					setSuccess(false);
				}
			})
			.catch((error) => {
				// handle error
				if (error.response && error.response.status === 409) {
					console.log(error.response.data);
					setSuccess(false);
					//   alert("There is a conflict with the current state of the resource");
				} else {
					console.error(error);
					setSuccess(false);
				}
			});
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
						<Avatar sx={{ m: 1, bgcolor: "dark grey" }}>
							<HandymanOutlinedIcon />
						</Avatar>
						<Typography component="h1" variant="h5">
							Reset Password
						</Typography>
						{!success && <ErrorPage />}
						{newPass == null ? " " : newPass}
						{!matchPass && (
							<p style={{ color: "magenta" }}>
								New Password and Confirm Password Should Match
							</p>
						)}
						{gotOtp && (
							<p style={{ color: "green" }}>
								Here is your new OTP <br />
								<strong style={{ fontSize: "30px" }}>{newOtp}</strong>
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
								name="password"
								label="New Password"
								type="password"
								id="password"
								autoComplete="current-password"
							/>
							<TextField
								margin="normal"
								required
								fullWidth
								name="confirmPassword"
								label="Confirm New Password"
								type="confirmPassword"
								id="confirmPassword"
								autoComplete="current-password"
							/>
							<TextField
								margin="normal"
								required
								fullWidth
								name="otp"
								label="OTP"
								type="otp"
								id="otp"
								autoComplete="current-password"
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
							<Grid container justifyContent="end">
								<Grid item>
									<Link onClick={() => navigate("/login")} variant="body2">
										{"Remember Password ? Login here"}
									</Link>
								</Grid>
							</Grid>

							<Grid container justifyContent="start" sx={{ mt: 2 }}>
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
		</>
	);
};

export default ForgotPassword;
