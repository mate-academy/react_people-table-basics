import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { NavBar } from './NavBar';
import { Home } from './Home';
import { People } from './People';
import { PageNotFound } from './PageNotFound';

export const App = () => (
  <>
    <NavBar />

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Navigate to={'/'} replace={true} />} />
      <Route path="/people" element={<People />} />
      <Route path="/people/:slug" element={<People />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  </>
);
