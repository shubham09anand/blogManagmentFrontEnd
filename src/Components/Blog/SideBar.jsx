import React from 'react'
import WriterList from './WriterList';

const SideBar = () => {
     return (
          <div className='snap-center flex-shrink-0 w-fit lg:block h-[calc(100%-200px)] overflow-scroll'>
               <WriterList />
          </div>
     )
}

export default SideBar