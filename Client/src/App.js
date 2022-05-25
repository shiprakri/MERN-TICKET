
import './App.css';
import { Login } from './components/login.comp';
import { BrowserRouter, Route, Routes,Navigate} from 'react-router-dom';

import { Register } from './components/reg.comp';

import Nav from './components/nav.comp';

import { Ticket } from './components/ticket.comp';
import { Home1} from './components/dash.comp';
import { Home } from './components/home.comp';



function App() {
  const user=JSON.parse(localStorage.getItem("profile"))
  return (
    <>
   
   <BrowserRouter>
   <Nav/>
  
     <Routes>
      <Route path="/" element={!user?<Home/>:<Navigate to='/ticket'/>}></Route>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      {/* <Route path="/home" element={<Home1/>}/> */}
      <Route path="/ticket" element={<Ticket/>}/>
      </Routes>
    </BrowserRouter>


   {/* <Login/> */}
   </>
  );
}

export default App;
