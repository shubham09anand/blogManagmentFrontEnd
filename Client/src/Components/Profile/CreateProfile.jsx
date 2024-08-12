import React, { useState } from 'react';

const CreateProfile = () => {

     const noProfileImage = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
     const [firstName, setFirstName] = useState('');
     const [lastName, setLastName] = useState('');
     const [email, setEmail] = useState('');
     const [phone, setPhone] = useState('');
     const [pronouns, setPronouns] = useState('');
     const [tags, setTags] = useState(['']);
     const [aboutYou, setAboutYou] = useState('');
     const [image, setImage] = useState(null);


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

     const handleSubmit = (e) => {
          e.preventDefault();
          // Handle form submission here
          const formData = {
               firstName,
               lastName,
               email,
               phone,
               pronouns,
               tags,
               aboutYou
          };
          // console.log('Form Data:', formData);
     };

     const handleImageChange = (e) => {
          const file = e.target.files[0];
          if (file) {
               setImage(URL.createObjectURL(file));
          }
     };

     return (
          <div className="bg-white w-full md:pl-10 lg:pl-16 rounded-lg mt-5">
               <h1 className="text-2xl font-bold text-gray-800 mb-4">Profile</h1>
               <form onSubmit={handleSubmit}>
                    <div className="mb-5 relative border-4 border-white rounded-full sm:flex">
                         <div className='w-fit h-fit rounded-full bg-gray-300 border border-black'>
                              <img className="object-scale-down w-32 h-32 rounded-full" src={image == null ? noProfileImage : image} alt='ProfileImage' />
                         </div>
                         <div className='sm:pl-5 my-auto'>
                              <label className="block mb-2" htmlFor="file_input">Upload file</label>
                              <input onChange={handleImageChange} className="block w-full text-sm cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none" aria-describedby="file_input_help" id="file_input" type="file" />
                         </div>
                    </div>
                    <div className="mb-6">
                         <div className="grid md:grid-cols-2 gap-4 mb-4">
                              <div>
                                   <label htmlFor="firstName" className="block text-gray-700 mb-2">First Name</label>
                                   <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full rounded-lg border py-2 px-3 focus:outline-[#34ab45] outline-none" />
                              </div>
                              <div>
                                   <label htmlFor="lastName" className="block text-gray-700 mb-2">Last Name</label>
                                   <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full rounded-lg border py-2 px-3 focus:outline-[#34ab45] outline-none" />
                              </div>
                         </div>
                         <div className="grid md:grid-cols-2 gap-4 mb-4">
                              <div>
                                   <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                                   <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-lg border py-2 px-3 focus:outline-[#34ab45] outline-none" />
                              </div>
                              <div>
                                   <label htmlFor="phone" className="block text-gray-700 mb-2">Phone</label>
                                   <input type="text" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full rounded-lg border py-2 px-3 focus:outline-[#34ab45] outline-none" />
                              </div>
                         </div>
                         <div className="grid md:grid-cols-2 gap-4 mb-4">
                              <div>
                                   <label htmlFor="pronouns" className="block text-gray-700 mb-2">Pronouns</label>
                                   <input type="text" id="pronouns" value={pronouns} onChange={(e) => setPronouns(e.target.value)} className="w-full rounded-lg border py-2 px-3 focus:outline-[#34ab45] outline-none" />
                              </div>
                         </div>
                         <div className="flex space-x-5">
                              <label htmlFor="tags" className="block text-gray-700 mb-2">Interested Topics</label>
                              {tags.length < 5 && (
                                   <svg onClick={handleAddTagField} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 mt-1 cursor-pointer">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                   </svg>
                              )}
                         </div>
                         <div className="flex gap-3 flex-wrap mb-4 mt-2">
                              {tags.map((tag, index) => (
                                   <div key={index} className="relative w-36 lg:w-40">
                                        {tags.length > 1 && (
                                             <svg onClick={() => handleRemoveTagField(index)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="size-5 cursor-pointer absolute rounded-full bg-[#34ab45] -top-2 -right-1">
                                                  <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                             </svg>
                                        )}
                                        <input type="text" name={`tag-${index}`} id={`tag-${index}`} value={tag} onChange={(e) => handleTagChange(index, e.target.value)} className="w-full focus:outline-[#34ab45] outline-none rounded-lg border py-2 px-2" placeholder="Likes...." />
                                   </div>
                              ))}
                         </div>
                    </div>
                    <div className="gap-4 mb-4">
                         <div>
                              <label htmlFor="aboutYou" className="block text-gray-700 mb-2">About You</label>
                              <textarea name="aboutYou" id="aboutYou" cols={20} value={aboutYou} onChange={(e) => setAboutYou(e.target.value)} className="resize-none w-full h-24 rounded-lg border py-2 px-3 focus:outline-[#34ab45] outline-none"></textarea>
                         </div>
                    </div>
                    <div className="mt-8 flex justify-end">
                         <button type="submit" className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-700 dark:bg-teal-600 dark:hover:bg-teal-900">
                              Place Order
                         </button>
                    </div>
               </form>
          </div>
     );
};

export default CreateProfile;