import React from 'react'

const Error_404 = () => {

  return (

    <div className="flex flex-col items-center pt-20 min-h-screen bg-white">
      <div className="flex flex-col">
        <div className="flex flex-col items-center">
          <div className="text-[#16831f] font-bold text-7xl">404</div>
          <div className="font-bold text-3xl xl:text-6xl lg:text-6xl md:text-5xl">This page does not exist</div>
        </div>

        <div className="flex flex-col mt-10">
          <div className="flex flex-col items-stretch">
            <div className="flex flex-row group px-4 py-8 border-t hover:cursor-pointer transition-all duration-200 delay-100">
              <div className="rounded-xl flex place-content-center items-center w-16 h-16 px-3 bg-[#16831f] py-2 md:py-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
              </div>
              <div className="grow flex flex-col pl-5">
                <div className="font-bold text-sm md:text-lg lg:text-xl">
                  Home Page
                </div>
                <div className="font-thin text-sm md:text-md lg:text-lg text-gray-900 group-hover:text-gray-500 transition-all duration-200 delay-100">
                  Everything starts here
                </div>
              </div>
            </div>

            

            <div className="flex flex-row group px-4 py-8 border-t hover:cursor-pointer transition-all duration-200 delay-100">
              <div className="rounded-xl flex place-content-center items-center w-16 h-16 px-3 bg-[#16831f] py-2 md:py-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="size-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                </svg>
              </div>
              <div className="grow flex flex-col pl-5">
                <div className="font-bold text-sm md:text-lg lg:text-xl">
                  Previous Page
                </div>
                <div className="font-thin text-sm md:text-md lg:text-lg text-gray-900 group-hover:text-gray-500 transition-all duration-200 delay-100">
                  Read our awesome articles
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Error_404