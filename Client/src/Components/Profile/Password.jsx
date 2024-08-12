import React from 'react'

const Password = () => {
     return (
          <div className='w-full md:pl-10 lg:pl-16 mt-5'>
               <div className="py-2 text-2xl font-semibold">Password</div>
               <div>
                    <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-10">
                         <label for="login-password">
                              <span className="">Current Password</span>
                              <div className="mt-2 relative flex overflow-hidden rounded-md border-2 transition focus-within:border-[#34ab45] ">
                                   <input type="password" id="login-password" className="focus:outline-[#34ab45] outline-none w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400" placeholder="***********" />
                              </div>
                         </label>
                         <label for="login-password">
                              <span className="">New Password</span>
                              <div className="mt-2 relative flex overflow-hidden rounded-md border-2 transition focus-within:border-[#34ab45] ">
                                   <input type="password" id="login-password" className="focus:outline-[#34ab45] outline-none w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400" placeholder="***********" />
                              </div>
                         </label>
                    </div>
                    <div className="mt-8 flex">
                         <button type="submit" className="bg-[#34ab45] text-white px-4 py-2 rounded-lg">
                              Update
                         </button>
                    </div>
               </div>
          </div>
     )
}

export default Password