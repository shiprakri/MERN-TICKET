import { makeStyles } from '@material-ui/core';
import React from 'react';


const useStyles= makeStyles({
    h2:{
        color: '#482880',
        fontSize:'40px',
        fontWeight:'bold',
        fontStyle:'italic',
        marginTop:"290px",
        marginLeft:"10px",
        
        
    },
    home:{
        width: '100%',
        height: '672px',
    
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex:999
    },
    back:{
     
        backgroundRepeat:'no-repeat',
        backgroundSize:'Cover',
        width: '100',
        height: '672px',
        position: 'relative',
        color: 'white',
        textAlign: 'center',
    },
   img:{ 
       width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex:99,
    }

})
export const Home = () => {
    const classes = useStyles();
  return (
      
  <div className={classes.back} >
      <img  className={classes.img} src="https://wallpaperaccess.com/full/1567855.jpg"/>
  <div className={classes.home} >
      
     <h2 className={classes.h2}><strong> Welcome to the Ticketing System </strong></h2>
        <p><strong><em>Create Ticket Here..!!</em></strong></p>
     </div>
        
      </div>
  )
}
