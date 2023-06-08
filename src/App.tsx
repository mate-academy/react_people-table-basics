import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import PeopleList from './components/PeopleList/PeopleList';
import Navbar from './components/Navbar/Navbar';

export const App = () => (
  <div data-cy="app">
    <Navbar />
    <main className="section">
      <div className="container">
        <Routes>
          <Route path="/" element={<h1 className="title">Home Page</h1>} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/people" element={<PeopleList />}>
            <Route path=":selectedPerson" element={<PeopleList />} />
          </Route>
          <Route path="*" element={<h1 className="title">Page not found</h1>} />
        </Routes>
      </div>
    </main>
  </div>
);
