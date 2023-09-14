import * as React from "react";
// import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
// import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
import { red } from "@mui/material/colors";
import { Grid, TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { CardActionArea } from "@mui/material";
import Menu from "@mui/material/Menu";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";

import WalletIcon from "@mui/icons-material/Wallet";
import "./Button.css";
import LoadingScreen from "./LoadingScreen";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import NavBar from "./NavBar";
import CardComponent from "../CommonComps/CardComponent";

export default function Homepage() {
  // change the color of the AppBar to match the theme
  // change it to red
  // how to change the color of the AppBar?
  // AppBar has a prop called color
  // AppBar has a prop called sx
  // sx is a prop that takes an object
  // the object has a property called flexGrow

  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    "& .MuiSwitch-switchBase": {
      margin: 1,
      padding: 0,
      transform: "translateX(6px)",
      "&.Mui-checked": {
        color: "#fff",
        transform: "translateX(22px)",
        "& .MuiSwitch-thumb:before": {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            "#fff"
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor:
            theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
      width: 32,
      height: 32,
      "&:before": {
        content: "''",
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
    },
    "& .MuiSwitch-track": {
      opacity: 1,
      backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      borderRadius: 20 / 2,
    },
  }));

  React.useEffect(() => {
    GetUserData();
  }, []);

  const GetUserData = async () => {
    try {
      const id = sessionStorage.getItem("userId");
      setUserId(id);
      setLoading(true);
      setError("");
      const response = await axios.get(
        `http://localhost:8080/getCustomer/${id}`
      );
      setData(response.data);
    } catch (e) {
      console.log(e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = async () => {
    try {
      console.log(data);
      const body = {
        balance: accType === "Savings" || accType === "FD" ? balance : 0,
        accType: accType,
      };
      const response = await axios.post(
        `http://localhost:8080/addAccount/${userId}`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);
      if (response.status >= 200 && response.status < 300) {
        enqueueSnackbar(
          `Account creation successful, Account number `,
          "success"
        );
      } else throw new Error("An error occured");
      setError("");
      setBalance("");
    } catch (e) {
      setError(e.message);
      enqueueSnackbar(`An error occured ${e.message}`, "error");
    }
  };

  const [userId, setUserId] = React.useState(1);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");
  const [data, setData] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [accType, setAccType] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const [balance, setBalance] = React.useState("");
  const [visible, setVisible] = React.useState(false);

  const onCloseWD = () => {
    setVisible(false);
  };

  const onConfirmWD = () => {
    onCloseWD();
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleChange = (event) => {
    setAccType(event.target.value);
  };

  const handleClickOpen = () => {
    // i want to make an API call here first then open the dialog
    setOpen(true);
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
          <NavBar />

          <div style={{ height: 100 }} />

          <Grid container>
            <Grid item xs={1} />
            <Grid container item md={10}>
              <label style={{ fontSize: 40 }}>Hello, {data.name}</label>
            </Grid>
            <Grid item xs={1} />
          </Grid>

          <div style={{ height: 20 }} />

          <Grid container spacing={3}>
            <Grid item xs={1} />
            <Grid container item md={5}>
              <Card
                className="home-button"
                style={{ borderRadius: "25px", border: "5px solid #D41C2C" }}
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
              <Dialog open={open} onClose={handleClose} maxWidth="lg">
                <div style={{ width: "500px", color: "#D41C2C" }}>
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
                          <FormControl
                            sx={{ m: 1, minWidth: 120 }}
                            size="small"
                          >
                            <InputLabel id="demo-select-small-label">
                              Type
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
                              <MenuItem value={"Savings"}>Savings</MenuItem>
                              <MenuItem value={"Currents"}>Currents</MenuItem>
                              <MenuItem value={"FD"}>FD Account</MenuItem>
                            </Select>
                          </FormControl>
                        </div>
                        {(accType === "Savings" || accType === "FD") && (
                          <div>
                            <TextField
                              id="standard-basic"
                              label="Balance"
                              variant="standard"
                              value={balance}
                              onChange={(e) => setBalance(e.target.value)}
                            />
                          </div>
                        )}
                      </div>
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                      onClick={() => {
                        handleSubmit();
                        handleClose();
                      }}
                    >
                      Submit
                    </Button>
                  </DialogActions>
                </div>
              </Dialog>
            </Grid>
            <Grid container item md={5}>
              <Card
                className="home-button"
                style={{
                  backgroundColor: "rgb(212,28,44)",
                  borderRadius: "25px",
                  border: "5px solid #FCCC44",
                }}
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

          <CardComponent
            onClose={onCloseWD}
            onConfirm={onConfirmWD}
            userId={userId}
            visible={visible}
          />

          <Grid container>
            <Grid item xs={1} />
            <Grid item container xs={10}>
              <Grid item container xs={12} spacing={3}>
                <Grid item container xs={3}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: 8,
                      border: "solid black 4px",
                      minHeight: 150,
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    className="action-button"
                    onClick={() => setVisible(true)}
                  >
                    <div
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 8,
                      }}
                    >
                      <WalletIcon />
                    </div>
                    <div>
                      <label
                        style={{ fontSize: 18, fontWeight: "500" }}
                        className="text-pointer"
                      >
                        Withdraw
                      </label>
                    </div>
                  </div>
                </Grid>
              </Grid>
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
