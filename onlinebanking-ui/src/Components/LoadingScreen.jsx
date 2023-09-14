import { CircularProgress } from "@mui/material";
import React from "react";

const LoadingScreen = ({ loadingText = "Loading..." }) => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        flexDirection: "column",
      }}
    >
      <CircularProgress size={100} color="primary" />
      <div style={{ height: 20 }} />
      <label style={{ fontSize: 30 }}>{loadingText}</label>
    </div>
  );
};

export default LoadingScreen;
