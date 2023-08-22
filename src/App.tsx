import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { HomePage } from './Pages/Home';
import { NotFound } from './Pages/NotFound';
import { Navigation } from './Components/Nav';
import { PeoplePage } from './Pages/People';

export const App = () => {
  return (
    <>
      <Navigation />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="people">
          <Route index element={<PeoplePage />} />
          <Route path=":slug" element={<PeoplePage />} />
        </Route>

        <Route path="*" element={<NotFound />} />

        <Route path="/home" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};
