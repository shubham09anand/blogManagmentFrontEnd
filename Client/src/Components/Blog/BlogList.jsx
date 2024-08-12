import React, { useEffect, useState } from 'react';
import SideBar from './SideBar';
import Search from '../Search/Search';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import API from '../../Services/API';

const BlogList = () => {
     const noProfilePhoto = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
     const [blogs, setBlogs] = useState([])
     const [focus, setFocous] = useState(false)

     useEffect(() => {
          const getAllTags = async () => {
               try {
                    const response = await API.post('/getAllBlogs');
                    if (response.data.response.success) {
                         setBlogs(response.data.response.response);
                         // console.log(response.data.response.response);
                    } else {
                         toast.error("Failed to Load Blogs");
                    }
               } catch (err) {
                    toast.error("Failed to Load Blogs");
                    console.log(err);
               }
          };

          getAllTags();
     }, []);

     return (
          <>
               <ToastContainer />
               <div className={`text-4xl w-fit mx-auto font_3 pt-10 ${focus ? "block" : "hidden"}`}>Explore topics</div>
               <div className=" flex items-center space-x-6 rounded-xl transform w-11/12 lg:w-4/5 mt-5 mx-auto">

                    <div className="flex  p-4 w-full space-x-4 rounded-full bg-gray-200 border">
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="green" className={`size-6 mt-1 ${!focus ? "block" : "hidden"}`}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                         </svg>

                         <svg onClick={() => setFocous(false)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="green" className={`size-6 mt-1 ${focus ? "block" : "hidden"}`}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                         </svg>

                         <input onFocus={() => setFocous(true)} className="bg-transparent outline-none w-3/5" type="text" placeholder="Article name or keyword..." />
                    </div>

                    <div className={`absolute -translate-x-[44px] sm:-translate-x-[52px] md:-translate-x-[64px] lg:-translate-x-[178px] mt-20 top-0 left-0 h-screen w-screen z-50 ${focus ? "block" : "hidden"}`}>
                         <Search />
                    </div>

               </div>


               <div className={`flex w-screen lg:px-40 mt-5 ${!focus ? "block" : "hidden"}`}>
                    <div className='lg:w-2/3 p-2 gap-y-4'>
                         {blogs?.map((items, key) => (
                              <div key={key}>
                                   <div className="flex justify-start gap-2 flex-wrap pt-4 pl-4">
                                        {items?.tags.slice(0, 3).map((i, e) => (
                                             <span key={e} className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-800">{i}</span>
                                        ))}
                                   </div>
                                   <div className='border-gray-200 w-full flex pb-5 pt-3 00 border-b-2 border-opacity-35'>
                                        <div>
                                             <div className="flex items-center mb-2 pl-4 py-4">
                                                  <img src={items?.photo?.trim() != "" ? items?.photo : noProfilePhoto} className="h-8 w-8 rounded-full mr-2 object-cover border-2 border-black" alt="AuthorImage" />
                                                  <Link to={`/profile/${items?.authorId}`} className='flex place-content-center items-center space-x-6'>
                                                       <p className="fontTitle font-semibold text-sm capitalize">{items?.firstName} {items?.lastName}</p>
                                                       <p className="fontTitle text-sm font-medium">{moment(items?.createdAt).format('MMMM Do YYYY')}</p>
                                                  </Link>
                                             </div>
                                             <Link to={`/blogContent/${items?._id}`} className=" rounded px-4 leading-normal w-full flex">
                                                  <img
                                                       className="shadow-[1px_1px_5px_gray] md:rounded-md mr-5 h-16 w-24 md:h-40 md:w-60 flex-none bg-cover overflow-hidden"
                                                       src={items?.blogPhoto}
                                                       alt="imageError"
                                                  />
                                                  <div>
                                                       <div className="md:mt-0 font-bold md:text-lg lg:text-2xl line-clamp-1 md:line-clamp-2" style={{ fontFamily: "sohne, Helvetica Neue, Helvetica, Arial, sans-serif" }}>
                                                            {items?.title}
                                                       </div>
                                                       <p className="text-base line-clamp-2 md:line-clamp-4 lg:line-clamp-3 text-gray-800">
                                                            {items?.content}
                                                       </p>
                                                  </div>
                                             </Link>
                                        </div>
                                   </div>
                              </div>
                         ))}
                    </div>
                    <SideBar />
               </div>

          </>
     );
};

export default BlogList;