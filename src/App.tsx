import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { MainPage } from './components/mainPage/MainPage';
import { Home } from './components/Home/Home';
import { People } from './components/People/People';

export const App = () => (
  <Routes>
    <Route path="/" element={<MainPage />}>
      <Route index element={<Home />} />
      <Route path="home" element={<Navigate replace to="/" />} />
      <Route path="people" element={<People />}>
        <Route path=":tabId" element={<People />} />
      </Route>
      <Route path="*" element={<h1 className="title">Page not found</h1>} />
    </Route>
  </Routes>
);
