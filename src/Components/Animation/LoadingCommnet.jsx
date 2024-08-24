import React from 'react'

const LoadingCommnet = () => {
     return (
          <div className='my-4'>
               <div className='flex items-center mb-5 animate-pulse'>
                    <svg className="w-8 h-8 me-3 text-gray-00" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                         <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"></path>
                    </svg>
                    <div>
                         <div className="h-1 bg-gray-400 rounded-full w-32 mb-2"></div>
                         <div className="w-16 h-1 bg-gray-400 rounded-full"></div>
                    </div>
               </div>
               <div className='w-full h-2 rounded-sm space-y-2 mb-20'>
                    <div className="rounded w-full flex space-x-5 animate-pulse">
                         <div className='h-2 bg-gray-400 w-1/3'></div>
                         <div className='h-2 bg-gray-400 w-1/5'></div>
                         <div className='h-2 bg-gray-400 w-1/4'></div>
                         <div className='h-2 bg-gray-400 w-1/3'></div>
                         <div className='h-2 bg-gray-400 w-1/4'></div>
                         <div className='h-2 bg-gray-400 w-2/3'></div>
                    </div>
                    <div className="rounded w-full flex space-x-5 animate-pulse">
                         <div className='h-2 bg-gray-400 w-1/4'></div>
                         <div className='h-2 bg-gray-400 w-2/3'></div>
                         <div className='h-2 bg-gray-400 w-1/3'></div>
                         <div className='h-2 bg-gray-400 w-1/5'></div>
                         <div className='h-2 bg-gray-400 w-1/4'></div>
                         <div className='h-2 bg-gray-400 w-1/3'></div>
                    </div>
                    <div className="rounded w-full flex space-x-5 animate-pulse">
                         <div className='h-2 bg-gray-400 w-1/5'></div>
                         <div className='h-2 bg-gray-400 w-1/4'></div>
                         <div className='h-2 bg-gray-400 w-2/3'></div>
                         <div className='h-2 bg-gray-400 w-1/3'></div>
                         <div className='h-2 bg-gray-400 w-1/3'></div>
                         <div className='h-2 bg-gray-400 w-1/4'></div>
                    </div>
               </div>
          </div>
     )
}

export default LoadingCommnet