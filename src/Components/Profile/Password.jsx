import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import API from '../../Services/API';
import 'react-toastify/dist/ReactToastify.css';

const Password = () => {
     const [newPassword, setNewPassword] = useState('');
     const [loading, setLoading] = useState(false);
     const userId = useSelector((state) => state.LoginSlice.loggedUserId);

     const updatePassword = async () => {
          if (!userId) {
               toast.info("Something went wrong.");
               return;
          }
          if (!newPassword.trim()) {
               toast.info("Password is required");
               return;
          }

          setLoading(true);
          try {
               const response = await API.post("/setting", { "_id": userId, "password": newPassword });
               if (response.data.response.success) {
                    setNewPassword("")
                    toast.success("Password updated successfully!");
               }
          } catch (error) {
               toast.error("Failed to update password. Please try again.");
               console.error(error);
          } finally {
               setLoading(false);
          }
     };

     return (
          <div className='w-full md:pl-10 lg:pl-16 mt-5'>
               <ToastContainer />
               <div className="py-2 text-2xl font-semibold">Password</div>
               <div>
                    <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-10">
                         <label htmlFor="login-password">
                              <span>New Password</span>
                              <div className="mt-2 relative flex overflow-hidden rounded-md border-2 transition focus-within:border-[#34ab45]">
                                   <input type="password" id="login-password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="focus:outline-[#34ab45] outline-none w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400" placeholder="***********" />
                              </div>
                         </label>
                    </div>
                    <div className="mt-8 flex">
                         <button onClick={updatePassword} className={`bg-[#34ab45] text-white px-4 py-2 rounded-lg cursor-pointer ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={loading}>
                              {loading ? 'Updating...' : 'Update'}
                         </button>
                    </div>
               </div>
          </div>
     );
}

export default Password;
