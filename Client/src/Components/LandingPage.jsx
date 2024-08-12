import React from 'react'
import LandingPagePhoto from "../Assets/LandingPage.webp"
import { Link } from 'react-router-dom'

const LandingPage = () => {
     return (
          <section className="bg-[#f7f4ed] min-h-screen flex">
               <div className="grid max-w-screen-xl px-4 lg:pl-20 pb-8 mx-auto md:mx-0 lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28">
                    <div className=" mr-auto place-self-center lg:col-span-7">
                         <h1
                              className="font max-w-2xl mb-4 text-8xl font-extralight leading-[75px] tracking-tight">
                              Human stories & ideas
                         </h1>

                         <p className="max-w-2xl mb-6 font-medium lg:mb-8 text-lg">
                              A place to read, write, deepen & express your understanding with others
                         </p>

                         <div className="absolute z-20 space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                              <Link to="./signup" className="inline-flex items-center text-xl justify-center w-full px-5 py-3 font-medium text-center border bg-gray-900 text-white border-gray-200 rounded-full sm:w-auto">
                                   Start Reading
                              </Link>
                         </div>

                         <div className="hidden lg:mt-0 lg:col-span-5 sm:flex absolute z-10 top-0 right-0 opacity-75 lg:opacity-100">
                              <img src={LandingPagePhoto} alt="imageError" className='max-h-screen' />
                         </div>
                    </div>
               </div>
          </section>
     )
}

export default LandingPage