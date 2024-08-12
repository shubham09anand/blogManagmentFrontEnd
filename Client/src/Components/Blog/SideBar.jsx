import React from 'react'
import WriterList from './WriterList';

const SideBar = () => {
     return (
          <div className='border-l-2 border-white hidden lg:block w-1/3 h-screen fixed right-0'>
               <div>
                    <div className='text-2xl font-bold pl-6 pb-3'>Recommended topics</div>
                    <div>
                         <div className="px-4 flex justify-cente flex-wrap">
                              <span className="inline-flex items-center cursor-pointer m-2 px-4 py-3 bg-gray-200 hover:bg-gray-300 rounded-full text-sm text-gray-800">
                                   <span className="ml-1">
                                        Default Badge
                                   </span>
                              </span>
                              <span className="inline-flex items-center cursor-pointer m-2 px-4 py-3 bg-gray-200 hover:bg-gray-300 rounded-full text-sm text-gray-800">
                                   <span className="ml-1">
                                        Default Badge
                                   </span>
                              </span>
                              <span className="inline-flex items-center cursor-pointer m-2 px-4 py-3 bg-gray-200 hover:bg-gray-300 rounded-full text-sm text-gray-800">
                                   <span className="ml-1">
                                        Default Badge
                                   </span>
                              </span>
                              <span className="inline-flex items-center cursor-pointer m-2 px-4 py-3 bg-gray-200 hover:bg-gray-300 rounded-full text-sm text-gray-800">
                                   <span className="ml-1">
                                        Default Badge
                                   </span>
                              </span>
                         </div>


                    </div>
               </div>
               <WriterList/>
          </div>
     )
}

export default SideBar