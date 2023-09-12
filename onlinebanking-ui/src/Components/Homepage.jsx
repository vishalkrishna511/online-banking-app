import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { red } from "@mui/material/colors";
import { Grid } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import "./Button.css";
import LoadingScreen from "./LoadingScreen";

export default function Homepage() {
  // change the color of the AppBar to match the theme
  // change it to red
  // how to change the color of the AppBar?
  // AppBar has a prop called color
  // AppBar has a prop called sx
  // sx is a prop that takes an object
  // the object has a property called flexGrow

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [data, setData] = React.useState({});

  React.useEffect(() => {
    // DO API CALL HERE
    setLoading(true);
    setError("");
  }, []);

  return (
    <div>
      {loading ? (
        <LoadingScreen loadingText="Fetching your data..." />
      ) : (
        <Box color={red} sx={{ flexGrow: 1 }}>
          <AppBar style={{ background: "#2E3B55" }} position="static">
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
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Wells Fargo
              </Typography>
              <Button color="inherit">Payments</Button>
              <Button color="inherit">Deposits</Button>
              <Button color="inherit">Account</Button>
            </Toolbar>
          </AppBar>

          <div style={{ height: 100 }} />

          <Grid container>
            <Grid item xs={1} />
            <Grid container item md={10}>
              <label style={{ fontSize: 40 }}>Hello, Name</label>
            </Grid>
            <Grid item xs={1} />
          </Grid>

          <div style={{ height: 20 }} />

          <Grid container spacing={3}>
            <Grid item xs={1} />
            <Grid container item md={5}>
              <div className="home-button">
                <label className="home-button-text">Open Account</label>
              </div>
            </Grid>
            <Grid container item md={5}>
              <div
                className="home-button"
                style={{ backgroundColor: "rgb(251,55,0)" }}
              >
                <label className="home-button-text">See your accounts</label>
              </div>
            </Grid>
            <Grid item xs={1} />
          </Grid>

          <div style={{ height: 80 }} />

          <Grid container>
            <Grid item xs={1} />
            <Grid container item md={10}>
              <label style={{ fontSize: 40 }}>Your Transactions</label>
            </Grid>
            <Grid item xs={1} />
          </Grid>
        </Box>
      )}
    </div>
  );
}
