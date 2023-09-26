import React, { useState } from "react";
import { Button, Typography, Box, Divider } from "@mui/material";
import NavBar from "./NavBar";
import { red } from "@mui/material/colors";
import { useLocation, useNavigate } from "react-router-dom";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import jsPDF from "jspdf";
import { Kitesurfing } from "@mui/icons-material";
import StickyFooter from "./StickyFooter";

export default function AccountStatementPage() {
	const location = useLocation();
	const navigate = useNavigate();
	const recievedData = location.state && location.state.val;
	const [showBalance, setShowBalance] = useState(false);
	const [showStatement, setShowStatement] = useState(false);
	const [fromDate, setFromDate] = useState(null);
	const [toDate, setToDate] = useState(null);
	const [statement, setStatement] = useState([]);
	const handleBalanceClick = () => {
		setShowBalance(!showBalance);
		console.log(recievedData);
	};

	const handleStatementClick = () => {
		setShowStatement(!showStatement);
	};
	const handleDownload = () => {
		const data = JSON.stringify(statement);
		const keys = Object.keys(statement[0]);

		const doc = new jsPDF({ orientation: "landscape" });
		doc.text(keys[0], 5, 10);
		doc.text(keys[1], 30, 10);
		doc.text(keys[2], 75, 10);
		doc.text(keys[3], 95, 10);
		doc.text(keys[4], 145, 10);
		doc.text(keys[5], 190, 10);
		doc.text(keys[6], 260, 10);
		statement.forEach((s, idx) => {
			doc.text(s.txnId.toString(), 5, idx * 10 + 30);
			doc.text(s.txnType, 30, idx * 10 + 30);
			doc.text("$" + s.amt.toString(), 70, idx * 10 + 30);
			doc.text(s.debitAccnt.toString(), 90, idx * 10 + 30);
			doc.text(s.creditAccnt.toString(), 140, idx * 10 + 30);
			doc.text(s.timeStamp, 180, idx * 10 + 30);
			doc.text(s.status, 260, idx * 10 + 30);
		});

		doc.save("accountStatment.pdf");
		console.log(data);
	};

	const handleSearch = async () => {
		console.log(statement);
		try {
			const body = {
				fromDate: dayjs(fromDate).format("DD-MM-YYYY HH:mm:ss.SSS"),
				toDate: dayjs(toDate).format("DD-MM-YYYY HH:mm:ss.SSS"),
			};
			console.log(body);
			const response = await axios.post(
				`http://localhost:8080/getAccountStatement/${recievedData.accNo}`,
				body
			);
			setStatement(response.data);
			console.log(response.data);
		} catch (e) {
			console.log(e);
		}
	};

	return (
		<>
			<NavBar />
			<Box style={styles.container}>
				<Box style={styles.header}>
					<Typography variant="h4" style={styles.title}>
						Account Details
					</Typography>
				</Box>
				<Box style={styles.infoBox}>
					<Typography variant="subtitle1">
						Account Number: {recievedData.accNo}
					</Typography>
					<Typography variant="subtitle1">
						Account Type: {recievedData.accType}
					</Typography>
					<Typography variant="subtitle1">
						Opening Date: {recievedData.openingDate}
					</Typography>
					<Typography variant="subtitle1">
						IFSC Code: {recievedData.ifsc}
					</Typography>
					<Button
						variant="contained"
						onClick={handleBalanceClick}
						style={styles.button}
					>
						{showBalance
							? `Balance: $${recievedData.balance}`
							: "Click here to show Balance"}
					</Button>
				</Box>

				<Button
					variant="contained"
					onClick={() => {
						handleStatementClick();
						console.log(statement);
					}}
					style={styles.button}
				>
					{showStatement ? "Hide Statements" : "View Statements"}
				</Button>
				{showStatement && (
					<Box style={styles.infoBox}>
						<Typography variant="h4">Account Statement:</Typography>
						<div
							style={{
								display: "flex",
								justifyContent: "space-around",
								margin: "10px",
							}}
						>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<DatePicker
									// referenceDate="dd-MM-yyyy HH:mm:ss.SSS"
									style={styles.date}
									value={fromDate}
									onChange={(newValue) => setFromDate(newValue)}
								></DatePicker>
								<DatePicker
									// referenceDate="dd-MM-yyyy HH:mm:ss.SSS"
									style={styles.date}
									value={toDate}
									onChange={(newValue) => setToDate(newValue)}
								></DatePicker>
							</LocalizationProvider>
						</div>
						<Button
							style={styles.button}
							onClick={() => {
								console.log(dayjs(fromDate).format("DD-MM-YYYY HH:mm:ss.SSS"));
								console.log(fromDate);
								handleSearch();
							}}
						>
							Search
						</Button>
						<Divider style={{ marginBottom: "10px", marginTop: "10px" }} />

						{statement.length > 0 ? (
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
												Transaction ID
											</TableCell>
											<TableCell
												sx={{
													backgroundColor: "#d41c2c",
													color: "white",
													fontSize: 20,
												}}
											>
												Transaction Type
											</TableCell>
											<TableCell
												sx={{
													backgroundColor: "#d41c2c",
													color: "white",
													fontSize: 20,
												}}
											>
												Debit Account
											</TableCell>
											<TableCell
												sx={{
													backgroundColor: "#d41c2c",
													color: "white",
													fontSize: 20,
												}}
											>
												Credit Account
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
												Status
											</TableCell>
											<TableCell
												sx={{
													backgroundColor: "#d41c2c",
													color: "white",
													fontSize: 20,
												}}
											>
												Time Stamp
											</TableCell>
										</TableRow>
									</TableHead>

									<TableBody>
										{statement.map((item) => (
											<TableRow key={item.txnId}>
												<TableCell sx={{ fontSize: 18, padding: 2 }}>
													{item.txnId}
												</TableCell>
												<TableCell sx={{ fontSize: 18, padding: 2 }}>
													{item.txnType}
												</TableCell>

												<TableCell sx={{ fontSize: 18, padding: 2 }}>
													{item.debitAccnt === 0 ? <p> - </p> : item.debitAccnt}
												</TableCell>
												<TableCell sx={{ fontSize: 18, padding: 2 }}>
													{item.creditAccnt === 0 ? (
														<p> - </p>
													) : (
														item.creditAccnt
													)}
												</TableCell>
												<TableCell sx={{ fontSize: 18, padding: 2 }}>
													{item.amt}
												</TableCell>
												<TableCell sx={{ fontSize: 18, padding: 2 }}>
													{item.status}
												</TableCell>
												<TableCell sx={{ fontSize: 14, padding: 2 }}>
													{item.timeStamp}
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</TableContainer>
						) : (
							<h2
								style={{
									display: "flex",
									flex: "start",

									color: "#073717",
									fontWeight: 600,
								}}
							>
								No Transactions
							</h2>
						)}
						<Divider style={{ marginBottom: "10px", marginTop: "10px" }} />

						<Button
							style={styles.button}
							onClick={() => {
								handleDownload();
							}}
							disabled={myStatement.length < 0}
						>
							Download
						</Button>
					</Box>
				)}
			</Box>
			{/* <div style={{ position: "fixed", bottom: "0", width: "100%" }}>
				<StickyFooter />
			</div> */}
		</>
	);
}

const styles = {
	container: {
		padding: "20px",
		border: "2px solid #e0e0e0",
		borderRadius: "15px",
		backgroundColor: "#f9f9f9",
		margin: "20px",
		boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
		fontFamily: "Arial, sans-serif",
	},
	header: {
		marginBottom: "20px",
		textAlign: "center",
		borderBottom: "2px solid #e0e0e0",
		paddingBottom: "10px",
	},
	title: {
		fontSize: "24px",
		color: "#B71C1C",
		fontWeight: "bold",
	},
	button: {
		marginTop: "7px",
		marginLeft: "20px",
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
