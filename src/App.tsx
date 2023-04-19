import { Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import { MainNav } from './components/MainNav';
import { PeoplePage } from './pages/PeoplePage';

export const App = () => (
  <div data-cy="app">
    <MainNav />

    <main className="section">
      <div className="container">
        <div className="block">
          <div className="box table-container">
            <Routes>
              <Route path="/" element={<h1 className="title">Home Page</h1>} />
              <Route path="home" element={<Navigate to="/" replace />} />

              <Route path="*" element={<p>Page not found</p>} />

              <Route path="people">
                <Route index element={<PeoplePage />} />
                <Route path=":slug" element={<PeoplePage />} />
              </Route>
            </Routes>
          </div>
        </div>
      </div>
    </main>
  </div>
);
