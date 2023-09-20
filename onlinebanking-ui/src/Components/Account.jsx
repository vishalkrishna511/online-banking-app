import { Button, Dialog, DialogTitle } from "@mui/material";
import { Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { enqueueSnackbar } from "notistack";
export default function (props) {
    const account = props.account
    const [deleted, setDeleted] = useState(false)
    const [disabled, setDisabled] = useState(account.disabled || account.balance < 1000)

    useEffect(()=>{}, [deleted, disabled])

    const handleClick = async (event) =>  {
        const accNo = event.target.name;
        if (props.action === "View"){
            try{
                const response = await axios.get(`http://localhost:8080/getTransactions/${accNo}`)
                props.setTransactions(response.data)
                props.clicked(true)
            }catch(error){
                enqueueSnackbar(`An error occured: ${error.message}`, "error");
            }
        }
        else if (props.action === "Delete"){
            setDeleted(true)
            props.handle(accNo)
        }
        else if (props.action === "Disable") {
            setDisabled(!disabled)
            props.handle(accNo)
        }
    }
        
    return (<>
         <Typography key={account.accNo} 
         color={props.action === 'Disable' && disabled && "textSecondary"}
         style={{ textDecoration: (deleted && props.action === 'Delete') ? 'line-through' : 'none' }}
         >
         {account.accType} - {account.accNo} - {account.balance} 
         <Button name={account.accNo} onClick={handleClick}>{props.action == "Disable" ? 
                                                            (disabled ? "Enable" : "Disable")
                                                            : props.action}</Button></Typography>
        </>
        )
}