import React, { useState } from 'react'
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API from '../../Services/API';

const MakeComment = () => {
     const [comment, setComment] = useState("");
     const [loading, setLoading] = useState(false);
     const userId = useSelector((state) => state.LoginSlice.loggedUserId)
     const { blogId } = useParams();

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
          if (!validateInputs()) {
              return;
          }
          setLoading(true); 
          const CurrentTime = getCurrentTime();
      
          const commentData = { authorId: userId, blogId: blogId, comment: comment, createdAt: CurrentTime,};
          
          try {
              if (blogId && userId) {
                  const response = await API.post("/makeComments", commentData);
                  
                  if (response.data.response.success) {
                      toast.success("Comment is saved");
                      setComment("");
                  }
              }
          } catch (error) {
              console.log(error);
              toast.error("Failed to post comment.");
          } finally {
              setTimeout(() => {
                  setLoading(false);
              }, 5000);
          }
      };
      

     return (
          <section className="w-full not-format my-6">
               <ToastContainer/>
               <form className="mb-6 w-full">
                    <div className="py-2 mb-4 bg-white rounded-lg rounded-t-lg  border-gray-200">
                         <label htmlFor="comment" className="sr-only">Your comment</label>
                         <textarea  onChange={(e) => setComment(e.target.value)}  value={comment}  id="comment"  rows="6"  className="px-3 py-2 w-full resize-none outline-none text-sm text-gray-900 focus:outline-[#34ab45] border focus:ring-0"  placeholder="Write a comment..."  required disabled={loading}></textarea>
                    </div>
                    <button  type="button" onClick={makeComment} className={`inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-green-600 rounded-sm focus:ring-4 focus:ring-primary-200 hover:bg-primary-800 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={loading} >
                         {loading ? 'Posting...' : 'Post comment'}
                    </button>
               </form>
          </section>
     )
}

export default MakeComment;
