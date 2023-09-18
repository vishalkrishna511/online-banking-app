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
  const { userName } = props; // get the userName prop
  const [accounts, setAccounts] = useState([]); // initialize the accounts state as an empty array
  const [transactions, setTransactions] = useState([]); // initialize the transactions state as an empty array
  const [selectedAccount, setSelectedAccount] = useState(null); // initialize the selectedAccount state as null

  useEffect(() => {
    // fetch the accounts of the user from the API
    axios
      .get(`localhost:8080/fetchAccounts/${userName}`)
      .then((response) => {
        // update the accounts state with the response data
        setAccounts(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        // handle the error
        console.error(error);
      });
  }, [userName]); // run this effect only when the userName prop changes

  useEffect(() => {
    // check if there is a selected account
    if (selectedAccount) {
      // fetch the transactions of the selected account from the API
      axios
        .get(`localhost:8080/getTransactions/${selectedAccount}`)
        .then((response) => {
          // update the transactions state with the response data
          setTransactions(response.data);
        })
        .catch((error) => {
          // handle the error
          console.error(error);
        });
    }
  }, [selectedAccount]); // run this effect only when the selectedAccount state changes

  // define a function to handle the account selection
  const handleSelectAccount = (accountNumber) => {
    // update the selectedAccount state with the account number
    setSelectedAccount(accountNumber);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Account Number</TableCell>
              <TableCell>Balance</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Select</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accounts.map((account) => (
              <TableRow key={account.number}>
                <TableCell>{account.number}</TableCell>
                <TableCell>{account.balance}</TableCell>
                <TableCell>{account.type}</TableCell>
                <TableCell>
                  <button onClick={() => handleSelectAccount(account.number)}>
                    View Transactions
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedAccount && (
        <div>
          <h2>Transactions for Account {selectedAccount}</h2>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.amount}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
}

export default ShowTransactions;
