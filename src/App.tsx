import { Navigate, Route, Routes } from 'react-router-dom';
import { PeopleList } from './components/PageList/PeopleList';
import './App.scss';
import { NavBar } from './components/NavBar';

export const App = () => (
  <div data-cy="app">
    <NavBar />

    <main className="section">
      <div className="container">
        <Routes>
          <Route path="people">
            <Route index element={<PeopleList />} />
            <Route path=":slug" element={<PeopleList />} />
          </Route>
          <Route path="/" element={<h1 className="title">Home Page</h1>} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<h1 className="title">Page not found</h1>} />
        </Routes>
      </div>
    </main>
  </div>
);
