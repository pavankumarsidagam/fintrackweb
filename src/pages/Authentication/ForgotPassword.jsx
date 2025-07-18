import React,{ useState } from 'react';
import { AiFillExclamationCircle } from "react-icons/ai";
import { verify } from "../../routes/Auth/authService";
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';


const ForgotPasswordPage = () => {
        
      const [email, setEmail] = useState('');
      const [emailError, setEmailError] = useState('');
      const [loader, setLoader] = useState(false);
      const navigate = useNavigate();
    
      const verifyEmail = async (e) => {
        e.preventDefault();
        
        if (email === ''){
          setEmailError('Enter an email');
          return;
        } else {
          setEmailError('');
        }
        
        setLoader(true);
        try {
            const response = await verify({email});

            if (response.success){
              console.log(response);
              navigate('/verify-otp', { state: { email }});
            } else {
              setEmailError(response.message);
            }
        } catch(error){
            console.log(error);
        } finally {
          setLoader(false);
        }
    
      }
      
      return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 ">

          {loader && ( <Loader /> )}
    
          <div className="flex flex-col md:flex-row lg:flex-row w-full max-w-3xl p-6 lg:p-8 md:p-7 sm:p-6 bg-white rounded-xl shadow-lg">
    
            <div className="flex-1 flex flex-col">
    
            <svg xmlns="https://www.w3.org/2000/svg" className="mb-3"  width="48" height="48" viewBox="0 0 50 48" aria-hidden="true" jsname="jjf7Ff">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M25.517 0C18.712 0 14.46 3.382 12.758 10.146c2.552-3.382 5.529-4.65 8.931-3.805 1.941.482 3.329 1.882 4.864 3.432 2.502 2.524 5.398 5.445 11.722 5.445 6.804 0 11.057-3.382 12.758-10.145-2.551 3.382-5.528 4.65-8.93 3.804-1.942-.482-3.33-1.882-4.865-3.431C34.736 2.92 31.841 0 25.517 0zM12.758 15.218C5.954 15.218 1.701 18.6 0 25.364c2.552-3.382 5.529-4.65 8.93-3.805 1.942.482 3.33 1.882 4.865 3.432 2.502 2.524 5.397 5.445 11.722 5.445 6.804 0 11.057-3.381 12.758-10.145-2.552 3.382-5.529 4.65-8.931 3.805-1.941-.483-3.329-1.883-4.864-3.432-2.502-2.524-5.398-5.446-11.722-5.446z" fill="#38bdf8"></path>
            </svg>
    
              <h2 className="head text-2xl text-gray-900">Account recovery</h2>
              <h4 className="subhead text-sm text-gray-800">Enter your email</h4>
            </div>
    
            <div className="flex-1 flex flex-col">
    
                <svg xmlns="https://www.w3.org/2000/svg" className="mb-3 invisible"  width="48" height="48" viewBox="0 0 40 48" aria-hidden="true" jsname="jjf7Ff">
                  <path fill="#4285F4" d="M39.2 24.45c0-1.55-.16-3.04-.43-4.45H20v8h10.73c-.45 2.53-1.86 4.68-4 6.11v5.05h6.5c3.78-3.48 5.97-8.62 5.97-14.71z"></path><path fill="#34A853" d="M20 44c5.4 0 9.92-1.79 13.24-4.84l-6.5-5.05C24.95 35.3 22.67 36 20 36c-5.19 0-9.59-3.51-11.15-8.23h-6.7v5.2C5.43 39.51 12.18 44 20 44z"></path><path fill="#FABB05" d="M8.85 27.77c-.4-1.19-.62-2.46-.62-3.77s.22-2.58.62-3.77v-5.2h-6.7C.78 17.73 0 20.77 0 24s.78 6.27 2.14 8.97l6.71-5.2z"></path><path fill="#E94235" d="M20 12c2.93 0 5.55 1.01 7.62 2.98l5.76-5.76C29.92 5.98 25.39 4 20 4 12.18 4 5.43 8.49 2.14 15.03l6.7 5.2C10.41 15.51 14.81 12 20 12z"></path>
                  </svg>
    
                <form onSubmit={verifyEmail}>
    
                  <div className="mb-2 w-full">
                    <label htmlFor="email" className="text-xs subhead text-gray-800">
                      Email
                    </label>
                    <input 
                      type="email" 
                      value={email} 
                      id="email" 
                      onChange={(e)=> setEmail(e.target.value)}
                      className={`inputext mt-1 w-full max-w-lg px-4 py-2 border rounded-md shadow-sm ${emailError ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-700 focus:border-indigo-700'}`} 
                    />
                    {emailError && <p className="subhead text-xs text-red-500 flex items-center"><AiFillExclamationCircle  className="mr-2"/>{emailError}</p>}
                  </div>
    
                  <div className="w-full mb-3 h-6 md:h-6 lg:h-6">
                  </div>
    
                  <div className="mb-3 w-full h-0 md:h-2 lg:h-10">
                  </div>
    
                  <div className="text-end w-full">
                    <a href="/login" className="pe-5 subhead text-blue-700">Back</a>
                    <button type="submit" className="subhead py-2 px-4 bg-blue-700 text-white rounded-full">Next</button>
                  </div>
    
                </form>
    
            </div>
    
          </div>
    
        </div>
      );
};

export default ForgotPasswordPage;