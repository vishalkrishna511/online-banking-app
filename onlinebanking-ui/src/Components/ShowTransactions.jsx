import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import axios from "axios";

function ShowTransactions(props) {
  const { userName } = props;
  const userId = userName.userId;
  // console.log(userId);
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  // const [selectedAccount, setSelectedAccount] = useState([]);

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
  }, [userId, userName]);
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
      <Box
        container
        // display="flex"
        // alignItems="center"
        // justifyContent="flex-start"
        // minHeight="100vh"
      >
        {transactions.length > 0 ? (
          <div style={{ margin: "70px" }}>
            {transactions.map((txn, index) => (
              <div key={index}>
                <Accordion
                  sx={{ m: 2, borderRadius: 15, border: "2px solid #6f2027a1" }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ mx: 3, color: "red" }} />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    {/* <Typography>Accordion 1</Typography> */}
                    <h2 style={{ display: "flex", flex: "start" }}>
                      🚩Transactions for Account Number : {accounts[index]}
                    </h2>
                  </AccordionSummary>
                  <AccordionDetails>
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
                  </AccordionDetails>
                </Accordion>
              </div>
            ))}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </Box>
    </div>
  );
}

export default ShowTransactions;
