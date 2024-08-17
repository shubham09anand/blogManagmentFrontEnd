import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import JoditEditor from 'jodit-react';
import API from '../../Services/API';

const EditBlog = () => {
     const { blogId } = useParams();
     const userId = useSelector((state) => state.LoginSlice.loggedUserId);
     const editor = useRef(null);
     const [title, setTitle] = useState("");
     const [content, setContent] = useState(null);
     const [tags, setTags] = useState(['']);
     const [button, setButton] = useState(false);
     const [inst, setInst] = useState(false)

     const config = useMemo(() => ({
          readonly: false,
          placeholder: 'Type here...',
          height: 1000,
          spellcheck: true,
          buttons: [
               'bold',
               'strikethrough',
               'underline',
               'italic', '|',
               'ul',
               'ol', '|',
               'lineHeight',
               'font',
               'fontsize',
               'brush',
               'paragraph', '|',
               'image',
               'table',
               'link', '|',
               'align', 'undo', 'redo', '|',
               'hr',
               'symbols',
               'fullsize',
          ],
          uploader: {
               url: '/upload',
               insertImageAsBase64URI: true,
          },
          // Add other configurations as needed
     }), []);

     const handleTagChange = (index, value) => {
          const newTags = [...tags];
          newTags[index] = value;
          setTags(newTags);
     };

     const handleAddTagField = () => {
          if (tags.length < 5) {
               setTags([...tags, '']); // Add a new empty text box
          }
     };

     const handleRemoveTagField = (index) => {
          if (tags.length > 1) {
               const newTags = tags.filter((_, i) => i !== index);
               setTags(newTags);
          }
     };

     // getting the blog data
     useEffect(() => {
          const getBlogData = async () => {
               if (!blogId) {
                    toast.error("Something Went Wrong");
                    return;
               }
               try {
                    const response = await API.get(`/getOneBlog/${blogId}`);
                    if (response.data.response.success) {
                         const blogData = response.data.response.response[0];
                         setContent(blogData?.content);
                         setTitle(blogData?.title || "");
                         setTags(blogData?.tags.length > 0 ? blogData?.tags : []);
                    } else {
                         toast.error("Failed To Load Data");
                    }
               } catch (error) {
                    toast.error("Failed To Load Data");
               }
          };

          getBlogData();
     }, [blogId]);

     const validateInputs = () => {
          if (!title.trim()) {
               toast.info("Title is required.");
               return false;
          }
          if (!content.trim()) {
               toast.info("Content is required.");
               return false;
          }
          if (tags.length === 0 || tags.every(tag => !tag.trim())) {
               toast.info("At least one tag is required.");
               return false;
          }
          return true;
     };

     const getPhotoFromContnet = async (htmlContent) => {
          console.log(htmlContent)
          const imgSrcRegex = /src="([^"]*)"/g;
          let imgSrc;
          const imgSrcArray = [];

          // Extract all image src values
          while ((imgSrc = imgSrcRegex.exec(htmlContent)) !== null) {
               console.log(imgSrc)
               imgSrcArray.push(imgSrc[1]);
          }
          return imgSrcArray
     }

     // saving the update blog
     const updateBlog = async () => {
          if (!userId || !validateInputs()) {
               return;
          }

          setButton(true)

          const blogAllphoto = await getPhotoFromContnet(content);
          console.log(blogAllphoto)

          const updateBlog = {
               _id: blogId,
               title,
               authorId: userId,
               blogPhoto: blogAllphoto,
               tags,
               content,
          };

          try {
               const response = await API.post('/updateBlog', updateBlog);
               console.log(response);
               if (response.data.response.success) {
                    toast.success("Blog Updated")
                    setButton(false)
               }
          } catch (error) {
               console.log("Error ", error.data);
               toast.success("Failed to update Blog")
               setButton(false)
          }
          finally {
               setButton(false)
          }
     };

     return (
          <div className='w-screen bg-[#f7f4ed] h-fit'>
               <div className='p-2 w-full md:w-3/5 mx-auto'>
                    <ToastContainer />
                    <div className="bg-[#f7f4ed] w-fit font font-semibold md:flex text-2xl fixed py-5 space-x-0 md:space-x-5">
                         <div className='line-clamp-1 w-full md:w-4/5 lg:w-11/12'>Update Blog: {title}</div>
                         <button disabled={button} onClick={updateBlog} className={`w-fit h-fit text-sm px-4 py-1 rounded-full bg-black text-white font-semibold select-none ${button ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}>
                              {button ? 'Updating...' : 'Update'}
                         </button>
                    </div>
                    <div className="mb-5 mt-28 md:mt-24">
                         <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" name="name" id="name" placeholder="Title" className="w-full fontTitle border-b border-slate-300 bg-[#f7f4ed] py-2 px-6 pl-3 text-4xl font-medium outline-none focus:border-[#16831f] focus:shadow-md placeholder:tracking-wider" />

                         <div className='mt-2'>
                              <div className='flex space-x-5'>
                                   <label htmlFor="tags" className="my-2 font-semibold block text-lg">
                                        Add Tags Which Fit Blog
                                   </label>
                                   {(tags.length < 5) && (
                                        <svg onClick={handleAddTagField} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5 mt-3.5 cursor-pointer">
                                             <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>
                                   )}
                              </div>
                              <div className='flex flex-wrap'>
                                   {tags.map((tag, index) => (
                                        <div key={index} className='relative flex items-center justify-between'>
                                             {tags.length > 1 && (
                                                  <svg onClick={() => handleRemoveTagField(index)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 absolute top-0 right-0 bg-[#f7f4ed] cursor-pointer">
                                                       <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                                  </svg>
                                             )}
                                             <input type="text" name={`tag-${index}`} id={`tag-${index}`} value={tag} onChange={(e) => handleTagChange(index, e.target.value)} placeholder="Tag" className="shadow fontTitle m-1 mx-3 w-36 border-b border-r border-slate-200 bg-[#f7f4ed] py-1 px-6 pl-3 font-medium outline-none focus:border-[#16831f] focus:shadow-md my-2" />
                                        </div>
                                   ))}
                              </div>
                         </div>
                    </div>

                    <div className='flex items-center gap-x-5 w-fit place-content-center relative'>
                         <div className="mb-2 font-semibold block text-lg pt-1">Content</div>
                         <svg onClick={() => setInst(true)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 my-auto cursor-pointer">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                         </svg>
                         {
                              inst && (
                                   <div className='shadow-[2px_2px_2px_gray] absolute bg-slate-100 w-60 h-fit p-2 rounded-md backdrop-blur-lg top-2 -right-[230%] z-20 text-sm font-thin fontTitle'>
                                        <div>Double Tap On Images To For Customimze its size, psoition, rounded-border and more </div>
                                        <svg onClick={() => setInst(false)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="size-4 absolute top-0 right-0 bg-black rounded cursor-pointer">
                                             <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                        </svg>
                                   </div>
                              )
                         }
                    </div>
                    <JoditEditor
                         config={config}
                         ref={editor}
                         value={content}
                         onChange={newContent => setContent(newContent)}
                    />
               </div>
          </div>
     );
}

export default EditBlog;
