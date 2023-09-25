import React from "react";
import NavBar from "./NavBar";
import ShowTransactions from "./ShowTransactions";
import { Box, Grid } from "@mui/material";
import StickyFooter from "./StickyFooter";

const Payments = () => {
	const userId = sessionStorage.getItem("userId");
	console.log(userId);

	return (
		<>
			<Box sx={{ flexGrow: 1 }}>
				<Grid container>
					<NavBar />
					<Grid container>
						<Grid item xs={1} />
						<Grid container item md={10} sx={{ mt: 7 }}>
							<label style={{ fontSize: 40 }}>Your Transactions</label>
							<ShowTransactions userName={{ userId }} />
						</Grid>
						<Grid item xs={1} />
					</Grid>
					{/* <h3>Your Transactions</h3>
					<ShowTransactions userName={{ userId }} /> */}
				</Grid>
			</Box>
			<div style={{ position: "fixed", bottom: "0", width: "100%" }}>
				<StickyFooter />
			</div>
		</>
	);
};

export default Payments;
