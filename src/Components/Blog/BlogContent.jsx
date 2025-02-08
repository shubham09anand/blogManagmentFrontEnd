import React, { useState, useEffect } from 'react'
import Comment from './Comment'
import MakeComment from './MakeComment'
import API from '../../Services/API';
import moment from 'moment';
import LoadingBlog from '../Animation/LoadingBlog';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';

const BlogContent = () => {
     const noProfilePhoto = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
     const userId = useSelector((state) => state.LoginSlice.loggedUserId)
     const { blogId } = useParams();
     const [blog, setBlog] = useState([]);
     const [load, setLoad] = useState(true);

     useEffect(() => {
          const getBlog = async () => {
               try {
                    const response = await API.get(`/getOneBlog/${blogId}`);
                    if (response.data.response.success) {
                         setBlog(response.data.response.response[0]);
                         setLoad(false)
                    }
               } catch (err) {
                    toast.error("Failed to Load Blogs");
                    // console.log(err);
               }
          };
          if (blogId) {
               getBlog();
          }
     }, [blogId]);

     return (
          <>
               <ToastContainer />
               {!load && (
                    <div className="w-full lg:w-1/2 mx-auto flex flex-col place-content-center items-center pt-8 pb-16 lg:pt-16 bg-white antialiased">
                         <div className="flex flex-col justify-between px-4 mx-auto max-w-screen-xl ">
                              <article className="mx-auto md:min-w-[600px] format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
                                   <header className="mb-4 lg:mb-6 not-format">
                                        <h1 className={`mb-4 font-extrabold leading-tight text-gray-900 lg:mb-6 ${blog?.title.length < 10 ? 'text-5xl lg:text-7xl' : 'text-2xl md:text-4xl' }`}>{blog?.title}</h1>
                                        <address className="flex items-center mb-6 not-italic">
                                             <div className="inline-flex items-center mr-3 text-sm text-gray-900">
                                                  <Link to={`/insider/profile/${blog?.authorId}`}>
                                                       <img className="mr-4 w-20 h-20 rounded-full border-2 border-black" src={blog?.photo && blog?.photo?.trim() !== "" ? blog?.photo : noProfilePhoto} onError={(e) => e.target.src = noProfilePhoto} alt="profileImage" />
                                                  </Link>
                                                  <div>
                                                       <div className=' items-center gap-x-2'>
                                                            <div className="text-xl font-bold text-gray-900 capitalize">{blog?.firstName} {blog?.lastName}</div>
                                                       </div>
                                                       <p className="text-base text-gray-600 -mt-1"><time>{moment(blog?.createdAt).format('MMMM Do YYYY')} &nbsp; {moment(blog?.createdAt).format('HH:mm:ss')}</time></p>
                                                       {blog?.userName === "@shubham" && (
                                                            <>
                                                                 <div className='flex mt-1'>
                                                                      <a href="https://www.instagram.com/shubham09anand/" target='_'>
                                                                           <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" strokeWidth="2" className="bi bi-instagram size-5 mr-2" viewBox="0 0 16 16">
                                                                                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                                                                           </svg>
                                                                      </a>


                                                                      <a href="https://www.linkedin.com/in/subham09anand/" target='_'>
                                                                           <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" strokeWidth="2" className="bi bi-linkedin size-5 mr-2" viewBox="0 0 16 16">
                                                                                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                                                                           </svg>
                                                                      </a>


                                                                      <a href="https://github.com/shubham09anand" target='_'>
                                                                           <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" strokeWidth="2" className="bi bi-github size-5 mr-2" viewBox="0 0 16 16">
                                                                                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                                                                           </svg>
                                                                      </a>
                                                                      <a href="https://its.shubham09anand.in/" target='_'>
                                                                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 mr-2">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                                                                           </svg>
                                                                      </a>

                                                                 </div>
                                                            </>
                                                       )}
                                                  </div>
                                             </div>
                                        </address>
                                   </header>
                                   <div className='mt-10'></div>
                                   <div className='text-lg' dangerouslySetInnerHTML={{ __html: blog.content }}></div>
                                   <div className="flex justify-start gap-2 flex-wrap mt-5 mb-10 pb-10 border-b-2">
                                        {blog?.tags?.slice(0, 3).map((i, e) => (
                                             <span key={e} className="bg-gray-200 rounded-full px-5 py-1 text-sm font-semibold text-gray-800">{i}</span>
                                        ))}
                                   </div>
                                   {userId !== null ? (
                                        <>
                                             <Comment />
                                             <MakeComment />
                                        </>
                                   ): <div className='text-gray-700 font-thin text-center'>Login to read and make comments</div>}
                                   
                              </article>
                         </div>
                    </div>
               )}
               {load && (<LoadingBlog />)}
          </>
     )
}

export default BlogContent