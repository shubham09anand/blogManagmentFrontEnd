import React, { useState } from 'react';
import LandingPagePhoto from "../../Assets/LandingPage.webp";
import API from '../../Services/API';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const Signup = () => {
    const navigate = useNavigate()
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [signupSuccessful, setSignupSuccessful] = useState(false);

    // Generate current time in ISO format with timezone offset
    const getCurrentTime = () => {
        const now = new Date();
        let isoString = now.toISOString(); // Example: "2024-08-11T12:34:56.789Z"
        const timeZoneOffset = '+00:00'; // Adjust if needed for other timezones
        isoString = isoString.replace('Z', timeZoneOffset);
        return isoString.replace(/(\.\d{3})Z/, '$1'); // Format to "2024-08-11T12:34:56.000+00:00"
    };

    // Validate inputs before making the API call
    const validateInputs = () => {
        if (!firstName.trim()) {
            toast.info("First name is required.");
            return false;
        }
        if (!lastName.trim()) {
            toast.info("Last name is required.");
            return false;
        }
        if (!userName.trim()) {
            toast.info("Username is required.");
            return false;
        }
        if (!email.trim()) {
            toast.info("Email is required.");
            return false;
        }
        if (!password.trim() || password.trim().length < 5) {
            toast.info("Password is required and atleast 8 charaters");
            return false;
        }
        return true;
    };

    // Handle signup
    const trySignup = async () => {
        if (!validateInputs()) {
            return;
        }
        const createdAt = getCurrentTime();
        setButtonDisabled(true);

        try {
            const response = await API.post("/signup", {
                userName,
                firstName,
                lastName,
                email,
                password,
                createdAt
            });

            if (response.data.response.success && response.data.response.status === 200) {
                setSignupSuccessful(true);
                setTimeout(() => {
                    navigate('/insider/login');
                }, 3000)
            } else {
                toast.info("Username Already Taken");
                setSignupSuccessful(false);
            }
        } catch (err) {
            console.error(err);
            toast.error("Signup failed! Please try again.");
            setSignupSuccessful(false);
        } finally {
            if (signupSuccessful === false) {
                setButtonDisabled(false);
            } else if (signupSuccessful === true) {
                setButtonDisabled(true)
            }
        }
    };

    return (
        <div className="h-screen overflow-y-hidden md:flex bg-[#f7f4ed]">
            <ToastContainer />
            <div className="flex absolute z-20 w-full md:w-1/2 justify-center mt-20">
                <div className="backdrop-blur-[1px] w-3/4">
                    <div className='text-2xl font-bold pb-4'>Sign Up</div>
                    <div className="flex items-center border-b-2 border-b-gray-400 py-2 px-3 mb-4 bg-transparent">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                        <input onChange={(e) => setFirstName(e.target.value)} value={firstName} className="pl-2 outline-none border-none bg-transparent w-full placeholder:text-gray-700" type="text" id="firstName" placeholder="First name" />
                    </div>
                    <div className="flex items-center border-b-2 border-b-gray-400 py-2 px-3 mb-4 bg-transparent">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                        <input onChange={(e) => setLastName(e.target.value)} value={lastName} className="pl-2 outline-none border-none bg-transparent w-full placeholder:text-gray-700" type="text" id="lastName" placeholder="Last name" />
                    </div>
                    <div className="flex items-center border-b-2 border-b-gray-400 py-2 px-3 mb-4 bg-transparent">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                        </svg>
                        <input onChange={(e) => setUserName(e.target.value)} value={userName} className="pl-2 outline-none border-none bg-transparent w-full placeholder:text-gray-700" type="text" id="userName" placeholder="Username" />
                    </div>
                    <div className="flex items-center border-b-2 border-b-gray-400 py-2 px-3 mb-4 bg-transparent">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                        <input onChange={(e) => setEmail(e.target.value)} value={email} className="pl-2 outline-none border-none bg-transparent w-full placeholder:text-gray-700" type="email" id="email" placeholder="Email Address" />
                    </div>
                    <div className="flex items-center border-b-2 border-b-gray-400 py-2 px-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                        <input onChange={(e) => setPassword(e.target.value)} value={password} className="pl-2 outline-none border-none bg-transparent w-full placeholder:text-gray-700" type="password" id="password" placeholder="Password" />
                    </div>

                    {signupSuccessful && <div className='text-black text-sm tracking-wide py-1 text-center mt-2'>Successfully signed up. Shorty we will redirect you to login page</div>}
                    <button disabled={buttonDisabled} onClick={trySignup} className="cursor-pointer hover:opacity-75 active:opacity-50 text-center block w-full bg-[#34ab45] mt-8 py-2 rounded-sm text-white font-semibold mb-2">Sign Up</button>
                </div>
            </div>
            <div className="lg:mt-0 lg:col-span-5 lg:flex absolute z-10 top-0 right-0 opacity-50 md:opacity-75 lg:opacity-100">
                <img src={LandingPagePhoto} alt="heroimage" className='max-h-screen' />
            </div>
        </div>
    );
}

export default Signup;
