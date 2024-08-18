import React from 'react';
import { useNavigate } from 'react-router-dom';

const AuthFailed = () => {

     const navigate = useNavigate();

     return (
          <div className="flex h-[calc(100vh-80px)] items-center justify-center p-5 w-full bg-white">
               <div className="text-center">
                    <div className="inline-flex rounded-full bg-green-100 p-4">
                         <div className="rounded-full stroke-green-500 bg-green-200 p-4">
                              <svg className="w-16 h-16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                   <path d="M6 6L10.5 10.5M6 6H3L2 3L3 2L6 3V6ZM19.259 2.74101L16.6314 5.36863C16.2354 5.76465 16.0373 5.96265 15.9632 6.19098C15.8979 6.39183 15.8979 6.60817 15.9632 6.80902C16.0373 7.03735 16.2354 7.23535 16.6314 7.63137L16.8686 7.86863C17.2646 8.26465 17.4627 8.46265 17.691 8.53684C17.8918 8.6021 18.1082 8.6021 18.309 8.53684C18.5373 8.46265 18.7354 8.26465 19.1314 7.86863L21.5893 5.41072C21.854 6.05488 22 6.76039 22 7.5C22 10.5376 19.5376 13 16.5 13C16.1338 13 15.7759 12.9642 15.4298 12.8959C14.9436 12.8001 14.7005 12.7521 14.5532 12.7668C14.3965 12.7824 14.3193 12.8059 14.1805 12.8802C14.0499 12.9501 13.919 13.081 13.657 13.343L6.5 20.5C5.67157 21.3284 4.32843 21.3284 3.5 20.5C2.67157 19.6716 2.67157 18.3284 3.5 17.5L10.657 10.343C10.919 10.081 11.0499 9.95005 11.1198 9.81949C11.1941 9.68068 11.2176 9.60347 11.2332 9.44681C11.2479 9.29945 11.1999 9.05638 11.1041 8.57024C11.0358 8.22406 11 7.86621 11 7.5C11 4.46243 13.4624 2 16.5 2C17.5055 2 18.448 2.26982 19.259 2.74101ZM12.0001 14.9999L17.5 20.4999C18.3284 21.3283 19.6716 21.3283 20.5 20.4999C21.3284 19.6715 21.3284 18.3283 20.5 17.4999L15.9753 12.9753C15.655 12.945 15.3427 12.8872 15.0408 12.8043C14.6517 12.6975 14.2249 12.7751 13.9397 13.0603L12.0001 14.9999Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                              </svg>
                         </div>
                    </div>
                    <h1 className="mt-5 text-[36px] font-bold text-slate-800 lg:text-[50px]">503 - Server error</h1>
                    <p className="text-slate-600 mt-5 lg:text-lg">Authentication Falied</p>
                    <div className="flex flex-col mt-10">
                         <div className="flex flex-col items-stretch">
                              {/* Home Page Navigation */}
                              <div
                                   className="flex flex-row group px-4 py-8 border-t hover:cursor-pointer transition-all duration-200 delay-100" onClick={() => navigate('/')}>
                                   <div className="rounded-xl flex place-content-center items-center w-16 h-16 px-3 bg-[#16831f] py-2 md:py-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="size-6"
                                        >
                                             <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                        </svg>
                                   </div>
                                   <div className="grow flex flex-col pl-5">
                                        <div className="font-bold text-sm md:text-lg lg:text-xl">
                                             Home Page
                                        </div>
                                        <div className="font-thin text-sm md:text-md lg:text-lg text-gray-900 group-hover:text-gray-500 transition-all duration-200 delay-100">
                                             Everything starts here
                                        </div>
                                   </div>
                              </div>

                              {/* Previous Page Navigation */}
                              <div className="flex flex-row group px-4 py-8 border-t hover:cursor-pointer transition-all duration-200 delay-100" onClick={() => navigate('/login')}>
                                   <div className="rounded-xl flex place-content-center items-center w-16 h-16 px-3 bg-[#16831f] py-2 md:py-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="size-8">
                                             <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                                        </svg>
                                   </div>
                                   <div className="grow flex flex-col pl-5">
                                        <div className="font-bold text-sm md:text-lg lg:text-xl">
                                             Try Login
                                        </div>
                                        <div className="font-thin text-sm md:text-md lg:text-lg text-gray-900 group-hover:text-gray-500 transition-all duration-200 delay-100">
                                             Try To Authenticate
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     )
}

export default AuthFailed