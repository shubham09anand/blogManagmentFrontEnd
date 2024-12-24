import React from 'react'
import WriterList from './WriterList';

const SideBar = () => {
     return (
          <div className='border-l-2 border-white hidden lg:block w-1/3 h-[calc(100%-200px)] overflow-scroll fixed right-0'>
               <WriterList />
          </div>
     )
}

export default SideBar