import React, { useState, useEffect } from "react";
// // import { makeStyles } from "@mui/styles";
// import { createStyles, makeStyles } from "@mui/styles";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import axios from "axios";

function ShowTransactions(props) {
  const { userName } = props;
  const userId = userName.userId;
  // console.log(userId);
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/fetchAccounts/${userId}`)
      .then((response) => {
        let numbers = response.data.map((accountNo) => accountNo.accNo);
        setAccounts(numbers);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userName]);
  useEffect(() => {
    if (accounts.length > 0) {
      let promises = accounts.map((number) =>
        axios.get(`http://localhost:8080/getTransactions/${number}`)
      );
      Promise.all(promises)
        .then((responses) => {
          let txns = responses.map((response) => response.data);
          setTransactions(txns);
          // console.log(transactions);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [accounts]);

  return (
    <div>
      {transactions.length > 0 ? (
        <div style={{ margin: "70px" }}>
          {transactions.map((txn, index) => (
            <div key={index}>
              <h2 style={{ display: "flex", flex: "start" }}>
                🚩Transactions for Account Number : {accounts[index]}
              </h2>
              {txn.length > 0 ? (
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell
                          sx={{
                            backgroundColor: "#d41c2c",
                            color: "white",
                            fontSize: 20,
                          }}
                        >
                          Time Stamp
                        </TableCell>
                        <TableCell
                          sx={{
                            backgroundColor: "#d41c2c",
                            color: "white",
                            fontSize: 20,
                          }}
                        >
                          Amount
                        </TableCell>
                        <TableCell
                          sx={{
                            backgroundColor: "#d41c2c",
                            color: "white",
                            fontSize: 20,
                          }}
                        >
                          Type
                        </TableCell>
                        <TableCell
                          sx={{
                            backgroundColor: "#d41c2c",
                            color: "white",
                            fontSize: 20,
                          }}
                        >
                          Status
                        </TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {txn.map((item) => (
                        <TableRow key={item.txnId}>
                          <TableCell sx={{ fontSize: 18, padding: 2 }}>
                            {item.timeStamp}
                          </TableCell>
                          <TableCell sx={{ fontSize: 18, padding: 2 }}>
                            {item.amt}
                          </TableCell>
                          <TableCell sx={{ fontSize: 18, padding: 2 }}>
                            {item.txnType}
                          </TableCell>
                          <TableCell sx={{ fontSize: 18, padding: 2 }}>
                            {item.status}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <h3
                  style={{
                    display: "flex",
                    flex: "start",

                    color: "#073717",
                    fontWeight: 600,
                  }}
                >
                  No Transactions🥳
                </h3>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ShowTransactions;
