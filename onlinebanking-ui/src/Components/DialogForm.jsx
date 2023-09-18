import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Typography } from "@mui/material";
import Account from "./Account";

export default function DialogForm(props) {
  const userData = props.formData;
  const [formData, setFormData] = useState({});
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (props.action === "Create") {
      setFormData({ accType: " ", balance: "" });
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (props.action === "Create") {
      console.log(formData);
      try {
        const response = await axios.post(
          `http://localhost:8080/addAccount/${userData.userId}`,
          formData
        );
        console.log(response);
        enqueueSnackbar(`Account created...`, "success");
        handleClose();
      } catch (error) {
        enqueueSnackbar(`An error occured: ${error.message}`, "error");
      }
    }
  };

  const handleClose = () => {
    props.setDisplayForm(false);
  };

  const handleDelete = async (accNo) => {
    console.log(accNo);
    try {
      // const response = await axios.delete(`http://localhost:8080/deleteAccount/${accNo}`)
      enqueueSnackbar(`Account ${accNo} deleted...`, "success");
    } catch (error) {
      enqueueSnackbar(`An error occured: ${error.message}`, "error");
    }
  };

  const handleDisable = async (accNo) => {
    try {
      // const response = await axios.put(`http://localhost:8080/disableAccount/${accNo}`)
      enqueueSnackbar(`Account ${accNo} disabled...`, "success");
    } catch (error) {
      enqueueSnackbar(`An error occured: ${error.message}`, "error");
    }
  };

  const handleEdit = async (event) => {
    event.preventDefault();
    try {
      console.log(formData);
      let response;
      // response = await axios.put(`http://localhost:8080/updateCustomer/${formData.userId}`, formData)
      enqueueSnackbar(`Customer Updated...`, "success");
      handleClose();
    } catch (error) {
      enqueueSnackbar(`An error occured: ${error.message}`, "error");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    props.setFormData({
      ...props.formData,
      [name]: value,
    });
  };

  return (
    <>
      {props.action === "Create" && (
        <Dialog open={props.open} onClose={handleClose}>
          <DialogTitle>{props.formTitle}</DialogTitle>
          <form onSubmit={handleSubmit}>
            <FormControl style={{ margin: "10px" }}>
              <InputLabel id="demo-select-small-label">Type</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={formData.accType}
                label="Type"
                name="accType"
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"Savings"}>Savings</MenuItem>
                <MenuItem value={"Currents"}>Currents</MenuItem>
                <MenuItem value={"FD"}>FD Account</MenuItem>
              </Select>
              <br />
              <TextField
                name="balance"
                onChange={handleChange}
                label="Balance"
                value={formData.balance}
              ></TextField>
              <br />
              <Button type="submit">Submit</Button>
            </FormControl>
          </form>
        </Dialog>
      )}
      {props.action === "Delete" && (
        <Dialog open={props.open} onClose={handleClose}>
          <DialogTitle>{props.formTitle}</DialogTitle>
          <div style={{ padding: "20px" }}>
            <h4>Choose account to delete</h4>
            <i>(Type - Account Number - Balance)</i>
            {props.accounts.map((account) => (
              <Account
                key={account.accNo}
                account={account}
                handle={handleDelete}
                action="Delete"
              />
            ))}
          </div>
        </Dialog>
      )}
      {props.action === "Disable" && (
        <Dialog open={props.open} onClose={handleClose}>
          <DialogTitle>{props.formTitle}</DialogTitle>
          <div style={{ padding: "20px" }}>
            <h4>Choose account to disable</h4>
            <i>(Type - Account Number - Balance)</i>
            {props.accounts.map((account) => (
              <Account
                key={account.accNo}
                account={account}
                handle={handleDisable}
                action="Disable"
              />
            ))}
          </div>
        </Dialog>
      )}
      {props.action === "Transactions" && (
        <Dialog open={props.open} onClose={handleClose}>
          <DialogTitle>{props.formTitle}</DialogTitle>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "20px" }}>
              <h4>Choose account to view transactions</h4>
              <i>(Type - Account Number - Balance)</i>
              {props.accounts.map((account) => (
                <Account
                  key={account.accNo}
                  account={account}
                  handle={handleDisable}
                  action="View"
                  setTransactions={setTransactions}
                />
              ))}
            </div>
            <div style={{ border: "1px solid black", margin: "20px" }}>
              <div>
                <p style={{ textDecoration: "underline" }}>
                  <i>
                    <strong>History</strong>
                  </i>
                </p>
                <table>
                  <thead>
                    <tr>
                      <th> TimeStamp </th>
                      <th> DebitAccnt </th>
                      <th> CreditAccnt </th>
                      <th> Amount </th>
                      <th> Id </th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction) => (
                      <tr key={transaction.txnId}>
                        <td>{transaction.timeStamp}</td>
                        <td>{transaction.debitAccnt}</td>
                        <td>{transaction.creditAccnt}</td>
                        <td>{transaction.amt}</td>
                        <td>{transaction.txnId}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Dialog>
      )}

      {props.action === "Edit" && (
        <Dialog open={props.open} onClose={handleClose}>
          <form onSubmit={handleEdit}>
            <DialogTitle>{props.formTitle}</DialogTitle>
            <DialogContent>
              {Object.keys(props.formData).map((key) => (
                <TextField
                  key={key}
                  label={key}
                  name={key}
                  value={props.formData[key] || ""}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
              ))}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Submit
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      )}
    </>
  );
}
