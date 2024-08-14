import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API from '../../Services/API';
import LoadWriterList from '../Animation/LoadWriterList';

const WriterList = () => {

     const noProfilePhoto = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
     const [writers, setWriters] = useState([]);
     const [load, setLoad] = useState(false);

     useEffect(() => {
          const getAllWriters = async () => {
               try {
                    const response = await API.post('/getWriters');
                    if (response.data.response.success) {
                         setWriters(response.data.response.response);
                         setTimeout(()=>{
                              setLoad(true)
                         },4000)
                         // console.log(response.data.response.response);
                    }
               } catch (err) {
                    toast.error("Failed to Load Blogs");
                    // console.log(err);
               }
          };

          getAllWriters();
     }, []);
     return (
          <ul className="flex flex-col w-full mt-10 border-t-2 border-gray-200">
               <ToastContainer />
               <div className='text-2xl tracking-wider font-bold pl-5 pt-5'>Writers</div>
               {load && writers?.map((items, index) => (
                    <li key={index} className="flex flex-row">
                         <div className="select-none cursor-pointer hover:bg-gray-50 flex flex-1 items-center p-4">
                              <div className="flex flex-col w-10 h-10 justify-center items-center mr-4">
                                   <div className="block relative">
                                        <img alt="profile" src={items?.photo[0]?.trim() !== "" ? items?.photo : noProfilePhoto} onError={(e)=> e.target.src = noProfilePhoto} className="mx-auto object-cover border-2 border-black rounded-full h-10 w-10" />
                                   </div>
                              </div>
                              <div className="flex-1 pl-1 mr-16">
                                   <div className="font-medium">{items?.firstName} {items?.lastName}</div>
                                   <div className="text-gray-600 text-[10px] bg-gray-300 w-fit rounded-full px-[5px] py-.5 capitalize">@{items?.userName}</div>
                              </div>
                              <Link to={`/profile/${items?._id}`} className="text-white text-xs px-8 select-none py-2 rounded-full bg-[#34ab45] hover:opacity-80 font-medium">Vist</Link>
                         </div>
                    </li>
               ))}
               {!load && Array.from({ length: 4 }).map((_, index) => (
                    <LoadWriterList key={index} />
               ))}
          </ul>


     )
}

export default WriterList