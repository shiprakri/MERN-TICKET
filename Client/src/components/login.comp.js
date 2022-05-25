import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signin } from "../actions/auth";

import { AUTH } from "../action/ticket-action";
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Button,
  Typography,
  makeStyles,
} from "@material-ui/core";

import { Grid } from "@material-ui/core";
import { Link, useNavigate } from "react-router-dom";
const initialValue = {
  email: "",

  password: "",
};



const useStyles = makeStyles({
  container: {
    width: "50%",
    margin: "5% 0 0 25%"
   
  },
  label:{
    color:'#015f92',
    fontWeight:'bolder',
   
  },
  button:{
    backgroundColor:'#015f92'
  }
});
export const Login = () => {
  
 
  const [user, setUser] = useState(initialValue);
  const { email, password } = user;

  
  

  const classes = useStyles();

 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Common onChangeSetState()
  const onChangeSetState = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Common onChangeValidation()

  function validateDetails() {
    dispatch(signin(user, navigate));
  }

  // Common onClick().

  return (
    <FormGroup className={classes.container}>
      <Typography variant="h4" align="center" className={classes.label}>SignIn</Typography>
      <FormControl>
        <InputLabel htmlFor="email">Email</InputLabel>
        <Input
          onChange={(e) => onChangeSetState(e)}
          required
          name="email"
          value={email}
          id="txtEmailId"
          inputProps={{ maxLength: 50 }}
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="password">Password</InputLabel>
        <Input
          type="password"
          onChange={(e) => onChangeSetState(e)}
          required
          name="password"
          value={password}
          id="txtPassword"
          inputProps={{ maxLength: 12 }}
        />
      </FormControl>
      <br />
      <FormControl>
        <Button
          variant="contained"
          className={classes.button}
          color="secondary"
          disabled={email.length === 0 || password.length === 0}
          onClick={() => validateDetails()}
        >
          SignIn 
        </Button>
      </FormControl>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      
      <Grid container justify="flex-end">
        <Grid item>
          <Button component={Link} to="/register">
            "Don't have an account? Sign Up"
          </Button>
        </Grid>
      </Grid>
    </FormGroup>
  );
};

