import React, { useState } from 'react';
import { CountryList } from './constants/countryList';
import styles from './AddUserForm.module.css';

const AddUserForm = (props) => {
	const [formData, setFormData] = useState({
		fname: '',
		lname: '',
		email: '',
		country: '',
		dob: '',
		gender: '',
	});

	const [filteredCountry, setFilteredCountry] = useState([]);
	const [error, setError] = useState({
		fnameError: '',
		genderError: '',
		isGenderValid: false,
	});

	let countryLists = CountryList;

	const suggestionHandler = (event) => {
		setFormData({ formData, country: event.target.innerText });
		setFilteredCountry([]);
	};

	const eventChangeHandler = (event) => {
		setFormData({ ...formData, [event.target.name]: event.target.value });

		//country type ahead
		if (event.target.name === 'country')
			setFilteredCountry(
				countryLists.filter((element) => {
					return element.toLowerCase().includes(event.target.value);
				})
			);

		//gender validation
		if (event.target.name === 'gender') {
			setError((prevValue) => ({
				...prevValue,
				isGenderValid: true,
				genderError: '',
			}));
		}
	};

	const submitHandler = (event) => {
		event.preventDefault();

		//fname validation
		if (formData.fname.length < 3) {
			setError((prevValue) => ({
				...prevValue,
				fnameError: 'Firstname: must contain more than two characters',
			}));
		} else {
			setError((prevValue) => ({
				...prevValue,
				isFnameValid: true,
				fnameError: '',
			}));
		}

		//gender validation
		if (error.isGenderValid === false) {
			setError((prevValue) => ({
				...prevValue,
				genderError: 'Gender: not marked',
			}));
		}

		//preventing data submit
		if (error.isGenderValid === false || formData.fname.length < 3) {
			return;
		}

		const userData = {
			fname: formData.fname,
			lname: formData.lname,
			email: formData.email,
			country: formData.country,
			dob: formData.dob,
			gender: formData.gender,
		};

		props.regData(userData);
	};

	return (
		<div>
			<h2>Registration</h2>
			<div className={styles.input}>
				<form onSubmit={submitHandler}>
					<div>
						<label>Firstname</label>
						<input
							type="text"
							name="fname"
							value={formData.fname}
							onChange={eventChangeHandler}
							required
						/>
					</div>

					<div>
						<label>Lastname</label>
						<input
							type="text"
							name="lname"
							value={formData.lname}
							onChange={eventChangeHandler}
						/>
					</div>

					<div>
						<label>Email</label>
						<input
							type="email"
							name="email"
							value={formData.email}
							onChange={eventChangeHandler}
							required
						/>
					</div>

					<div>
						<label>Country</label>
						<input
							type="text"
							name="country"
							value={formData.country}
							onChange={eventChangeHandler}
							required
						/>
						{filteredCountry.map((element) => (
							<li key={element} onClick={suggestionHandler}>
								{element}
							</li>
						))}
						<br />
					</div>

					<div>
						<label>Date of Birth</label>
						<input
							type="date"
							name="dob"
							value={formData.dob}
							onChange={eventChangeHandler}
							required
						/>
					</div>
					<div>
						<label>Gender</label>
						<input
							type="radio"
							name="gender"
							value="male"
							onChange={eventChangeHandler}
						/>
						Male
						<input
							type="radio"
							name="gender"
							value="female"
							onChange={eventChangeHandler}
						/>
						Female
						<input
							type="radio"
							name="gender"
							value="others"
							onChange={eventChangeHandler}
						/>
						Others
						<br />
						<p style={{ color: 'red' }}>{error.fnameError}</p>
						<p style={{ color: 'red' }}>{error.genderError}</p>
						<br />
						<button>Submit</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddUserForm;
