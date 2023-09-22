import { Grid, Paper, Typography } from "@mui/material";
import React from "react";
import NavBar from "./NavBar";
// import { Grid, Paper, Typography } from "@material-ui/core";

const TheDevelopers = () => {
	const people = [
		{
			name: "Vishal K Ramesh",
			photoUrl: "https://avatars.githubusercontent.com/u/121876940?v=4",
			kId: "K12345",
			emailId: "person1@example.com",
			contributions: "Frontend and Backend",
			collegeName: "College Name of Person 1",
		},
		{
			name: "Saptarshi Sarkar",
			photoUrl: "https://avatars.githubusercontent.com/u/67330269?v=4",
			kId: "K23456",
			emailId: "person2@example.com",
			contributions: "Frontend and Backend",
			collegeName: "College Name of Person 2",
		},
		{
			name: "Arnav K Banerjee",
			photoUrl: "https://avatars.githubusercontent.com/u/58857543?v=4",
			kId: "K34567",
			emailId: "person3@example.com",
			contributions: "Frontend and Backend",
			collegeName: "College Name of Person 3",
		},
		{
			name: "Vaasu Gambhir",
			photoUrl: "https://avatars.githubusercontent.com/u/55234743?v=4",
			kId: "K45678",
			emailId: "person4@example.com",
			contributions: "Frontend and Backend",
			collegeName: "College Name of Person 4",
		},
		{
			name: "Gowsiman Ar",
			photoUrl: "https://via.placeholder.com/150",
			kId: "K56789",
			emailId: "person5@example.com",
			contributions: "Frontend and Backend",
			collegeName: "College Name of Person 5",
		},
	];

	return (
		<>
			<NavBar />

			<Grid
				container
				style={{
					background:
						"linear-gradient(109.6deg, rgb(240, 228, 122) 11.2%, rgb(253, 145, 212) 54.5%, rgb(176, 222, 234) 99.6%)",
				}}
			>
				<Grid item xs={1} />
				<Grid container item md={10}>
					<div style={{ borderRadius: "15px", overflow: "hidden" }}>
						<Grid container spacing={3} style={{ margin: "10px" }}>
							{people.map((person, index) => (
								<Grid
									item
									xs={12}
									sm={6}
									md={index < 3 ? 4 : 6}
									lg={index < 3 ? 3 : 6}
									key={person.kId}
								>
									<Paper
										style={{
											padding: "10px",
											textAlign: "center",
											color: "#000",
											backgroundColor: "#fff",
											borderRadius: "15px",
											transition: "background-color 0.3s ease-in-out",
											margin: "10px",
											width: "300px",
										}}
										elevation={2}
									>
										<img
											src={person.photoUrl}
											alt={person.name}
											style={{
												borderRadius: "25px",
												maxWidth: "200px",
												height: "auto",
												marginTop: "10px",
											}}
										/>
										<Typography variant="h6">{person.name}</Typography>
										<Typography variant="subtitle1">{`K-id : ${person.kId}`}</Typography>
										<Typography variant="subtitle1">{`Email : ${person.emailId}`}</Typography>
										<Typography variant="subtitle1">{`Contributions : ${person.contributions}`}</Typography>
										<Typography variant="subtitle1">{`College : ${person.collegeName}`}</Typography>
									</Paper>
								</Grid>
							))}
						</Grid>
					</div>
				</Grid>
				<Grid item xs={1} />
			</Grid>
		</>
	);
};

export default TheDevelopers;
