import React from 'react'
import { Link } from 'react-router-dom'

const SimlarArtciles = () => {
     return (
          <aside aria-label="Related articles" className="flex place-content-center items-center bg-black pt-5">
               <div className="px-4 mx-auto max-w-screen-xl">
                    <h2 className="mb-8 text-2xl font-bold text-white font">Related articles</h2>
                    <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
                         <Link to='/blogContent' className="max-w-xs border-b border-b-gray-100 border-opacity-10">
                              <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-1.png" className="mb-5 rounded-none w-full" alt="Image1" />
                              <h2 className="mb-2 text-xl font-bold leading-tight text-white">
                                   <div>Our first office</div>
                              </h2>
                              <p className="mb-4 text-gray-500 dark:text-gray-400">Over the past year, Volosoft has undergone many changes! After months of preparation.</p>
                         </Link>
                         <Link to='/blogContent' className="max-w-xs border-b border-b-gray-100 border-opacity-10">
                              <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-2.png" className="mb-5 rounded-none w-full" alt="Image2" />
                              <h2 className="mb-2 text-xl font-bold leading-tight text-white">
                                   <div>Enterprise design tips</div>
                              </h2>
                              <p className="mb-4  text-gray-500 dark:text-gray-400">Over the past year, Volosoft has undergone many changes! After months of preparation.</p>
                         </Link>
                         <Link to='/blogContent' className="max-w-xs border-b border-b-gray-100 border-opacity-10">
                              <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-3.png" className="mb-5 rounded-none w-full" alt="Image3" />
                              <h2 className="mb-2 text-xl font-bold leading-tight text-white">
                                   <div>We partnered with Google</div>
                              </h2>
                              <p className="mb-4  text-gray-500 dark:text-gray-400">Over the past year, Volosoft has undergone many changes! After months of preparation.</p>
                         </Link>
                         <Link to='/blogContent' className="max-w-xs border-b border-b-gray-100 border-opacity-10">
                              <img src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/article/blog-4.png" className="mb-5 rounded-none w-full" alt="Image4" />
                              <h2 className="mb-2 text-xl font-bold leading-tight text-white">
                                   <div>Our first project with React</div>
                              </h2>
                              <p className="mb-4  text-gray-500 dark:text-gray-400">Over the past year, Volosoft has undergone many changes! After months of preparation.</p>
                         </Link>
                    </div>
               </div>
          </aside>
     )
}

export default SimlarArtciles