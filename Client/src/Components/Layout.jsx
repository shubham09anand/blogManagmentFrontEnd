import React from 'react'
import { Routes, Route } from 'react-router-dom';

import LandingPage from './LandingPage'
import Header from './Header'
// import Error_404 from './Error_404'
import BlogList from './Blog/BlogList'
import Login from '../Auth/Login';
import Signup from '../Auth/Signup';
import WriterProfile from './Profile/WriterProfile';
import ProfileSetting from './Profile/ProfileSetting';
import BlogContent from './Blog/BlogContent';
import BlogEditor from './Blog/BlogEditor';
import EditBlog from './Blog/EditBlog';


const Layout = () => {
     return (
          <>
               <Header />
               <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/blogs" element={<BlogList />} />
                    <Route path="/profile/:authorId" element={<WriterProfile />} />
                    <Route path="/setting" element={<ProfileSetting />} />
                    <Route path="/blogContent/:blogId" element={<BlogContent />} />
                    <Route path="/write" element={<BlogEditor />} />
                    <Route path="/edit" element={<EditBlog />} />
                    {/* <Route path="*" element={<Error_404 />} /> */}
               </Routes>
          </>
     )
}

export default Layout