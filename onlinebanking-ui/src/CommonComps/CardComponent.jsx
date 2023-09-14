import React, { useEffect, useState } from "react";
import LoadingScreen from "../Components/LoadingScreen";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";

const IS_FIRST = true;

const CardComponent = ({ userId, visible, onConfirm, onClose }) => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isFirst, setFirst] = useState(true);

  const [account, setAccount] = useState({});

  const SubmitFunctionHandler = async (acc) => {
    if (isFirst) {
      setFirst(false);
      setAccount(acc);
    } else {
      // API CALL HERE
    }
    onConfirm();
  };

  const GetAccounts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/fetchAccounts/${userId}`
      );
      if (response.data === "No Account created") setAccounts([]);
      else setAccounts(response.data);
    } catch (e) {
      onClose();
      enqueueSnackbar(e.message, "error");
    }
  };

  useEffect(() => {
    GetAccounts();
  }, []);

  return (
    <Dialog open={visible} onClose={onClose} maxWidth="lg">
      {loading ? (
        <div style={{ height: 200 }}>
          <LoadingScreen loadingText="Fetching your accounts..." />
        </div>
      ) : accounts.length === 0 ? (
        <div style={{ height: 200 }}>
          <label style={{ fontSize: 24, fontWeight: "500" }}>
            No accounts are made yet
          </label>
        </div>
      ) : (
        <div style={{ width: "50%" }}>
          <DialogTitle>Your Accounts</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {accounts.map((val) => (
                <div className="main-button">
                  <div
                    style={{
                      backgroundColor: "gray",
                      height: 1,
                      width: "100%",
                      marginBottom: 4,
                    }}
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginBottom: 4,
                    }}
                  >
                    <label
                      style={{
                        fontSize: 24,
                        fontWeight: "500",
                        display: "flex",
                        flex: 1,
                      }}
                    >
                      Account: {val.accNo}
                    </label>
                    <label style={{ fontSize: 24 }}>
                      Balance: {val.balance}
                    </label>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={4}>
                        <label style={{ fontSize: 18 }}>
                          Branch: {val.branch}
                        </label>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <label style={{ fontSize: 18 }}>
                          Account Type: {val.accType}
                        </label>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <label style={{ fontSize: 18 }}>
                          Opening date: {val.openingDate}
                        </label>
                      </Grid>
                    </Grid>
                  </div>
                </div>
              ))}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button
              onClick={() => {
                SubmitFunctionHandler(val);
              }}
            >
              {IS_FIRST ? "Next" : "Withdraw"}
            </Button>
          </DialogActions>
        </div>
      )}
    </Dialog>
  );
};

export default CardComponent;
