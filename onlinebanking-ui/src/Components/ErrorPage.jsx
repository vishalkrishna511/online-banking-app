import { Typography } from "@mui/material";
import React from "react";
import {Link} from "react-router-dom"
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
    const navigate = useNavigate();
    return (
        <>
            <div style={styles.container}>
                <div style={styles.infoBox}>
                <Typography style={styles.title}> 404</Typography>
                <h3 style={styles.header}> Oops! An Error Occured!</h3>
                <h5 style={{fontFamily:"Comic Sans MS, cursive"}}>The Page you are trying to visit took too long to respond</h5>
                    </div>
                <Button style={styles.button} onClick={() => navigate("/login")}> Go Back</Button>
                </div>

        </>


    )
}



const styles = {
	container: {
		padding: "15px",
		border: "2px solid #e0e0e0",
		borderRadius: "15px",
		backgroundColor: "#f9f9f9",
		margin: "8px",
		boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
	
	},
	header: {
		textAlign: "center",
		paddingBottom: "10px",
        fontFamily: "Freckle Face, cursive",
	},
	title: {
		fontSize: "120px",
		color: "#B71C1C",
		fontWeight: "bold",
        fontFamily:"Impact, sans-serif"
    
	},
	button: {
		marginTop: "7px",
		marginLeft: "20px",
        padding:"15px",
		fontSize: "14px",
		cursor: "pointer",
		borderRadius: "25px",
		backgroundColor: "#B71C1C",
		color: "#fff",
		transition: "background-color 0.3s ease",
		":hover": {
			backgroundColor: "#7b001b",
		},
	},
	infoBox: {
		marginTop: "20px",
		marginBottom: "20px",
		border: "2px solid #B71C1C",
		padding: "20px",
		borderRadius: "15px",
		backgroundColor: "#fff",
		fontSize: "18px",
	},
	date: {
		padding: "20px",
		margin: "10px",
	},
};
