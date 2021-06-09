import React from 'react';
import Table from '@material-ui/core/Table';
import { TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

const DisplayUser = (props) => {
	const userData = {
		Name: `${props.userData.fname} ${props.userData.lname}`,
		Email: props.userData.email,
		DOB: props.userData.dob,
		Gender: props.userData.gender,
		Interests: props.userData.interestList.map((element) => <li>{element}</li>),
	};

	return (
		<div style={{ margin: 'auto', width: '50%' }}>
			<h2>User Details</h2>
			{/* <h4>
				Name: {props.userData.fname} {props.userData.lname}
			</h4>
			<div>
				<h4>Email: {props.userData.email}</h4>
				<h4>Country: {props.userData.country}</h4>
				<h4>DOB: {props.userData.dob}</h4>
				<h4>Gender: {props.userData.gender}</h4>
				<h4>
					Interests:{' '}
					{props.userData.interestList.map((element) => (
						<li>{element}</li>
					))}
				</h4> */}
			{/* </div> */}

			<div>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>
								<b>Key</b>
							</TableCell>
							<TableCell>
								<b>Details</b>
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{Object.keys(userData).map((key, index) => {
							return (
								<TableRow key={index}>
									<TableCell>{key}</TableCell>
									<TableCell>{userData[key]}</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</div>
		</div>
	);
};

export default DisplayUser;
