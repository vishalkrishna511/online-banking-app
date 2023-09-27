import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

function Copyright() {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      style={{ fontSize: "1rem" }}
    >
      {"Copyright © "}
      <Link color="inherit" href="devs">
        Batch 3 Team 6
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function StickyFooter() {
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            // minHeight: "100vh",
            marginTop: "20px",
            bottom: "0",
            borderTop: "3px solid #E7E7E7",
            textAlign: "center",

            width: "100%",
          }}
        >
          {/* <CssBaseline /> */}

          <Box
            component="footer"
            sx={{
              py: 3,
              px: 2,
              mt: "auto",
              backgroundColor: "#FCCC44",
              color: "#d41c2c",
            }}
          >
            <Container maxWidth="sm">
              <Typography variant="body1" style={{ fontSize: "1.3rem" }}>
                Online banking application
              </Typography>
              <Copyright />
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
}
