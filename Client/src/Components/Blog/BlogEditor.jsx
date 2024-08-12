import React, { useMemo, useRef, useState } from 'react';
import JoditEditor from 'jodit-react';
import { ToastContainer, toast } from 'react-toastify';
import { Carousel } from 'react-responsive-carousel';

const BlogEditor = () => {
     const data = `hi`
     const editor = useRef(null);
     const [content, setContent] = useState(data);
     const [tags, setTags] = useState(['']);
     const [images, setImages] = useState([]);

     const config = useMemo(() => ({
          readonly: false,
          placeholder: 'Type here...',
          height: 400,
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
               allowedTypes: ['image/jpeg', 'image/png']
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

     let handleImageChange = (e) => {
          var files = e.target.files;
          if (files.length > 5) {
               toast.warning("Maximum 5 Images are allowed");
               return;
          }
          var filesArray = [].slice.call(files);
          filesArray.forEach((file) => {
               if (!file.type.startsWith('image/')) {
                    toast.warning("Please select only image files.");
                    return;
               }
               let reader = new FileReader();
               reader.onloadend = () => {
                    let base64String = reader.result;
                    setImages((prevFiles) => [...prevFiles, base64String]);
               };
               reader.readAsDataURL(file);
          });
     };

     return (
          <div className='w-screen bg-[#f7f4ed]'>
               <div className='w-full md:w-3/5 mx-auto'>
                    <ToastContainer />
                    <div className="px-2">
                         <div className="bg-[#f7f4ed] font font-semibold block text-2xl fixed py-5">
                              Write Your Blog Here
                         </div>
                         <input type="text" name="name" id="name" placeholder="Title" className="w-full fontTitle bg-[#f7f4ed] py-2 px-6 pl-3 text-4xl font-medium outline-none focus:border-[#16831f] focus:shadow-md placeholder:tracking-wider" />

                         <div className="my-6">
                              <label htmlFor="category" className="mb-2 font-semibold block text-lg">
                                   Category
                              </label>
                              <select name="select" id="select" className="block w-full rounded-sm border border-slate-300 bg-[#f7f4ed] px-3 py-3 font-semibold text-gray-500 shadow-sm focus:border-[#16831f] focus:outline-none sm:text-sm">
                                   <option className="font-semibold text-slate-300">Please Select</option>
                              </select>
                         </div>

                         <label htmlFor="tags" className="mb-2 font-semibold block text-lg">
                              Upload Images
                         </label>
                         <div className="flex items-center justify-center w-full">
                              <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-[#f7f4ed]">
                                   <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                             <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span></p>
                                   </div>
                                   <input multiple onChange={(e) => handleImageChange(e)} id="dropzone-file" type="file" className="hidden" />
                              </label>
                         </div>

                         <Carousel className="hidden h-full w-fit rounded-xl mb-10 relative overflow-scroll" style={{ width: "fit-content" }}>
                              <div className='flex space-x-5 w-full'>
                                   {images.map(
                                        (url, index) => (
                                             <div className='bg-gray-500 w-full'>
                                                  <div className="bg-[#f7f4ed] absolute top-3 right-5 px-3 w-fit rounded-full">
                                                       {index + 1}{" "}/{" "}
                                                       {images.length}
                                                  </div>
                                                  <div
                                                       className="h-40 w-96 rounded-lg bg-contain bg-no-repeat"
                                                       style={{ backgroundImage: `url(${url})` }}
                                                  ></div>
                                             </div>
                                        )
                                   )}
                              </div>
                         </Carousel>

                         <div className='mt-2'>
                              <div className='flex space-x-5'>
                                   <label htmlFor="tags" className="my-2 font-semibold block text-lg">
                                        Add Tags Fits Blog
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

                    <label htmlFor="content" className="mb-2 font-semibold block text-lg">
                         Content
                    </label>
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

export default BlogEditor;
