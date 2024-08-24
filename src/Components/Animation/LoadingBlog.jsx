import React from 'react'

const LoadingBlog = () => {
     return (
          <div className="max-w-3xl mt-20 min-h-screen bg-white mx-auto">
               <div className=" h-8 w-11/12 bg-gray-600 rounded ml-4 animate-pulse"></div>
               <div className='flex items-center my-4 mb-6 ml-3 animate-pulse'>
                    <svg className="w-16 h-16 me-3 text-gray-00" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                         <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"></path>
                    </svg>
                    <div>
                         <div className="h-2 bg-gray-400 rounded-full w-32 mb-2"></div>
                         <div className="w-16 h-2 bg-gray-400 rounded-full"></div>
                    </div>
               </div>
               <div className='px-4 mx-auto'>
                    <div className="space-y-5 my-4">
                         <div className="rounded w-full flex space-x-5 animate-pulse">
                              <div className='h-2 bg-gray-400 rounded w-1/4'></div>
                              <div className='h-2 bg-gray-400 rounded w-1/5'></div>
                              <div className='h-2 bg-gray-400 rounded w-1/3'></div>
                              <div className='h-2 bg-gray-400 rounded w-2/3'></div>
                              <div className='h-2 bg-gray-400 rounded w-1/3'></div>
                              <div className='h-2 bg-gray-400 rounded w-1/4'></div>
                         </div>
                         <div className="rounded w-full flex space-x-5 animate-pulse">
                              <div className='h-2 bg-gray-400 rounded w-1/3'></div>
                              <div className='h-2 bg-gray-400 rounded w-1/4'></div>
                              <div className='h-2 bg-gray-400 rounded w-1/5'></div>
                              <div className='h-2 bg-gray-400 rounded w-1/3'></div>
                              <div className='h-2 bg-gray-400 rounded w-2/3'></div>
                              <div className='h-2 bg-gray-400 rounded w-1/3'></div>
                         </div>
                    </div>
               </div>
               <div className='px-4 py-4 animate-pulse'>
                    <div className='mx-auto h-60 rounded-md bg-gray-500 flex place-content-center items-center'>
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="size-20">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                         </svg>
                    </div>
               </div>
               <div className="mx-auto px-4">
                    {Array.from({ length: 2 }).map((_, index) => (
                         <div className="space-y-5 my-4" key={index}>
                              <div className="rounded w-full flex space-x-5 animate-pulse">
                                   <div className='h-2 bg-gray-400 rounded w-1/4'></div>
                                   <div className='h-2 bg-gray-400 rounded w-1/5'></div>
                                   <div className='h-2 bg-gray-400 rounded w-1/3'></div>
                                   <div className='h-2 bg-gray-400 rounded w-2/3'></div>
                                   <div className='h-2 bg-gray-400 rounded w-1/3'></div>
                                   <div className='h-2 bg-gray-400 rounded w-1/4'></div>
                              </div>
                              <div className="rounded w-full flex space-x-5 animate-pulse">
                                   <div className='h-2 bg-gray-400 rounded w-1/3'></div>
                                   <div className='h-2 bg-gray-400 rounded w-1/4'></div>
                                   <div className='h-2 bg-gray-400 rounded w-1/5'></div>
                                   <div className='h-2 bg-gray-400 rounded w-1/3'></div>
                                   <div className='h-2 bg-gray-400 rounded w-2/3'></div>
                                   <div className='h-2 bg-gray-400 rounded w-1/3'></div>
                              </div>
                              <div className="rounded w-full flex space-x-5 animate-pulse">
                                   <div className='h-2 bg-gray-400 rounded w-1/4'></div>
                                   <div className='h-2 bg-gray-400 rounded w-1/5'></div>
                                   <div className='h-2 bg-gray-400 rounded w-2/3'></div>
                                   <div className='h-2 bg-gray-400 rounded w-1/3'></div>
                                   <div className='h-2 bg-gray-400 rounded w-1/3'></div>
                                   <div className='h-2 bg-gray-400 rounded w-2/3'></div>
                              </div>
                              <div className="rounded w-full flex space-x-5 animate-pulse">
                                   <div className='h-2 bg-gray-400 rounded w-1/4'></div>
                                   <div className='h-2 bg-gray-400 rounded w-1/5'></div>
                                   <div className='h-2 bg-gray-400 rounded w-1/3'></div>
                                   <div className='h-2 bg-gray-400 rounded w-1/3'></div>
                                   <div className='h-2 bg-gray-400 rounded w-1/4'></div>
                              </div>
                         </div>
                    ))}
               </div>
          </div>
     )
}

export default LoadingBlog