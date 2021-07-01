import { reducer, registrationActions } from './index';

const {
	onChangeHandler,
	countrySelect,
	errorHandler,
	interestListAdd,
	interestListRemove,
} = registrationActions;

it('should return the initial state', () => {
	expect(reducer(undefined, {})).toEqual({
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
	});
});

describe('reducer tests', () => {
	//onChangeHandler
	it('should handle onChangeHandler to add values', () => {
		const previousState = {};
		expect(
			reducer(previousState, onChangeHandler({ firstname: 'John' }))
		).toEqual({
			formData: {
				firstname: 'John',
			},
		});
	});

	it('should handle onChange to add to an existing value', () => {
		const previousState = {
			formData: {
				firstname: 'John',
			},
		};
		expect(
			reducer(previousState, onChangeHandler({ firstname: 'Mike' }))
		).toEqual({
			formData: {
				firstname: 'Mike',
			},
		});
	});

	//countrySelect
	it('should handle countrySelect to add to filteredCountry', () => {
		const previousState = {};
		expect(
			reducer(previousState, countrySelect(['India', 'China', 'Spain']))
		).toEqual({
			filteredCountry: ['India', 'China', 'Spain'],
		});
	});

	//errorHandler
	it('should handle errorHandler to add errors', () => {
		const previousState = {};
		expect(
			reducer(
				previousState,
				errorHandler({ firstnameError: 'firstname is required' })
			)
		).toEqual({
			error: { firstnameError: 'firstname is required' },
		});
	});

	it('should handle errorHandler to add other errors', () => {
		const previousState = {
			error: { firstnameError: 'firstname is required' },
		};
		expect(
			reducer(previousState, errorHandler({ emailError: ' invalid email' }))
		).toEqual({
			error: {
				firstnameError: 'firstname is required',
				emailError: ' invalid email',
			},
		});
	});

	//interestListAdd
	it('should handle interestListAdd to add interests', () => {
		const previousState = {
			interestList: [],
		};
		expect(reducer(previousState, interestListAdd('react'))).toEqual({
			interestList: ['react'],
		});
	});

	it('should handle interestListAdd to add another interest', () => {
		const previousState = {
			interestList: ['react'],
		};
		expect(reducer(previousState, interestListAdd('angular'))).toEqual({
			interestList: ['react', 'angular'],
		});
	});

	//interestListremove
	it('should handle interestListUpdate to update the interestList', () => {
		const previousState = {
			interestList: ['react', 'angular'],
		};
		expect(reducer(previousState, interestListRemove(['angular']))).toEqual({
			interestList: ['angular'],
		});
	});
});
