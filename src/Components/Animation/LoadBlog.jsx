import React from 'react'

const LoadBlog = ({ show }) => {
     return (
          <div className='md:my-8'>
               <div className='gap-x-3 pb-3 flex ml-3 lg:ml-0 animate-pulse'>
                    <div className='w-28 h-4 rounded-full bg-gray-400'></div>
                    <div className='w-20 h-4 rounded-full bg-gray-400'></div>
                    <div className='w-24 h-4 rounded-full bg-gray-400'></div>
               </div>
               <div className='animate-pulse justify-between flex items-center -mb-8 sm:-mb-4 md:-mb-2 pl-2 sm:pl-4 lg:pl-0 pb-2'>
                    <div className='flex items-center'>
                         <svg className="w-8 h-8 me-3 text-gray-00" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"></path>
                         </svg>
                         <div>
                              <div className="h-2.5 bg-gray-400 rounded-full w-32 mb-2"></div>
                              <div className="w-16 h-2 bg-gray-300 rounded-full"></div>
                         </div>
                    </div>
                    {show &&
                         <div className='flex space-x-5 items-end pr-5'>
                              <div className='w-6 h-6 bg-gray-500 rounded-sm'></div>
                              <div className='w-6 h-6 bg-gray-500 rounded-sm'></div>
                         </div>
                    }
               </div>
               <div role="status" className="pt-4 mt-4 md:mt-0 w-screen lg:w-full place-content-center items-center animate-pulse flex px-3 sm:px-4 lg:px-0">
                    <div className="my-auto flex items-center justify-center w-4/5 lg:w-full h-24 sm:h-36 md:h-40 lg:h-48 bg-gray-500 rounded">
                         <svg className="w-10 h-10 text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                         </svg>
                    </div>
                    <div className="w-full ml-3 px-4 flex-col md:mt-6">
                         <div className="h-3 bg-gray-300 rounded-sm w-full mb-2.5"></div>
                         <div className='flex space-x-2 mb-2.5'>
                              <div className="h-2 bg-gray-300 rounded-sm w-full"></div>
                              <div className="h-2 bg-gray-300 rounded-sm w-full"></div>
                              <div className="h-2 bg-gray-300 rounded-sm w-full"></div>
                              <div className="h-2 bg-gray-300 rounded-sm w-full"></div>
                         </div>
                         <div className='flex space-x-2 mb-2.5'>
                              <div className="h-2 bg-gray-300 rounded-sm w-full"></div>
                              <div className="h-2 bg-gray-300 rounded-sm w-full"></div>
                              <div className="h-2 bg-gray-300 rounded-sm w-full"></div>
                         </div>
                         <div className='flex space-x-2 mb-2.5'>
                              <div className="h-2 bg-gray-300 rounded-sm w-full"></div>
                              <div className="h-2 bg-gray-300 rounded-sm w-full"></div>
                              <div className="h-2 bg-gray-300 rounded-sm w-full"></div>
                              <div className="h-2 bg-gray-300 rounded-sm w-full"></div>
                         </div>
                         <div className='flex space-x-2 mb-2.5'>
                              <div className="h-2 bg-gray-300 rounded-sm w-full"></div>
                              <div className="h-2 bg-gray-300 rounded-sm w-full"></div>
                         </div>
                         <div className='flex space-x-2 mb-2.5'>
                              <div className="h-2 bg-gray-300 rounded-sm w-full hidden sm:block"></div>
                              <div className="h-2 bg-gray-300 rounded-sm w-full hidden sm:block"></div>
                              <div className="h-2 bg-gray-300 rounded-sm w-full hidden sm:block"></div>
                         </div>
                         <div className='flex space-x-2 mb-2.5'>
                              <div className="h-2 bg-gray-300 rounded-sm w-full hidden sm:block"></div>
                              <div className="h-2 bg-gray-300 rounded-sm w-full hidden sm:block"></div>
                              <div className="h-2 bg-gray-300 rounded-sm w-full hidden sm:block"></div>
                         </div>
                         <div className='flex space-x-2 mb-2.5'>
                              <div className="h-2 bg-gray-300 rounded-sm w-full hidden md:block"></div>
                              <div className="h-2 bg-gray-300 rounded-sm w-full hidden md:block"></div>
                         </div>
                    </div>
                    <span className="sr-only">Loading...</span>
               </div>
          </div>
     )
}

export default LoadBlog