import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import API from '../../Services/API';
import moment from 'moment';
import "../Style/CustomFont.css"
import LoadBlog from '../Animation/LoadBlog';
import { useSelector } from 'react-redux';
import boBlogs from "../../Assets/No Blogs.jpg"

const WriterProfile = () => {

     const noProfilePhoto = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
     const userId = useSelector((state) => (state.LoginSlice.loggedUserId));
     const { authorId } = useParams();
     const [showDelete, setShowDelete] = useState(null);
     const [userProfile, setUserProfile] = useState(null);
     const [blogs, setBlogs] = useState([]);
     const [load, setLoad] = useState(false);
     const [isBlog, setIsBlog] = useState(false);

     useEffect(() => {
          const getAllBlogsByAuthor = async () => {
               try {
                    const response = await API.get(`/getWriterBlog/${authorId}`);
                    if (response.data.response.success) {
                         setBlogs(response.data.response.response);
                         setTimeout(() => {
                              setLoad(true)
                         }, 4000)
                    }
                    else if (response.data.response.success === false) {
                         setIsBlog(true)
                         setTimeout(() => {
                              setLoad(true)
                         }, 2000)
                    }
               } catch (err) {
                    toast.error("Failed to Load Blogs");
               }
          };

          if (authorId) {
               getAllBlogsByAuthor();
          }
     }, [authorId]);

     useEffect(() => {
          const getWriterProfile = async () => {
               try {
                    const response = await API.get(`/getWriterProfile/${authorId}`);
                    if (response.data.response.success) {
                         setUserProfile(response.data.response.response[0]);
                    }
               } catch (err) {
                    toast.error("Failed to Load Profile");
                    // console.log(err);
               }
          };

          if (authorId) {
               getWriterProfile();
          }
     }, [authorId]);

     const deleteBlog = async (blogId, index) => {
          try {
               const response = await API.post(`/deleteBlog`, { "_id": blogId, "authorId": authorId });
               if (response.data.response.success) {
                    setBlogs(blogs.filter((_, i) => i !== index));
                    setShowDelete(null);
               }
               console.log(response.data.response.success)
               console.log(response.data.response.response)
          } catch (err) {
               toast.error("Failed to Load Profile");
          }
     };

     const showDeleteOpt = (index) =>{
          setShowDelete(index)
     }

     return (
          <div className='flex flex-col-reverse lg:flex-row w-screen lg:px-40 mt-5'>
               <ToastContainer />
               <div className='h-screen w-full lg:w-2/3 p-2'>
                    {load && blogs?.map((items, key) => (
                         <div key={key} className='border-gray-200 w-full flex mb-5 pb-4 00 border-b-2'>
                              <div>
                                   <div className="flex justify-start gap-2 flex-wrap pl-4">
                                        {items?.tags.slice(0, 3).map((i, e) => (
                                             <span key={e} className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-800">{i}</span>
                                        ))}
                                   </div>
                                   <div className="flex justify-between mb-2 pl-4">
                                        <div className='flex py-5 place-content-center items-center'>
                                             <img src={items?.photo?.trim() !== "" ? items?.photo : noProfilePhoto} onError={(e) => e.target.src = noProfilePhoto} className="h-8 w-8 rounded-full mr-2 object-cover border-2 border-black" alt="Author" />
                                             <div className={`space-x-4 sm:hidden ${showDelete !== null && showDelete === key ? 'hidden' : 'flex'}`}>
                                                  <p className="fontTitle font-semibold text-sm capitalize">{items.firstName} {items.lastName}</p>
                                                  <p className="fontTitle text-sm font-medium">{moment(items?.createdAt).format('MMMM Do YYYY')}</p>
                                             </div>
                                             <div className="flex space-x-3 md:space-x-4">
                                                  <p className="hidden sm:block fontTitle font-semibold text-sm capitalize">{items.firstName} {items.lastName}</p>
                                                  <p className="hidden sm:block fontTitle text-sm font-medium">{moment(items?.createdAt).format('MMMM Do YYYY')}</p>
                                             </div>
                                        </div>
                                        {userId === authorId && (
                                             <div className='flex items-center'>
                                                  <Link to='/edit' className={`px-4 border-opacity-0 hover:border-opacity-100 duration-200 cursor-pointer ${showDelete !== null && showDelete === key ? 'hidden' : 'flex'}`}>
                                                       <div className='flex place-content-center items-center font-thin space-x-4 sm:text-lg'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-[22px]">
                                                                 <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                            </svg>
                                                       </div>
                                                  </Link>
                                                  <div className="flex place-content-center items-center relative px-4 border-opacity-0 hover:border-opacity-100 duration-200 cursor-pointer">
                                                       <div className={`shadow-[1px_1px_1px_black] mr-4 text-center flex place-content-center border-r-2 ${showDelete === key ? 'flex' : 'hidden'}`}>
                                                            <h3 className="font text-lg py-1 px-2 font-bold text-gray-700 pr-3">Are You sure ?</h3>
                                                            <svg onClick={()=>showDeleteOpt(null)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="white" className="size-6 my-auto bg-red-600 mr-4 rounded-sm">
                                                                 <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                            </svg>
                                                            <svg onClick={() => deleteBlog(items?._id, key)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="white" className="size-6 my-auto bg-green-600 mr-2 rounded-sm">
                                                                 <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                            </svg>
                                                       </div>
                                                       <div onClick={()=>showDeleteOpt(key)} name="showDelete" className='flex place-content-center items-center font-thin space-x-4 sm:text-lg'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-5">
                                                                 <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                            </svg>
                                                       </div>
                                                  </div>
                                             </div>
                                        )
                                        }
                                   </div>
                                   <Link to={`/blogContent/${items?._id}`} className="mt-2 bg-white rounded px-4 leading-normal w-full flex">
                                        <img
                                             className="shadow-[1px_1px_5px_gray] md:rounded-md mr-5 h-16 w-24 md:h-40 md:w-60 flex-none bg-cover overflow-hidden"
                                             src={items?.blogPhoto}
                                             alt="imageNone"
                                        />
                                        <div>
                                             <div className="md:mt-0 font-bold md:text-lg lg:text-2xl line-clamp-1 md:line-clamp-2" style={{ fontFamily: "sohne, Helvetica Neue, Helvetica, Arial, sans-serif" }}>
                                                  {items?.title}
                                             </div>
                                             <p className="text-base line-clamp-2 md:line-clamp-4 lg:line-clamp-3 text-gray-800" dangerouslySetInnerHTML={{ __html: items?.content }}>
                                             </p>
                                        </div>
                                   </Link>
                              </div>
                         </div>
                    ))}
                    {!load && Array.from({ length: 4 }).map((_, index) => (
                         <LoadBlog show={true} key={index} />
                    ))}
                    {(authorId === userId && isBlog) &&
                         <Link to='/write' className='mx-auto w-fit'>
                              <div className='cursor-pointer select-none hover:opacity-75 rounded-full  mt-20 mb-5 px-10 py-4 bg-gray-950 text-white flex place-content-center items-center w-fit space-x-5 mx-auto'>
                                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                   </svg>
                                   <div className='text-xl'>Start Writing</div>
                              </div>
                              <div className='text-slate-700 tracking-wider font w-fit mx-auto'>
                                   You Haven't Wrote Anything !!!
                              </div>
                         </Link>
                    }
                    {(authorId !== userId && isBlog) &&
                         <div className='mx-auto w-fit mt-10'>
                              <img src={boBlogs} alt="" className='ml-8' />
                              <div className='text-slate-700 text-lg tracking-wider font w-fit mx-auto'>
                                   No Blogs Yet From This Writer !!!
                              </div>
                         </div>
                    }
               </div>

               <div className='border-l-2 border-b-2 w-full lg:block lg:w-1/3 bg-gray-50 lg:h-screen lg:fixed right-0'>
                    <div className="bg-white p-3">
                         <div className='flex gap-x-5 place-content-center items-center mb-5'>
                              <div className="image overflow-hidden">
                                   <img className="hidden lg:block flex-shrink-0 object-cover rounded-full h-36 lg:h-52 bg-gray-500 aspect-square border-2 border-black" src={userProfile?.photo.length > 0 ? userProfile?.photo[0]?.trim() : noProfilePhoto} onError={(e) => e.target.src = noProfilePhoto} alt="imageError" />
                                   <img className="block lg:hidden flex-shrink-0 object-cover rounded-full h-36 bg-gray-500 aspect-square" src={userProfile?.photo.length > 0 ? userProfile?.photo[0]?.trim() : noProfilePhoto} onError={(e) => e.target.src = noProfilePhoto} alt="imageError" />
                              </div>
                              <div>
                                   <h1 className="text-gray-900 font-bold text-3xl leading-8 my-1 capitalize">{userProfile?.firstName} {userProfile?.lastName}</h1>
                                   <h3 className="text-gray-900 font-lg text-semibold leading-6 capitalize">{userProfile?.pronouns.length > 0 ? userProfile?.pronouns : null}</h3>
                              </div>
                         </div>
                         <p className="text-sm font-thin text-gray-800 italic font_2 leading-6">{userProfile?.aboutYou}</p>

                         <ul className="bg-gray-100 text-black hover:shadow py-2 px-3 hover:scale-90 duration-200 mt-3 divide-y rounded shadow-sm">
                              <li className="flex items-center py-3">
                                   <div className='flex place-content-center items-center space-x-3'>
                                        <span className='text-sm font-semibold'>User Name</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-5">
                                             <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25" />
                                        </svg>
                                   </div>
                                   <span className="ml-auto font-semibold text-black">{userProfile?.userName}</span>
                              </li>
                         </ul>
                         {userProfile?.phone.length > 0 &&
                              (
                                   <ul className="bg-gray-100 text-black hover:shadow py-2 px-3 hover:scale-90 duration-200 divide-y rounded shadow-sm">
                                        <li className="flex items-center py-3">
                                             <div className='flex place-content-center items-center space-x-3'>
                                                  <span className='text-sm font-semibold'>Phone</span>
                                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-5">
                                                       <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                                                  </svg>
                                             </div>
                                             <span className="ml-auto font-semibold text-black">{userProfile?.phone.length > 0 ? userProfile?.phone : null}</span>
                                        </li>
                                   </ul>
                              )}
                         {userProfile?.email.length > 0 &&
                              (

                                   <ul className="bg-gray-100 text-black hover:shadow py-2 px-3 hover:scale-90 duration-200 divide-y rounded shadow-sm">
                                        <li className="flex items-center py-3">
                                             <div className='flex place-content-center items-center space-x-3'>
                                                  <span className='text-sm font-semibold'>Email</span>
                                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-5">
                                                       <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                                                  </svg>
                                             </div>
                                             <span className="ml-auto font-semibold text-black">{userProfile?.email.length > 0 ? userProfile?.email : null}</span>
                                        </li>
                                   </ul>
                              )
                         }
                         <ul className="bg-gray-100 text-black hover:shadow py-2 px-3 hover:scale-90 duration-200 divide-y rounded shadow-sm">
                              <li className="flex items-center py-3">
                                   <div className='flex place-content-center items-center space-x-3'>
                                        <span className='text-sm font-semibold'>Mermber Since</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-5">
                                             <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z" />
                                        </svg>
                                   </div>
                                   <span className="ml-auto font-semibold text-black">{moment(userProfile?.createdAt).format('MMMM Do YYYY')}</span>
                              </li>
                         </ul>
                    </div>
               </div>
          </div >
     )
}

export default WriterProfile