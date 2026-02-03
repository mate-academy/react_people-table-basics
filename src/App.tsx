import './App.scss';
import {  Route, Navigate, Routes } from 'react-router-dom';
import { Home } from './components/Home';
import { People } from './components/People';
import { NotFound } from './components/NotFound';
import { Navbar } from './components/Navbar';

export const App = () => (
  <div data-cy="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/home" element={<Navigate to="/" replace />}></Route>
        <Route path="/people" element={<People />}></Route>
        <Route path="/people/:slug" element={<People />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
  </div>
);
