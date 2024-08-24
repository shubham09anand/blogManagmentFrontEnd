import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import API from '../Services/API';

const Header = () => {

     const noProfilePhoto = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
     const [userPhoto, setUserPhoto] = useState(noProfilePhoto)
     const location = useLocation();
     const currentLocation = location.pathname;
     const userId = useSelector((state) => (state.LoginSlice.loggedUserId));

     useEffect(() => {
          if (userId !== null) {
               const fetchUserPhoto = async () => {
                    try {
                         const response = await API.post('/getUserPhoto', { userId });
                         if (response.data.response.success) {
                              setUserPhoto(response.data.response.response);
                         }
                         else{
                              setUserPhoto(noProfilePhoto);
                         }
                    } catch (error) {
                         // console.error('Error fetching user photo:', error);
                         setUserPhoto(noProfilePhoto);
                    }
               };

               fetchUserPhoto();
          }
     }, [userId]);



     return (
          <header className={`header sticky top-0 z-20 bg-[#f7f4ed] shadow-md flex items-center justify-between px-4 md:px-8 ${currentLocation === "/" || currentLocation === "/signup" || currentLocation === "/login" ? 'py-3' : 'py-0'}`}>
               <div className='text-4xl font-bold tracking-tighter'>Insider</div>

               <nav className="nav font-bold text-black md:text-lg">
                    <ul className="flex items-center">
                         {!(currentLocation === "/blogs" || currentLocation.startsWith('/setting/') || currentLocation === "/write" || currentLocation.startsWith("/edit") || currentLocation.startsWith('/blogContent/') || currentLocation.startsWith('/profile/')) &&
                              (<>
                                   <li className="p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer active">
                                        <Link to='/signup'>Get Started</Link>
                                   </li>
                                   <li className="p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer">
                                        <Link to='/login'>Sign in</Link>
                                   </li>
                              </>)
                         }

                         {(currentLocation !== "/login" && currentLocation !== "/signup" && currentLocation !== "/") && (
                              <>
                                   <li className="p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer">
                                        <Link to={`/setting/${userId}`} className='flex place-content-center items-center font-thin space-x-4 sm:text-lg'>
                                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="size-8">
                                                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                                                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                             </svg>
                                             <span className='hidden md:block'>Settings</span>
                                        </Link>
                                   </li>
                                   <li className="p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer">
                                        <Link to='/write' className='flex place-content-center items-center font-thin space-x-4 sm:text-lg'>
                                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="size-7">
                                                  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                             </svg>
                                             <span className='hidden md:block'>Write</span>
                                        </Link>
                                   </li>
                                   <li className="p-4 border-b-2 border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer">
                                        <Link to={`/profile/${userId}`}>
                                             <img id="headerProfilePhoto" className="w-10 h-10 rounded-full opacity-100" src={userPhoto} onError={(e)=> e.target.src = noProfilePhoto} alt="Rounded avatar" />
                                        </Link>
                                   </li>
                              </>
                         )}
                    </ul>
               </nav>
          </header>
     );
}

export default Header;
