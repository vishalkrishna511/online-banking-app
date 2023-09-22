import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Grid } from "@mui/material";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import MenuIcon from "@mui/icons-material/Menu";
import axios from "axios";
import DialogForm from "./DialogForm";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { enqueueSnackbar } from "notistack";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import "./Button.css";

export default function AdminPage() {
	const [displayForm, setDisplayForm] = useState(false);
	const [formTitle, setFormTitle] = useState("");
	const [formData, setFormData] = useState({});
	const [action, setAction] = useState("");
	const [userId, setUserId] = useState("");
	const [render, setRender] = useState(false);
	const [accounts, setAccounts] = useState([]);

	const navigate = useNavigate();

	const gridStyle = {
		display: "flex",
		flexDirection: "column",
		// borderRadius: 8,
		// border: "solid black 4px",
		borderRadius: 15,
		border: "4px solid #d41c2d",
		minHeight: 200,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: "40px",
	};

	const iconStyle = {
		justifyContent: "center",
		alignItems: "center",
		padding: 8,
		fontSize: "20px",
	};

	const handleInputChange = (e) => {
		setUserId(e.target.value);
	};
	const getUser = async (event) => {
		event.preventDefault();
		try {
			const user = await axios.get(
				`http://localhost:8080/getCustomer/${userId}`
			);
			setRender(true);
			setFormData(user.data);
		} catch (e) {
			enqueueSnackbar(`No customer exists with Id: ${userId}`, "error");
		}
	};

	const getAccounts = async () => {
		const response = await axios.get(
			`http://localhost:8080/fetchAccounts/${userId}`
		);
		setAccounts(response.data);
		console.log(response.data);
	};

	const createAccount = () => {
		setDisplayForm(true);
		setFormTitle("Create Account");
		setAction("Create");
	};

	const deleteAccount = () => {
		getAccounts();
		setDisplayForm(true);
		setFormTitle("Delete Account");
		setAction("Delete");
	};

	const disableAccount = () => {
		getAccounts();
		setDisplayForm(true);
		setFormTitle("Disable Account");
		setAction("Disable");
	};

	const viewTransactions = () => {
		getAccounts();
		setDisplayForm(true);
		setFormTitle("View Transactions");
		setAction("Transactions");
	};

	const editAccount = () => {
		setDisplayForm(true);
		setFormTitle("Edit Account");
		setAction("Edit");
	};

	return (
		<>
			<AppBar
				style={{ background: "#D41C2C", textAlign: "center" }}
				position="static"
			>
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h4" sx={{ flexGrow: 1 }}>
						Admin Dashboard
					</Typography>
					<Button
						color="inherit"
						// sx={{
						// 	border: "3px solid #FCCC44",
						// 	borderRadius: "10px",
						// }}
						onClick={() => navigate("/")}
					>
						Home
					</Button>
					<Button
						onClick={() => {
							sessionStorage.removeItem("userId");
							window.location.reload();
						}}
						color="inherit"
						sx={{
							border: "3px solid #FCCC44",
							borderRadius: "10px",
						}}
					>
						Logout
					</Button>
				</Toolbar>
			</AppBar>
			<br />
			<br />
			{!render && (
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						flexDirection: "column",
					}}
				>
					<p>
						<AdminPanelSettingsIcon fontSize="large" />
					</p>
					<Typography variant="h4" component="div">
						Welcome to Admin's dashboard!
					</Typography>
					<Typography variant="h6" fontStyle="italic" component="div">
						Enter the customer Id to fetch their account management system
					</Typography>
					<form style={{ width: "300px" }} onSubmit={getUser}>
						<TextField
							style={{
								width: "150px",
								backgroundColor: "white",
								margin: "10px",
								borderRadius: "10px",
								border: "3px solid #FCCC44",
							}}
							onChange={handleInputChange}
							name="userId"
							value={userId}
							label="Customer's Id"
						/>
						<Button
							type="submit"
							variant="contained"
							style={{
								color: "white",
								backgroundColor: "#D41C2C",
								marginTop: "20px",
								width: "70px",
								borderRadius: "15px",
								border: "3px solid #FCCC44",
							}}
						>
							Submit
						</Button>
					</form>
				</div>
			)}

			{render && (
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						margin: "0 8%",
					}}
				>
					<form style={{ width: "300px" }} onSubmit={getUser}>
						<TextField
							style={{
								width: "150px",
								backgroundColor: "white",
								margin: "10px",
								borderRadius: "10px",
								border: "3px solid #FCCC44",
							}}
							onChange={handleInputChange}
							name="userId"
							value={userId}
							label="Customer's Id"
						/>
						<Button
							type="submit"
							variant="contained"
							style={{
								color: "white",
								backgroundColor: "#D41C2C",
								marginTop: "20px",
								width: "70px",
								borderRadius: "15px",
								border: "3px solid #FCCC44",
							}}
						>
							Submit
						</Button>
					</form>
					<Typography
						variant="h4"
						component="div"
						style={{ textAlign: "right" }}
					>
						{formData.name}'s
						<p
							style={{
								fontSize: "20px",
								fontStyle: "italic",
								marginTop: "0px",
							}}
						>
							Account Management System
						</p>
					</Typography>
				</div>
			)}
			<br />
			{render && (
				<Grid container sx={{ color: "#ff5959" }}>
					<Grid item xs={1} />
					<Grid item container xs={10}>
						<Grid item container xs={12} spacing={3}>
							<Grid item container xs={4}>
								<div
									style={gridStyle}
									className="action-button"
									onClick={createAccount}
								>
									<div style={iconStyle}>
										<PersonAddIcon fontSize="large" />
									</div>
									<div>
										<label
											style={{ fontSize: 18, fontWeight: "500" }}
											className="text-pointer"
										>
											Create Account
										</label>
									</div>
								</div>
							</Grid>

							<Grid item container xs={4}>
								<div
									style={gridStyle}
									className="action-button"
									onClick={deleteAccount}
								>
									<div style={iconStyle}>
										<PersonRemoveIcon fontSize="large" />
									</div>
									<div>
										<label
											style={{ fontSize: 18, fontWeight: "500" }}
											className="text-pointer"
										>
											Delete Account
										</label>
									</div>
								</div>
							</Grid>

							<Grid item container xs={4}>
								<div
									style={gridStyle}
									className="action-button"
									onClick={disableAccount}
								>
									<div style={iconStyle}>
										<PersonOffIcon fontSize="large" />
									</div>
									<div>
										<label
											style={{ fontSize: 18, fontWeight: "500" }}
											className="text-pointer"
										>
											Disable Account
										</label>
									</div>
								</div>
							</Grid>
						</Grid>

						{displayForm && (
							<DialogForm
								open={displayForm}
								formTitle={formTitle}
								setDisplayForm={setDisplayForm}
								formData={formData}
								setFormData={setFormData}
								action={action}
								accounts={accounts}
							></DialogForm>
						)}

						<Grid item container xs={12} spacing={3}>
							<Grid item container xs={4}>
								<div
									style={gridStyle}
									className="action-button"
									onClick={viewTransactions}
								>
									<div style={iconStyle}>
										<ReceiptLongIcon fontSize="large" />
									</div>
									<div>
										<label
											style={{ fontSize: 18, fontWeight: "500" }}
											className="text-pointer"
										>
											View Transactions
										</label>
									</div>
								</div>
							</Grid>
							<Grid item container xs={4}>
								<div
									style={gridStyle}
									className="action-button"
									onClick={editAccount}
								>
									<div style={iconStyle}>
										<ManageAccountsIcon fontSize="large" />
									</div>
									<div>
										<label
											style={{ fontSize: 18, fontWeight: "500" }}
											className="text-pointer"
										>
											Edit Customer Details
										</label>
									</div>
								</div>
							</Grid>
							<Grid item container xs={4}>
								<div style={gridStyle} className="action-button">
									<div style={iconStyle}>
										<ReadMoreIcon fontSize="large" />
										{/* <MoreVertIcon /> */}
									</div>
									<div>
										<label
											style={{ fontSize: 18, fontWeight: "500" }}
											className="text-pointer"
										>
											More
										</label>
									</div>
								</div>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			)}
		</>
	);
}
