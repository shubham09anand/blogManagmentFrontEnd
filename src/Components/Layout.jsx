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
    '/insider': 'Insider',
    '/insider/login': 'Insider',
    '/insider/signup': 'Insider',
    '/insider/blogs': 'Blogs',
    '/insider/write': 'Write Blog',
    '/insider/edit': 'Edit Blog',
  };

  // Default title for non-matched routes
  let title = titleMap[pathname] || 'Default Title';

  // Handle dynamic routes
  if (pathname.startsWith('/insider/profile/')) {
    title = `Writer Profile`;
  } else if (pathname.startsWith('/insider/blogContent/')) {
    title = `Blog Content`;
  }else if (pathname.startsWith('/insider/setting')){
    title = `Setting`;
  }

  // Set document title
  useDocumentTitle(title);

  return (
    <>
      {(
        pathname === "/insider" ||
        pathname === "/insider/login" ||
        pathname === "/insider/signup" ||
        pathname === "/insider/blogs" ||
        pathname.startsWith("/insider/setting") ||
        pathname === "/insider/write" ||
        pathname.startsWith("/insider/edit") ||
        pathname.startsWith('/insider/blogContent/') ||
        pathname.startsWith('/insider/profile/')
      ) && <Header />}

        <Routes>
          <Route path="/insider" element={<LandingPage />} />
          <Route path="/insider/login" element={<Login />} />
          <Route path="/insider/signup" element={<Signup />} />
          <Route path="/insider/blogs" element={<ProtectedRoute><BlogList /></ProtectedRoute>} />
          <Route path="/insider/profile/:authorId" element={<ProtectedRoute><WriterProfile /></ProtectedRoute>} />
          <Route path="/insider/setting/:authorId" element={<ProtectedRoute><ProfileSetting /></ProtectedRoute>} />
          <Route path="/insider/blogContent/:blogId" element={<ProtectedRoute><BlogContent /></ProtectedRoute>} />
          <Route path="/insider/write" element={<ProtectedRoute><BlogEditor /></ProtectedRoute>} />
          <Route path="/insider/edit/:blogId" element={<ProtectedRoute><EditBlog /></ProtectedRoute>} />
          <Route path="/insider/authFailed" element={<AuthFailed />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
    </>
  );
};

export default Layout;
