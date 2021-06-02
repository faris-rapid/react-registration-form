import React from 'react';

const DisplayUser = (props) => {
	return (
		<div style={{ margin: 'auto', width: '50%' }}>
			<h2>User Details</h2>
			<h4>
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
				</h4>
			</div>
		</div>
	);
};

export default DisplayUser;
