import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
	formData: {
		firstname: '',
		lastname: '',
		username: '',
		email: '',
		mobile: '',
		address: '',
		country: '',
		pin: '',
		dob: '',
		gender: '',
		interest: '',
	},
	error: {
		firstnameError: '',
		lastnameError: '',
		usernameError: '',
		emailError: '',
		dobError: '',
		mobileError: '',
		countryError: '',
		pinError: '',
		addressError: '',
		interestError: '',
		genderError: '',
	},
	interestList: [],
	filteredCountry: [],
};

const registrationSlice = createSlice({
	name: 'registration',
	initialState,
	reducers: {
		onChangeHandler: (state, action) => {
			state.formData = { ...state.formData, ...action.payload };
		},
		countrySelect: (state, action) => {
			state.filteredCountry = action.payload;
		},
		errorHandler: (state, action) => {
			state.error = { ...state.error, ...action.payload };
		},
		interestListAdd: (state, action) => {
			state.interestList.push(action.payload);
		},
		interestListRemove: (state, action) => {
			state.interestList = [...action.payload];
		},
	},
});

const store = configureStore({
	reducer: registrationSlice.reducer,
});

export const registrationActions = registrationSlice.actions;
export default store;
