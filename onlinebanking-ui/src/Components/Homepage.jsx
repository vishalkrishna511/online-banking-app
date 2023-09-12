import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { red } from '@mui/material/colors';
export default function Homepage() {
    // change the color of the AppBar to match the theme
    // change it to red
    // how to change the color of the AppBar?
    // AppBar has a prop called color
    // AppBar has a prop called sx
    // sx is a prop that takes an object
    // the object has a property called flexGrow
    return (
        <>
            <Box color={red} sx={{ flexGrow: 1 }}>
                <AppBar style={{ background: '#2E3B55' }} position="static">
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
            </Box>

        </>


    )
}