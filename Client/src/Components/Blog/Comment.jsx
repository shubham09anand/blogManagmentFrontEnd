import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API from '../../Services/API';
import moment from 'moment';

const Comment = () => {

    const noProfilePhoto = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    const { blogId } = useParams();
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const getBlog = async () => {
            try {
                const response = await API.get(`/getComments/${blogId}`);
                if (response.data.response.success) {
                    setComments(response.data.response.response);
                    console.log(response.data.response.response)
                } 
            } catch (err) {
                toast.error("Failed to Load Comments");
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
            <h1 className='text-lg lg:text-2xl font-bold tracking-wider my-4 font_2'>Comments</h1>
            {comments.length === 0 ? (
                <p className='font-thin fontTitle text-center w-fit mx-auto text-sm text-gray-400'>No comments available.</p>
            ) : (
                comments.map((item,key) => (
                    <div key={key} className="w-full p-6 text-base bg-white border-b">
                        <div className="flex justify-between items-center mb-2">
                            <Link to={`/profile/${item._id}`} className="flex items-center">
                                <p className="inline-flex items-center mr-3 font-semibold text-sm text-gray-900">
                                    <img className="mr-2 w-6 h-6 rounded-full border-2 border-black" src={item?.photo?.trim() !== "" ? item?.photo : noProfilePhoto} alt="Profile" />
                                    <span>{item?.firstName} {item?.lastName}</span>
                                </p>
                                <p className="text-gray-600">
                                    <time className="text-xs"  dateTime="commentTime" title="commentTime">
                                        {moment(item?.createdAt).format('MMMM Do YYYY')}
                                    </time>
                                </p>
                            </Link>
                        </div>
                        <p>{item?.comment}</p>
                    </div>
                ))
            )}
        </>
    );
};

export default Comment;
