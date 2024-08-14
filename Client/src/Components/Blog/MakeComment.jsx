import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';
import API from '../../Services/API';

const MakeComment = () => {

     const [comment, setComment] = useState("");
     const userId = useSelector((state) => state.LoginSlice.loggedUserId)
     const { blogId } = useParams()

     const getCurrentTime = () => {
          const now = new Date();
          let isoString = now.toISOString();
          const timeZoneOffset = '+00:00';
          isoString = isoString.replace('Z', timeZoneOffset);
          return isoString.replace(/(\.\d{3})Z/, '$1');
     };

     const validateInputs = () => {
          if (!comment.trim()) {
               toast.error("Comment is required.");
               return false;
          }
          return true;
     };

     const makeComment = async () => {
          console.log("comment")
          if (!validateInputs()) {
               return
          }
          const CurrentTime = getCurrentTime();
          
          try {
               if (blogId && blogId !== null && userId && userId !== null ) {
                    const response = await API.post("/makeComments", { "authorId": userId, "blogId": blogId, "comment": comment, "createdAt": CurrentTime, })
                    if (response.data.response.success) {
                         toast.success("Comment is saved");
                         setComment("");
                    }
               }
          } catch (error) {
               console.log(error)
          }
     }

     return (
          <section className="w-full not-format my-6">
               <ToastContainer/>
               <form className="mb-6 w-full">
                    <div className="py-2 mb-4 bg-white rounded-lg rounded-t-lg  border-gray-200">
                         <label htmlFor="comment" className="sr-only">Your comment</label>
                         <textarea onChange={(e)=> setComment(e.target.value)} value={comment} id="comment" rows="6" className="px-3 py-2 w-full resize-none outline-none text-sm text-gray-900 focus:outline-[#34ab45] border focus:ring-0" placeholder="Write a comment..." required></textarea>
                    </div>
                    <div onClick={makeComment} className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-green-600 rounded-sm cursor-pointer focus:ring-4 focus:ring-primary-200 hover:bg-primary-800">
                         Post comment
                    </div>
               </form>
          </section>
     )
}

export default MakeComment