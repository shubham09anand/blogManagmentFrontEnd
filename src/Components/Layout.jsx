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
import AuthFailed from './Auth/AuthFailed';
import ProtectedRoute from './Auth/ProtectedRoute';
import InternetSpeedTest from './InternetSpeedTest';

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
    '/': 'Insider',
    '/login': 'Insider',
    '/signup': 'Insider',
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
        pathname.startsWith("/edit") ||
        pathname.startsWith('/blogContent/') ||
        pathname.startsWith('/profile/')
      ) && <Header />}

<InternetSpeedTest/>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/blogs" element={<ProtectedRoute><BlogList/></ProtectedRoute>} />
        <Route path="/profile/:authorId" element={<ProtectedRoute><WriterProfile/></ProtectedRoute>} />
        <Route path="/setting/:authorId" element={<ProtectedRoute><ProfileSetting/></ProtectedRoute>} />
        <Route path="/blogContent/:blogId" element={<ProtectedRoute><BlogContent/></ProtectedRoute>} />
        <Route path="/write" element={<ProtectedRoute><BlogEditor/></ProtectedRoute>} />
        <Route path="/edit/:blogId" element={<ProtectedRoute><EditBlog/></ProtectedRoute>} />
        <Route path="/authFailed" element={<AuthFailed/>} />
        <Route path="*" element={<Error404/>} />
      </Routes>
    </>
  );
};

export default Layout;
