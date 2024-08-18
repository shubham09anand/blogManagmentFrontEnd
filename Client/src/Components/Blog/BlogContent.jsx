import React, { useState, useEffect } from 'react'
import Comment from './Comment'
import MakeComment from './MakeComment'
import API from '../../Services/API';
import moment from 'moment';
import LoadingBlog from '../Animation/LoadingBlog';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useParams } from 'react-router-dom'

const BlogContent = () => {
     const noProfilePhoto = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
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
                              <article className="mx-auto w-full format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
                                   <header className="mb-4 lg:mb-6 not-format">
                                        <h1 className="mb-4 text-5xl lg:text-7xl font-extrabold leading-tight text-gray-900 lg:mb-6">{blog?.title}</h1>
                                        <address className="flex items-center mb-6 not-italic">
                                             <div to={`/profile/${"authorId"}`} className="inline-flex items-center mr-3 text-sm text-gray-900">
                                                  <Link to={`/profile/${blog.authorId}`}>
                                                       <img className="mr-4 w-14 h-14 rounded-full border-2 border-black" src={blog?.photo?.trim() !== "" ? blog?.photo : noProfilePhoto} onError={(e) => e.target.src = noProfilePhoto} alt="profileImage" />
                                                  </Link>

                                                  <div>
                                                       <div className="text-xl font-bold text-gray-900 capitalize">{blog?.firstName} {blog?.lastName}</div>
                                                       <p className="text-base text-gray-600"><time>{moment(blog?.createdAt).format('MMMM Do YYYY')} &nbsp; {moment(blog?.createdAt).format('HH:mm:ss')}</time></p>
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
                                   <Comment/>
                                   <MakeComment/>
                              </article>
                         </div>
                    </div>
               )}
               {load && (<LoadingBlog />)}
          </>
     )
}

export default BlogContent