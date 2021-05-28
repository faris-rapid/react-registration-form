import React from 'react';

const DisplayUser = (props) => {
	return (
		<div>
			<h2>User Details</h2>
			<h3>
				Name: {props.userData.fname} {props.userData.lname}
			</h3>
			<div>
				<h4>Email: {props.userData.email}</h4>
				<h4>Country: {props.userData.country}</h4>
				<h4>DOB: {props.userData.dob}</h4>
				<h4>Gender: {props.userData.gender}</h4>
			</div>
		</div>
	);
};

export default DisplayUser;
