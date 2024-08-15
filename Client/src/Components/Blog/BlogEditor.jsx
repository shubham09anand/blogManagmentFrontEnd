import React, { useMemo, useRef, useState } from 'react';
import JoditEditor from 'jodit-react';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import API from '../../Services/API';

const BlogEditor = () => {
    const userId = useSelector((state) => state.LoginSlice.loggedUserId);
    const editor = useRef(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [tags, setTags] = useState(['']);
    const [blogPhoto, setBlogPhot] = useState([]);

    const config = useMemo(() => ({
        readonly: false,
        placeholder: 'Type here...',
        height: 400,
        spellcheck: true,
        buttons: [
            'bold', 'strikethrough', 'underline', 'italic', '|',
            'ul', 'ol', '|', 'lineHeight', 'font', 'fontsize',
            'brush', 'paragraph', '|', 'image', 'table', 'link', '|',
            'align', 'undo', 'redo', '|', 'hr', 'symbols', 'fullsize',
        ],
        uploader: {
            url: '/upload',
            insertImageAsBase64URI: true,
            allowedTypes: ['image/jpeg', 'image/png']
        },
    }), []);

    const handleTagChange = (index, value) => {
        const newTags = [...tags];
        newTags[index] = value;
        setTags(newTags);
    };

    const handleAddTagField = () => {
        if (tags.length < 5) {
            setTags([...tags, '']);
        }
    };

    const handleRemoveTagField = (index) => {
        if (tags.length > 1) {
            const newTags = tags.filter((_, i) => i !== index);
            setTags(newTags);
        }
    };

    const getCurrentTime = () => {
        const now = new Date();
        let isoString = now.toISOString();
        const timeZoneOffset = '+00:00';
        isoString = isoString.replace('Z', timeZoneOffset);
        return isoString.replace(/(\.\d{3})Z/, '$1');
    };

    const validateInputs = () => {
        if (!title.trim()) {
            toast.error("Title is required.");
            return false;
        }
        if (!content.trim()) {
            toast.error("Content is required.");
            return false;
        }
        if (tags.length === 0 || tags.every(tag => !tag.trim())) {
            toast.error("At least one tag is required.");
            return false;
        }
        return true;
    };

    const getPhotoFromContnet = async (htmlContent) => {
        const imgSrcRegex = /src="([^"]*)"/g;
        let imgSrc;
        const imgSrcArray = [];

        // Extract all image src values
        while ((imgSrc = imgSrcRegex.exec(htmlContent)) !== null) {
            console.log(imgSrc)
            imgSrcArray.push(imgSrc[1]);
        }
        console.log(imgSrcArray)

        setBlogPhot(imgSrcArray)
        return imgSrcArray

    }

    const makeBlog = async () => {
        if (!userId || !validateInputs()) {
            return;
        }
        const createdAt = getCurrentTime();
    
        const blogAllphoto = await getPhotoFromContnet(content);
    
        const requestData = {
            authorId: userId,
            title,
            blogPhoto: blogAllphoto,
            tags,
            content,
            createdAt,
        };
    
        console.log("Request Data:", requestData);
    
        try {
            const response = await API.post('/createBlog', requestData);
            console.log(response);
        } catch (error) {
            console.log("Error ", error);
        }
    };
    

    return (
        <div className='w-screen bg-[#f7f4ed]'>
            <div className='w-full md:w-3/5 mx-auto'>
                <ToastContainer />
                <div className="px-2">
                    <div className="bg-[#f7f4ed] font font-semibold flex text-2xl fixed py-5 place-content-center items-center justify-between w-80">
                        <div>Write Your Blog Here</div>
                        <div onClick={makeBlog} className='w-fit h-fit text-sm px-4 py-1 rounded-full bg-black text-white font-semibold cursor-pointer select-none'>
                            Post It
                        </div>
                    </div>

                    <input
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Title"
                        className="w-full fontTitle bg-[#f7f4ed] py-2 px-6 pl-3 mt-20 text-4xl font-medium outline-none focus:border-[#16831f] focus:shadow-md placeholder:tracking-wider"
                    />

                    <div className='mt-2'>
                        <div className='flex space-x-5'>
                            <div className="my-2 font-semibold block text-lg">
                                Add Tags Fits Blog
                            </div>
                            {tags.length < 5 && (
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
                                    <input
                                        type="text"
                                        name={`tag-${index}`}
                                        id={`tag-${index}`}
                                        value={tag}
                                        onChange={(e) => handleTagChange(index, e.target.value)}
                                        placeholder="Tag"
                                        className="shadow fontTitle m-1 mx-3 w-36 border-b border-r border-slate-200 bg-[#f7f4ed] py-1 px-6 pl-3 font-medium outline-none focus:border-[#16831f] focus:shadow-md my-2"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mb-2 font-semibold block text-lg">
                    Content
                </div>
                <JoditEditor
                    config={config}
                    ref={editor}
                    value={content}
                    onChange={setContent}
                />
            </div>
        </div>
    );
}

export default BlogEditor;
