import { Button, Dialog, DialogTitle } from "@mui/material";
import { Typography } from "@mui/material";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { enqueueSnackbar } from "notistack";
export default function (props) {
    const account = props.account
    const [isStrikethrough, setIsStrikethrough] = useState(account.disabled)
    const [transactions, setTransactions] = useState([])
    const [showTxns, setShowTxns] = useState(false)

    const handleClick = async (event) =>  {
        const accNo = event.target.name;
        if (props.action === "View"){
            try{
                const response = await axios.get(`http://localhost:8080/getTransactions/${accNo}`)
                props.setTransactions(response.data)
                setShowTxns(true)
                console.log(response.data)
            }catch(error){
                enqueueSnackbar(`An error occured: ${error.message}`, "error");
            }
        }
        else{
            setIsStrikethrough(!isStrikethrough)
            props.handle(accNo)
        }
    }
        
    return (<>
         <Typography key={account.accNo} 
         color={props.action === 'Disable' && isStrikethrough && "textSecondary"}
         style={{ textDecoration: (isStrikethrough && props.action === 'Delete') ? 'line-through' : 'none' }}
         >
         {account.accType} - {account.accNo} - {account.balance} 
         <Button name={account.accNo} onClick={handleClick}>{props.action == "Disable" ? 
                                                            (isStrikethrough ? "Enable" : "Disable")
                                                            : props.action}</Button></Typography>
        </>
        )
}