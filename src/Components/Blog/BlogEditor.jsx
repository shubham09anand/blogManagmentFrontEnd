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
    const [button, setButton] = useState(false);
    const [inst, setInst] = useState(false)

    const config = useMemo(() => ({
        readonly: false,
        placeholder: 'Type here...',
        height: 1000,
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

    const makeBlog = async () => {
        if (!userId || !validateInputs()) {
            return;
        }
        const createdAt = getCurrentTime();

        setButton(true)

        const blogAllphoto = await getPhotoFromContnet(content);
        console.log(blogAllphoto)

        const requestData = {
            authorId: userId,
            title,
            blogPhoto: blogAllphoto,
            tags,
            content,
            createdAt,
        };

        try {
            await API.post('/createBlog', requestData);
            toast.success("Blog Has Been Posted")
            resetForm();
            // setButton(false)
        } catch (error) {
            console.log("Error ", error);
        }
        finally {
            setButton(true)
        }
    };

    const resetForm = () => {
        setTitle("");
        setContent("");
        setTags(['']);
        setContent("");
    }

    return (
        <div className='w-screen bg-[#f7f4ed]'>
            <div className='w-full md:w-3/5 mx-auto'>
                <ToastContainer />
                <div className="px-2">
                    <div className="bg-[#f7f4ed] font font-semibold flex text-2xl fixed py-5 place-content-center items-center space-x-10 w-fit">
                        <div>Write Your Blog Here</div>
                        <button disabled={button} onClick={makeBlog} className={`w-fit h-fit text-sm px-4 py-1 rounded-full bg-black text-white font-semibold select-none ${button ? 'cursor-not-allowed opacity-50' : ''}`}>
                            {button ? 'Posting' : 'Post Blog'}
                        </button>
                    </div>

                    <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" name="name" id="name" placeholder="Title" className="w-full fontTitle bg-[#f7f4ed] py-2 px-6 pl-3 mt-20 text-4xl font-medium outline-none focus:border-[#16831f] focus:shadow-md placeholder:tracking-wider" />

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
                    onChange={setContent}
                />
            </div>
        </div>
    );
}
export default BlogEditor;
