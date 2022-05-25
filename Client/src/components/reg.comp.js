import React, { useState,useEffect } from 'react';
import { FormGroup, FormControl, InputLabel, Input, Button, Typography,makeStyles } from '@material-ui/core';
import { validFname,validEmail,validUsername,validPassword } from './regex/regex';
import { Avatar, Paper, Grid, Container } from '@material-ui/core';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { signup } from '../actions/auth';

const initialValue = {
    fname:'',
    email:'',
    username:'',
    password:'',
}

const initialIsValidValue = {
    isfname: '',
    isemail: '',
    isusername: '',
    ispassword: '',
}

const useStyles = makeStyles({
    container: {
        width: '50%',
        margin: '5% 0 0 25%',
    },
    label:{
        color:'#015f92',
        fontWeight:'bolder',
           
          },
    button:{
         backgroundColor:'#015f92'
          }
    
})
export const Register = () => {
    const [user, setUser] = useState(initialValue);
    const { fname, email, username,password } = user;
 
    const [isValid, setIsValid] = useState(initialIsValidValue);
    const { isfname, isemail, isusername,ispassword } = isValid;
    const dispatch = useDispatch();
    const classes = useStyles();
    
    const navigate = useNavigate();
    const validationMessageCSS = {color:'red',marginBottom:'20px'}
    
    // Common onChangeSetState()
    const onChangeSetState=(e)=>{
        setUser({...user, [e.target.name]: e.target.value});
    }

    // Common onChangeValidation()
    const onValidate = (e,regEx) => {
        const RegExObj=new RegExp(regEx);
        const isValidKey='is'+e.target.name;
        
       
        if(e.target.value==="" || RegExObj.test(e.target.value))
        {
            setIsValid({...isValid,[isValidKey]:''});
            setUser({...user, [e.target.name]: e.target.value});
        }
        else{
            setIsValid({...isValid,[isValidKey]:'Invalid input..!!'});
          
        }
    }

    var flag=true;
    const validateDetailsFlag = Object.values(isValid).every(value => {
        if (value!==null && value!=='') {
            flag=false;
        }
        return flag;
    });
  
    function validateDetails(){
        
        if(validateDetailsFlag)
        {
            dispatch(signup(user, navigate))
        }
        else{
            alert("Invalid input..!!");
        }
    }
    
    return (
        <FormGroup className={classes.container}>
            <Typography variant="h4" className={classes.label} align="center">Register</Typography>
            
            <FormControl>
                <InputLabel htmlFor="fname">Name</InputLabel>
                <Input onChange={(e) => onValidate(e,validFname)} onBlur={(e) => onValidate(e,validFname)} name="fname" value={fname} id="txtName" inputProps={{ maxLength: 40 }} />
                <div style={validationMessageCSS}>{isfname}</div>
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="email">Email</InputLabel>
                <Input onChange={(e) => onChangeSetState(e)} onBlur={(e) => onValidate(e,validEmail)} name='email' value={email} id="txtEmailId" inputProps={{ maxLength: 50 }} />
                <div style={validationMessageCSS}>{isemail}</div>
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="username">Username</InputLabel>
                <Input onChange={(e) => onValidate(e,validUsername)} onBlur={(e) => onValidate(e,validUsername)} name='username' value={username} id="txtusername" inputProps={{ maxLength: 10 }} />
                <div style={validationMessageCSS}>{isusername}</div>
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="password">Password</InputLabel>
                <Input type='password' onChange={(e) => onChangeSetState(e)} onBlur={(e) => onValidate(e,validPassword)} name='password' value={password} id="txtPassword" inputProps={{maxLength: 12 }} />
                <div style={validationMessageCSS}>{ispassword}</div>
            </FormControl>
            <br/>
            <FormControl>
                
                <Button className={classes.button} variant="contained" color="secondary" disabled={fname.length===0 || username.length===0 || email.length===0 || password.length===0 || isusername.length!==0 || isfname.length!==0} onClick={() => validateDetails()}>Add User</Button>
            </FormControl>
            
        </FormGroup>
    )
}

