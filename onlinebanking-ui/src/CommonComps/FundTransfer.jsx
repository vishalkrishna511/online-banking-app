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
  TextField,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";
import "./CardComponent.css";

const FundTransfer = ({ userId, visible, onConfirm, onClose }) => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isFirst, setFirst] = useState(true);
  const [amount, setAmount] = useState("");
  const [creditAccnt, setCreditAccnt] = useState("");
  const [transactLoading, setTransactLoading] = useState(false);

  const [account, setAccount] = useState({});

  const SubmitFunctionHandler = async () => {
    try {
      setTransactLoading(true);
      const baseURL = `http://localhost:8080`;
      const response = await axios.post(
        `${baseURL}/transact`,
        {
          amt: amount,
          debitAccnt: account.accNo,
          txnType: "transfer",
          creditAccnt: creditAccnt,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      onConfirm();
      enqueueSnackbar(
        "Amount withdrawn from the account succesfully",
        "success"
      );
    } catch (err) {
      enqueueSnackbar(`Failed Transaction: ${err.message}`, "error");
      console.log(err);
    } finally {
      setTransactLoading(false);
    }
  };

  const onAccountSelect = async (acc) => {
    setAccount(acc);
    setFirst(false);
  };

  const GetAccounts = async () => {
    try {
      setLoading(false);
      setError("");
      const response = await axios.get(
        `http://localhost:8080/fetchAccounts/${userId}`
      );
      if (response.data === "No Account created") setAccounts([]);
      else {
        const list = response.data.filter(
          (val) => val.accType !== "FD" && val.disabled === false
        );
        setAccounts(list);
      }
    } catch (e) {
      onClose();
      setError(e.message);
      enqueueSnackbar(e.message, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (visible) {
      GetAccounts();
      setAccount({});
      setAccounts([]);
      setLoading(false);
      setError("");
      setFirst(true);
    }
  }, [visible]);

  return (
    <Dialog open={visible} onClose={onClose}>
      {loading ? (
        <div style={{ height: 200, display: "flex", flex: 1 }}>
          <LoadingScreen loadingText="Fetching your accounts..." />
        </div>
      ) : accounts.length === 0 ? (
        <div style={{ height: 200 }}>
          <label style={{ fontSize: 24, fontWeight: "500" }}>
            No accounts are made yet
          </label>
        </div>
      ) : (
        <div style={{ padding: 32, paddingRight: 64 }}>
          {isFirst ? (
            <div style={{ width: "100%" }}>
              <DialogTitle>Your Accounts</DialogTitle>
              <DialogContent style={{ width: "100%" }}>
                <DialogContentText
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    color: "black",
                  }}
                >
                  {accounts.map((val) => (
                    <div
                      className="main-button"
                      onClick={() => onAccountSelect(val)}
                      style={{ width: "100%" }}
                    >
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
                            fontSize: 18,
                            fontWeight: "500",
                            display: "flex",
                            flex: 1,
                          }}
                          className="text-pointer"
                        >
                          Account: {val.accNo}
                        </label>
                        <label
                          style={{ fontSize: 18 }}
                          className="text-pointer"
                        >
                          Balance: {val.balance}
                        </label>
                      </div>
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <Grid container spacing={1}>
                          <Grid item xs={12} md={4}>
                            <label
                              style={{ fontSize: 12 }}
                              className="text-pointer"
                            >
                              Branch: {val.branch}
                            </label>
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <label
                              style={{ fontSize: 12 }}
                              className="text-pointer"
                            >
                              Account Type: {val.accType}
                            </label>
                          </Grid>
                          <Grid item xs={12} md={4}>
                            <label
                              style={{ fontSize: 12 }}
                              className="text-pointer"
                            >
                              Opened: {val.openingDate}
                            </label>
                          </Grid>
                        </Grid>
                      </div>
                    </div>
                  ))}
                  <div
                    style={{
                      backgroundColor: "gray",
                      height: 1,
                      width: "100%",
                      marginBottom: 4,
                    }}
                  />
                </DialogContentText>
              </DialogContent>
            </div>
          ) : (
            <>
              <DialogTitle>Transfer from {account.accNo}</DialogTitle>
              <DialogContentText>
                <div>
                  <TextField
                    style={{ marginTop: 16, marginBottom: 16 }}
                    label="Receiver Account"
                    id="standard-basic"
                    variant="standard"
                    placeholder="Receiver Account"
                    value={creditAccnt}
                    onChange={(e) => setCreditAccnt(e.target.value)}
                    fullWidth
                  />
                </div>
                <div>
                  <TextField
                    style={{ marginTop: 16, marginBottom: 16 }}
                    label="Amount"
                    id="standard-basic"
                    variant="standard"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    fullWidth
                  />
                </div>
              </DialogContentText>
            </>
          )}
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button
              onClick={() => {
                SubmitFunctionHandler();
              }}
              disabled={isFirst || transactLoading || loading}
            >
              {transactLoading ? "Processing..." : "Proceed"}
            </Button>
          </DialogActions>
        </div>
      )}
    </Dialog>
  );
};

export default FundTransfer;
