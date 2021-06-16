import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registrationActions } from '../../store/index';
import { CountryList } from '../../constants/countryList';
import styles, { addButton, removeButton } from './UserForm.module.css';

const UserForm = () => {
	const formData = useSelector((state) => state.formData);
	const filteredCountry = useSelector((state) => state.filteredCountry);
	const interestList = useSelector((state) => state.interestList);
	const error = useSelector((state) => state.error);
	const dispatch = useDispatch();
	let history = useHistory();

	let countryLists = CountryList;

	const suggestionHandler = (event) => {
		dispatch(
			registrationActions.onChangeHandler({ country: event.target.innerText })
		);
		dispatch(registrationActions.countrySelect([]));
	};

	const eventChangeHandler = (event) => {
		dispatch(
			registrationActions.onChangeHandler({
				[event.target.name]: event.target.value,
			})
		);
		//country type ahead
		if (event.target.name === 'country') {
			dispatch(
				registrationActions.countrySelect(
					countryLists.filter((element) => {
						return element.toLowerCase().includes(event.target.value);
					})
				)
			);
		}
		//gender error removal on selecting
		if (event.target.name === 'gender') {
			dispatch(registrationActions.errorHandler({ genderError: null }));
		}
	};

	//adding new interest
	const addInterestHandler = () => {
		let list = [...interestList];
		//interest validation
		if (formData.interest === '') {
			dispatch(
				registrationActions.errorHandler({
					interestError: 'Interest cannot be blank',
				})
			);
		} else if (!list.every((element) => element !== formData.interest)) {
			dispatch(
				registrationActions.errorHandler({
					interestError: `${formData.interest} already taken`,
				})
			);
		} else {
			dispatch(registrationActions.errorHandler({ interestError: null }));
			dispatch(registrationActions.interestListAdd(interest));
		}
		// setFormData({ ...formData, interest: '' });
		dispatch(registrationActions.onChangeHandler({ interest: '' }));
	};

	//removing existing interest
	const removeInterestHandler = (index) => {
		const list = [...interestList];
		list.splice(index, 1);
		dispatch(registrationActions.interestListRemove(list));
	};

	const submitHandler = (event) => {
		event.preventDefault();
		//fname validation
		if (formData.firstname.length < 3) {
			dispatch(
				registrationActions.errorHandler({
					fnameError: 'Firstname must contain more than two characters',
				})
			);
		} else {
			dispatch(
				registrationActions.errorHandler({
					fnameError: null,
				})
			);
		}
		//gender validation
		if (!formData.gender) {
			dispatch(
				registrationActions.errorHandler({
					genderError: 'Gender not marked',
				})
			);
		}
		//preventing data submit
		if (formData.gender === '' || formData.firstname.length < 3) {
			return;
		}
		//route to DisplayUser page
		history.push('/formDetails');
	};

	const onBlurhandler = (event) => {
		let formErrors = {};
		//field required validation
		if (event.target.value === '') {
			formErrors[
				`${event.target.name}Error`
			] = `${event.target.name} is required`;
		} else {
			formErrors[`${event.target.name}Error`] = null;
			console.log();
		}
		dispatch(registrationActions.errorHandler(formErrors));
	};

	const {
		firstname = '',
		lastname = '',
		username = '',
		email = '',
		mobile = '',
		address = '',
		country = '',
		pin = '',
		dob = '',
		interest = '',
	} = formData;

	const {
		firstnameError,
		lastnameError,
		usernameError,
		emailError,
		dobError,
		mobileError,
		countryError,
		pinError,
		addressError,
		interestError,
	} = error;

	return (
		<div>
			<h2 style={{ textAlign: 'center' }}>Registration</h2>
			<div className={styles.input}>
				<form onSubmit={submitHandler}>
					<div>
						<label>Firstname</label>
						<input
							type="text"
							name="firstname"
							value={firstname}
							onChange={eventChangeHandler}
							onBlur={onBlurhandler}
							required
						/>
						{firstnameError && (
							<div style={{ color: 'red' }}>{firstnameError}</div>
						)}

						<div style={{ color: 'red' }}>{error.fnameError}</div>
					</div>
					<div>
						<label>Lastname</label>
						<input
							type="text"
							name="lastname"
							value={lastname}
							onBlur={onBlurhandler}
							onChange={eventChangeHandler}
							required
						/>
						{lastnameError && (
							<div style={{ color: 'red' }}>{lastnameError}</div>
						)}
					</div>
					<div>
						<label>Username</label>
						<input
							type="text"
							name="username"
							value={username}
							onBlur={onBlurhandler}
							onChange={eventChangeHandler}
							required
						/>
						{usernameError && (
							<div style={{ color: 'red' }}>{usernameError}</div>
						)}
					</div>
					<div>
						<label>Email</label>
						<input
							type="email"
							name="email"
							value={email}
							onChange={eventChangeHandler}
							onBlur={onBlurhandler}
							required
						/>
						{emailError && <div style={{ color: 'red' }}>{emailError}</div>}
					</div>
					<div>
						<label>Mobile number</label>
						<input
							type="number"
							name="mobile"
							value={mobile}
							onChange={eventChangeHandler}
							onBlur={onBlurhandler}
							required
						/>
						{mobileError && <div style={{ color: 'red' }}>{mobileError}</div>}
					</div>
					<div>
						<label>Address</label>
						<textarea
							type="text"
							name="address"
							value={address}
							onChange={eventChangeHandler}
							onBlur={onBlurhandler}
							required
						/>
						{addressError && <div style={{ color: 'red' }}>{addressError}</div>}
					</div>
					<div>
						<label>Country</label>
						<input
							type="text"
							name="country"
							value={country}
							onChange={eventChangeHandler}
							onBlur={onBlurhandler}
							required
						/>
						{countryError && <div style={{ color: 'red' }}>{countryError}</div>}
						{filteredCountry.map((element) => (
							<li key={element} onClick={suggestionHandler}>
								{element}
							</li>
						))}
					</div>
					<div>
						<label>PIN Code</label>
						<input
							type="number"
							name="pin"
							value={pin}
							onChange={eventChangeHandler}
							onBlur={onBlurhandler}
							required
						/>
						{pinError && <div style={{ color: 'red' }}>{pinError}</div>}
					</div>
					<div>
						<label>Date of Birth</label>
						<input
							type="date"
							name="dob"
							value={dob}
							onChange={eventChangeHandler}
							onBlur={onBlurhandler}
							required
						/>
						{dobError && <div style={{ color: 'red' }}>{dobError}</div>}
					</div>
					<div>
						<label>Area of Interests</label>
						<br />
						<input
							style={{ width: '70%' }}
							type="text"
							name="interest"
							value={interest}
							onBlur={onBlurhandler}
							onChange={eventChangeHandler}
						/>

						<button
							className={addButton}
							type="button"
							onClick={addInterestHandler}>
							+
						</button>
						<div style={{ color: 'red' }}>{interestError}</div>
						<div>
							{interestList.map((element, index) => (
								<li key={element}>
									{element}{' '}
									<button
										className={removeButton}
										type="button"
										onClick={() => removeInterestHandler(index)}>
										x
									</button>
								</li>
							))}
						</div>
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
