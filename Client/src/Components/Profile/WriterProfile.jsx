import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import API from '../../Services/API';
import moment from 'moment';
import "../Style/CustomFont.css";
import boBlogs from "../../Assets/No Blogs.jpg";
import LoadBlog from '../Animation/LoadBlog';
import LaodingProfile from '../Animation/LaodingProfile';

const WriterProfile = () => {

     const blogImageErr = "https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg";
     const noProfilePhoto = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
     const userId = useSelector((state) => (state.LoginSlice.loggedUserId));
     const { authorId } = useParams();
     const [showDelete, setShowDelete] = useState(null);
     const [userProfile, setUserProfile] = useState(null);
     const [blogs, setBlogs] = useState([]);
     const [load, setLoad] = useState(false);
     const [isBlog, setIsBlog] = useState(false);
     const [loadProfile, setLoadProfile] = useState(true)

     useEffect(() => {
          const getAllBlogsByAuthor = async () => {
               try {
                    const response = await API.get(`/getWriterBlog/${authorId}`);
                    if (response.data.response.success) {
                         setBlogs(response.data.response.response);
                         setLoad(true)
                    }
                    else if (response.data.response.success === false) {
                         setIsBlog(true)
                         setLoad(true)
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
                         setLoadProfile(false)
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
                    toast.success("Blog Has Been Removed")
               }
               // console.log(response.data.response.success)
               // console.log(response.data.response.response)
          } catch (err) {
               toast.error("Failed to Load Profile");
          }
     };

     const showDeleteOpt = (index) => {
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
                                                  <Link to={`/edit/${items._id}`} className={`px-4 border-opacity-0 hover:border-opacity-100 duration-200 cursor-pointer ${showDelete !== null && showDelete === key ? 'hidden' : 'flex'}`}>
                                                       <div className='flex place-content-center items-center font-thin space-x-4 sm:text-lg'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="size-[22px]">
                                                                 <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                            </svg>
                                                       </div>
                                                  </Link>
                                                  <div className="flex place-content-center items-center relative px-4 border-opacity-0 hover:border-opacity-100 duration-200 cursor-pointer">
                                                       <div className={`shadow-[1px_1px_1px_black] mr-4 text-center flex place-content-center border-r-2 ${showDelete === key ? 'flex' : 'hidden'}`}>
                                                            <h3 className="font text-lg py-1 px-2 font-bold text-gray-700 pr-3">Are You sure ?</h3>
                                                            <svg onClick={() => showDeleteOpt(null)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="white" className="size-6 my-auto bg-red-600 mr-4 rounded-sm">
                                                                 <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                                            </svg>
                                                            <svg onClick={() => deleteBlog(items?._id, key)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="white" className="size-6 my-auto bg-green-600 mr-2 rounded-sm">
                                                                 <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                                                            </svg>
                                                       </div>
                                                       <div onClick={() => showDeleteOpt(key)} name="showDelete" className='flex place-content-center items-center font-thin space-x-4 sm:text-lg'>
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
                                             src={items?.blogPhoto} onError={(e) => e.target.src = blogImageErr}
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

               {loadProfile ?
                    <LaodingProfile />
                    :
                    <div className='border-l-2 border-b-2 w-full lg:block lg:w-1/3 bg-gray-50 lg:h-screen lg:fixed right-0'>
                         <div className="bg-white p-3">
                              <div className='flex gap-x-5 place-content-center items-center mb-5'>
                                   <div className="image overflow-hidden">
                                        <img className="hidden lg:block flex-shrink-0 object-cover rounded-full w-48 h-48 bg-gray-500 border-2 border-black" src={userProfile?.photo.length > 0 ? userProfile?.photo[0]?.trim() : noProfilePhoto} onError={(e) => e.target.src = noProfilePhoto} alt="imageError" />
                                        <img className="block lg:hidden flex-shrink-0 object-cover rounded-full w-28 h-28 element-500:h-400  element-500:w-400 sm:w-36 sm:h-36 bg-gray-500" src={userProfile?.photo.length > 0 ? userProfile?.photo[0]?.trim() : noProfilePhoto} onError={(e) => e.target.src = noProfilePhoto} alt="imageError" />
                                   </div>
                                   <div>
                                        <h1 className="text-gray-900 font-bold text-2xl md:text-3xl leading-8 my-1 capitalize">{userProfile?.firstName} {userProfile?.lastName}</h1>
                                        <h3 className="text-gray-900 font-lg text-semibold leading-6 capitalize bg-gray-200 w-fit h-fit px-2 rounded-full font-bold">{userProfile?.pronouns.length > 0 ? userProfile?.pronouns : null}</h3>
                                        {userProfile?.userName === "@shubham" && (
                                             <>
                                                  <div className='flex gap-x-5 my-2 mb-4 flex-wrap gap-y-2'>
                                                       <h3 className="gap-x-2 flex place-content-center items-center text-gray-900 bg-gray-200 w-fit h-fit px-2 rounded-full font-lg font-bold text-semibold leading-6 capitalize">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" strokeWidth="2" className="bi bi-code-slash size-5" viewBox="0 0 16 16">
                                                                 <path d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0m6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0" />
                                                            </svg>
                                                            Devploer
                                                       </h3>
                                                       <h3 className="gap-x-3 flex place-content-center items-centertext-gray-900 bg-gray-200 w-fit h-fit px-2 rounded-full font-lg font-bold text-semibold leading-6 capitalize">
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" strokeWidth="2" className="bi bi-key size-5 scale-125 mt-1" viewBox="0 0 16 16">
                                                                 <path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8m4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5" />
                                                                 <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                                                            </svg>
                                                            Owner
                                                       </h3>
                                                  </div>
                                                  <div className='flex'>
                                                       <a href="https://www.instagram.com/shubham09anand/" target='_'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" strokeWidth="2" className="bi bi-instagram size-5 mx-2" viewBox="0 0 16 16">
                                                                 <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                                                            </svg>
                                                       </a>


                                                       <a href="https://www.linkedin.com/in/subham09anand/" target='_'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" strokeWidth="2" className="bi bi-linkedin size-5 mx-2" viewBox="0 0 16 16">
                                                                 <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                                                            </svg>
                                                       </a>


                                                       <a href="https://github.com/shubham09anand" target='_'>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" strokeWidth="2" className="bi bi-github size-5 mx-2" viewBox="0 0 16 16">
                                                                 <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                                                            </svg>
                                                       </a>
                                                  </div>
                                             </>
                                        )}
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
               }



          </div >
     )
}

export default WriterProfile