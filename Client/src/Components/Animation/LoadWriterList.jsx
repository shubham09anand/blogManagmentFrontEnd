import React from 'react'

const LoadWriterList = () => {
     return (
          <div role="status" className="max-w-md p-4 space-y-4 divide-gray-200 rounded shadow animate-pulse  md:p-6">
               <div className="flex items-center justify-between">
                    <div className='animate-pulse flex items-center -mb-8 sm:-mb-4 md:-mb-2 pl-2 sm:pl-4 lg:pl-0 pb-2'>
                         <svg className="w-10 h-10 me-3 text-gray-00" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"></path>
                         </svg>
                         <div>
                              <div className="h-2.5 bg-gray-400 rounded-full w-32 mb-2"></div>
                              <div className="w-16 h-2 bg-gray-300 rounded-full"></div>
                         </div>
                    </div>
                    <div className="h-2.5 bg-gray-300 p-2 rounded-full w-12"></div>
               </div>
               <span className="sr-only">Loading...</span>
          </div>
     )
}

export default LoadWriterList