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
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle'; import { CardActionArea } from '@mui/material';

import "./Button.css";
import LoadingScreen from "./LoadingScreen";
import axios from "axios";

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
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        // i want to make an API call here first then open the dialog
        axios.get("http://localhost:8080/getCustomer/3").then((response) => {
            console.log(response);
            setData(response.data);
            setOpen(true);
        });


    };

    const handleClose = () => {
        setOpen(false);
    };
    React.useEffect(() => {
        // DO API CALL HERE
        setLoading(false);
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


                            <Card className="home-button">
                                <CardActionArea onClick={handleClickOpen}>

                                    <CardContent>

                                        <Typography className="home-button-text" variant="body2" color="text.secondary">
                                            Open a new account with Wells Fargo
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                            <Dialog open={open} onClose={handleClose}>
                                <DialogTitle>Customer Details</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        {data}
                                    </DialogContentText>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="Email Address"
                                        type="email"
                                        fullWidth
                                        variant="standard"
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button onClick={handleClose}>Subscribe</Button>
                                </DialogActions>
                            </Dialog>

                        </Grid>
                        <Grid container item md={5}>

                            <Card className="home-button"
                                style={{ backgroundColor: "rgb(251,55,0)" }}>
                                <CardActionArea>

                                    <CardContent>

                                        <Typography className="home-button-text" variant="body2" color="text.secondary">
                                            Check Details of Existing Accounts                                        </Typography>
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
