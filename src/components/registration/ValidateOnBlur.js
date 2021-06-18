const ValidateOnBlur = (name, formData, interestList) => {
	let errors = {};
	const {
		firstname,
		lastname,
		username,
		email,
		mobile,
		address,
		country,
		pin,
		dob,
	} = formData;

	switch (name) {
		case 'firstname':
			if (!firstname.trim()) {
				errors.firstnameError = 'firstname is required';
			} else if (firstname.length < 3) {
				errors.firstnameError = 'more than 2 letters required';
			} else if (!/^[a-zA-Z]+$/.test(firstname)) {
				errors.firstnameError = 'only alphabets are allowed';
			} else {
				errors.firstnameError = null;
			}
			break;

		case 'lastname':
			if (!lastname.trim()) {
				errors.lastnameError = 'lastname is required';
			} else if (!/^[a-zA-Z]+$/.test(lastname)) {
				errors.lastnameError = 'only alphabets are alloweed';
			} else if (lastname.length < 3) {
				errors.lastnameError = 'more than 2 letters required';
			} else {
				errors.lastnameError = null;
			}
			break;

		case 'username':
			if (!username.trim()) {
				errors.usernameError = 'username is required';
			} else if (!/^[a-zA-Z0-9]+$/.test(username)) {
				errors.usernameError = 'special characters are not alloweed';
			} else if (username.length < 2) {
				errors.usernameError = 'more than 2 letters required';
			} else {
				errors.usernameError = null;
			}
			break;

		case 'email':
			if (!email.trim()) {
				errors.emailError = 'email is required';
			} else if (
				!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)
			) {
				errors.emailError = 'invalid email';
			} else {
				errors.emailError = null;
			}
			break;

		case 'mobile':
			if (!mobile.trim()) {
				errors.mobileError = 'mobile is required';
			} else if (!/^[0-9]/.test(mobile)) {
				errors.mobileError = 'only numbers are allowed';
			} else {
				errors.mobileError = null;
			}
			break;

		case 'address':
			if (!address.trim()) {
				errors.addressError = 'address is required';
			} else if (!/^[a-zA-Z0-9]+$/.test(address)) {
				errors.addressError = 'special characters are not allowed';
			} else {
				errors.addressError = null;
			}
			break;

		case 'country':
			if (!country.trim()) {
				errors.countryError = 'country is required';
			} else if (!/^[a-zA-Z]+$/.test(country)) {
				errors.countryError = 'only alphabets are allowed';
			} else {
				errors.countryError = null;
			}
			break;

		case 'pin':
			if (!pin.trim()) {
				errors.pinError = 'pin is required';
			} else if (!/^[0-9]/.test(pin)) {
				errors.pinError = 'only numbers are allowed';
			} else {
				errors.pinError = null;
			}
			break;

		case 'dob':
			if (!dob.trim()) {
				errors.dobError = 'date of birth is required';
			} else {
				errors.dobError = null;
			}
			break;

		case 'interest':
			if (!interestList.length) {
				errors.interestError = 'interest is required';
			} else {
				errors.interestError = null;
			}
			break;

		default:
			console.log('ee');
			break;
	}
	console.log('onSubmit', errors);

	return errors;
};

export default ValidateOnBlur;
