import { useLocation, Navigate, Routes, Route } from 'react-router-dom';
import { NavBar } from './components/NavBar';
import { PeoplePage } from './components/PeoplePage';
import { PeopleList } from './components/PeopleList';

export const App = () => {
  const location = useLocation();

  if (location.pathname === '/home') {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <div data-cy="app">
      <NavBar />
      <main className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<h1 className="title">Home Page</h1>} />
            <Route path="people" element={<PeoplePage />}>
              <Route index element={<PeopleList />} />
              <Route path=":slug" element={<PeopleList />} />
            </Route>
            <Route
              path="*"
              element={<h1 className="title">Page not found</h1>}
            />
          </Routes>
        </div>
      </main>
    </div>
  );
};
