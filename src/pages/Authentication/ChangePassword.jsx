import React, {useState, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AiFillEye, AiFillEyeInvisible, AiFillExclamationCircle  } from "react-icons/ai";
import Loader from './Loader';
import { changepasswordapi } from '../../routes/Auth/authService';

const ChangePasswordPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const email = location.state?.email;

    useEffect(() => {
        if(!email){
            navigate('/login');
        }
    }, [email, navigate]);

    const [showPassword, setShowPassword] = useState(false);
    
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    }

    const [ loader , setLoader ] = useState(false);
    const [ changePassword, setChangePassword ] = useState('');
    const [ confirmChangePassword , setConfirmChangePassword ] = useState('');
    const [ passwordError, setPasswordError ] = useState('');
    const [ confirmPasswordError, setConfirmPasswordError ] = useState('');
    const [ showMessage, setShowMessage ] = useState('');

    const validatePassword = () => {
        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

        if(changePassword.length < 8) {
            setPasswordError("Password must be at least 8 characters long.");
            return false;
        } 
        if (!specialCharRegex.test(changePassword)) {
            setPasswordError("Password must include at least one special character.");
            return false;
        } 
        
        setPasswordError("");
        return true;
        
    }

    const validateConfirmPassword = () => {
        if(changePassword !== confirmChangePassword){
            setConfirmPasswordError("Passwords do not match.")
            return false;
        }
        setConfirmPasswordError("");
        return true;
    }
    
    
    const handlePasswordChange = async (e) => {
        e.preventDefault();

        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();

        if (isPasswordValid && isConfirmPasswordValid) {
            
            try {
                setLoader(true);

                const response = await changepasswordapi({ email, changePassword });
                // console.log(resposne);

                if(response.success){
                    setLoader(false);
                    setShowMessage(response.message);
                    setChangePassword('');
                    setConfirmChangePassword('');

                    setLoader(true);
                    setTimeout(() => {
                        navigate('/login');
                    }, 3000); 
                } else {
                    setLoader(false);
                    console.log(response);                    
                }
            } catch(error){
                setLoader(false);
                console.log(error);
            } 
            
        }

    }
    

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">

        {loader && <Loader />}

        <div className="flex flex-col md:flex-row lg:flex-row w-full max-w-3xl p-6 lg:p-8 md:p-7 sm:p-6 bg-white rounded-xl shadow-lg">

            <div className="flex-1 flex flex-col">

            <svg xmlns="http://www.w3.org/2000/svg" className="mb-3"  width="48" height="48" viewBox="0 -960 960 960" fill="#115e59">
                <path d="M320-414v-306h120v306l-60-56-60 56Zm200 60v-526h120v406L520-354ZM120-216v-344h120v224L120-216Zm0 98 258-258 142 122 224-224h-64v-80h200v200h-80v-64L524-146 382-268 232-118H120Z"/>
            </svg>

            <h2 className="head text-2xl text-gray-900">Account Recovery</h2>
            <h4 className="subhead text-sm text-gray-800">Set your new password</h4>
            </div>

            <div className="flex-1 flex flex-col">

                <svg xmlns="https://www.w3.org/2000/svg" className="mb-3 invisible"  width="48" height="48" viewBox="0 0 40 48" aria-hidden="true" jsname="jjf7Ff">
                <path fill="#4285F4" d="M39.2 24.45c0-1.55-.16-3.04-.43-4.45H20v8h10.73c-.45 2.53-1.86 4.68-4 6.11v5.05h6.5c3.78-3.48 5.97-8.62 5.97-14.71z"></path><path fill="#34A853" d="M20 44c5.4 0 9.92-1.79 13.24-4.84l-6.5-5.05C24.95 35.3 22.67 36 20 36c-5.19 0-9.59-3.51-11.15-8.23h-6.7v5.2C5.43 39.51 12.18 44 20 44z"></path><path fill="#FABB05" d="M8.85 27.77c-.4-1.19-.62-2.46-.62-3.77s.22-2.58.62-3.77v-5.2h-6.7C.78 17.73 0 20.77 0 24s.78 6.27 2.14 8.97l6.71-5.2z"></path><path fill="#E94235" d="M20 12c2.93 0 5.55 1.01 7.62 2.98l5.76-5.76C29.92 5.98 25.39 4 20 4 12.18 4 5.43 8.49 2.14 15.03l6.7 5.2C10.41 15.51 14.81 12 20 12z"></path>
                </svg>

                <form onSubmit={handlePasswordChange}>
                    {showMessage && <p className="subhead text-base text-green-500">{showMessage}</p>}
                    <div className="mb-3 w-full relative">
                        <label htmlFor="changePassword" className="text-xs subhead text-gray-800">
                        New Password
                        </label>
                        <input 
                        type={showPassword ? "text" : "password"} id="changePassword" 
                        value={changePassword} 
                        onChange={(e)=> setChangePassword(e.target.value)}
                        className={`inputext mt-1 w-full max-w-lg px-4 py-2 border rounded-md shadow-sm ${passwordError ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-700 focus:border-indigo-700'}`} 
                        />
                        <span className="absolute top-10 right-3 cursor-pointer text-gray-500" onClick={togglePasswordVisibility}>
                        {showPassword ? passwordError ? <AiFillEyeInvisible size={20} className="text-red-500" /> : <AiFillEyeInvisible size={20} />  : passwordError ? <AiFillEye size={20} className="text-red-500" /> : <AiFillEye size={20} />}
                        </span>
                        {passwordError && <p className="subhead text-xs text-red-500 flex items-center"><AiFillExclamationCircle  className="mr-2"/>{passwordError}</p>}
                    </div>

                    <div className="mb-7 w-full">
                        <label htmlFor="confirmChangePassword" className="text-xs subhead text-gray-800">
                        Confirm New Password
                        </label>
                        <input 
                        type="password" 
                        value={confirmChangePassword} 
                        id="confirmChangePassword" 
                        onChange={(e)=> setConfirmChangePassword(e.target.value)}
                        className={`inputext mt-1 w-full max-w-lg px-4 py-2 border rounded-md shadow-sm ${confirmPasswordError ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-indigo-700 focus:border-indigo-700'}`} 
                        />
                        {confirmPasswordError && <p className="subhead text-xs text-red-500 flex items-center"><AiFillExclamationCircle  className="mr-2"/>{confirmPasswordError}</p>}
                    </div>

                    <div className="text-end mt-7 w-full">
                        <button type="submit" className="subhead py-2 px-4 bg-blue-700 text-white rounded-full">confirm</button>
                    </div>

                </form>

            </div>

        </div>

        </div>
    );
}

export default ChangePasswordPage;