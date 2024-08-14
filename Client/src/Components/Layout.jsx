import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import LandingPage from './LandingPage';
import Header from './Header';
import Error404 from './Error_404';
import BlogList from './Blog/BlogList';
import Login from './Auth/Login';
import Signup from './Auth/Signup';
import WriterProfile from './Profile/WriterProfile';
import ProfileSetting from './Profile/ProfileSetting';
import BlogContent from './Blog/BlogContent';
import BlogEditor from './Blog/BlogEditor';
import EditBlog from './Blog/EditBlog';
import ProtectedRoute from './Auth/ProtectedRoute';

const useDocumentTitle = (title) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
};

const Layout = () => {
  const location = useLocation();
  const { pathname } = location;

  // Define titles for static routes
  const titleMap = {
    '/': 'Landing Page',
    '/login': 'Login',
    '/signup': 'Signup',
    '/blogs': 'Blog List',
    '/setting': 'Profile Settings',
    '/write': 'Write Blog',
    '/edit': 'Edit Blog',
  };

  // Default title for non-matched routes
  let title = titleMap[pathname] || 'Default Title';

  // Handle dynamic routes
  if (pathname.startsWith('/profile/')) {
    title = `Writer Profile`;
  } else if (pathname.startsWith('/blogContent/')) {
    title = `Blog Content`;
  }

  // Set document title
  useDocumentTitle(title);
  
  return (
    <>
      {(
        pathname === "/" ||
        pathname === "/login" ||
        pathname === "/signup" ||
        pathname === "/blogs" ||
        pathname.startsWith("/setting") ||
        pathname === "/write" ||
        pathname === "/edit" ||
        pathname.startsWith('/blogContent/') ||
        pathname.startsWith('/profile/')
      ) && <Header />}

      <ProtectedRoute/>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/profile/:authorId" element={<WriterProfile />} />
        <Route path="/setting/:authorId" element={<ProfileSetting />} />
        <Route path="/blogContent/:blogId" element={<BlogContent />} />
        <Route path="/write" element={<BlogEditor />} />
        <Route path="/edit" element={<EditBlog />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
};

export default Layout;
