import { makeStyles } from '@material-ui/core/styles';


export default makeStyles((theme) => ({
 
  appBar: {
    fontFamily: 'Helvetica Neue Light',

    margin: '0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 80,
    backgroundColor: '#330000',
    boxShadow:'2px 5px 10px black',
  },
  heading: {
    color: '#fff',
    textDecoration: 'none',
    fontStyle:'Lit',
    fontFamily:'system-ui'
    
  },
  signin:{
    backgroundColor: '#00a0b2'
  },
  signup:{
    backgroundColor: '#00a0b2'
  },
  image: {
    marginLeft: '15px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '400px',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
    color: '#fff',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: 'pink'
  },
  logout: {
    background: '#8000ff',
    color: '#fff'
  }
}));
