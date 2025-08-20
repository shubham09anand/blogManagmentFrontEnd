import React, { useEffect, useState } from 'react'
import LandingPagePhoto from "../../Assets/LandingPage.webp"
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch } from "react-redux";
import { setLoginData } from "../../Features/Counter/LoginSlice";
import { useNavigate } from "react-router-dom";
import API from '../../Services/API';

const Login = () => {

     const navigate = useNavigate()
     const dispatch = useDispatch();
     const [userName, setUserName] = useState("");
     const [password, setPassword] = useState("");
     const [button, setButton] = useState(false);
     const [logIn, setLogin] = useState(false)

     // Validate inputs before making the API call
     const validateInputs = () => {
          if (!userName.trim()) {
               toast.info("Username is required.");
               return false;
          }
          if (!password.trim()) {
               toast.info("Password is required.");
               return false;
          }
          return true;
     };

     const tryLogin = async () => {
          if (!validateInputs()) {
               return;
          }
          setButton(true);
          try {
               const response = await API.post("/login", {
                    "userName": userName,
                    "password": password
               });
               if (response?.data?.response?.success && response?.data?.response?.status === 200) {
                    localStorage.setItem('user_Id_BlogMangement', response?.data?.response?.response?.id);
                    localStorage.setItem('user_Token_BlogMangement', response?.data?.response?.response?.token);
                    dispatch(setLoginData({ token: response?.data?.response?.response?.token, userId: response?.data?.response?.response?.id }));
                    setLogin(false)
                    navigate("/insider/blogs")
               }
               else if (response?.data?.response?.success === false) {
                    setLogin(true);
                    setTimeout(() => {
                         setLogin(false)
                    }, 2500);
               }
          } catch (err) {
               console.error(err);
          } finally {
               setButton(false)
          }
     };

     // new added

     // useEffect(() => {
     //      console.log("useEffect");
     //      const user_Id_BlogMangement = localStorage.getItem('user_Id_BlogMangement');
     //      const user_Token_BlogMangement = localStorage.getItem('user_Token_BlogMangement');
     //      console.log("cred found");
     //      if (user_Id_BlogMangement && user_Token_BlogMangement) {
     //           const decodedToken = jwtDecode(user_Token_BlogMangement);
     //           if (decodedToken === user_Id_BlogMangement) {
     //                console.log("Token matched");
     //                localStorage.setItem('user_Id_BlogMangement', user_Id_BlogMangement);
     //                localStorage.setItem('user_Token_BlogMangement', user_Token_BlogMangement);
     //                navigate("/insider/blogs")
     //           }
     //      }else{
     //           console.log("New Login or user")
     //      }
     // }, [])

     // new added

     return (
          <div className="h-screen md:flex bg-[#f7f4ed]">
               <ToastContainer />
               <div className="flex absolute z-10 w-full md:w-1/2 justify-center pt-20">
                    <div className="backdrop-blur-[1px] w-3/4">
                         <div className='text-2xl font-bold pb-4'>Log In</div>
                         <div className="flex items-center border-b-2 border-gray-300 py-2 px-3 mb-4 bg-transparent">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                              </svg>
                              <input onChange={(e) => setUserName(e.target.value)} value={userName} className="pl-2 outline-none border-none bg-transparent focus:bg-transparent active:bg-transparent w-full placeholder:text-gray-700" type="text" name="" id="Username" placeholder="Username" />
                         </div>
                         <div className="flex items-center border-b-2 border-gray-300 py-2 px-3 bg-transparent">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
                                   <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                              </svg>
                              <input onChange={(e) => setPassword(e.target.value)} value={password} className="pl-2 outline-none border-none bg-transparent focus:bg-transparent active:bg-transparent w-full placeholder:text-gray-700" type="password" name="" id="Password" placeholder="Password" />
                         </div>
                         {logIn && (<div className='text-sm teact-balck tracking-tight text-center text-red-500 italic'>Wrong Credentials</div>)}
                         <button disabled={button} onClick={tryLogin} className={`block w-full bg-[#34ab45] py-2 rounded-sm text-white font-semibold mt-8 active:opacity-20 ${button ? "cursor-not-allowed opacity-25 animate-pulse" : "cursor-pointer"}`}>Log In</button>
                    </div>
               </div>
               <div className="lg:mt-0 lg:col-span-5 lg:flex absolute -z-0 top-0 right-0 opacity-50 md:opacity-75 lg:opacity-100">
                    <img src={LandingPagePhoto} alt="heroimage" className='max-h-screen' />
               </div>
          </div>
     )
}

export default Login