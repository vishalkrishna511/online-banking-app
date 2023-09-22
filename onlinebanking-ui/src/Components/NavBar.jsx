// import React from 'react'
import * as React from "react";
import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import { useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";
import CottageTwoToneIcon from "@mui/icons-material/CottageTwoTone";

// import { red } from "@mui/material/colors";
// import { Grid } from "@mui/material";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// // import DialogTitle from "@mui/material/DialogTitle";
// import { CardActionArea } from "@mui/material";

import "./Button.css";

// import LoadingScreen from "./LoadingScreen";
// import axios from "axios";
const NavBar = (props) => {
	const navigate = useNavigate();

	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<>
			<AppBar style={{ background: "#D41C2C" }} position="static">
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
						onClick={() => navigate("/")}
					>
						{/* <MenuIcon /> */}
						<CottageTwoToneIcon fontSize="large" />
					</IconButton>
					<Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
						Wells Fargo
					</Typography>
					<Button onClick={() => navigate("/payments")} color="inherit">
						Payments
					</Button>
					<Button color="inherit">Deposits</Button>
					<Button
						color="inherit"
						aria-controls={open ? "fade-menu" : undefined}
						aria-haspopup="true"
						aria-expanded={open ? "true" : undefined}
						onClick={handleClick}
					>
						Account
					</Button>
					{props.isAdmin && (
						<Button
							color="inherit"
							aria-controls={open ? "fade-menu" : undefined}
							aria-haspopup="true"
							aria-expanded={open ? "true" : undefined}
							onClick={() => navigate("/admin")}
						>
							Admin
						</Button>
					)}
					<Menu
						sx={{ mt: 2, ml: -3 }}
						id="fade-menu"
						MenuListProps={{
							"aria-labelledby": "fade-button",
						}}
						anchorEl={anchorEl}
						open={open}
						onClose={handleClose}
						TransitionComponent={Fade}
					>
						<MenuItem onClick={handleClose}>
							<Link
								onClick={() => navigate("/changePassword")}
								color="inherit"
								underline="none"
							>
								Change Password
							</Link>
						</MenuItem>
					</Menu>
					<Button
						onClick={() => {
							sessionStorage.removeItem("userId");
							window.location.reload();
						}}
						color="inherit"
						sx={{
							border: "3px solid #FCCC44",
							borderRadius: "10px",
						}}
					>
						Logout
					</Button>
				</Toolbar>
			</AppBar>
		</>
	);
};

export default NavBar;
