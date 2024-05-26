import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Articles from './components/articles';
import LoginForm from './components/loginForm';
import ArticleForm from './components/articleForm';
import ArticleDetails from './components/articleDetails';
import RegisterForm from './components/registerForm';
import UpdateArticlePage from './components/updateArticlePage';

const AppRoutes = () => {
  return (
    
      <Routes>
        <Route path="/" element={<Articles />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm/>} />
        <Route path="/add-article" element={<ArticleForm />} />
        <Route path="/articles/:id" element={<ArticleDetails />} />   
        <Route path="/articles/update/:id" element={<UpdateArticlePage />} />   
      </Routes>
    
  );
};

export default AppRoutes;
