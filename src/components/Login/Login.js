import React, { useState } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const emailReducer = (state, action) => {
  if (action.type === "email input") {
    return { value: action.val, isValid: false };
  }
  if (action.type === "email is valid") {
    return { value: state.value, isValid: state.value.includes('@') };
  }

  return { value: "", isValid: false };
};

const passwordReducer =(state,action) =>{
  if(action.type === 'input password'){
    return {value : action.val , isValid : false}
  }
if(action.type === 'password is valid'){
  return {value : state.value, isValid : state.value.trim().length > 6}
}

  return{value : '' , isValid : false}
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [enteredCollegeName, setCollegeName] = useState("");
  const [CollegeNameValid, setCollegeNameValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, emailDispatch] = React.useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, passwordDispatch] = React.useReducer(passwordReducer, {
    value: "",
    isValid: null,
  });

  React.useEffect(() => {
    console.log('done')
    setFormIsValid(
      emailState.isValid &&
        passwordState.isValid &&
        enteredCollegeName.trim().length > 0
    );
  }, [emailState.isValid, passwordState.isValid, enteredCollegeName]);

  const emailChangeHandler = (event) => {
    emailDispatch({ type: "email input", val: event.target.value });

    // setFormIsValid(
    //   enteredEmail.target.value.includes('@') && enteredPassword.trim().length > 6
    // )
  };

  const passwordChangeHandler = (event) => {
    passwordDispatch({type:'input password', val:event.target.value});

    // setFormIsValid(
    //   enteredEmail.target.value.includes('@') && enteredPassword.trim().length > 6
    // )
  };

  const CollegeNameChangeHandler = (e) => {
    setCollegeName(e.target.value);

    console.log(enteredCollegeName);
  };

  const validateEmailHandler = () => {
    emailDispatch({ type: "email is valid"});
  };

  const validatePasswordHandler = () => {
    passwordDispatch({type : 'password is valid'});
  };

  const validateCollegeName = () => {
    setCollegeNameValid(enteredCollegeName.trim().length > 0);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            CollegeNameValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="ClgName">College Name</label>
          <input
            type="text"
            id="ClgName"
            value={enteredCollegeName}
            onChange={CollegeNameChangeHandler}
            onBlur={validateCollegeName}
          />
        </div>

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
