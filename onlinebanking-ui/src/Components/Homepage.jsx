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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { CardActionArea } from "@mui/material";

import "./Button.css";
import LoadingScreen from "./LoadingScreen";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Homepage({ id }) {
  // change the color of the AppBar to match the theme
  // change it to red
  // how to change the color of the AppBar?
  // AppBar has a prop called color
  // AppBar has a prop called sx
  // sx is a prop that takes an object
  // the object has a property called flexGrow

  const navigate = useNavigate();


  React.useEffect(() => {
    const id = sessionStorage.getItem('userId');
    if (!id) navigate("/login");
    setUserId(id);
    setLoading(false);
  }, [])
  const [userId, setUserId] = React.useState(1);

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [data, setData] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [accType, setAccType] = React.useState("");

  const handleChange = (event) => {
    setAccType(event.target.value);
  };
  const handleClickOpen = () => {
    // i want to make an API call here first then open the dialog
    axios.get(`http://localhost:8080/getCustomer/${userId}`).then((response) => {
      console.log(response);
      setData(response.data);
      setOpen(true);
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {loading ? (
        <LoadingScreen loadingText="Fetching your data..." />
      ) : (
        <Box color={red} sx={{ flexGrow: 1 }}>
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
              <Card className="home-button" style={{ borderRadius: "25px", border: '5px solid #D41C2C' }}
              >
                <CardActionArea onClick={handleClickOpen}>
                  <CardContent>
                    <Typography
                      className="home-button-text"
                      variant="body2"
                      color="text.secondary"
                      style={{
                        fontSize: 24,
                        fontWeight: "500",
                        color: "#D41C2C",

                      }}
                    >
                      Open a new account with Wells Fargo
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
              <Dialog open={open} onClose={handleClose}
                maxWidth='lg'
              >
                <div style={{ width: "300px", color: "#D41C2C" }}>
                  <DialogTitle>Customer Details</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      <div>
                        <div>Name: {data.name}</div>
                        <div>User ID: {data.userId}</div>
                        <div>Aadhar: {data.aadhar}</div>
                        <div>DOB: {data.dob}</div>
                        <div>City: {data.city}</div>
                        <div>Mobile: {data.mobile}</div>
                        <div>State: {data.state}</div>
                        <div>
                          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                            <InputLabel id="demo-select-small-label">
                              Acc Type
                            </InputLabel>
                            <Select
                              labelId="demo-select-small-label"
                              id="demo-select-small"
                              value={accType}
                              label="Type"
                              onChange={handleChange}
                            >
                              <MenuItem value="">
                                <em>None</em>
                              </MenuItem>
                              <MenuItem value={10}>Savings</MenuItem>
                              <MenuItem value={20}>Currents</MenuItem>
                              <MenuItem value={30}>FD</MenuItem>
                            </Select>
                          </FormControl>
                        </div>
                      </div>
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Submit</Button>
                  </DialogActions>
                </div>
              </Dialog>
            </Grid>
            <Grid container item md={5}>
              <Card
                className="home-button"
                style={{ backgroundColor: "rgb(212,28,44)", borderRadius: "25px", border: '5px solid #FCCC44' }}
              >
                <CardActionArea>
                  <CardContent>
                    <Typography
                      className="home-button-text"
                      variant="body2"
                      color="text.secondary"
                      style={{
                        fontSize: 24,
                        color: "white",
                        fontWeight: "500",
                      }}
                    >
                      Check Details of Existing Accounts
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
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
