import React, { useState, useEffect } from "react";
import axios from "axios";

const Marque = (props) => {
	// const userId = sessionStorage.getItem("userId");
	const { userName } = props;
	const userId = userName.userId;

	const [accounts, setAccounts] = useState([]);
	const [index, setIndex] = useState(0);
	const [balance, setBalance] = useState(0);

	useEffect(() => {
		axios
			.get(`http://localhost:8080/fetchAccounts/${userId}`)
			.then((response) => {
				let numbers = response.data.map((accountNo) => accountNo.accNo);
				setAccounts(numbers);
				// console.log(accounts);
			})
			.catch((err) => {
				console.error(err);
			});
	}, userId);
	useEffect(() => {
		if (accounts.length > 0) {
			const accNo = accounts[index];
			axios
				.get(`http://localhost:8080/getAccountBalance/${accNo}`)
				.then((res) => {
					// console.log(res);
					setBalance(res.data);
				})
				.catch((err) => {
					console.error(err);
				});
		}
	}, [accounts, index]);

	useEffect(() => {
		const timer = setInterval(() => {
			setIndex((i) => (i + 1) % accounts.length);
		}, 1800);
		return () => clearInterval(timer);
	}, [accounts]);

	return (
		<>
			<div
				style={{
					background:
						"linear-gradient(-319.6deg, rgb(243, 0, 79) 20.5%, rgb(255, 236, 68) 110.9%)",
					width: "100%",
					margin: "10px",
					borderRadius: "15px",
					color: "white",
					fontFamily: "revert",
					fontWeight: "700",
					fontSize: "1.17rem",
				}}
			>
				{accounts.length > 0 ? (
					<p>
						In your A/C: <i>XXXXXXX{accounts[index] % 100000}</i>, the balance
						is : ${balance}
					</p>
				) : (
					<p>No accounts found ! Please open a new account with us </p>
				)}
			</div>
		</>
	);
};

export default Marque;
