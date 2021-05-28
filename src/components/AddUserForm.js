import React, { useState } from 'react';
import { CountryList } from './constants/countryList';
import styles from './AddUserForm.module.css';

const AddUserForm = (props) => {
	const [fname, setFname] = useState('');
	const [lname, setLname] = useState('');
	const [email, setEmail] = useState('');
	const [country, setCountry] = useState('');
	const [filteredCountry, setFilteredCountry] = useState([]);
	const [dob, setDob] = useState('');
	const [gender, setGender] = useState('');
	const [error, setError] = useState({
		fnameError: '',
		genderError: '',
		isFnameValid: false,
		isGenderValid: false,
	});

	let countryLists = CountryList;

	const fnameChangeHandler = (event) => {
		setFname(event.target.value);
	};

	//firstname validation
	const fnameOnBlur = () => {
		if (fname.length < 3) {
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
	};

	const lnameChangeHandler = (event) => {
		setLname(event.target.value);
	};

	const emailChangeHandler = (event) => {
		setEmail(event.target.value);
	};

	const countryChangeHandler = (event) => {
		setCountry(event.target.value);
		setFilteredCountry(
			countryLists.filter((element) => {
				return element.toLowerCase().includes(event.target.value);
			})
		);
	};

	const suggestionHandler = (event) => {
		setCountry(event.target.innerText);
		setFilteredCountry([]);
	};

	const dobChangeHandler = (event) => {
		setDob(event.target.value);
	};

	const genderChangeHandler = (event) => {
		setGender(event.target.value);
		setError((prevValue) => ({
			...prevValue,
			isGenderValid: true,
			genderError: '',
		}));
	};

	const submitHandler = (event) => {
		event.preventDefault();

		//gender validation
		if (error.isGenderValid === false) {
			setError((prevValue) => ({
				...prevValue,
				genderError: 'Gender: not marked',
			}));
		}

		//preventing data submit
		if (error.isGenderValid === false || error.isFnameValid === false) {
			return;
		}

		const userData = {
			fname: fname,
			lname: lname,
			email: email,
			country: country,
			dob: dob,
			gender: gender,
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
							value={fname}
							onChange={fnameChangeHandler}
							required
							onBlur={fnameOnBlur}
						/>
						<p style={{ color: 'red' }}>{error.fnameError}</p>
					</div>

					<div>
						<label>Lastname</label>
						<input
							type="text"
							value={lname}
							onChange={lnameChangeHandler}
						/>
					</div>

					<div>
						<label>Email</label>
						<input
							type="email"
							value={email}
							onChange={emailChangeHandler}
							required
						/>
					</div>

					<div>
						<label>Country</label>
						<input
							type="text"
							value={country}
							onChange={countryChangeHandler}
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
							value={dob}
							onChange={dobChangeHandler}
							required
						/>
					</div>
					<div>
						<label>Gender</label>
						<input
							type="radio"
							name="gender"
							value="male"
							onChange={genderChangeHandler}
						/>
						Male
						<input
							type="radio"
							name="gender"
							value="female"
							onChange={genderChangeHandler}
						/>
						Female
						<input
							type="radio"
							name="gender"
							value="others"
							onChange={genderChangeHandler}
						/>
						Others
						<br />
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
