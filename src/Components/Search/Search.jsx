import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import API from '../../Services/API';
import LoadFilterBlog from '../Animation/LoadFilterBlog';
import LaodTags from '../Animation/LaodTags';

const Search = ({ text }) => {
     const noProfilePhoto = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
     const blogImageErr = "https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg";

     const [selectedOption, setSelectedOption] = useState('writers');
     const [displayTags, setDisplayTags] = useState([]);
     const [displayWriters, setDisplayWriters] = useState([]);
     const [blogData, setBlogData] = useState([]);

     const [selectTag, setSelectedTag] = useState(null);
     const [selectWriter, setSelectedWriter] = useState(null);
     const [filteredBlogs, setFilteredBlogs] = useState([]);

     const [loadBlog, setLoadBlog] = useState(false)
     const [LaodTag, setLoadTag] = useState(false)
     const [LaodWriter, setLoadWriters] = useState(false)

     // Change between tags and writers filter
     const handleOptionChange = (event) => {
          setSelectedOption(event.target.value);
          handleFilterToAll()
     };

     // Get all blog's tags and all writer's name and all blogs
     useEffect(() => {

          const getAllTags = async () => {
               try {
                    const response = await API.post('/getAllTags');
                    if (response.data.response.success) {
                         const tags = response.data.response.response.flatMap(item => item.tags);
                         const uniqueTags = [...new Set(tags)]; // Ensure uniqueness
                         setDisplayTags(uniqueTags);
                         setLoadTag(true);
                    }
               } catch (err) {
                    // toast.error("Error fetching tags");
                    console.log(err);
               }
          };

          // Get all writers
          const getAllWriters = async () => {
               try {
                    const response = await API.post('/getAllWriterName');
                    if (response.data.response.success) {
                         setDisplayWriters(response.data.response.response);
                         setLoadWriters(true)
                    }
               } catch (err) {
                    toast.error("Error fetching writers");
                    // console.log(err);
               }
          };

          // Get all blogs
          const getAllBlogs = async () => {
               try {
                    const response = await API.post('/getAllBlogs');
                    if (response.data.response.success) {
                         setBlogData(response.data.response.response);
                         setLoadBlog(true)
                    }
               } catch (err) {
                    toast.error("Error fetching blogs");
                    // console.log(err);
               }
          };

          getAllTags();
          getAllWriters();
          getAllBlogs();
     }, []);

     // Handle 'All' option
     const handleFilterToAll = () => {
          setSelectedTag(null);
          setSelectedWriter(null);
     };

     // Apply tag filter
     const filterByTag = (blogs) => {
          if (selectTag === null) return blogs;
          return blogs.filter(blog => blog.tags.includes(selectTag));
     };

     // Filter writer' name (by writer's name tags) filter
     const filterByWriter = (blogs) => {
          if (selectWriter === null || selectWriter === '') return blogs;

          const filterText = selectWriter.toLowerCase();

          return blogs.filter(blog => {
               const fullName = `${blog.firstName} ${blog.lastName}`.toLowerCase();
               return fullName.startsWith(filterText);
          });
     };

     // Filter writer' name (by text box) filter
     const filterByText = (blogs) => {
          if (!text) return blogs;
          const lowerText = text.toLowerCase();
          return blogs.filter(blog => {
               const title = blog.title.toLowerCase().trim();
               return title.startsWith(lowerText);
          });
     };

     useEffect(() => {
          let filtered = blogData;
          filtered = filterByTag(filtered);
          filtered = filterByWriter(filtered);
          filtered = filterByText(filtered);
          setFilteredBlogs(filtered);
          // eslint-disable-next-line
     }, [selectTag, selectWriter, text, blogData]);

     return (
          <>
               <ToastContainer />
               <div className='mb-5 mx-auto flex space-x-5 place-content-center items-center w-fit px-5 py-3 rounded-full bg-black text-white'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="size-6 bi bi-compass" viewBox="0 0 16 16">
                         <path d="M8 16.016a7.5 7.5 0 0 0 1.962-14.74A1 1 0 0 0 9 0H7a1 1 0 0 0-.962 1.276A7.5 7.5 0 0 0 8 16.016m6.5-7.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0" />
                         <path d="m6.94 7.44 4.95-2.83-2.83 4.95-4.949 2.83 2.828-4.95z" />
                    </svg>
                    <div>Search By</div>
                    <div>
                         <select id="search-option" name="search-option" className="bg-black text-white pl-2 outline-none border-l-2" required onChange={handleOptionChange}>
                              <option value="writers">Writers</option>
                              <option value="tags">Tags</option>
                         </select>
                    </div>
               </div>

               <div className="flex flex-wrap items-start justify-center px-3 pb-10">
                    <div onClick={handleFilterToAll} className="relative px-5 mt-3 bg-gray-200 rounded-full cursor-pointer select-none font-semibold tracking-wide shadow-sm sm:py-2 sm:text-base ring ring-transparent group md:px-4 text-gray-900">
                         <span className="text-sm ">All</span>
                    </div>
                    {LaodWriter && selectedOption === 'tags' && displayTags?.map((item, index) => (
                         <div onClick={() => setSelectedTag(item)} key={index} className="mt-3 relative px-5 py-2 m-2 bg-gray-200 rounded-full cursor-pointer select-none font-semibold tracking-wide shadow-sm sm:py-2 sm:text-base ring ring-transparent group md:px-4 text-gray-900">
                              <span className="text-sm">{item}</span>
                         </div>
                    ))}
                    {!LaodTag && selectedOption === 'tags' && (<div className='mt-9'><LaodTags key={Math.random()} /></div>)}

                   
                    {LaodTag && selectedOption === 'writers' && displayWriters?.map((item, key) => (
                         <div onClick={() => setSelectedWriter(item?.firstName)} key={key} className="flex place-content-center items-center space-x-3 relative px-5 py-2 m-2 bg-gray-200 rounded-full cursor-pointer select-none font-semibold tracking-wide shadow-sm sm:py-2 sm:text-base ring ring-transparent group md:px-4 text-gray-900">
                              <img src={item?.photo && item?.photo?.trim() !== "" ? item?.photo : noProfilePhoto} onError={(e) => e.target.src = noProfilePhoto} alt="authorImage" className='border-2 border-black w-8 h-8 rounded-full bg-cover' />
                              <span className="text-sm capitalize">{`${item?.firstName} ${item?.lastName}`}</span>
                         </div>
                    ))}
                    {!LaodTag && selectedOption === 'writers' && (<div className='mt-9'><LaodTags show={true}  key={Math.random()} /></div>)}
               </div>

               <div className='gap-10 flex flex-wrap items-center place-content-center'>
                    {loadBlog && filteredBlogs?.map((items, index) => (
                         <Link to={`/blogContent/${items._id}`} key={index} className="w-11/12 lg:w-1/5">
                              <div className="shadow-md border border-gray-200 rounded-lg max-w-sm">
                                   <img className="rounded-t-lg h-48 w-full" src={items?.blogPhoto} onError={(e) => e.target.src = blogImageErr} alt="imageError" />
                                   <div className='flex items-center space-x-2 mt-3 pl-5'>
                                        <img src={items?.photo && items?.photo?.trim() !== "" ? items?.photo : noProfilePhoto} onError={(e) => e.target.src = noProfilePhoto} alt="err" className='text-sm w-10 h-10 rounded-full border-2 border-black' />
                                        <div>
                                             <div className="capitalize">{`${items.firstName} ${items.lastName}`}</div>
                                             <div className="text-[10px] font-light capitalize">{moment(items?.createdAt).format('MMMM Do YYYY')}</div>
                                        </div>
                                   </div>
                                   <div className="p-5 pt-2">
                                        <h5 className="text-gray-900 font-bold text-lg tracking-tight mb-1 line-clamp-1">{items?.title}</h5>
                                        <p className="font-normal text-sm text-gray-700 mb-1 line-clamp-2" dangerouslySetInnerHTML={{ __html: items?.content }}></p>
                                   </div>
                              </div>
                         </Link>
                    ))}
                    {loadBlog && filteredBlogs?.length === 0 && <div className='text-gray-600 font-thin fontTitle'>No Blogs Match</div>}
                    {!loadBlog && Array.from({ length: 4 }).map((_, index) => (
                         <LoadFilterBlog key={index} />
                    ))}
               </div>
          </>
     );
};

export default Search;