import React, { useState } from 'react'
import WriterList from './WriterList';
import LaodTags from '../Animation/LaodTags';

const SideBar = () => {
     const [load, setLoad] = useState(false)
     setTimeout(() => {
          setLoad(true)
     }, 4000)
     return (
          <div className='border-l-2 border-white hidden lg:block w-1/3 h-screen fixed right-0'>
               <div>
                    <div className='text-2xl font-bold pl-6 pb-3'>Recommended topics</div>
                    <div>
                         {load && <div className="px-4 flex justify-cente flex-wrap">
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
                         </div>}
                         {!load && <span className='ml-4'><LaodTags /></span>}
                    </div>
               </div>
               <WriterList />
          </div>
     )
}

export default SideBar