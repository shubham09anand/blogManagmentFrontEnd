import React from 'react'
import LandingPagePhoto from "../../Assets/LandingPage.webp"

const Login = () => {
     return (
          <div class="h-screen md:flex bg-[#f7f4ed]">
               <div class="flex md:w-1/2 justify-center pt-20">
                    <form class="w-3/4">
                         <div className='text-2xl font-bold pb-4'>Sign In</div>
                         <div class="flex items-center border-2 py-2 px-3 rounded-md mb-4 bg-white">
                              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none"
                                   viewBox="0 0 24 24" stroke="currentColor">
                                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                              </svg>
                              <input class="pl-2 outline-none border-none bg-transparent" type="text" name="" id="" placeholder="Username" />
                         </div>
                         <div class="flex items-center border-2 py-2 px-3 rounded-md bg-white">
                              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                                   fill="currentColor">
                                   <path fill-rule="evenodd"
                                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                        clip-rule="evenodd" />
                              </svg>
                              <input class="pl-2 outline-none border-none bg-transparent" type="text" name="" id="" placeholder="Password" />
                         </div>
                         <button type="submit" class="block w-full bg-[#34ab45] mt-4 py-2 rounded-2xl text-white font-semibold mb-2">Sign Up</button>
                    </form>
               </div>
               <div class="hidden lg:mt-0 lg:col-span-5 lg:flex absolute z-10 top-0 right-0 opacity-75 lg:opacity-100">
                    <img src={LandingPagePhoto} alt="heroimage" className='max-h-screen' />
               </div>
          </div>
     )
}

export default Login