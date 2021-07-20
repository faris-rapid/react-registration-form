import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registrationActions } from "../../store/index";
import { CountryList } from "../../constants/countryList";
import styles, {
  addButton,
  removeButton,
  errorMessage,
} from "./UserForm.module.css";
import ValidateOnBlur from "./ValidateOnBlur";
import ValidateOnSubmit from "./ValidateOnSubmit";

const UserForm = () => {
  const formData = useSelector((state) => state.formData);
  const filteredCountry = useSelector((state) => state.filteredCountry);
  const interestList = useSelector((state) => state.interestList);
  const error = useSelector((state) => state.error);
  const dispatch = useDispatch();
  let history = useHistory();

  let countryLists = CountryList;

  //country suggestion pickssss
  const suggestionHandler = (event) => {
    dispatch(
      registrationActions.onChangeHandler({ country: event.target.innerText })
    );
    dispatch(registrationActions.countrySelect([]));
    dispatch(registrationActions.errorHandler({ countryError: null }));
  };

  const eventChangeHandler = (event) => {
    dispatch(
      registrationActions.onChangeHandler({
        [event.target.name]: event.target.value,
      })
    );
    //country type ahead
    if (event.target.name === "country") {
      dispatch(
        registrationActions.countrySelect(
          countryLists.filter((element) => {
            return element.toLowerCase().includes(event.target.value);
          })
        )
      );
    }
    // gender error removal on selecting
    if (event.target.name === "gender") {
      dispatch(registrationActions.errorHandler({ genderError: null }));
    }
  };

  //adding new interest
  const addInterestHandler = () => {
    let list = [...interestList];
    //interest validation
    if (formData.interest === "") {
      dispatch(
        registrationActions.errorHandler({
          interestError: "Interest cannot be blank",
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
    dispatch(registrationActions.onChangeHandler({ interest: "" }));
  };

  //removing existing interest
  const removeInterestHandler = (index) => {
    const list = [...interestList];
    list.splice(index, 1);
    dispatch(registrationActions.interestListRemove(list));
  };

  const submitHandler = (event) => {
    event.preventDefault();

    //validation
    const validate = ValidateOnSubmit(formData, interestList);
    dispatch(registrationActions.errorHandler(validate));

    if (Object.keys(error).every((item) => error[item] === null)) {
      history.push("/formDetails");
    }
  };

  const onBlurHandler = (event) => {
    //validation
    const validate = ValidateOnBlur(event.target.name, formData, interestList);
    dispatch(registrationActions.errorHandler(validate));
  };

  const {
    firstname = "",
    lastname = "",
    username = "",
    email = "",
    mobile = "",
    address = "",
    country = "",
    pin = "",
    dob = "",
    interest = "",
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
    genderError,
  } = error;

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Registration</h2>
      <div className={styles.input}>
        <form onSubmit={submitHandler}>
          <div>
            <label>Firstname</label>
            <input
              type="text"
              name="firstname"
              value={firstname}
              onChange={eventChangeHandler}
              onBlur={onBlurHandler}
            />
            {firstnameError && (
              <div className={errorMessage}>{firstnameError}</div>
            )}
          </div>
          <div>
            <label>Lastname</label>
            <input
              type="text"
              name="lastname"
              value={lastname}
              onBlur={onBlurHandler}
              onChange={eventChangeHandler}
            />
            {lastnameError && (
              <div className={errorMessage}>{lastnameError}</div>
            )}
          </div>
          <div>
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={username}
              onBlur={onBlurHandler}
              onChange={eventChangeHandler}
            />
            {usernameError && (
              <div className={errorMessage}>{usernameError}</div>
            )}
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={eventChangeHandler}
              onBlur={onBlurHandler}
            />
            {emailError && <div className={errorMessage}>{emailError}</div>}
          </div>
          <div>
            <label>Mobile number</label>
            <input
              type="number"
              name="mobile"
              value={mobile}
              onChange={eventChangeHandler}
              onBlur={onBlurHandler}
            />
            {mobileError && <div className={errorMessage}>{mobileError}</div>}
          </div>
          <div>
            <label>Address</label>
            <textarea
              type="text"
              name="address"
              value={address}
              onChange={eventChangeHandler}
              onBlur={onBlurHandler}
            />
            {addressError && <div className={errorMessage}>{addressError}</div>}
          </div>
          <div>
            <label>Country</label>
            <input
              type="text"
              name="country"
              value={country}
              onChange={eventChangeHandler}
              onBlur={onBlurHandler}
            />
            {countryError && <div className={errorMessage}>{countryError}</div>}
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
              onBlur={onBlurHandler}
            />
            {pinError && <div className={errorMessage}>{pinError}</div>}
          </div>
          <div>
            <label>Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={dob}
              onChange={eventChangeHandler}
              onBlur={onBlurHandler}
            />
            {dobError && <div className={errorMessage}>{dobError}</div>}
          </div>
          <div>
            <label>Area of Interests</label>
            <br />
            <input
              style={{ width: "70%" }}
              type="text"
              name="interest"
              value={interest}
              onBlur={onBlurHandler}
              onChange={eventChangeHandler}
            />

            <button
              className={addButton}
              type="button"
              onClick={addInterestHandler}
            >
              +
            </button>
            <div className={errorMessage}>{interestError}</div>
            <div>
              {interestList.map((element, index) => (
                <li key={element}>
                  {element}{" "}
                  <button
                    className={removeButton}
                    type="button"
                    onClick={() => removeInterestHandler(index)}
                  >
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
            <div className={errorMessage}>{genderError}</div>
            <br />
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
