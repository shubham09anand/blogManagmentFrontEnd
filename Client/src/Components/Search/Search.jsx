import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import API from '../../Services/API';

const Search = () => {
     const noProfilePhoto = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
     const [selectedOption, setSelectedOption] = useState('tags');
     const [displayTags, setDisplayTags] = useState([]);
     const [displayWriters, setDisplayWriters] = useState([]);
     const [blogData, setBlogData] = useState([]);

     const [selectTag, setSelectedTag] = useState(null);
     const [selectWriter, setSelectedWriter] = useState(null);
     const [filteredBlogs, setFilteredBlogs] = useState([]);

     // Change between tags and writers filter
     const handleOptionChange = (event) => {
          setSelectedOption(event.target.value);
          handleFilterToAll()
     };

     // Get all blog's tags
     useEffect(() => {
          const getAllTags = async () => {
               try {
                    const response = await API.post('/getAllTags');
                    if (response.data.response.success) {
                         const tags = response.data.response.response.flatMap(item => item.tags);
                         const uniqueTags = [...new Set(tags)];
                         setDisplayTags(uniqueTags);
                    } else {
                         toast.error("Failed to fetch tags");
                    }
               } catch (err) {
                    toast.error("Error fetching tags");
                    // console.log(err);
               }
          };

          // Get all writers
          const getAllWriters = async () => {
               try {
                    const response = await API.post('/getAllWriterName');
                    if (response.data.response.success) {
                         setDisplayWriters(response.data.response.response);
                    } else {
                         toast.error("Failed to fetch writers");
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
                    } else {
                         toast.error("Failed to fetch blogs");
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

     // Filter blogs by tag
     useEffect(() => {
          let filtered = blogData;
          if (selectTag !== null) {
               filtered = filtered.filter(blog => blog.tags.includes(selectTag));
          }
          if (selectWriter !== null && selectWriter !== '') {
               filtered = filtered.filter(blog => blog.firstName.toLowerCase() === selectWriter.toLowerCase());
          }
          setFilteredBlogs(filtered);
     }, [selectTag, selectWriter, blogData]);

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
                              <option value="tags">Tags</option>
                              <option value="writers">Writers</option>
                         </select>
                    </div>
               </div>

               <div className="flex flex-wrap items-start justify-center px-3 pb-10">
                    <div onClick={handleFilterToAll} className="relative px-5 py-2 m-2 bg-gray-200 rounded-full cursor-pointer select-none font-semibold tracking-wide shadow-sm sm:py-2 sm:text-base ring ring-transparent group md:px-4 text-gray-900">
                         <span className="text-sm">All</span>
                    </div>
                    {selectedOption === 'tags' && displayTags.map((item, key) => (
                         <div onClick={() => setSelectedTag(item)} key={key} className="relative px-5 py-2 m-2 bg-gray-200 rounded-full cursor-pointer select-none font-semibold tracking-wide shadow-sm sm:py-2 sm:text-base ring ring-transparent group md:px-4 text-gray-900">
                              <span className="text-sm">{item}</span>
                         </div>
                    ))}
                    {selectedOption === 'writers' && displayWriters.map((item, key) => (
                         <div onClick={() => setSelectedWriter(item?.firstName)} key={key} className="flex place-content-center items-center space-x-3 relative px-5 py-2 m-2 bg-gray-200 rounded-full cursor-pointer select-none font-semibold tracking-wide shadow-sm sm:py-2 sm:text-base ring ring-transparent group md:px-4 text-gray-900">
                              <img src={item?.photo?.trim() != "" ? item?.photo : noProfilePhoto} alt="authorImage" className='w-8 h-8 rounded-full bg-cover' />
                              <span className="text-sm capitalize">{`${item?.firstName} ${item?.lastName}`}</span>
                         </div>
                    ))}
               </div>

               <div className='gap-10 flex flex-wrap items-center place-content-center'>
                    {filteredBlogs.map((items, key) => (
                         <Link to={`/blogContent/${items._id}`} key={key} className="w-11/12 lg:w-1/5">
                              <div className="shadow-md border border-gray-200 rounded-lg max-w-sm">
                                   <img className="rounded-t-lg h-48 w-full" src={items?.blogPhoto} alt="imageError" />
                                   <div className='flex items-center space-x-2 mt-3 pl-5'>
                                        <img src={items?.photo?.trim() != "" ? items?.photo : noProfilePhoto} alt="" className='w-10 h-10 rounded-full border-2 border-black' />
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
               </div>
          </>
     );
};

export default Search;



// useEffect(() => {
//      const shuffleArray = (array) => {
//           let currentIndex = array.length, temporaryValue, randomIndex;
//           while (currentIndex !== 0) {
//                randomIndex = Math.floor(Math.random() * currentIndex);
//                currentIndex -= 1;
//                temporaryValue = array[currentIndex];
//                array[currentIndex] = array[randomIndex];
//                array[randomIndex] = temporaryValue;
//           }
//           return array;
//      };

//      // Get 10 random tags
//      const getRandomTags = () => {
//           const shuffledTags = shuffleArray([...displayTags]);
//           return shuffledTags.slice(0, 10);
//      };

//      // get 5 random writers
//      const getRandomWriters = () => {
//           const shuffledWriters = shuffleArray([...displayWriters]);
//           return shuffledWriters.slice(0, 5);
//      };

//      setDisplayTags(getRandomTags());
//      setDisplayWriters(getRandomWriters());
//      // eslint-disable-next-line
// }, []);