import React from 'react'

const LaodingProfile = () => {
     return (
          <div className='border-l-2 border-b-2 w-full lg:block lg:w-1/3 bg-gray-50 lg:h-screen lg:fixed right-0'>
               <div className="py-4 animate-pulse bg-gray-50">
                    <div className='pl-4 space-x-5 flex items-center my-4 mb-6 ml-3 animate-pulse'>
                         <svg className="hidden lg:block flex-shrink-0 rounded-full h-36 lg:h-52 bg-gray-500 aspect-square border-2 border-black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"></path>
                         </svg>
                         <svg className="block lg:hidden flex-shrink-0 object-cover rounded-full h-36 bg-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"></path>
                         </svg>
                         <div>
                              <div className="h-4 bg-gray-400 rounded-full w-40 mb-2"></div>
                              <div className="w-20 h-4 bg-gray-400 rounded-full"></div>
                         </div>
                    </div>
                    <div className="p-4 space-y-4 sm:px-8">
                         <div className="w-full h-10 rounded bg-gray-300"></div>
                         <div className="w-full h-10 rounded bg-gray-300"></div>
                         <div className="w-full h-10 rounded bg-gray-300"></div>
                    </div>
               </div>
          </div>
     )
}

export default LaodingProfile