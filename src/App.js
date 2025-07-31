import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Protection from './components/Protection';

import Dashboard from './pages/Menus/Dashboard';
import Transactions from './pages/Menus/Transactions'; 
import Users from './pages/Menus/Users'; 

import Login from "./pages/Authentication/Login";
import ForgotPassword from './pages/Authentication/ForgotPassword';
import VerifyOTP from './pages/Authentication/VerifyOTP';
import ChangePassword from './pages/Authentication/ChangePassword';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <>
      <Analytics />
      <Router>
        <Routes>
          <Route path='/login' element={<Login />}/>
          <Route path='/forgot-password' element={<ForgotPassword />}/>
          <Route path='/verify-otp' element={<VerifyOTP />}/>
          <Route path='/change-password' element={<ChangePassword />} />

          <Route path='/' element={<Protection><Dashboard /></Protection>}/>
          <Route path='/transactions' element={<Protection><Transactions /></Protection>}/>
          <Route path='/users' element={<Protection><Users /></Protection>}/>
        </Routes>
          
      </Router>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
