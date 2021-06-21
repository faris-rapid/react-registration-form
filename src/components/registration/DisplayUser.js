import React from 'react';
import Table from '@material-ui/core/Table';
import { TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import PropTypes from 'prop-types';
import { v4 } from 'uuid';
import { useSelector } from 'react-redux';

const DisplayUser = () => {
	const formData = useSelector((state) => state.formData);
	const interestList = useSelector((state) => state.interestList);

	const userData = {
		...formData,
		interest: interestList.map((element) => <li key={v4()}>{element}</li>),
	};

	return (
		<div style={{ margin: 'auto', width: '50%' }}>
			<h2>User Details</h2>

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
						{Object.keys(userData).map((item, index) => {
							return (
								<TableRow key={v4()}>
									<TableCell>{item}</TableCell>
									<TableCell>{userData[item]}</TableCell>
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

DisplayUser.propTypes = {
	userData: PropTypes.object,
};
