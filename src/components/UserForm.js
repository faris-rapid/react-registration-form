import React, { useState } from 'react';
import { CountryList } from './constants/countryList';
import styles from './AddUserForm.module.css';

const UserForm = (props) => {
	const [formData, setFormData] = useState({
		fname: '',
		lname: '',
		email: '',
		country: '',
		dob: '',
		gender: null,
		interest: null,
	});
	const [interestList, setInterestList] = useState([]);
	const [filteredCountry, setFilteredCountry] = useState([]);
	const [error, setError] = useState({
		fnameError: null,
		genderError: null,
	});

	let countryLists = CountryList;

	const suggestionHandler = (event) => {
		setFormData({ ...formData, country: event.target.innerText });
		setFilteredCountry([]);
	};

	const eventChangeHandler = (event) => {
		setFormData({ ...formData, [event.target.name]: event.target.value });

		//country type ahead
		if (event.target.name === 'country') {
			setFilteredCountry(
				countryLists.filter((element) => {
					return element.toLowerCase().includes(event.target.value);
				})
			);
		}

		if (event.target.name === 'gender') {
			//gender validation
			setError((prevValue) => ({
				...prevValue,
				genderError: null,
			}));
		}
	};

	//adding new interest
	const addInterestHandler = () => {
		let list = [...interestList];

		//interest validation
		if (!formData.interest) {
			setError({
				...error,
				interestError: 'Interest cannot be blank',
			});
		} else if (!list.every((element) => element !== formData.interest)) {
			setError({
				...error,
				interestError: `${formData.interest} already taken`,
			});
		} else {
			//adding data to interestList
			setError({ ...error, interestError: null });
			setInterestList([...interestList, formData.interest]);
		}
		setFormData({ ...formData, interest: '' });
	};

	//removing existing interest
	const removeInterestHandler = (index) => {
		const list = [...interestList];
		list.splice(index, 1);
		setInterestList(list);
	};

	const submitHandler = (event) => {
		event.preventDefault();

		//fname validation
		if (formData.fname.length < 3) {
			setError((prevValue) => ({
				...prevValue,
				fnameError: 'Firstname must contain more than two characters',
			}));
		} else {
			setError((prevValue) => ({
				...prevValue,
				fnameError: null,
			}));
		}

		//gender validation
		if (!formData.gender) {
			setError((prevValue) => ({
				...prevValue,
				genderError: 'Gender not marked',
			}));
		}

		//preventing data submit
		if (!formData.gender || formData.fname.length < 3) {
			return;
		}

		const userData = {
			...formData,
			interestList,
		};

		props.regData(userData);
	};

	const {
		fname = '',
		lname = '',
		email = '',
		country = '',
		dob = '',
		interest = '',
	} = formData;

	return (
		<div>
			<h2 style={{ textAlign: 'center' }}>Registration</h2>
			<div className={styles.input}>
				<form onSubmit={submitHandler}>
					<div>
						<label>Firstname</label>
						<input
							type="text"
							name="fname"
							value={fname}
							onChange={eventChangeHandler}
							required
						/>
						<div style={{ color: 'red' }}>{error.fnameError}</div>
					</div>
					<div>
						<label>Lastname</label>
						<input
							type="text"
							name="lname"
							value={lname}
							onChange={eventChangeHandler}
						/>
					</div>
					<div>
						<label>Email</label>
						<input
							type="email"
							name="email"
							value={email}
							onChange={eventChangeHandler}
							required
						/>
					</div>
					<div>
						<label>Country</label>
						<input
							type="text"
							name="country"
							value={country}
							onChange={eventChangeHandler}
							required
						/>
						{filteredCountry.map((element) => (
							<li key={element} onClick={suggestionHandler}>
								{element}
							</li>
						))}
					</div>
					<div>
						<label>Date of Birth</label>
						<input
							type="date"
							name="dob"
							value={dob}
							onChange={eventChangeHandler}
							required
						/>
					</div>
					<div>
						<label>Area of Interests</label>
						<br />
						<input
							style={{ width: '70%' }}
							type="text"
							name="interest"
							value={interest}
							onChange={eventChangeHandler}
						/>

						<button type="button" onClick={addInterestHandler}>
							+
						</button>
						<div style={{ color: 'red' }}>{error.interestError}</div>
						{interestList.map((element, index) => (
							<li key={element}>
								{element}
								<button
									type="button"
									style={{ backgroundColor: 'red', padding: '0.8px 3px' }}
									onClick={removeInterestHandler}>
									x
								</button>
							</li>
						))}
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
						<div style={{ color: 'red' }}>{error.genderError}</div>
						<br />
						<button type="submit">Submit</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default UserForm;
