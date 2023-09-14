// import React from 'react'
import * as React from "react";
import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
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
const NavBar = () => {
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
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            Wells Fargo
          </Typography>
          <Button color="inherit">Payments</Button>
          <Button color="inherit">Deposits</Button>
          <Button color="inherit">Account</Button>
          <Button
            onClick={() => {
              sessionStorage.removeItem("userId");
              window.location.reload();
            }}
            color="inherit"
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
