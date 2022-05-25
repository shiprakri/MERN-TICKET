import React,{useState,useEffect} from "react";
import { AppBar, Typography, Toolbar, Avatar, Button } from "@material-ui/core";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {useDispatch} from 'react-redux'
import useStyles from "./nav.style";
import * as actionType from  '../action/ticket-action'
import decode from 'jwt-decode'
import { Home } from "./home.comp";

function NavBar() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    navigate("/login");
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography
         
          className={classes.heading}
          variant="h4"
          align="center"
        
        >
          <strong>
            <em>  
          TICKET BOOKING SYSTEM
            </em>
          </strong>
        </Typography>

      </div>
      <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
            <Avatar className={classes.avatar} alt={user?.result.fname} src={user?.result.imageUrl}>{user?.result.fname.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant="h6">{user?.result.fname}</Typography>
            <Button variant="contained" className={classes.logout} onClick={logout}>Logout</Button>
          </div>
        ) : (
          <>
           <Button component={Link} to="/login" variant="contained" color="secondary" className={classes.signin}>Sign In</Button>&nbsp;&nbsp;&nbsp;
           <Button component={Link} to="/register" variant="contained" color="secondary" className={classes.signup}>Sign Up</Button>
          </>
         
        )}
      </Toolbar>
    </AppBar>
    
  );
  
}



export default NavBar;
