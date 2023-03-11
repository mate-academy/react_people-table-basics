import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Navigation } from './components/navigation/Navigation';
import { People } from './components/people/People';

export const App = () => (
  <div data-cy="app">
    <Navigation />

    <main className="section">
      <div className="container">
        <Routes>
          <Route path="*" element={<h1 className="title">Page not found</h1>} />
          <Route path="/" element={<h1 className="title">Home Page</h1>} />
          <Route path="home" element={<Navigate to="/" />} />
          <Route path="/people" element={<People />}>
            <Route path=":slug" element={<People />} />
          </Route>
        </Routes>
      </div>
    </main>
  </div>
);
